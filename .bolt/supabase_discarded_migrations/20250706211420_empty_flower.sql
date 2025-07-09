/*
  # Add Trader Profile Quiz Table

  1. New Tables
    - trader_profile_results - Stores user quiz results and profile recommendations
  2. Security
    - Enable RLS on trader_profile_results table
    - Add policies for users to view their own results
    - Add policies for admins to view all results
  3. Performance
    - Add indexes for common query patterns
*/

-- Create a new table for trader profile quiz results
CREATE TABLE IF NOT EXISTS public.trader_profile_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  profile_result text NOT NULL,
  profile_scores jsonb NOT NULL,
  answers jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  rd_station_sync boolean DEFAULT false,
  rd_station_data jsonb
);

-- Enable RLS on trader_profile_results table
ALTER TABLE public.trader_profile_results ENABLE ROW LEVEL SECURITY;

-- Create policies for trader_profile_results
CREATE POLICY "Users can insert own trader profile results"
ON public.trader_profile_results
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own trader profile results"
ON public.trader_profile_results
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all trader profile results"
ON public.trader_profile_results
FOR SELECT
TO authenticated
USING (auth.is_admin());

-- Create indexes for trader_profile_results
CREATE INDEX IF NOT EXISTS idx_trader_profile_results_user_id ON public.trader_profile_results(user_id);
CREATE INDEX IF NOT EXISTS idx_trader_profile_results_profile_result ON public.trader_profile_results(profile_result);
CREATE INDEX IF NOT EXISTS idx_trader_profile_results_created_at ON public.trader_profile_results(created_at);

-- Create function to handle trader profile result submission and RD Station integration
CREATE OR REPLACE FUNCTION handle_trader_profile_result()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into email_logs for RD Station integration
  INSERT INTO email_logs (
    user_id,
    email_type,
    recipient,
    requested_at,
    status,
    response_data
  )
  SELECT
    NEW.user_id,
    'trader_profile',
    u.email,
    now(),
    'requested',
    jsonb_build_object(
      'profile_result', NEW.profile_result,
      'profile_scores', NEW.profile_scores,
      'answers', NEW.answers,
      'user_name', COALESCE(up.display_name, split_part(u.email, '@', 1))
    )
  FROM auth.users u
  LEFT JOIN user_profiles up ON up.user_id = u.id
  WHERE u.id = NEW.user_id;
  
  -- Mark as synced with RD Station
  NEW.rd_station_sync := true;
  NEW.rd_station_data := jsonb_build_object(
    'synced_at', now(),
    'profile_result', NEW.profile_result
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for trader profile results
CREATE TRIGGER on_trader_profile_result_insert
BEFORE INSERT ON public.trader_profile_results
FOR EACH ROW
EXECUTE FUNCTION handle_trader_profile_result();

-- Grant necessary permissions
GRANT SELECT, INSERT ON public.trader_profile_results TO authenticated;