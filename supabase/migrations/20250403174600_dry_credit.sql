/*
  # Update registrations table and policies

  1. Changes
    - Safely create registrations table if it doesn't exist
    - Enable RLS if not already enabled
    - Add policies if they don't exist

  2. Security
    - Enable RLS on registrations table
    - Add policies for public insert and select access
*/

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  class text NOT NULL,
  phone_number text NOT NULL,
  school_name text NOT NULL,
  address text NOT NULL,
  special_code text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and create new ones
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can insert registrations" ON registrations;
  DROP POLICY IF EXISTS "Anyone can view registrations" ON registrations;
  
  CREATE POLICY "Anyone can insert registrations"
    ON registrations
    FOR INSERT
    TO public
    WITH CHECK (true);

  CREATE POLICY "Anyone can view registrations"
    ON registrations
    FOR SELECT
    TO public
    USING (true);
END $$;