"use client";

import React, { useState } from 'react';
import { 
  Check, 
  Send, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Compass, 
  Users, 
  Calendar, 
  Infinity as InfinityIcon,
  Layout,
  Share2,
  Newspaper,
  FileText,
  Megaphone,
  UserCheck,
  Lightbulb,
  Video,
  Mic,
  Mail,
  Award
} from 'lucide-react';
import { useContactForm } from '@/hooks/use-contact';

const storyMoments = [
  'A New Market Entry',
  'A Product Launch',
  'An Expansion',
  'A Major Appointment',
  'A Funding Round',
  'A New Development',
  'An Industry Perspective',
  "A Founder's Journey",
  'An Event & Summit',
  'A Corporate Milestone',
  'An Industry-Changing Idea'
];

const mediaSolutions = [
  { title: 'Website Banner Advertising', category: 'Digital Display', icon: Layout },
  { title: 'Social Media Placements', category: 'Social Channels', icon: Share2 },
  { title: 'Sponsored Business News', category: 'Editorial & PR', icon: Newspaper },
  { title: 'Featured Brand Stories', category: 'Editorial & PR', icon: FileText },
  { title: 'PR & Corporate Announcements', category: 'Corporate News', icon: Megaphone },
  { title: 'Executive & Founder Interviews', category: 'Leadership', icon: UserCheck },
  { title: 'Thought Leadership & Op-Eds', category: 'Leadership', icon: Lightbulb },
  { title: 'Video Production & Studio Interviews', category: 'Multimedia', icon: Video },
  { title: 'Podcast Sponsorships', category: 'Multimedia', icon: Mic },
  { title: 'Newsletter Advertising', category: 'Direct Outreach', icon: Mail },
  { title: 'Event Promotion & On-Ground Media', category: 'Events & Summits', icon: Calendar },
  { title: 'Annual Strategic Media Partnerships', category: 'Strategic Alliances', icon: Award }
];

const campaignObjectives = [
  'General Proposal / Inquiry',
  'Brand Awareness & Digital Display',
  'UAE Market Entry Campaign',
  'Founder / CEO Thought Leadership',
  'Sponsored Business News & PR Announcement',
  'Real Estate & Development Spotlight',
  'Conference / Event Media Partnership',
  'Annual Category Sponsorship'
];

