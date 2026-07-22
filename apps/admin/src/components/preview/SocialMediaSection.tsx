import React from 'react';
import SectionContainer from './SectionContainer';
import Image from 'next/image';

const SocialMediaSection = () => {
  const cards = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1548625361-ecce8760924e?auto=format&fit=crop&w=600&q=80',
      title: 'Ajman Sets Guinness Record With 603-Vehicle Eid Al Etihad Formation',
      description: 'The recent spelling event showcased precise coordination led by Ajman Transportation Authority, Ajman Holding, and Ruya. Guinness judges praised the logistical execution, awarding certificates to organizers for highlighting UAE pride during Eid Al Etihad celebrations.',
      dateText: '10 Dec 2024 | National / Government | Culture / Heritage | UAE National Day',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
      title: 'UAE Commits $1 Billion to Strengthen Yemen\'s Energy and Electricity Sector',
      description: 'Officials said the initiative reflects continued support for Yemen\'s development and stability. Yemen leaders praised UAE efforts to improve daily life and accelerate investment in clean, reliable energy systems.',
      dateText: '10 Dec 2024 | Development Aid | Regional Support | UAE Foreign Policy',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1582650893043-4e4b518bb1fb?auto=format&fit=crop&w=600&q=80',
      title: 'UAE President names seven Abu Dhabi mosques after emirates for National Day',
      description: 'The mosques, opening in January with capacity for 6,000 worshippers, were developed by the Presidential Court and key government entities. Officials say the initiative promotes Union values, blending Islamic art with modern design and strengthening community spirit during National Day celebrations.',
      dateText: '10 Dec 2024 | National / Government | Culture / Heritage | UAE National Day',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
      title: 'UAE and Kazakhstan Expand Strategic Cooperation on AI, Space and Energy Sectors',
      description: 'Officials highlighted deepening ties and robust non-oil trade exceeding $3.6 billion in 2024. Discussions included new partnerships, SME engagement, and follow-up on projects supporting sustainable economic growth and technological innovation.',
      dateText: '10 Dec 2024 | Diplomacy | International Cooperation | AI & Technology',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
      title: 'UAE and Kazakhstan Expand Strategic Cooperation on AI, Space and Energy Sectors',
      description: 'Officials highlighted deepening ties and robust non-oil trade exceeding $3.6 billion in 2024. Discussions included new partnerships, SME engagement, and follow-up on projects supporting sustainable economic growth and technological innovation.',
      dateText: '10 Dec 2024 | Diplomacy | International Cooperation | AI & Technology',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
      title: 'UAE and Kazakhstan Expand Strategic Cooperation on AI, Space and Energy Sectors',
      description: 'Officials highlighted deepening ties and robust non-oil trade exceeding $3.6 billion in 2024. Discussions included new partnerships, SME engagement, and follow-up on projects supporting sustainable economic growth and technological innovation.',
      dateText: '10 Dec 2024 | Diplomacy | International Cooperation | AI & Technology',
    }
  ];

  return (
    <SectionContainer className="bg-white py-8 md:py-12">
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center w-full border-b-[1.5px] border-gray-300 pb-2">
          <h2 className="text-2xl md:text-[28px] font-bold text-[#FF0202] relative pb-2 -mb-[10px] border-b-[3px] border-[#FF0202]">
            Social Media
          </h2>
        </div>

        {/* Cards Slider */}
        <div className="w-full overflow-hidden mt-4 relative">
          <style>{`
            @keyframes infinite-slider {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-infinite-slider {
              animation: infinite-slider 40s linear infinite;
            }
            .animate-infinite-slider:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="flex gap-6 w-max animate-infinite-slider">
            {[...cards, ...cards].map((card, index) => (
              <div key={`${index}-${card.id}`} className="w-[280px] md:w-[320px] lg:w-[350px] shrink-0 flex flex-col rounded-[20px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.15)] group cursor-pointer bg-black h-auto">

                {/* Gradient Top Part */}
                <div className="bg-gradient-to-b from-[#0a1b4d] to-[#020514] flex flex-col flex-1 p-3 pb-6">

                  {/* Image and Banner Wrapper */}
                  <div className="flex flex-col w-full rounded-t-xl rounded-b-md overflow-hidden">
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] bg-gray-200">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Top Left Tag */}
                      <div className="absolute top-0 left-0 bg-[#FF0202] text-white text-[9px] font-bold px-2.5 py-1 z-10">
                        NEWS
                      </div>

                      {/* Top Right Tag */}
                      <div className="absolute top-0 right-0 bg-[#000a2d]/90 backdrop-blur-sm px-2 py-1 flex flex-col items-center z-10">
                        <span className="text-white text-[8px] font-bold leading-none tracking-wide">BUSINESS</span>
                        <span className="text-[#FF0202] text-[8px] font-bold leading-none mt-0.5 tracking-wide">FIRST</span>
                      </div>
                    </div>

                    {/* Red Date Banner */}
                    <div className="w-full bg-[#FF0202] py-1.5 px-2 text-center flex items-center justify-center min-h-[24px]">
                      <span className="text-white text-[7.5px] uppercase font-bold tracking-[0.05em] leading-tight line-clamp-1">
                        {card.dateText}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-2 mt-4 items-center text-center px-2">
                    <h3 className="text-white font-bold text-[13px] md:text-[14px] leading-snug group-hover:text-[#FF0202] transition-colors line-clamp-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-300/80 text-[9px] md:text-[10px] leading-[1.6] line-clamp-4 mt-1">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Black Area */}
                <div className="bg-black p-4 text-[#a3a3a3] text-[12px] md:text-[13px] leading-snug border-t border-gray-800/50">
                  ipsum dolor sit amet, elit adipiscing. Nunc vulputate libero velit interdum, acaliquet
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionContainer>
  );
};

export default SocialMediaSection;
