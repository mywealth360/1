-- Ensure RLS is enabled on email_logs table
ALTER TABLE IF EXISTS public.email_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Admins can view all email logs" ON public.email_logs;
DROP POLICY IF EXISTS "Admins can insert email logs" ON public.email_logs;
DROP POLICY IF EXISTS "Admins can update email logs" ON public.email_logs;
DROP POLICY IF EXISTS "Users can view own email logs" ON public.email_logs;
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

-- Create a new table for request logs if it doesn't exist
CREATE TABLE IF NOT EXISTS public.request_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  request_path text NOT NULL,
  request_method text NOT NULL,
  request_data jsonb,
  response_status integer,
  response_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on request_logs table
ALTER TABLE public.request_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for request_logs
CREATE POLICY "Admins can view all request logs"
ON public.request_logs
FOR SELECT
TO authenticated
USING (auth.is_admin());

CREATE POLICY "Admins can insert request logs"
ON public.request_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.is_admin());

-- Create indexes for request_logs
CREATE INDEX IF NOT EXISTS idx_request_logs_user_id ON public.request_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_request_logs_created_at ON public.request_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_request_logs_request_path ON public.request_logs(request_path);

-- Grant necessary permissions to the authenticated role
GRANT SELECT, INSERT, UPDATE ON public.email_logs TO authenticated;
GRANT SELECT, INSERT ON public.request_logs TO authenticated;

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