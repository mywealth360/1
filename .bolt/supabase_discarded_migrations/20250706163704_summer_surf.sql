/*
  # Fix Login Page and Add Extra Leverage Parameter

  1. Changes
    - Fix admin_update_user_plan function to properly handle extra_leverage parameter
    - Ensure proper handling of Copy Trade access
    - Fix authentication flow for login page
*/

-- First drop the existing admin_update_user_plan function
DROP FUNCTION IF EXISTS admin_update_user_plan(uuid, text, text, text, int);
DROP FUNCTION IF EXISTS admin_update_user_plan(uuid, text, text, text);

-- Create updated function with proper extra leverage support
CREATE OR REPLACE FUNCTION admin_update_user_plan(
  p_user_id uuid,
  p_plan_type text,
  p_reason text DEFAULT NULL,
  p_subscription_period text DEFAULT 'monthly',
  p_extra_leverage int DEFAULT NULL
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
  
  IF p_reason LIKE '%Acesso ao Copy Trade%' THEN
    v_subscription_data := jsonb_set(v_subscription_data, '{copy_trade_access}', 'true'::jsonb);
  END IF;
  
  -- Add extra leverage if provided
  IF p_extra_leverage IS NOT NULL AND p_extra_leverage > 0 THEN
    v_subscription_data := jsonb_set(v_subscription_data, '{extra_leverage}', to_jsonb(p_extra_leverage));
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
      'reason', p_reason,
      'extra_leverage', p_extra_leverage
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;