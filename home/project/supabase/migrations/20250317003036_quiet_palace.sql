/*
  # Fix get_all_users Function and Admin Access

  1. Changes
    - Fix GROUP BY clause in get_all_users function
    - Update auth.is_admin() function
    - Add admin_create_user function
*/

-- Update auth.is_admin() function without dropping it
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean AS $$
DECLARE
  v_role text;
  v_email text;
BEGIN
  -- Get current user's role and email
  SELECT 
    COALESCE(raw_user_meta_data->>'role', ''),
    email
  INTO v_role, v_email
  FROM auth.users
  WHERE id = auth.uid();
  
  -- Return true if admin role or special emails
  RETURN v_role = 'admin' OR v_email IN (
    'pedropardal04@gmail.com',
    'profitestrategista@gmail.com',
    'estrategistats@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing get_all_users function first
DROP FUNCTION IF EXISTS get_all_users();

-- Create new get_all_users function with proper return type and GROUP BY
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  id uuid,
  email text,
  raw_user_meta_data jsonb,
  plan_type text,
  profile jsonb,
  stripe_data jsonb
) AS $$
BEGIN
  IF NOT auth.is_admin() THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  RETURN QUERY 
  SELECT 
    u.id,
    u.email::text,
    u.raw_user_meta_data,
    p.plan_type,
    to_jsonb(up.*) as profile,
    jsonb_build_object(
      'customer', sc.stripe_customer_id,
      'subscriptions', COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'id', ss.stripe_subscription_id,
            'status', ss.status,
            'current_period_end', ss.current_period_end
          )
        ) FILTER (WHERE ss.id IS NOT NULL),
        '[]'::jsonb
      )
    ) as stripe_data
  FROM auth.users u
  LEFT JOIN user_plans p ON p.user_id = u.id
  LEFT JOIN user_profiles up ON up.user_id = u.id
  LEFT JOIN stripe_customers sc ON sc.user_id = u.id
  LEFT JOIN stripe_subscriptions ss ON ss.customer_id = sc.id
  GROUP BY 
    u.id,
    u.email,
    u.raw_user_meta_data,
    p.plan_type,
    up.id,
    up.user_id,
    up.display_name,
    up.avatar_url,
    up.phone,
    up.created_at,
    up.updated_at,
    sc.stripe_customer_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create admin user
CREATE OR REPLACE FUNCTION admin_create_user(
  p_email text,
  p_password text,
  p_role text DEFAULT NULL,
  p_plan_type text DEFAULT 'free'
)
RETURNS uuid AS $$
DECLARE
  v_user_id uuid;
BEGIN
  IF NOT auth.is_admin() THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  -- Create user in auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    p_email,
    crypt(p_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    jsonb_build_object('role', NULLIF(p_role, '')),
    now(),
    now(),
    encode(gen_random_bytes(32), 'base64'),
    p_email,
    encode(gen_random_bytes(32), 'base64'),
    encode(gen_random_bytes(32), 'base64')
  ) RETURNING id INTO v_user_id;

  -- Create initial plan
  INSERT INTO user_plans (user_id, plan_type)
  VALUES (v_user_id, p_plan_type);

  -- Create initial profile
  INSERT INTO user_profiles (user_id, display_name)
  VALUES (v_user_id, split_part(p_email, '@', 1));

  RETURN v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;