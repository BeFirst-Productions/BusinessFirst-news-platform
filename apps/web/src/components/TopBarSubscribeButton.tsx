"use client";

import React from 'react';
import { useSubscriptionModal } from '@/hooks/use-subscription-modal';

interface TopBarSubscribeButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const TopBarSubscribeButton: React.FC<TopBarSubscribeButtonProps> = ({
  className,
  children,
}) => {
  const { openModal } = useSubscriptionModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-subscription-modal'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        'bg-[#24214c] hover:bg-[#1a183d] text-white px-8 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition text-center min-w-[120px] cursor-pointer'
      }
    >
      {children || 'Subscribe'}
    </button>
  );
};

export default TopBarSubscribeButton;