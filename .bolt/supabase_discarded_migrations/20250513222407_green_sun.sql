/*
  # Update Copy Trade Display and Optional Modules

  1. Changes
    - Update get_all_users function to properly display Copy Trade access
    - Add support for tracking optional modules in user_plans
    - Ensure RD Station integration for plan changes
*/

-- Update get_all_users function to properly handle Copy Trade display
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  id uuid,
  email text,
  raw_user_meta_data jsonb,
  plan_type text,
  profile jsonb,
  optional_modules jsonb,
  subscription_period text
) AS $$
BEGIN
  IF NOT auth.is_admin() THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  RETURN QUERY 
  SELECT DISTINCT ON (u.id)
    u.id,
    u.email::text,
    u.raw_user_meta_data,
    p.plan_type,
    to_jsonb(up.*) as profile,
    COALESCE(p.subscription_data, '{}'::jsonb) as optional_modules,
    COALESCE(p.subscription_period, 'monthly') as subscription_period
  FROM auth.users u
  LEFT JOIN user_plans p ON p.user_id = u.id AND p.is_active = true
  LEFT JOIN user_profiles up ON up.user_id = u.id
  ORDER BY u.id, p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update admin_update_user_plan function to handle Copy Trade and optional modules
CREATE OR REPLACE FUNCTION admin_update_user_plan(
  p_user_id uuid,
  p_plan_type text,
  p_reason text DEFAULT NULL,
  p_subscription_period text DEFAULT 'monthly'
)
RETURNS void AS $$
DECLARE
  v_old_plan text;
  v_admin_id uuid;
  v_subscription_data jsonb := '{}'::jsonb;
  v_valid_plan_types text[] := ARRAY['free', 'starter', 'global', 'pro', 'copy_invest'];
  v_valid_subscription_periods text[] := ARRAY['monthly', 'semiannual', 'annual'];
  v_user_email text;
  v_user_name text;
BEGIN
  IF NOT auth.is_admin() THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  -- Validate plan type
  IF NOT p_plan_type = ANY(v_valid_plan_types) THEN
    RAISE EXCEPTION 'Invalid plan type. Valid types are: free, starter, global, pro, copy_invest';
  END IF;
  
  -- Validate subscription period
  IF NOT p_subscription_period = ANY(v_valid_subscription_periods) THEN
    RAISE EXCEPTION 'Invalid subscription period. Valid periods are: monthly, semiannual, annual';
  END IF;

  -- Get current admin ID
  SELECT auth.uid() INTO v_admin_id;
  
  -- Get current plan
  SELECT plan_type INTO v_old_plan
  FROM user_plans
  WHERE user_id = p_user_id AND is_active = true;
  
  -- Parse optional modules from reason
  IF p_reason LIKE '%Módulo de Backtest Starter%' THEN
    v_subscription_data := jsonb_set(v_subscription_data, '{backtest_starter}', 'true'::jsonb);
  END IF;
  
  IF p_reason LIKE '%Robô GR PRO%' THEN
    v_subscription_data := jsonb_set(v_subscription_data, '{gr_pro}', 'true'::jsonb);
  END IF;
  
  -- Add Copy Trade access for Pro and Copy Invest plans
  IF p_plan_type IN ('pro', 'copy_invest') THEN
    v_subscription_data := jsonb_set(v_subscription_data, '{copy_trade_access}', 'true'::jsonb);
  END IF;
  
  -- Deactivate current plan
  UPDATE user_plans
  SET is_active = false, updated_at = now()
  WHERE user_id = p_user_id AND is_active = true;
  
  -- Insert new plan
  INSERT INTO user_plans (
    user_id,
    plan_type,
    created_at,
    updated_at,
    is_active,
    subscription_period,
    subscription_data
  )
  VALUES (
    p_user_id,
    p_plan_type,
    now(),
    now(),
    true,
    p_subscription_period,
    v_subscription_data
  );
  
  -- Log plan change
  INSERT INTO plan_changes (
    user_id,
    old_plan,
    new_plan,
    changed_by,
    changed_at,
    reason,
    admin_id
  )
  VALUES (
    p_user_id,
    v_old_plan,
    p_plan_type,
    v_admin_id,
    now(),
    p_reason,
    v_admin_id
  );
  
  -- Get user email and name for RD Station integration
  SELECT 
    u.email, 
    COALESCE(up.display_name, split_part(u.email, '@', 1)) 
  INTO v_user_email, v_user_name
  FROM auth.users u
  LEFT JOIN user_profiles up ON up.user_id = u.id
  WHERE u.id = p_user_id;
  
  -- Log the plan change for external integrations
  INSERT INTO email_logs (
    user_id,
    email_type,
    recipient,
    plan_type,
    requested_at,
    requested_by,
    status,
    response_data
  )
  VALUES (
    p_user_id,
    'plan_change',
    v_user_email,
    p_plan_type,
    now(),
    v_admin_id,
    'requested',
    jsonb_build_object(
      'old_plan', v_old_plan,
      'new_plan', p_plan_type,
      'subscription_period', p_subscription_period,
      'optional_modules', v_subscription_data,
      'user_name', v_user_name,
      'reason', p_reason
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;