import { useState } from 'react';
import { StudentFormData } from '../types/database.types';
import { supabase } from '../lib/supabase';

export function useSupabaseForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (data: StudentFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: supabaseError } = await supabase
        .from('students')
        .insert([data]);
      
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setError(null);
  };

  return {
    submitForm,
    resetForm,
    isLoading,
    isSuccess,
    error
  };
}