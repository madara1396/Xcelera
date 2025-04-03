/*
  # Create registrations table

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `class` (text)
      - `phone_number` (text)
      - `school_name` (text)
      - `address` (text)
      - `special_code` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `registrations` table
    - Add policy for inserting new registrations
*/

CREATE TABLE registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  class text NOT NULL,
  phone_number text NOT NULL,
  school_name text NOT NULL,
  address text NOT NULL,
  special_code text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

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