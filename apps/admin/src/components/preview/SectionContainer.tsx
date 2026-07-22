import React, { ElementType, ReactNode, Ref } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  background?: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  as?: ElementType;
  sectionRef?: Ref<HTMLElement>;
  overflowVisible?: boolean;
}

export default function SectionContainer({ 
  children, 
  background, 
  className = '', 
  containerClassName = '', 
  id,
  as: Component = 'section',
  sectionRef,
  overflowVisible = false
}: SectionContainerProps) {
  return (
    <Component 
      ref={sectionRef}
      id={id} 
      className={`relative w-full ${overflowVisible ? 'overflow-visible' : 'overflow-hidden'} ${className}`}
    >
      {/* Background layer (absolute, outside max-w container) */}
      {background}

      {/* Main Content (inside max-w constrained container) */}
      <div className={`relative max-w-[1990px] mx-auto px-[24px] md:px-[32px] lg:px-[120px] 2xl:px-[160px] z-10 ${containerClassName}`}>
        {children}
      </div>
    </Component>
  );
}
