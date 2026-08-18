import React from 'react';
import { CloudSun, Calendar } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';

import SectionContainer from './SectionContainer';

const TopBar = async () => {
  // Fetch Dubai weather (revalidate every 1 hour)
  let temperature = '31'; // Fallback
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current_weather=true', { 
      next: { revalidate: 3600 } 
    });
    if (res.ok) {
      const data = await res.json();
      temperature = Math.round(data.current_weather.temperature).toString();
    }
  } catch (error) {
    console.error("Failed to fetch weather", error);
  }

  // Format current date: e.g., "Tuesday, 23 Sep 2025"
  const today = new Date();
  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today);
  const day = today.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(today);
  const year = today.getFullYear();
  const formattedDateString = `${dayName}, ${day} ${month} ${year}`;

  return (
    <SectionContainer 
      as="div"
      className="bg-[#f8f9fa] border-b border-gray-200"
      containerClassName="py-2 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-0 text-xs md:text-sm text-gray-700"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2 font-medium">
          <CloudSun size={16} className="text-gray-800" />
          <span>{temperature} C | Dubai</span>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <Calendar size={16} className="text-gray-600" />
          <span>{formattedDateString}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-black text-white p-1.5 rounded-sm cursor-pointer hover:bg-gray-800 transition">
            <FaXTwitter size={14} />
          </div>
          <div className="bg-black text-white p-1.5 rounded-sm cursor-pointer hover:bg-gray-800 transition">
            <FaLinkedinIn size={14} />
          </div>
          <div className="bg-black text-white p-1.5 rounded-sm cursor-pointer hover:bg-gray-800 transition">
            <FaFacebookF size={14} />
          </div>
          <div className="bg-black text-white p-1.5 rounded-sm cursor-pointer hover:bg-gray-800 transition">
            <FaInstagram size={14} />
          </div>
        </div>
        <a 
          href="#newsletter-section"
          className="bg-[#24214c] hover:bg-[#1a183d] text-white px-8 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition text-center min-w-[120px]"
        >
          Subscribe
        </a>
        {/* <button className="bg-[#cd2027] hover:bg-[#a61a1f] text-white px-6 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition">
          Login
        </button> */}
      </div>
    </SectionContainer>
  );
};

export default TopBar;
