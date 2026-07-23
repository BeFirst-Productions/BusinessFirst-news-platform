"use client";

import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';

import SectionContainer from './SectionContainer';

const BottomNav = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    { name: 'Latest News', path: '/' },
    { 
      name: 'Region', 
      items: ['UAE News', 'MENA', 'Economy & Policy', 'International'] 
    },
    { 
      name: 'Key Sectors', 
      items: [
        'Oil, Gas & Energy',
        'Real Estate &Construction',
        'Technology & Innovation',
        'Logistics & Trade',
        'Banking & Finance'
      ] 
    },
    { 
      name: 'Other Sectors', 
      items: [
        'Education & Training',
        'Aviation & Aerospace',
        'Manufacturing & Industrial',
        'Sustainability & CSR'
      ] 
    },
    { 
      name: 'Lifestyle', 
      items: [
        'Media &Entertainment',
        'Tourism & Hospitality',
        'Retail & E-commerce',
        'Healthcare &Pharma',
        'Sports & Recreation',
        'Lifestyle & Culture'
      ] 
    },
    { 
      name: 'Exclusive Segments', 
      items: [
        'Sponsored Contents',
        'Events & Coverage',
        'Business & Beyond',
        'Daily Insights',
        'Careers'
      ] 
    },
    { 
      name: 'Contact Us', 
      items: ['Get in Touch', 'Submit an enquiry', 'Advertise with Us'] 
    }
  ];

  return (
    <SectionContainer 
      as="div"
      className="bg-[#24214c] text-white"
      containerClassName="py-3 flex justify-between items-center"
      overflowVisible={true}
    >
      <nav className="flex-1 flex justify-start xl:justify-center overflow-visible gap-4 md:gap-1 lg:gap-2 xl:gap-8 text-xs md:text-[10px] lg:text-[11px] xl:text-[15px] mr-2 lg:mr-4 pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {menuItems.map((item, index) => {
          if (item.items) {
            const isOpen = activeMenu === item.name;
            return (
              <div 
                key={index} 
                className="relative shrink-0 py-1 flex items-center"
                onMouseEnter={() => setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link 
                  href={item.name === 'Contact Us' ? '/contact' : `/news?category=${encodeURIComponent(item.name)}`}
                  className="flex items-center hover:text-gray-300 font-medium transition cursor-pointer"
                >
                  {item.name} <ChevronDown size={14} className="ml-1" />
                </Link>
                {/* Dropdown Box */}
                {isOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="bg-[#24214c] border border-white/20 rounded-xl py-4 px-6 shadow-2xl min-w-[200px] flex flex-col items-center gap-2">
                      {item.items.map((subItem, idx) => {
                        const href = item.name === 'Contact Us' 
                          ? '/contact' 
                          : `/news?category=${encodeURIComponent(subItem)}`;
                        return (
                          <Link 
                            key={idx} 
                            href={href}
                            className="text-white hover:text-red-500 font-medium text-sm transition-colors duration-200 w-full text-center block py-1"
                          >
                            {subItem}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <Link 
                key={index} 
                href={item.path || '#'}
                className="flex items-center hover:text-gray-300 font-medium transition shrink-0 py-1"
              >
                {item.name}
              </Link>
            );
          }
        })}
      </nav>
      
      <div className="relative shrink-0 flex items-center group">
        <Search size={16} className="text-[#24214c] absolute left-3 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-white text-[#24214c] text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none w-[140px] md:w-[110px] lg:w-[130px] xl:w-[240px] focus:ring-2 focus:ring-[#FF0202]/50 transition-all placeholder:text-gray-400"
        />
      </div>
    </SectionContainer>
  );
};

export default BottomNav;
