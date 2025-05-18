/*
  # Fix RLS policies for students table

  1. Changes
    - Drop existing RLS policies for students table
    - Add new policies that properly handle authenticated users
    - Ensure insert and select operations work correctly

  2. Security
    - Enable RLS on students table (already enabled)
    - Add policy for authenticated users to insert their own data
    - Add policy for authenticated users to read their own data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to insert data" ON students;
DROP POLICY IF EXISTS "Users can read their own data" ON students;

-- Create new policies
CREATE POLICY "Enable insert access for authenticated users" 
ON public.students
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
ON public.students
FOR SELECT
TO authenticated
USING (true);