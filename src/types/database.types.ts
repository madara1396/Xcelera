export type Student = {
  id: string;
  student_name: string;
  contact_number: string;
  school_name: string;
  school_address: string;
  grade: string;
  special_code?: string;
  created_at: string;
};

export type StudentFormData = Omit<Student, 'id' | 'created_at'>;