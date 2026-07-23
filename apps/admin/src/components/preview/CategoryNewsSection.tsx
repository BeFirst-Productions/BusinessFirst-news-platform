import React from 'react';
import SectionContainer from './SectionContainer';

const CategoryNewsSection = () => {
  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202] max-w-fit">
          Category News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for category news items */}
          <div className="text-gray-500 italic py-8">
            Category news content to be added here.
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CategoryNewsSection;
