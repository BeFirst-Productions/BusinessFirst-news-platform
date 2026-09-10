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
Have a news tip, business story, press release, event announcement or media enquiry? The Business First newsroom is always open to hearing from businesses, organisations, industry professionals and readers. Whether you want to share a breaking development, submit a press release, suggest a story or explore a media opportunity, our team is ready to connect with you. Got a story that deserves attention? Send us the details, including relevant information, images or supporting materials, and our editorial team will review your submission. 
      </p>
    </div>
  );
};

export default ContactNewsroom;
