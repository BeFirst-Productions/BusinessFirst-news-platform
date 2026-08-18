import React from 'react';
import Link from 'next/link';
import { getPageSeoProps } from '@/lib/fetchPageSeo';
import { buildMetadata } from '@/components/seo/seo.types';
import SectionContainer from '@/components/SectionContainer';
import ServerSeo from '@/components/seo/ServerSeo';

export async function generateMetadata() {
  const seoProps = await getPageSeoProps(`policy/cookie`);
  return buildMetadata(seoProps);
}

export default function CookiePolicyPage() {
  const title = 'Cookie Policy';
  const subtitle = 'Understand how and why we utilize cookies on our news platform.';

  return (
    <main className="min-h-screen bg-[#f9f9fb] flex flex-col items-center w-full py-12">
      <ServerSeo slug="policy/cookie" />
      <SectionContainer className="bg-transparent py-0">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium mb-8">
          <Link href="/" className="text-gray-500 hover:text-[#cd2027] transition-colors">
            Home
          </Link>
          <span className="text-[#cd2027] font-semibold">&gt;</span>
          <span className="text-[#cd2027] font-semibold">{title}</span>
        </div>

        {/* Policy Document Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-8 md:p-12 shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-100 pb-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#24214c] mb-3 tracking-tight">
              {title}
            </h1>
            <p className="text-gray-500 text-sm md:text-base font-medium">
              {subtitle}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed font-normal">
            <p><strong>Last Updated: August 2026</strong></p>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">1. What Are Cookies?</h2>
            <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the site's functionality.</p>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">3. The Cookies We Set</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.</li>
              <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.</li>
              <li><strong>Email newsletters related cookies:</strong> This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered.</li>
              <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it.</li>
            </ul>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">4. Third-Party Cookies</h2>
            <p>In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.</li>
              <li>We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, social media sites will set cookies through our site.</li>
            </ul>

            <h2 className="text-xl font-bold text-[#24214c] mt-8 mb-4">5. More Information</h2>
            <p>Hopefully, that has clarified things for you. If there is something that you aren't sure whether you need or not, it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
