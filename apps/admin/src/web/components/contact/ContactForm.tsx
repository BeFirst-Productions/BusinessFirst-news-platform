"use client";
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear individual field error when user types
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Name check
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Subject check
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters.';
    }

    // Message check
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 80000); // 800ms
  };

  // Adjust wait time in simulated submit (800ms)
  const simulatedDelay = 800;
  const triggerSubmitSimulation = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, simulatedDelay);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      triggerSubmitSimulation();
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full lg:flex-1 bg-[#f8f9fa] rounded-[24px] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-6 min-h-[500px] transition-all duration-300">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-[#24214c]">Message Sent!</h3>
          <p className="text-gray-500 text-sm md:text-base max-w-sm leading-relaxed">
            Thank you for reaching out. We have received your query and will get back to you shortly.
          </p>
        </div>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-4 bg-[#24214c] hover:bg-[#1a1738] text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-xl transition-colors shadow-md"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="w-full lg:flex-1 bg-[#f8f9fa] rounded-[24px] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col justify-between">
      <form onSubmit={handleFormSubmit} noValidate className="flex flex-col gap-6">
        {/* Name Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[#24214c] font-bold text-sm md:text-base">
            Name
          </label>
          <input 
            type="text" 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name" 
            className={`bg-white text-[#24214c] text-sm md:text-base border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 shadow-sm ${
              errors.name 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-200 focus:ring-[#FF0202]/50'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[#24214c] font-bold text-sm md:text-base">
            Email
          </label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email" 
            className={`bg-white text-[#24214c] text-sm md:text-base border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 shadow-sm ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-200 focus:ring-[#FF0202]/50'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.email}</p>
          )}
        </div>

        {/* Subject Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-[#24214c] font-bold text-sm md:text-base">
            Subject
          </label>
          <input 
            type="text" 
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter your subject" 
            className={`bg-white text-[#24214c] text-sm md:text-base border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 shadow-sm ${
              errors.subject 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-200 focus:ring-[#FF0202]/50'
            }`}
          />
          {errors.subject && (
            <p className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.subject}</p>
          )}
        </div>

        {/* Message Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-[#24214c] font-bold text-sm md:text-base">
            Message
          </label>
          <textarea 
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message" 
            className={`bg-white text-[#24214c] text-sm md:text-base border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 shadow-sm resize-none ${
              errors.message 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-200 focus:ring-[#FF0202]/50'
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs font-semibold mt-1 pl-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#24214c] hover:bg-[#1a1738] text-white font-bold text-sm md:text-base px-10 py-4 rounded-xl transition-all flex items-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#24214c]/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'SENDING...' : 'SUBMIT'} 
            {!isSubmitting && <ArrowUpRight size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
