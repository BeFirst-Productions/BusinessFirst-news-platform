export const SECTION_MAPPINGS: Record<string, string[]> = {
  'Region': ['UAE News', 'MENA', 'Economy & Policy', 'International'],
  'Key Sectors': [
    'Oil, Gas & Energy',
    'Real Estate & Construction',
    'Technology & Innovation',
    'Logistics & Trade',
    'Banking & Finance'
  ],
  'Other Sectors': [
    'Education & Training',
    'Aviation & Aerospace',
    'Manufacturing & Industrial',
    'Sustainability & CSR'
  ],
  'Lifestyle': [
    'Media & Entertainment',
    'Tourism & Hospitality',
    'Retail & E-commerce',
    'Healthcare & Pharma',
    'Sports & Recreation',
    'Lifestyle & Culture'
  ],
  'Exclusive Segments': [
    'Featured Analysis',
    'Sponsored Contents',
    'Daily Insights',
    'Business & Corporate',
    'Events',
  ]
};

export const normalizeWords = (str: string) =>
  str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0 && w !== 'and')
    .sort()
    .join(' ');

export const CATEGORY_ALIASES: Record<string, string[]> = {
  'culture & lifestyle': ['lifestyle & culture', 'lifestyle-culture', 'culture-lifestyle', 'lifestyle', 'culture'],
  'lifestyle & culture': ['culture & lifestyle', 'lifestyle-culture', 'culture-lifestyle', 'lifestyle', 'culture'],
  'media & entertainment': ['media and entertainment', 'media-entertainment', 'media', 'entertainment', 'media coverage'],
  'media and entertainment': ['media & entertainment', 'media-entertainment', 'media', 'entertainment', 'media coverage'],
  'daily insights': ['insights', 'daily-insights', 'daily insight', 'insight'],
  'insights': ['daily insights', 'daily-insights', 'daily insight', 'insight'],
  'events': ['events & coverage', 'events-coverage', 'events and coverage', 'event'],
  'events & coverage': ['events', 'events-coverage', 'events and coverage', 'event'],
  'economy & policy': ['economy and policy', 'economy-policy', 'economy', 'policy'],
  'economy and policy': ['economy & policy', 'economy-policy', 'economy', 'policy'],
  'real estate & construction': ['real estate and construction', 'real estate', 'construction', 'real-estate-construction'],
  'real estate and construction': ['real estate & construction', 'real estate', 'construction', 'real-estate-construction'],
  'technology & innovation': ['technology and innovation', 'tech', 'technology', 'innovation', 'technology-innovation'],
  'technology and innovation': ['technology & innovation', 'tech', 'technology', 'innovation', 'technology-innovation'],
  'logistics & trade': ['logistics and trade', 'logistics', 'trade', 'logistics-trade'],
  'logistics and trade': ['logistics & trade', 'logistics', 'trade', 'logistics-trade'],
  'aviation & aerospace': ['aviation and aerospace', 'aviation', 'aerospace', 'aviation-aerospace'],
  'aviation and aerospace': ['aviation & aerospace', 'aviation', 'aerospace', 'aviation-aerospace'],
  'banking & finance': ['banking and finance', 'banking', 'finance', 'banking-finance'],
  'banking and finance': ['banking & finance', 'banking', 'finance', 'banking-finance'],
  'oil, gas & energy': ['oil and gas', 'oil & gas', 'energy', 'oil-gas-energy', 'oil', 'gas'],
  'oil & gas': ['oil, gas & energy', 'oil and gas', 'energy', 'oil-gas-energy', 'oil', 'gas'],
  'healthcare & pharma': ['healthcare and pharma', 'healthcare', 'pharma', 'health', 'healthcare-pharma'],
  'healthcare and pharma': ['healthcare & pharma', 'healthcare', 'pharma', 'health', 'healthcare-pharma'],
  'tourism & hospitality': ['tourism and hospitality', 'tourism', 'hospitality', 'tourism-hospitality'],
  'tourism and hospitality': ['tourism & hospitality', 'tourism', 'hospitality', 'tourism-hospitality'],
  'sports & recreation': ['sports and recreation', 'sports', 'recreation', 'sports-recreation'],
  'sports and recreation': ['sports & recreation', 'sports', 'recreation', 'sports-recreation'],
  'uae news': ['uae', 'uae-news', 'emirates news', 'emirates'],
  'uae': ['uae news', 'uae-news'],
  'trending news': ['trending', 'trending-news'],
  'trending': ['trending news', 'trending-news'],
  'sponsored contents': ['sponsored', 'sponsored-contents', 'sponsored content'],
  'sponsored': ['sponsored contents', 'sponsored-contents', 'sponsored content'],
  'featured analysis': ['featured', 'featured-analysis'],
  'featured': ['featured analysis', 'featured-analysis'],
};

