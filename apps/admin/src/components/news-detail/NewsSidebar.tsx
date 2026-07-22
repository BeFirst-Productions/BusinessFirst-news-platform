import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RecentPost {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
}

const recentPosts: RecentPost[] = [
  {
    id: 1,
    title: 'Yorem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero vel',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 2,
    title: 'Yorem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero vel',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1574328405096-7fcfa4a9b583?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 3,
    title: 'Yorem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero vel',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 4,
    title: 'Yorem ipsum dolor sit amet, adipiscing elit. Nunc vulputate libero vel',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

const NewsSidebar = () => {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-8 w-full">
      {/* Recent Posts Section */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
        <div className="bg-[#FF0202] text-white text-center py-3.5 font-bold text-sm tracking-wider uppercase">
          Recent Posts
        </div>
        
        <div className="flex flex-col divide-y divide-gray-100">
          {recentPosts.map((post) => (
            <Link
              href="#"
              key={post.id}
              className="flex gap-4 p-4 hover:bg-gray-50 transition-all duration-300 group"
            >
              <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h4 className="text-[#24214c] font-bold text-xs leading-snug line-clamp-2 group-hover:text-[#FF0202] transition-colors">
                  {post.title}
                </h4>
                <span className="text-[10px] text-amber-500 font-bold mt-1 uppercase tracking-wide">
                  {post.category} | {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Square Ad Banner (Burger mock ad) */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-900 group cursor-pointer">
        <Image
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&h=500&q=80"
          alt="Burger Sidebar Ad"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Styled overlay ad text */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white flex flex-col gap-1">
          <span className="text-amber-400 font-extrabold text-xs tracking-widest uppercase">Special Deal</span>
          <h4 className="font-extrabold text-base leading-tight">Crispy Double Beef Burger</h4>
          <p className="text-white/70 text-xs mt-1 font-medium">Order now for free home delivery inside Dubai</p>
        </div>
      </div>
    </aside>
  );
};

export default NewsSidebar;
