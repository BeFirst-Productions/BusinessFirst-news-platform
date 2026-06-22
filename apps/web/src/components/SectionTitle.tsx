import React from 'react';

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = "" }) => {
  return (
    <div className={`flex items-center justify-center mb-8 w-full ${className}`}>
      <div 
        className="h-[6px] w-16 md:flex-1 md:max-w-96 rounded-full"
        style={{
          backgroundImage:'linear-gradient(270deg, #FF0202 0%, rgba(36,31,82,1.00) 5%, rgba(36,31,82,0) 78%)',
          backgroundPosition: 'center center'
        }}
      ></div>
      <h2 className="text-[#FF0202] text-xl xl:text-2xl 2xl:text-3xl font-bold px-4 tracking-tight whitespace-nowrap shrink-0">
        {title}
      </h2>
      <div 
        className="h-[6px] w-16 md:flex-1 md:max-w-96 rounded-full"
        style={{
          backgroundImage: 'linear-gradient(90deg, #FF0202 0%, rgba(36,31,82,1.00) 5%, rgba(36,31,82,0) 78%)',
          backgroundPosition: 'center center'
        }}
      ></div>
    </div>
  );
};

export default SectionTitle;
