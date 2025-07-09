/*
  # Fix get_all_users Function

  1. Changes
    - Update get_all_users function to remove reference to non-existent p.reason column
    - Add proper handling for optional modules in user plans
*/

-- Drop existing get_all_users function
DROP FUNCTION IF EXISTS get_all_users();

-- Create new get_all_users function without referencing p.reason
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  id uuid,
  email text,
  raw_user_meta_data jsonb,
  plan_type text,
  profile jsonb,
  stripe_data jsonb,
  subscription_period text
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
            'current_period_end', ss.current_period_end,
            'period', COALESCE(ss.subscription_period, 'monthly')
          )
        ) FILTER (WHERE ss.id IS NOT NULL),
        '[]'::jsonb
      )
    ) as stripe_data,
    COALESCE(p.subscription_period, 'monthly') as subscription_period
  FROM auth.users u
  LEFT JOIN user_plans p ON p.user_id = u.id AND p.is_active = true
  LEFT JOIN user_profiles up ON up.user_id = u.id
  LEFT JOIN stripe_customers sc ON sc.user_id = u.id
  LEFT JOIN stripe_subscriptions ss ON ss.customer_id = sc.id
  GROUP BY 
    u.id,
    u.email,
    u.raw_user_meta_data,
    p.plan_type,
    p.subscription_period,
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