// Known special categories supported without a direct database category entry
const KNOWN_SPECIAL_CATEGORIES = new Set([
  'latest news',
  'all news',
  'news',
  'uae news',
  'uae',
  'trending news',
  'trending',
  'sponsored contents',
  'sponsored',
  'featured analysis',
  'featured',
  'daily insights',
]);

/**
 * Finds matching category from database category list
 */
export const findCategory = (categories: any[] | undefined, targetName: string) => {
  if (!categories || !targetName) return undefined;
  const target = targetName.toLowerCase().trim();
  const targetSlug = target.replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-');
  const targetNorm = normalizeWords(target);
  const aliases = CATEGORY_ALIASES[target] || [];

  // 1. Exact name or slug match
  const exact = categories.find(
    (c: any) =>
      c.name?.toLowerCase().trim() === target ||
      c.slug?.toLowerCase().trim() === targetSlug ||
      c.slug?.toLowerCase().trim() === target
  );
  if (exact) return exact;

  // 2. Normalized words match
  const normMatch = categories.find(
    (c: any) =>
      normalizeWords(c.name || '') === targetNorm ||
      normalizeWords(c.slug || '') === targetNorm
  );
  if (normMatch) return normMatch;

  // 3. Known aliases match
  const aliasMatch = categories.find((c: any) => {
    const cName = c.name?.toLowerCase().trim();
    const cSlug = c.slug?.toLowerCase().trim();
    return (
      aliases.includes(cName) ||
      aliases.includes(cSlug) ||
      (CATEGORY_ALIASES[cName] &&
        (CATEGORY_ALIASES[cName].includes(target) ||
          CATEGORY_ALIASES[cName].includes(targetSlug)))
    );
  });
  if (aliasMatch) return aliasMatch;

  // 4. Word subset match (only if word count matches closely to avoid false positives)
  const targetWords = targetNorm.split(' ').filter(Boolean);
  const subsetMatch = categories.find((c: any) => {
    const cWords = normalizeWords(c.name || '').split(' ').filter(Boolean);
    if (cWords.length === 0 || targetWords.length === 0) return false;
    if (Math.abs(cWords.length - targetWords.length) > 1) return false;
    return (
      cWords.every((w) => targetWords.includes(w)) ||
      targetWords.every((w) => cWords.includes(w))
    );
  });
  if (subsetMatch) return subsetMatch;

  return undefined;
};

/**
 * Checks if a requested category parameter is valid.
 */
export const isCategoryValid = (
  rawCategory: string | null | undefined,
  categories: any[] | undefined
): boolean => {
  if (!rawCategory) return true;
  const trimmed = rawCategory.trim();
  if (!trimmed) return true;

  const lower = trimmed.toLowerCase();

  // 1. Check known special categories
  if (KNOWN_SPECIAL_CATEGORIES.has(lower)) {
    return true;
  }

  // 2. Check if it matches any Section heading in SECTION_MAPPINGS
  const isSectionHeader = Object.keys(SECTION_MAPPINGS).some(
    (section) => section.toLowerCase() === lower
  );
  if (isSectionHeader) {
    return true;
  }

  // 3. Check if it matches any Section sub-item in SECTION_MAPPINGS
  const allSectionItems = Object.values(SECTION_MAPPINGS).flat();
  const isSectionItem = allSectionItems.some((item) => {
    const itemLower = item.toLowerCase();
    if (itemLower === lower) return true;
    if (normalizeWords(item) === normalizeWords(trimmed)) return true;
    const itemAliases = CATEGORY_ALIASES[itemLower] || [];
    return itemAliases.includes(lower);
  });
  if (isSectionItem) {
    return true;
  }

  // 4. Check against database categories
  if (categories && categories.length > 0) {
    const matched = findCategory(categories, trimmed);
    if (matched) {
      return true;
    }
  }

  // If not matched by any valid category, section, or special category
  return false;
};
