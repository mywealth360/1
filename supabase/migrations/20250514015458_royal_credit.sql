/*
  # Fix Email Logs Permissions

  1. Changes
    - Add RLS policy for admins to view email logs
    - Fix permission denied error for email_logs table
*/

-- Add policy for admins to view email logs
CREATE POLICY "Admins can view all email logs" 
ON public.email_logs
FOR SELECT 
TO authenticated
USING (auth.is_admin());

-- Add policy for admins to insert email logs
CREATE POLICY "Admins can insert email logs" 
ON public.email_logs
FOR INSERT 
TO authenticated
WITH CHECK (auth.is_admin());

-- Add policy for admins to update email logs
CREATE POLICY "Admins can update email logs" 
ON public.email_logs
FOR UPDATE 
TO authenticated
USING (auth.is_admin());

-- Enable RLS on email_logs if not already enabled
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;