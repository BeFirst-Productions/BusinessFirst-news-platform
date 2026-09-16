import React from 'react';

const AboutEditorial = () => {
  return (
    <div className="w-full lg:flex-1 flex flex-col gap-6">
      
      {/* Title with matching site style (red title + gray divider) */}
      <div className="flex items-center w-full gap-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FF0202]">
          About Us
        </h1>
        <div className="h-[2px] flex-1 bg-gray-300"></div>
      </div>

      {/* Tagline */}
      <p className="text-lg md:text-xl font-bold text-[#24214c] font-newsreader">
        Business First — News That Means Business.
      </p>

      {/* Featured Quote */}
      <div className="p-6 rounded-2xl bg-[#f8f9fb] border-l-4 border-[#FF0202] border border-gray-200/80 shadow-2xs">
        <blockquote className="text-base sm:text-lg md:text-xl font-medium text-gray-800 italic leading-relaxed font-newsreader">
          &ldquo;Business First was created with a simple belief: business news should do more than report events. It should help people understand what is changing, why it matters and where the next opportunities may emerge.&rdquo;
        </blockquote>
      </div>

      {/* Main Narrative Paragraphs */}
      <div className="space-y-5 text-gray-700 text-sm md:text-base leading-relaxed font-normal">
        <p>
          In a market as fast-moving and ambitious as the UAE, where new companies are being built, investments are flowing into new sectors and government initiatives are continuously reshaping the business environment, access to clear, relevant and credible information has become more important than ever.
        </p>

        <p>
          That need became the foundation for <strong>Business First</strong>. We are a UAE-focused business news and media platform built to bring greater clarity to the country’s evolving business landscape. Our coverage spans government policy, investment, finance, real estate, technology, startups, entrepreneurship, corporate developments and leadership, with a focus on helping entrepreneurs, executives, investors, professionals and decision-makers quickly understand the stories that matter to them.
        </p>

        {/* Section: A Platform to Be Seen, Heard and Understood */}
        <div className="pt-2">
          <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
            A Platform to Be Seen, Heard and Understood
          </h2>
          <p>
            But Business First was never intended to be just another news website. It was also built to give businesses, founders and industry leaders a stronger platform to be seen, heard and understood. Across the UAE, there are thousands of companies and entrepreneurs creating jobs, introducing new ideas, entering new markets and contributing to economic growth, yet many of their stories remain underrepresented. Business First aims to bring those stories forward by creating space for business features, sponsored news, expert opinions, thought leadership, interviews, PR, video content, event coverage and strategic media partnerships.
          </p>
        </div>

        {/* Section: Commitment to Clarity, Credibility and Relevance */}
        <div className="pt-2">
          <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
            At the Heart: Clarity, Credibility and Relevance
          </h2>
          <p>
            At the heart of the platform is a commitment to clarity, credibility and relevance. We believe business journalism should make complex developments easier to understand without losing their significance. It should give readers context, not just headlines, and help them see how changes in policy, investment, technology or industry may affect businesses, markets and future opportunities. At the same time, we believe credible companies and professionals should have access to meaningful media visibility that helps them build authority, trust and stronger connections within the business community.
          </p>
        </div>

        {/* Section: Supporting UAE's Momentum */}
        <div className="pt-2">
          <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
            Supporting the UAE’s Economic Momentum
          </h2>
          <p>
            The UAE has established itself as one of the world’s most forward-looking destinations for business, entrepreneurship, investment and innovation. Business First aims to support that momentum by helping create a more informed and connected business ecosystem. By highlighting emerging opportunities, sharing the perspectives of experienced leaders, giving growing companies greater visibility and keeping readers informed about the developments shaping the market, we hope to contribute to the wider conversation around the UAE’s economic progress.
          </p>
        </div>

        {/* Section: Connecting Information with Opportunity */}
        <div className="pt-2">
          <h2 className="text-xl md:text-2xl font-bold text-[#24214c] font-newsreader mb-3">
            Connecting Information with Opportunity
          </h2>
          <p>
            Business First is ultimately about connecting information with opportunity. It is a platform for the people building businesses, leading organisations, investing in new ideas and shaping the future of the UAE economy. Our purpose is to make important business information easier to access, credible voices easier to discover and meaningful opportunities easier to understand.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#24214c]/5 border border-[#24214c]/10 text-[#24214c] font-semibold text-center mt-6">
          <span className="font-newsreader text-lg">Business First — News That Means Business.</span>
        </div>
      </div>

    </div>
  );
};

export default AboutEditorial;
