/*
  # Update students table RLS policies

  1. Changes
    - Drop existing RLS policies for students table
    - Add new policy to allow public inserts
    - Keep existing policy for authenticated users to read data

  2. Security
    - Enable public access for inserting student records
    - Maintain read access for authenticated users only
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON students;

-- Create new public insert policy
CREATE POLICY "Anyone can insert students"
ON public.students
FOR INSERT 
TO public
WITH CHECK (true);

-- Keep existing select policy
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON students;
CREATE POLICY "Enable read access for authenticated users"
ON public.students
FOR SELECT
TO authenticated
USING (true);