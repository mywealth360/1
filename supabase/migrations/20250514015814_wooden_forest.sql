/*
  # Fix Email Logs Permissions for Admin Panel

  1. Changes
    - Add proper RLS policies for email_logs table
    - Ensure admin users can view, insert, and update email logs
    - Fix permission denied errors in admin panel
*/

-- Ensure RLS is enabled on email_logs table
ALTER TABLE IF EXISTS public.email_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Admins can view all email logs" ON public.email_logs;
DROP POLICY IF EXISTS "Admins can insert email logs" ON public.email_logs;
DROP POLICY IF EXISTS "Admins can update email logs" ON public.email_logs;
DROP POLICY IF EXISTS "admin_email_logs" ON public.email_logs;
DROP POLICY IF EXISTS "user_email_logs" ON public.email_logs;

-- Create comprehensive policies for admin access
CREATE POLICY "Admins can view all email logs"
ON public.email_logs
FOR SELECT
TO authenticated
USING (auth.is_admin());

CREATE POLICY "Admins can insert email logs"
ON public.email_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.is_admin());

CREATE POLICY "Admins can update email logs"
ON public.email_logs
FOR UPDATE
TO authenticated
USING (auth.is_admin());

-- Create policy for users to view their own logs
CREATE POLICY "Users can view own email logs"
ON public.email_logs
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Grant necessary permissions to the authenticated role
GRANT SELECT, INSERT, UPDATE ON public.email_logs TO authenticated;

-- Ensure the auth.is_admin function exists and works correctly
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