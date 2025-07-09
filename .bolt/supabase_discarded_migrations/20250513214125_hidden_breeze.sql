/*
  # Fix Duplicated Users in Admin Panel

  1. Changes
    - Fix the get_all_users function to prevent duplicate users
    - Ensure proper grouping in the query
*/

-- Drop the existing function first
DROP FUNCTION IF EXISTS get_all_users();

-- Create the updated function with proper grouping to prevent duplicates
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