/*
  # Remove 'opcionais' Plan Type Option

  1. Changes
    - Update admin_update_user_plan function to validate plan types
    - Remove 'opcionais' as a valid plan type
    - Add validation to ensure only valid plan types are used
*/

-- Drop the existing function first
DROP FUNCTION IF EXISTS admin_update_user_plan(uuid, text, text, text);

-- Create new version of the function with plan type validation
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
BEGIN
  IF NOT auth.is_admin() THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  -- Validate plan type
  IF NOT p_plan_type = ANY(v_valid_plan_types) THEN
    RAISE EXCEPTION 'Invalid plan type. Valid types are: free, starter, global, pro, copy_invest';
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;