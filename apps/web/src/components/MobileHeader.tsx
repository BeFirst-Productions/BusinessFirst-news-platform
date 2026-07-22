"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, Search, UserPlus, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import SectionContainer from './SectionContainer';
import { DynamicAd } from './ads/DynamicAd';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

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
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="relative">
      <SectionContainer 
        as="div"
        className="bg-[#24214c] text-white border-b-[4px] border-white relative z-50"
        containerClassName="py-4 flex justify-between items-center"
      >
        <div className="cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X size={32} className="text-white" strokeWidth={2} />
          ) : (
            <Menu size={32} className="text-white" strokeWidth={2} />
          )}
        </div>
        
        <Link href="/" className="flex flex-col items-center justify-center cursor-pointer">
          <div className="text-white font-semibold text-[22px] leading-[1] tracking-wide">
            BUSINESS
          </div>
          <div className="bg-[#cd2027] text-white text-[12px] font-semibold px-[16px] py-[1px] tracking-[0.3em] uppercase mt-[3px]">
            First
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-1.5 cursor-pointer hover:bg-gray-200 transition flex items-center justify-center" style={{ width: '32px', height: '32px' }}>
            <UserPlus size={18} className="text-[#24214c]" strokeWidth={2} />
          </div>
          <div className="bg-white rounded-full p-1.5 cursor-pointer hover:bg-gray-200 transition flex items-center justify-center" style={{ width: '32px', height: '32px' }}>
            <Search size={18} className="text-[#24214c]" strokeWidth={2} />
          </div>
        </div>
      </SectionContainer>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#24214c] text-white z-40 shadow-xl pb-4">
          <div className="px-[24px] md:px-[32px] pt-2">
            {menuItems.map((item, index) => {
              const hasDropdown = !!item.items;
              const isOpen = openDropdown === item.name;
              
              return (
                <div key={index} className="border-b border-gray-500/40">
                  {hasDropdown ? (
                    <div>
                      <div className="flex justify-between items-center py-[14px] w-full">
                        <Link 
                          href={item.name === 'Contact Us' ? '/contact' : `/news?category=${encodeURIComponent(item.name)}`}
                          className="font-medium text-[15px] hover:text-gray-300 transition flex-1 cursor-pointer"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {item.name}
                        </Link>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleDropdown(item.name);
                          }}
                          className="p-2 -mr-2 cursor-pointer hover:text-gray-300 transition text-white"
                        >
                          <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      
                      {/* Sub-menu panel */}
                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[400px] pb-4' : 'max-h-0'}`}>
                        <div className="flex flex-col gap-2 pl-4 border-l border-white/20">
                          {item.items?.map((subItem, idx) => {
                            const href = item.name === 'Contact Us'
                              ? '/contact'
                              : `/news?category=${encodeURIComponent(subItem)}`;
                            return (
                              <Link 
                                key={idx}
                                href={href}
                                className="text-gray-300 hover:text-white font-medium text-sm py-1.5"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                {subItem}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={item.path || '#'}
                      className="py-[14px] flex justify-between items-center cursor-pointer hover:text-gray-300 transition w-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      <span className="font-medium text-[15px]">{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>

      {/* Mobile Banner Ad */}
      <SectionContainer as="div" className="bg-gray-100" containerClassName="py-3">
        <DynamicAd
          ratio="ad_1"
          className="w-full h-20 sm:h-24 bg-gray-200 shadow-sm"
          fallback={
            <Image 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&h=300&q=80" 
              alt="Advertisement"
              fill
              className="object-cover"
            />
          }
        />
      </SectionContainer>

    </div>
  );
};

export default MobileHeader;
