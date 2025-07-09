/*
  # Fix get_all_users Function

  1. Changes
    - Drop existing get_all_users function
    - Create new version without referencing p.reason column
    - Add optional_modules field to return data
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