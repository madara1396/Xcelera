import React, { ReactNode } from 'react';
import { XIcon as Icon } from 'lucide-react';

type FormSectionProps = {
  title: string;
  icon: Icon;
  iconColor: 'blue' | 'green';
  children: ReactNode;
};

const FormSection: React.FC<FormSectionProps> = ({ title, icon: IconComponent, iconColor, children }) => {
  return (
    <div className="section-card bg-blue-50 rounded-lg p-6 h-full transition-all hover:shadow-md">
      <div className="section-header flex items-center mb-5">
        <IconComponent 
          size={20} 
          className={iconColor === 'blue' ? 'text-blue-600' : 'text-blue-400'}
        />
        <h5 className="section-title ml-3 text-xl font-semibold text-blue-600">{title}</h5>
      </div>
      {children}
    </div>
  );
};

export default FormSection;