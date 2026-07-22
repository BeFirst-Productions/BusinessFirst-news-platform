import React from 'react';

const ContactNewsroom = () => {
  return (
    <div className="w-full lg:flex-1 flex flex-col gap-6">
      <div className="flex items-center w-full gap-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
          Connect with the Newsroom
        </h1>
        <div className="h-[2px] flex-1 bg-gray-300"></div>
      </div>
      
      <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
        Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
      </p>
    </div>
  );
};

export default ContactNewsroom;
