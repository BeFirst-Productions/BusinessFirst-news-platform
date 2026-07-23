import React from 'react';
import TopBar from './TopBar';
import MiddleSection from './MiddleSection';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';

const Header = () => {
  return (
    <header className="w-full font-sans relative z-50">
      <div className="hidden md:block">
      <TopBar />
        <MiddleSection />
        <BottomNav />
      </div>
      <div className="block md:hidden">
        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;
