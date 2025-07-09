/*
  # Add Survey Responses Table

  1. New Tables
    - `survey_responses` - Stores user survey responses with RD Station integration
  2. Security
    - Enable RLS on `survey_responses` table
    - Add policies for users to view and insert their own responses
    - Add policies for admins to view all responses
*/

-- Create a new table for survey responses
CREATE TABLE IF NOT EXISTS public.survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  experience_level text,
  has_automated_before text,
  trading_style text,
  main_challenge text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  rd_station_sync boolean DEFAULT false,
  rd_station_data jsonb
);

-- Enable RLS on survey_responses table
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_survey_responses_user_id ON public.survey_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON public.survey_responses(created_at);

-- Create policies for survey_responses
CREATE POLICY "Users can insert own survey responses"
ON public.survey_responses
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own survey responses"
ON public.survey_responses
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all survey responses"
ON public.survey_responses
FOR SELECT
TO authenticated
USING (auth.is_admin());

-- Create function to handle survey response submission and RD Station integration
CREATE OR REPLACE FUNCTION handle_survey_response()
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
    'survey_response',
    u.email,
    now(),
    'requested',
    jsonb_build_object(
      'experience_level', NEW.experience_level,
      'has_automated_before', NEW.has_automated_before,
      'trading_style', NEW.trading_style,
      'main_challenge', NEW.main_challenge,
      'user_name', COALESCE(up.display_name, split_part(u.email, '@', 1))
    )
  FROM auth.users u
  LEFT JOIN user_profiles up ON up.user_id = u.id
  WHERE u.id = NEW.user_id;
  
  -- Mark as synced with RD Station
  NEW.rd_station_sync := true;
  NEW.rd_station_data := jsonb_build_object(
    'synced_at', now(),
    'experience_level', NEW.experience_level,
    'has_automated_before', NEW.has_automated_before,
    'trading_style', NEW.trading_style,
    'main_challenge', NEW.main_challenge
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for survey responses
CREATE TRIGGER on_survey_response_insert
BEFORE INSERT ON public.survey_responses
FOR EACH ROW
EXECUTE FUNCTION handle_survey_response();

-- Grant necessary permissions
GRANT SELECT, INSERT ON public.survey_responses TO authenticated;