const AdvertiseEditorial = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    objective: campaignObjectives[0],
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const contactMutation = useContactForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.company.trim()) errs.company = 'Company name is required.';
    if (!formData.message.trim()) errs.message = 'Please provide details of your campaign.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `[Advertising Proposal] ${formData.company} - ${formData.objective}`;
    const formattedMessage = `Campaign Objective: ${formData.objective}\n` +
      `Company: ${formData.company}\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone/WhatsApp: ${formData.phone || 'N/A'}\n\n` +
      `Campaign Requirements:\n${formData.message}`;

    contactMutation.mutate(
      {
        name: formData.name,
        email: formData.email,
        subject,
        message: formattedMessage
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        }
      }
    );
  };

  return (
    <div className="w-full lg:flex-1 flex flex-col gap-6">
      
      {/* Title with matching site style (red title + gray divider) */}
      <div className="flex items-center w-full gap-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
          Advertise With Business First
        </h1>
        <div className="h-[2px] flex-1 bg-gray-300"></div>
      </div>

      {/* Tagline */}
      <p className="text-lg md:text-xl font-bold text-[#24214c] font-newsreader">
        Put Your Business Where Business Is.
      </p>

      {/* Core Pullquote */}
      <div className="p-6 rounded-2xl bg-[#f8f9fb] border-l-4 border-[#FF0202] border border-gray-200/80 shadow-2xs">
        <blockquote className="text-base sm:text-lg md:text-xl font-medium text-gray-800 italic leading-relaxed font-newsreader">
          &ldquo;Your brand does not need to be seen by everyone. It needs to be seen by the right people.&rdquo;
        </blockquote>
      </div>

      {/* Intro Narrative */}
      <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed font-normal">
        <p>
          <strong>Business First</strong> connects brands, businesses, founders and organisations with a business-focused audience across the UAE. Our readers come to us to understand the companies, investments, ideas, leaders and opportunities shaping one of the world’s most dynamic business environments.
        </p>
        <p>
          For advertisers, that creates something more valuable than visibility alone: <span className="font-semibold text-gray-900 underline decoration-[#FF0202] underline-offset-4">relevance</span>.
        </p>
        <p>
          Whether you are launching a company, entering the UAE market, introducing a new product, promoting a development, building the profile of a founder or CEO, announcing a major milestone or simply looking to strengthen your brand presence, Business First provides media solutions designed to put your story in front of people who matter to your business.
        </p>
        <p>
          We work with startups, SMEs, established companies, corporate organisations, real estate developers and brokerages, financial and professional service firms, technology companies, business consultancies, event organisers and international brands looking to build their presence in the UAE.
        </p>
        <p>
          Our advertising approach goes beyond placing a logo on a page. We help businesses become <strong>seen</strong>, <strong>understood</strong> and <strong>remembered</strong>.
        </p>
        <p>
          Through website advertising, social media placements, sponsored business news, PR features, thought leadership, expert opinions, executive interviews, founder stories, video production, event coverage, newsletters, podcasts and strategic media partnerships, brands can choose the format that best supports their objectives.
        </p>
      </div>

      {/* Section: Turn Your Business Story Into Visibility */}
      <div className="pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
          Turn Your Business Story Into Visibility
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Every business has something worth communicating. Business First helps transform these moments into credible business communication. Instead of relying only on conventional advertisements, brands can become part of relevant business conversations through professionally presented sponsored news, interviews, expert commentary and thought leadership. This allows businesses to communicate not only what they sell, but also what they know, what they stand for and why the market should pay attention.
        </p>

        {/* Moments pills */}
        <div className="flex flex-wrap gap-2 pt-1 mb-2">
          {storyMoments.map((moment, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f8f9fb] border border-gray-200 text-xs font-semibold text-gray-800"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0202]" />
              {moment}
            </span>
          ))}
        </div>
      </div>

      {/* Section: Build More Than Awareness. Build Authority. */}
      <div className="pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
          Build More Than Awareness. Build Authority.
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          People may notice an advertisement. They remember a credible story.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          For founders, executives and organisations looking to establish authority, Business First provides opportunities to share expertise and perspectives on the issues shaping their industries. Through executive interviews, expert opinions, leadership features, contributed insights, video conversations and thought-leadership articles, we help position credible voices alongside the business topics their audiences care about.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-[#f8f9fb] border border-gray-200 text-xs sm:text-sm">
          <div>
            <strong className="text-[#24214c] block mb-1">For Growing Businesses:</strong>
            <span className="text-gray-600">Supports widespread brand recognition and commercial trust.</span>
          </div>
          <div>
            <strong className="text-[#24214c] block mb-1">For Established Corporates:</strong>
            <span className="text-gray-600">Strengthens market leadership and corporate stature.</span>
          </div>
          <div>
            <strong className="text-[#24214c] block mb-1">For Founders & Leaders:</strong>
            <span className="text-gray-600">Builds lasting professional authority and executive visibility.</span>
          </div>
        </div>
      </div>

      {/* Section: Reach a Business-Focused Audience */}
      <div className="pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
          Reach a Business-Focused Audience
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Business First is built for people who mean business. Our content is designed for entrepreneurs, founders, business owners, C-suite executives, management professionals, investors, decision-makers, industry leaders and companies exploring opportunities across the UAE.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          This focus gives advertisers an environment where commercial messages can sit alongside relevant business information rather than competing for attention in a general-interest media space. It means your brand can appear where people are already thinking about business, investment, growth and opportunity.
        </p>
      </div>

      {/* Section: Advertising & Media Solutions Formats */}
      <div className="pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
          Advertising & Media Solutions
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5">
          Business First offers flexible solutions that can be used individually or combined into integrated campaigns. From an entrepreneur announcing a new venture to an international organisation entering the UAE, campaigns can be structured around your objective, audience, budget and desired level of visibility.
        </p>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {mediaSolutions.map((sol, idx) => {
            const IconComponent = sol.icon;
            return (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-[#f8f9fb] border border-gray-200/90 flex items-center gap-3 hover:border-[#24214c] transition"
              >
                <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-[#24214c] shrink-0">
                  <IconComponent size={16} />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-[#24214c] block leading-snug">
                    {sol.title}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {sol.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: Campaigns Built Around Your Objective (4 pathways) */}
      <div className="pt-6 space-y-5">
        <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader">
          Campaigns Built Around Your Objective
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          There is no single advertising package that works for every business. A startup looking for its first wave of awareness has different requirements from a multinational entering the UAE. A real estate developer launching a project has different objectives from a CEO building thought leadership.
        </p>

        {/* Pathway 1 */}
        <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
          <h3 className="text-base font-bold text-[#24214c] flex items-center gap-2 mb-1.5">
            <Compass size={18} className="text-[#FF0202]" />
            For Businesses Entering the UAE
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Entering a new market requires more than establishing an office or launching a product. Businesses also need to build recognition, credibility and local relevance. Business First provides market-entry visibility solutions combining announcements, corporate profiles, leadership interviews, social distribution, video content, web banners, and newsletter features. <em>Your first impression in a new market matters. We help make it count.</em>
          </p>
        </div>

        {/* Pathway 2 */}
        <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
          <h3 className="text-base font-bold text-[#24214c] flex items-center gap-2 mb-1.5">
            <Users size={18} className="text-[#FF0202]" />
            For Founders & Business Leaders
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Sometimes the strongest brand behind a company is the person leading it. Business First provides founders, CEOs, executives and industry experts with a professional platform to communicate their experience, ideas and perspectives through founder journeys, leadership interviews, and expert commentary. <em>We don't just introduce the company. We introduce the thinking behind it.</em>
          </p>
        </div>

        {/* Pathway 3 */}
        <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
          <h3 className="text-base font-bold text-[#24214c] flex items-center gap-2 mb-1.5">
            <Calendar size={18} className="text-[#FF0202]" />
            For Events & Industry Platforms
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Great events deserve an audience before they happen and visibility after they end. We work with conferences, exhibitions, corporate events, and industry summits through event promotion, pre-event previews, speaker interviews, live on-ground reporting, and post-event coverage to extend value far beyond the venue.
          </p>
        </div>

        {/* Pathway 4 */}
        <div className="p-5 rounded-2xl bg-[#f8f9fb] border border-gray-200">
          <h3 className="text-base font-bold text-[#24214c] flex items-center gap-2 mb-1.5">
            <InfinityIcon size={18} className="text-[#FF0202]" />
            For Long-Term Brand Building
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            The strongest brands are rarely built through one advertisement. For continuous visibility, we offer monthly editorial campaigns, category sponsorships, corporate authority programmes, and annual media partnerships to maintain a continuous, authoritative presence throughout the year.
          </p>
        </div>
      </div>

      {/* Section: Credibility Matters */}
      <div className="pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
          Credibility Matters
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
          Business First believes advertising works best when audiences can clearly understand what is journalism and what is commercial communication. Sponsored and paid content is appropriately identified, while independent editorial coverage remains subject to our editorial standards and discretion.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          That distinction protects the credibility of our platform — and ultimately makes the environment more valuable for the businesses that advertise with us.
        </p>
      </div>

      {/* Section: Your Business Deserves to Be Seen */}
      <div className="pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
          Your Business Deserves to Be Seen.
        </h2>
        <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
          <p>
            Somewhere today, a potential customer is looking for a solution. An investor is looking for an opportunity. A company is looking for a partner. A professional is discovering a new brand. A decision-maker is reading about the next development in their industry.
          </p>
          <p className="font-semibold text-[#24214c] italic">
            The question is whether your business will be part of that conversation.
          </p>
          <p>
            Put your brand in front of a business-focused audience. Tell your story with credibility. Build visibility where opportunities are being created.
          </p>
          <p className="font-bold text-[#FF0202]">
            Advertise with Business First. Be Seen. Be Heard. Be First.
          </p>
        </div>
      </div>

      {/* Integrated Request a Proposal Form (matching ContactForm styling) */}
      <div id="proposal-form" className="mt-8 bg-[#f8f9fa] rounded-[24px] p-6 md:p-10 border border-gray-200 scroll-mt-12">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF0202]">
              Request a Proposal
            </span>
            <span className="text-xs text-gray-500">Fast 24h Response</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader">
            Start Your Campaign with Business First
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Fill out the form below and our advertising team will get in touch with customized packages and rate options.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center gap-4 bg-white rounded-2xl border border-gray-100">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-xl font-bold text-[#24214c]">Proposal Request Received</h4>
            <p className="text-sm text-gray-600 max-w-md">
              Thank you for reaching out. Our commercial team will review your requirements and respond within 24 business hours.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-2 px-6 py-2.5 bg-[#24214c] hover:bg-[#1a1738] text-white text-xs sm:text-sm font-semibold rounded-xl transition"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#24214c] font-bold text-xs sm:text-sm">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                  className={`bg-white text-[#24214c] text-sm border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 placeholder:text-gray-400 ${
                    errors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-200 focus:ring-[#FF0202]/50'
                  }`}
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#24214c] font-bold text-xs sm:text-sm">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sarah@company.com"
                  className={`bg-white text-[#24214c] text-sm border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 placeholder:text-gray-400 ${
                    errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-200 focus:ring-[#FF0202]/50'
                  }`}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#24214c] font-bold text-xs sm:text-sm">
                  Company / Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Apex Global UAE"
                  className={`bg-white text-[#24214c] text-sm border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 placeholder:text-gray-400 ${
                    errors.company ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-200 focus:ring-[#FF0202]/50'
                  }`}
                />
                {errors.company && <span className="text-red-500 text-xs">{errors.company}</span>}
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#24214c] font-bold text-xs sm:text-sm">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+971 50 123 4567"
                  className="bg-white text-[#24214c] text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0202]/50 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Campaign Objective */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#24214c] font-bold text-xs sm:text-sm">
                Primary Objective / Format Interest
              </label>
              <select
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                className="bg-white text-[#24214c] text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0202]/50"
              >
                {campaignObjectives.map((obj, idx) => (
                  <option key={idx} value={obj}>
                    {obj}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#24214c] font-bold text-xs sm:text-sm">
                Campaign Brief / Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your goals, target launch timeline, approximate budget or specific formats of interest..."
                className={`bg-white text-[#24214c] text-sm border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 placeholder:text-gray-400 ${
                  errors.message ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-200 focus:ring-[#FF0202]/50'
                }`}
              />
              {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={contactMutation.isPending}
              className="mt-2 bg-[#24214c] hover:bg-[#1a1738] text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {contactMutation.isPending ? 'Sending Request...' : 'Submit Proposal Request'}
              {!contactMutation.isPending && <ArrowUpRight size={18} strokeWidth={2.5} />}
            </button>
          </form>
        )}
      </div>

    </div>
  );
};

export default AdvertiseEditorial;
