import React from 'react';
import { XIcon as Icon } from 'lucide-react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { StudentFormData } from '../types/database.types';

type FormInputProps = {
  id: keyof StudentFormData;
  label: string;
  placeholder: string;
  icon: Icon;
  register: UseFormRegister<StudentFormData>;
  errors: FieldErrors<StudentFormData>;
  type?: string;
  required?: boolean;
  pattern?: RegExp;
  options?: { value: string; label: string }[];
  helpText?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  placeholder,
  icon: IconComponent,
  register,
  errors,
  type = 'text',
  required = true,
  pattern,
  options,
  helpText,
}) => {
  const validationRules = {
    required: required ? `${label} is required` : false,
    pattern: pattern
      ? {
          value: pattern,
          message: `Please enter a valid ${label.toLowerCase()}`,
        }
      : undefined,
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label block font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="input-group relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <IconComponent size={18} />
        </div>
        {type === 'select' ? (
          <select
            id={id}
            className={`form-select w-full pl-10 py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-blue-300 focus:border-blue-500 ${
              errors[id] ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register(id, validationRules)}
          >
            <option value="">Select {label}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`form-control w-full pl-10 py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-blue-300 focus:border-blue-500 ${
              errors[id] ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register(id, validationRules)}
          />
        )}
      </div>
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id]?.message?.toString()}
        </p>
      )}
      {helpText && <small className="text-gray-500 text-xs mt-1">{helpText}</small>}
    </div>
  );
};

export default FormInput;