/*
  # Create students table
  
  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `student_name` (text, not null)
      - `contact_number` (text, not null)
      - `school_name` (text, not null)
      - `school_address` (text, not null)
      - `grade` (text, not null)
      - `special_code` (text)
      - `created_at` (timestamp with time zone, default: now())
  
  2. Security
    - Enable RLS on `students` table
    - Add policy for authenticated users to insert data
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  contact_number text NOT NULL,
  school_name text NOT NULL,
  school_address text NOT NULL,
  grade text NOT NULL,
  special_code text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to insert data"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users
  ));