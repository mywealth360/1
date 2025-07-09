/*
  # Add Ping Test Logs Table

  1. New Tables
    - `ping_test_logs` - Stores ping test results for users and leads
  2. Security
    - Enable RLS on `ping_test_logs` table
    - Add policies for users to view their own logs and admins to view all logs
  3. Changes
    - Create indexes for better query performance
*/

-- Create a new table for ping test logs
CREATE TABLE IF NOT EXISTS public.ping_test_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  email text NOT NULL,
  average_ping numeric NOT NULL,
  classification text NOT NULL,
  results jsonb NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  rd_station_sync boolean DEFAULT false,
  rd_station_data jsonb
);

-- Enable RLS on ping_test_logs table
ALTER TABLE public.ping_test_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for ping_test_logs
CREATE POLICY "Users can view own ping test logs"
ON public.ping_test_logs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all ping test logs"
ON public.ping_test_logs
FOR SELECT
TO authenticated
USING (auth.is_admin());

CREATE POLICY "Service role can insert ping test logs"
ON public.ping_test_logs
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Authenticated users can insert own ping test logs"
ON public.ping_test_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create indexes for ping_test_logs
CREATE INDEX IF NOT EXISTS idx_ping_test_logs_user_id ON public.ping_test_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ping_test_logs_email ON public.ping_test_logs(email);
CREATE INDEX IF NOT EXISTS idx_ping_test_logs_created_at ON public.ping_test_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_ping_test_logs_classification ON public.ping_test_logs(classification);

-- Create function to handle ping test log submission and RD Station integration
CREATE OR REPLACE FUNCTION handle_ping_test_log()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into email_logs for RD Station integration if not already synced
  IF NOT NEW.rd_station_sync THEN
    INSERT INTO email_logs (
      user_id,
      email_type,
      recipient,
      requested_at,
      status,
      response_data
    )
    VALUES (
      NEW.user_id,
      'ping_test',
      NEW.email,
      now(),
      'requested',
      jsonb_build_object(
        'average_ping', NEW.average_ping,
        'classification', NEW.classification,
        'results', NEW.results
      )
    );
    
    -- Mark as synced with RD Station
    NEW.rd_station_sync := true;
    NEW.rd_station_data := jsonb_build_object(
      'synced_at', now(),
      'average_ping', NEW.average_ping,
      'classification', NEW.classification
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for ping test logs
CREATE TRIGGER on_ping_test_log_insert
BEFORE INSERT ON public.ping_test_logs
FOR EACH ROW
EXECUTE FUNCTION handle_ping_test_log();

-- Grant necessary permissions
GRANT SELECT, INSERT ON public.ping_test_logs TO authenticated;
GRANT SELECT, INSERT ON public.ping_test_logs TO service_role;