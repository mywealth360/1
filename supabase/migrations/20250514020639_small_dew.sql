/*
  # Request Logs Table and Policies

  1. New Tables
    - `request_logs` - Stores API request information
  2. Security
    - Enable RLS on `request_logs` table
    - Add policies for admins to view and insert logs
  3. Changes
    - Create indexes for better query performance
*/

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

-- Create policies for request_logs (only if they don't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'request_logs' AND policyname = 'Admins can view all request logs'
  ) THEN
    CREATE POLICY "Admins can view all request logs"
    ON public.request_logs
    FOR SELECT
    TO authenticated
    USING (auth.is_admin());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'request_logs' AND policyname = 'Admins can insert request logs'
  ) THEN
    CREATE POLICY "Admins can insert request logs"
    ON public.request_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.is_admin());
  END IF;
END
$$;

-- Create indexes for request_logs (IF NOT EXISTS is part of the CREATE INDEX syntax)
CREATE INDEX IF NOT EXISTS idx_request_logs_user_id ON public.request_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_request_logs_created_at ON public.request_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_request_logs_request_path ON public.request_logs(request_path);

-- Grant necessary permissions to the authenticated role
GRANT SELECT, INSERT ON public.request_logs TO authenticated;