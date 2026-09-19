import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export interface SectionTitleProps {
  title: string;
  titleColor?: string;
  className?: string;
  showBorder?: boolean;
  borderColor?: string;
  underlineColor?: string;
  underlineWidth?: string;
  showUnderline?: boolean;
  accentBar?: React.ReactNode;
  viewAllHref?: string;
  viewAllText?: string;
  viewAllIcon?: React.ReactNode;
  viewAllColor?: string;
  viewAllHoverColor?: string;
  onViewAllClick?: () => void;
  children?: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  titleColor = '#FF0202',
  className = "",
  showBorder = true,
  borderColor = 'border-gray-300',
  underlineColor,
  underlineWidth = 'w-full',
  showUnderline = true,
  accentBar,
  viewAllHref,
  viewAllText = 'View All',
  viewAllIcon,
  viewAllColor = '#24214c',
  viewAllHoverColor = 'hover:text-[#cd2027]',
  onViewAllClick,
  children,
}) => {
  const activeUnderlineColor = underlineColor || titleColor;
  const hasRightAction = Boolean(viewAllHref || onViewAllClick || children);

  return (
    <div 
      className={`flex items-end justify-between w-full gap-3 sm:gap-4 md:gap-6 ${
        showBorder ? `border-b ${borderColor}` : 'border-b border-transparent'
      } pb-2 mb-6 md:mb-8 relative ${className}`}
    >
      {/* Optional custom accent bar across header */}
      {accentBar}

      {/* Heading Container */}
      <div className="relative min-w-0 max-w-full">
        <h2 
          className="text-base sm:text-xl md:text-2xl 2xl:text-3xl font-bold tracking-tight font-newsreader break-words leading-tight" 
          style={{ color: titleColor }}
        >
          {title}
        </h2>
        {showUnderline && (
          <div 
            className={`absolute -bottom-[9.5px] left-0 ${underlineWidth} h-[3px] rounded-full pointer-events-none`} 
            style={{ backgroundColor: activeUnderlineColor }}
          />
        )}
      </div>

      {/* View All / Right Action Slot with uniform gap and shrink protection */}
      {hasRightAction && (
        <div className="shrink-0 flex items-center">
          {viewAllHref ? (
            <Link 
              href={viewAllHref}
              className={`font-bold text-xs sm:text-sm flex items-center gap-1 transition-colors whitespace-nowrap pb-0.5 ${viewAllHoverColor}`}
              style={{ color: viewAllColor }}
            >
              {viewAllText}
              {viewAllIcon || <ChevronDown size={16} strokeWidth={2.5} />}
            </Link>
          ) : onViewAllClick ? (
            <button
              onClick={onViewAllClick}
              className={`font-bold text-xs sm:text-sm flex items-center gap-1 transition-colors whitespace-nowrap pb-0.5 ${viewAllHoverColor}`}
              style={{ color: viewAllColor }}
            >
              {viewAllText}
              {viewAllIcon || <ChevronDown size={16} strokeWidth={2.5} />}
            </button>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
};

export default SectionTitle;
