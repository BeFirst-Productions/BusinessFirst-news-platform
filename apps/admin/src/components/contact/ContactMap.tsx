import React from 'react';

const ContactMap = () => {
  return (
    <div className="w-full lg:flex-1 rounded-[24px] overflow-hidden shadow-sm border border-gray-100 min-h-[400px] lg:min-h-auto relative">
      <iframe 
        src="https://www.openstreetmap.org/export/embed.html?bbox=-3.0135%2C53.395%2C-2.9774%2C53.415&amp;layer=mapnik" 
        className="w-full h-full border-0 absolute inset-0 min-h-[450px] lg:min-h-full"
        title="Liverpool Map"
      ></iframe>
    </div>
  );
};

export default ContactMap;
