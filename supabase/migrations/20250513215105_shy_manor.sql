/*
  # Fix Optional Modules Display in Admin Dashboard

  1. Changes
    - Update the get_all_users function to properly extract optional modules from subscription_data
    - Ensure optional modules are correctly displayed in the admin dashboard
*/

-- Drop the existing function first
DROP FUNCTION IF EXISTS get_all_users();

-- Create the updated function with proper handling of optional modules
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
    CASE 
      WHEN p.subscription_data IS NULL THEN 
        jsonb_build_object()
      WHEN p.reason IS NOT NULL AND p.reason LIKE '%Módulo de Backtest Starter%' THEN
        jsonb_build_object('backtest_starter', true)
      WHEN p.reason IS NOT NULL AND p.reason LIKE '%Robô GR PRO%' THEN
        jsonb_build_object('gr_pro', true)
      WHEN p.reason IS NOT NULL AND p.reason LIKE '%Módulo de Backtest Starter%' AND p.reason LIKE '%Robô GR PRO%' THEN
        jsonb_build_object('backtest_starter', true, 'gr_pro', true)
      ELSE
        COALESCE(p.subscription_data, '{}'::jsonb)
    END as optional_modules,
    COALESCE(p.subscription_period, 'monthly') as subscription_period
  FROM auth.users u
  LEFT JOIN user_plans p ON p.user_id = u.id AND p.is_active = true
  LEFT JOIN user_profiles up ON up.user_id = u.id
  ORDER BY u.id, p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the admin_update_user_plan function to store optional modules in subscription_data
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
  
  -- Insert new plan
  INSERT INTO user_plans (
    user_id,
    plan_type,
    created_at,
    updated_at,
    is_active,
    subscription_period,
    subscription_data,
    reason
  )
  VALUES (
    p_user_id,
    p_plan_type,
    now(),
    now(),
    true,
    p_subscription_period,
    v_subscription_data,
    p_reason
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;