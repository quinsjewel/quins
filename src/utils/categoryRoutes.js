// Mapping helper for Category paths and route slugs

export const ROUTE_CATEGORY_MAP = {
  '/bridal': 'Bridal Collection',
  '/anti-tarnish': 'Anti-Tarnish',
  '/temple-jewellery': 'Temple Jewellery',
  '/traditional': 'Traditional Jewels',
  '/bangles': 'Bangles',
  '/earrings': 'Earrings'
};

export const CATEGORY_ROUTE_MAP = {
  'bridal collection': '/bridal',
  'anti-tarnish': '/anti-tarnish',
  'temple jewellery': '/temple-jewellery',
  'traditional jewels': '/traditional',
  'bangles': '/bangles',
  'earrings': '/earrings'
};

// Convert string to URL-friendly kebab-case slug
export const slugify = (text) => {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
};

// Get the dedicated or dynamic route for any category
export const getCategoryPath = (categoryName) => {
  if (!categoryName) return '/';
  const lower = categoryName.toLowerCase().trim();
  if (CATEGORY_ROUTE_MAP[lower]) {
    return CATEGORY_ROUTE_MAP[lower];
  }
  return `/category/${slugify(categoryName)}`;
};

// Resolve category name from a slug
export const resolveCategoryFromSlug = (slug, allCategories = []) => {
  if (!slug) return null;
  const lowerSlug = slug.toLowerCase().trim();

  // 1. Check exact dedicated routes
  if (lowerSlug === 'bridal') return 'Bridal Collection';
  if (lowerSlug === 'anti-tarnish') return 'Anti-Tarnish';
  if (lowerSlug === 'temple-jewellery') return 'Temple Jewellery';
  if (lowerSlug === 'traditional') return 'Traditional Jewels';
  if (lowerSlug === 'bangles') return 'Bangles';
  if (lowerSlug === 'earrings') return 'Earrings';

  // 2. Check dynamic categories by comparing slug
  const matched = allCategories.find((cat) => slugify(cat) === lowerSlug);
  if (matched) return matched;

  // 3. Fallback: un-slugify
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

// Metadata for category hero banners
export const CATEGORY_METADATA = {
  'Bridal Collection': {
    title: 'The Imperial Bridal Vault',
    subtitle: 'Heirloom Masterpieces Handcrafted with 24K Micron Gold Electroplating & Uncut Polki for Royal Weddings.',
    bannerImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80',
    tag: 'Sacred Vows & Regal Heirlooms'
  },
  'Anti-Tarnish': {
    title: 'Lifetime Anti-Tarnish Collection',
    subtitle: '100% Waterproof, Sweatproof, Everyday Gold. Engineered with 18K Real Gold PVD Vacuum Coating.',
    bannerImage: 'https://images.unsplash.com/photo-1611591475819-79b8b1a72645?auto=format&fit=crop&w=1600&q=80',
    tag: 'Showerproof • Perfume-Safe'
  },
  'Temple Jewellery': {
    title: 'Sacred Temple Heirlooms',
    subtitle: 'Replicating Timeless South Indian Chola & Pallava Carvings with Goddess Lakshmi Motifs and Ruby Kemp Stones.',
    bannerImage: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1600&q=80',
    tag: 'Antique Matte Gold Polish'
  },
  'Traditional Jewels': {
    title: 'Traditional Jewels & Jadau Royalty',
    subtitle: 'Mughal & Rajputana Splendor Encrusted with Navratna Gems, Hand-Painted Meenakari & Faux Basra Pearls.',
    bannerImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
    tag: 'Heirloom Heritage Artistry'
  },
  'Bangles': {
    title: 'Imperial Kadas & Bangle Stacks',
    subtitle: 'Screw-Open Temple Bangles, Pacheli Kadas & Waterproof 18K Zircon Stacks Designed for Royal Wrists.',
    bannerImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80',
    tag: 'Free Size • Screw-Lock Kadas'
  },
  'Earrings': {
    title: 'Chandbalis, Jhumkas & Regal Studs',
    subtitle: 'Statement Jhumkas with Detachable Saharas, Push-Back Temple Studs & Hypoallergenic Daily Mini Hoops.',
    bannerImage: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1600&q=80',
    tag: 'Weight-Balanced Elegance'
  }
};
