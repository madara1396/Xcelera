import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, School, Book, BarChart2, Phone, MapPin, GraduationCap, BadgeInfo } from 'lucide-react';
import { StudentFormData } from './types/database.types';
import FormSection from './components/FormSection';
import FormInput from './components/FormInput';
import SuccessModal from './components/SuccessModal';
import ErrorModal from './components/ErrorModal';
import { useSupabaseForm } from './hooks/useSupabaseForm';

function App() {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<StudentFormData>();
  const { submitForm, isLoading, isSuccess, error, resetForm } = useSupabaseForm();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const onSubmit = async (data: StudentFormData) => {
    await submitForm(data);
  };

  const handleError = (errors: typeof formState.errors) => {
    const errorMessages = Object.entries(errors).map(([key, value]) => 
      value?.message?.toString() || `${key} is invalid`
    );
    setFormErrors(errorMessages);
    setShowErrorModal(true);
  };

  const closeSuccessModal = () => {
    resetForm();
    reset();
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4">
              <img 
                src="/logo.png" 
                alt="Xcelera Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Student Registration</h1>
            <p className="text-gray-600">Fill in the details to register for our teaching institution</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit, handleError)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <FormSection title="Personal Information" icon={User} iconColor="blue">
                  <FormInput
                    id="student_name"
                    label="Student's Name"
                    placeholder="Enter full name"
                    icon={User}
                    register={register}
                    errors={errors}
                    required
                  />
                  
                  <FormInput
                    id="contact_number"
                    label="Contact Number"
                    placeholder="Enter 10-digit number"
                    icon={Phone}
                    register={register}
                    errors={errors}
                    required
                    pattern={/^\d{10}$/}
                  />
                </FormSection>
              </div>

              {/* Institution Details */}
              <div>
                <FormSection title="Institution Details" icon={School} iconColor="green">
                  <FormInput
                    id="school_name"
                    label="School Name"
                    placeholder="Enter school name"
                    icon={School}
                    register={register}
                    errors={errors}
                    required
                  />
                  
                  <FormInput
                    id="school_address"
                    label="School Address"
                    placeholder="Enter school address"
                    icon={MapPin}
                    register={register}
                    errors={errors}
                    required
                  />
                </FormSection>
              </div>

              {/* Academic Details */}
              <div>
                <FormSection title="Academic Details" icon={Book} iconColor="blue">
                  <FormInput
                    id="grade"
                    label="Grade"
                    placeholder="Select grade"
                    icon={GraduationCap}
                    register={register}
                    errors={errors}
                    type="select"
                    required
                    options={[
                      { value: '8', label: 'Grade 8' },
                      { value: '9', label: 'Grade 9' },
                      { value: '10', label: 'Grade 10' }
                    ]}
                  />
                </FormSection>
              </div>

              {/* Additional Information */}
              <div>
                <FormSection title="Additional Information" icon={BarChart2} iconColor="green">
                  <FormInput
                    id="special_code"
                    label="Special Code"
                    placeholder="Enter special code (optional)"
                    icon={BadgeInfo}
                    register={register}
                    errors={errors}
                    required={false}
                    helpText="Enter if you were provided with a special discount code"
                  />
                </FormSection>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button 
                type="submit" 
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Complete Registration'}
              </button>
            </div>
          </form>

          {/* Success Modal */}
          <SuccessModal 
            isOpen={isSuccess} 
            onClose={closeSuccessModal}
            studentName={getValues('student_name') || ''}
            grade={getValues('grade') || ''}
          />

          {/* Error Modal */}
          <ErrorModal 
            isOpen={showErrorModal} 
            onClose={closeErrorModal}
            errors={formErrors}
          />

          {/* API Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
