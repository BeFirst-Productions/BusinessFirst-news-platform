import React from 'react';

interface SectionTitleProps {
  title: string;
  titleColor?: string;
  className?: string;
  showBorder?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  titleColor = '#FF0202',
  className = "",
  showBorder = true,
}) => {
  return (
    <div className={`flex items-center w-full ${showBorder ? 'border-b border-gray-300' : 'border-b border-transparent'} pb-2 mb-6 md:mb-8 ${className}`}>
      <div className="relative">
        <h2 
          className="text-xl xl:text-2xl 2xl:text-3xl font-bold tracking-tight whitespace-nowrap" 
          style={{ color: titleColor }}
        >
          {title}
        </h2>
        <div 
          className="absolute -bottom-[9px] left-0 w-full h-[3px]" 
          style={{ backgroundColor: titleColor }}
        ></div>
      </div>
    </div>
  );
};

export default SectionTitle;
