/*
  # Fix admin_update_user_plan Function

  1. Changes
    - Drop existing admin_update_user_plan function
    - Create new version that doesn't try to use the non-existent "reason" column in user_plans
    - Properly handle optional modules through subscription_data
*/

-- Drop the existing function first
DROP FUNCTION IF EXISTS admin_update_user_plan(uuid, text, text, text);

-- Create new version of the function without using the reason parameter for user_plans
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
BEGIN
  IF NOT auth.is_admin() THEN
    RAISE EXCEPTION 'Permission denied';
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
  
  -- Deactivate current plan
  UPDATE user_plans
  SET is_active = false, updated_at = now()
  WHERE user_id = p_user_id AND is_active = true;
  
  -- Insert new plan (without reason column)
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
  
  -- Log plan change (with reason)
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update get_all_users function to properly handle optional modules
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