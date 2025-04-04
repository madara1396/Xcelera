import React, { useState, useEffect } from 'react';
import { GraduationCap, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { supabase } from './lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface RegistrationForm {
  name: string;
  class: string;
  phone_number: string;
  school_name: string;
  special_code: string;
}

function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 7,
    hours: 24,
    minutes: 54,
    seconds: 11
  });

  const [formData, setFormData] = useState<RegistrationForm>({
    name: '',
    class: '',
    phone_number: '',
    school_name: '',
    special_code: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else if (prevTime.days > 0) {
          return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([{
          name: formData.name,
          class: formData.class,
          phone_number: formData.phone_number,
          school_name: formData.school_name,
          special_code: formData.special_code
        }]);

      if (error) throw error;

      toast.success('Registration submitted successfully!');
      setFormData({
        name: '',
        class: '',
        phone_number: '',
        school_name: '',
        special_code: ''
      });
    } catch (error) {
      toast.error('Failed to submit registration. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-white relative overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-indigo-300 rounded-full blur-3xl opacity-20"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <nav className="flex justify-between items-center mb-20">
          <div className="text-2xl font-bold text-indigo-900">XCELERA</div>
          <GraduationCap className="w-6 h-6 text-indigo-900" />
        </nav>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6">
            Your Path to Academic Excellence
          </h1>
          <p className="text-indigo-700 mb-8 text-lg">
            We're building something incredible! Xcelera is committed to providing top-tier education,
            helping students master their board exams with expert guidance, structured learning, and proven strategies.
          </p>
          <p className="text-indigo-600 mb-12">
            Our platform is designed to equip students with the skills, knowledge, and confidence needed to achieve top results.
            With a curriculum covering the complete syllabus, in-depth practice with past-year questions, and expert mentorship,
            we ensure every student reaches their full potential.
          </p>

          {/* Contact info */}
          <div className="bg-white rounded-full py-3 px-6 inline-flex items-center gap-3 shadow-lg mb-16">
            <span className="text-indigo-900">contact@xcelera.edu</span>
          </div>

          {/* Countdown timer */}
          <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto mb-16">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Second', value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-indigo-900 mb-1">{item.value}</div>
                <div className="text-sm text-indigo-600">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6">Be the First to Know!</h2>
            <p className="text-indigo-600 mb-8">
              Sign up now to stay updated and secure early access to our courses.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left">
                  <label htmlFor="name" className="block text-sm font-medium text-indigo-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="text-left">
                  <label htmlFor="class" className="block text-sm font-medium text-indigo-700 mb-1">Class</label>
                  <input
                    type="text"
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your class"
                  />
                </div>
                <div className="text-left">
                  <label htmlFor="phone_number" className="block text-sm font-medium text-indigo-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="text-left">
                  <label htmlFor="school_name" className="block text-sm font-medium text-indigo-700 mb-1">School's Name</label>
                  <input
                    type="text"
                    id="school_name"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your school's name"
                  />
                </div>
                <div className="text-left md:col-span-2">
                  <label htmlFor="special_code" className="block text-sm font-medium text-indigo-700 mb-1">Special Code</label>
                  <input
                    type="text"
                    id="special_code"
                    name="special_code"
                    value={formData.special_code}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter special code"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Register for Early Access'}
              </button>
            </form>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6 mb-16">
            {[
              { Icon: Youtube, href: 'https://www.youtube.com/@xceleraofficial' },
              { Icon: Linkedin, href: '#' },
              { Icon: Twitter, href: 'https://x.com/Xceleraofficial' },
              { Icon: Facebook, href: 'https://www.facebook.com/xceleraofficial/' },
              { Icon: Instagram, href: 'https://www.instagram.com/xcelera_official/' }
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="text-sm text-indigo-600">
            XCELERA ACADEMIC INSTITUTE - © 2025 All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
