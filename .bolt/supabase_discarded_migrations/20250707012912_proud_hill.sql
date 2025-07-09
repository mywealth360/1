/*
  # Fix email_logs constraint violation in admin_update_user_plan

  1. Changes
    - Update admin_update_user_plan function to properly handle email_logs insertion
    - Ensure recipient field is populated when creating email log entries
    - Add proper error handling for email operations
*/

-- Update admin_update_user_plan function to fix email_logs constraint
CREATE OR REPLACE FUNCTION admin_update_user_plan(
  p_user_id uuid,
  p_plan_type text,
  p_reason text DEFAULT NULL,
  p_subscription_period text DEFAULT 'monthly',
  p_extra_leverage integer DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_old_plan text;
  v_user_email text;
  v_admin_id uuid;
BEGIN
  IF NOT auth.is_admin() THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  -- Get current admin user ID
  v_admin_id := auth.uid();

  -- Get user email and current plan
  SELECT 
    COALESCE(up.plan_type, 'free'),
    au.email
  INTO v_old_plan, v_user_email
  FROM auth.users au
  LEFT JOIN user_plans up ON up.user_id = au.id AND up.is_active = true
  WHERE au.id = p_user_id;

  IF v_user_email IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  -- Deactivate current plan if exists
  UPDATE user_plans 
  SET is_active = false, updated_at = now()
  WHERE user_id = p_user_id AND is_active = true;

  -- Create new plan
  INSERT INTO user_plans (
    user_id, 
    plan_type, 
    subscription_period,
    is_active,
    created_at,
    updated_at
  ) VALUES (
    p_user_id, 
    p_plan_type, 
    p_subscription_period,
    true,
    now(),
    now()
  );

  -- Log plan change with proper recipient
  INSERT INTO plan_changes (
    user_id,
    old_plan,
    new_plan,
    changed_by,
    changed_at,
    reason,
    admin_id
  ) VALUES (
    p_user_id,
    v_old_plan,
    p_plan_type,
    v_admin_id,
    now(),
    p_reason,
    v_admin_id
  );

  -- Only create email log if we have a valid recipient
  IF v_user_email IS NOT NULL AND v_user_email != '' THEN
    INSERT INTO email_logs (
      user_id,
      email_type,
      recipient,
      plan_type,
      requested_at,
      requested_by,
      status,
      created_at
    ) VALUES (
      p_user_id,
      'plan_change',
      v_user_email,
      p_plan_type,
      now(),
      v_admin_id,
      'requested',
      now()
    );
  END IF;

  -- Update users table plan_type for consistency
  UPDATE users 
  SET 
    plan_type = p_plan_type,
    updated_at = now()
  WHERE id = p_user_id;

EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the entire operation
    RAISE NOTICE 'Error in admin_update_user_plan: %', SQLERRM;
    RAISE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a simpler function for creating initial free plans without email logging
CREATE OR REPLACE FUNCTION create_initial_free_plan(p_user_id uuid)
RETURNS void AS $$
BEGIN
  -- Create initial free plan without email logging
  INSERT INTO user_plans (
    user_id, 
    plan_type, 
    subscription_period,
    is_active,
    created_at,
    updated_at
  ) VALUES (
    p_user_id, 
    'free', 
    'monthly',
    true,
    now(),
    now()
  )
  ON CONFLICT (user_id) WHERE is_active = true
  DO UPDATE SET
    plan_type = 'free',
    updated_at = now();

  -- Update users table for consistency
  INSERT INTO users (id, email, plan_type, created_at, updated_at)
  SELECT 
    au.id,
    au.email,
    'free',
    now(),
    now()
  FROM auth.users au
  WHERE au.id = p_user_id
  ON CONFLICT (id) 
  DO UPDATE SET
    plan_type = 'free',
    updated_at = now();

EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail
    RAISE NOTICE 'Error in create_initial_free_plan: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;