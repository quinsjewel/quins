// Initial Mock Data for QUINS Royal Imitation Jewellery

export const INITIAL_CATEGORIES = [
  "Bridal Collection",
  "Anti-Tarnish",
  "Temple Jewellery",
  "Traditional Jewels",
  "Bangles",
  "Earrings"
];

export const INITIAL_SETTINGS = {
  brandName: "QUINS",
  brandSubtitle: "Curated Premium Jewelry Collection",
  logoUrl: "/quins-logo.png",
  whatsappNumber: "919876543210", // Target WhatsApp phone number with country code
  whatsappMessageTemplate: `Hello Queens! I am interested in purchasing/inquiring about this product:\n- Product Name: {product_name}\n- Price: {price}\n- Product Code/ID: {sku}\n- Link: {url}\nCould you please share details and availability?`,
  enableOnlineCheckout: true,
  paymentMode: "both", // 'both' | 'upi' | 'razorpay'
  razorpayKeyId: "rzp_test_QuinsRoyalJewels",
  razorpayKeySecret: "secret_sample_key_123",
  upiMerchantVpa: "quinsjewels@okhdfcbank",
  upiMerchantName: "QUINS Royal Jewels",
  currencySymbol: "₹",
  adminPasswordHash: "quins2026", // Default master password
  shippingThreshold: 1499,
  announcementText: "✨ FESTIVE ROYAL SALE: Flat 20% OFF on Temple & Bridal Collections | Free Royal Velvet Box on Orders Above ₹1,999 | 100% Anti-Tarnish Finish ✨",
  cloudinaryCloudName: "tb5bmwd5",
  cloudinaryUploadPreset: "quins_preset"
};


export const INITIAL_PRODUCTS = [
  {
    id: "QN-BRD-101",
    name: "Noor-e-Jahan Royal Polki Choker Set with Emeralds",
    category: "Bridal Collection",
    price: 4899,
    originalPrice: 9999,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611591475819-79b8b1a72645?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    youtubeVideos: [
      "https://www.youtube.com/watch?v=36e9r6h39oU",
      "https://www.youtube.com/shorts/5j19s9cE8QY"
    ],
    description: "An imperial heirloom masterpiece inspired by Mughal royalties. Handcrafted with high-grade brass alloy and 24K micron gold electroplating, encrusted with uncut synthetic polki stones, deep emerald green teardrops, and natural river pearls. Includes matching earrings and maang tikka.",
    specs: {
      "Base Material": "High-Grade Brass Alloy",
      "Plating": "24K Micron Gold Plated",
      "Stone Type": "Uncut Polki & Synthetic Emeralds",
      "Anti-Tarnish": "Double E-Coat Protective Lacquer",
      "Package Contents": "1 Choker, 1 Pair Jhumkas, 1 Maang Tikka, Luxury Velvet Box"
    }
  },
  {
    id: "QN-ATN-201",
    name: "Aura Triple-Layer Anti-Tarnish Snake Chain Necklace",
    category: "Anti-Tarnish",
    price: 1499,
    originalPrice: 2999,
    rating: 4.8,
    reviewsCount: 98,
    inStock: true,
    tag: "Anti-Tarnish",
    image: "https://images.unsplash.com/photo-1611591475819-79b8b1a72645?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1611591475819-79b8b1a72645?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    youtubeVideos: [
      "https://www.youtube.com/shorts/5j19s9cE8QY"
    ],
    description: "Modern minimalist royalty. Engineered with medical-grade titanium stainless steel and vacuum PVD 18K gold coating. 100% sweatproof, waterproof, perfume-safe, and guaranteed not to turn your skin green or lose brilliance for years.",
    specs: {
      "Base Material": "Titanium 316L Stainless Steel",
      "Plating": "18K PVD Vacuum Gold Plating",
      "Finish": "Lifetime Anti-Tarnish & Waterproof",
      "Weight": "18 grams",
      "Package Contents": "1 Layered Chain, Anti-Tarnish Pouch, Care Card"
    }
  },
  {
    id: "QN-TMP-301",
    name: "Goddess Lakshmi Matte Gold Temple Haram & Jhumkas",
    category: "Temple Jewellery",
    price: 3899,
    originalPrice: 7999,
    rating: 5.0,
    reviewsCount: 86,
    inStock: true,
    tag: "Royal Pick",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
    ],
    youtubeVideos: [
      "https://www.youtube.com/watch?v=36e9r6h39oU"
    ],
    description: "Sculpted by master artisans in South India replicating timeless temple carvings. Featuring Goddess Lakshmi seated on a lotus flanked by divine peacocks, adorned with ruby-red cabochon kemp stones and antique matte finish beads.",
    specs: {
      "Base Material": "Copper-Brass Heirloom Alloy",
      "Plating": "Antique Matte Gold Finish",
      "Stone Type": "South Indian Kemp Cabochon Stones",
      "Warranty": "1 Year Polish Guarantee",
      "Package Contents": "1 Long Temple Haram, 1 Pair Heavy Jhumkas"
    }
  },
  {
    id: "QN-BRD-102",
    name: "Maharani Kundan & Emerald Heritage Multi-Layer Set",
    category: "Bridal Collection",
    price: 6499,
    originalPrice: 12999,
    rating: 4.9,
    reviewsCount: 64,
    inStock: false,
    tag: "Sold Out",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    youtubeVideos: [
      "https://www.youtube.com/watch?v=36e9r6h39oU"
    ],
    description: "An extravagant 7-strand bridal necklace crafted with lustrous synthetic pearls, grand kundan medallions, and rich Colombian emerald drops. The epitome of royal bridal opulence.",
    specs: {
      "Base Material": "Pure Brass with Jadau Setting",
      "Plating": "22K Yellow Micron Gold",
      "Stone Type": "Fine Glass Kundan & Synthetic Emeralds",
      "Closure": "Adjustable Hand-Braided Gold Dori",
      "Package Contents": "1 Multi-Layer Haram, 1 Pair Earrings, 1 Matha Patti"
    }
  },
  {
    id: "QN-TRD-401",
    name: "Nawabi Jadau Navratna Royal Choker Necklace",
    category: "Traditional Jewels",
    price: 4199,
    originalPrice: 8499,
    rating: 4.7,
    reviewsCount: 52,
    inStock: true,
    tag: "Heritage",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611591475819-79b8b1a72645?auto=format&fit=crop&w=1000&q=80"
    ],
    youtubeVideos: [
      "https://www.youtube.com/shorts/5j19s9cE8QY"
    ],
    description: "Infused with astrological symbolism and Nawabi elegance. Each medallion holds the 9 planetary stones (Navratna colors) set in authentic Jadau open-back bezel with intricate Meenakari floral engraving on the reverse.",
    specs: {
      "Base Material": "Brass with Meenakari Reverse",
      "Plating": "Antique Royal Gold Plated",
      "Stones": "Multi-colored Navratna Crystal Accents",
      "Warranty": "1 Year Anti-Tarnish Assurance",
      "Package Contents": "1 Choker, 1 Pair Studs"
    }
  },
  {
    id: "QN-BNG-501",
    name: "Kada-e-Shahi Ruby & Emerald Temple Openable Bangles (Pair)",
    category: "Bangles",
    price: 2499,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 110,
    inStock: true,
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1611591475819-79b8b1a72645?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1611591475819-79b8b1a72645?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80"
    ],
    youtubeVideos: [
      "https://www.youtube.com/shorts/5j19s9cE8QY"
    ],
    description: "Heirloom-style openable temple kadas featuring intricately embossed elephant and peacock motifs, crowned with synthetic ruby and emerald stones. Easy screw-open mechanism fits wrist sizes 2.4, 2.6, and 2.8 comfortably.",
    specs: {
      "Base Material": "Heavy Cast Brass Alloy",
      "Plating": "24K Matte Antique Gold Plating",
      "Lock Type": "Side Screw Openable Mechanism",
      "Size": "Free Size (Fits 2.4 to 2.8)",
      "Package Contents": "Pair of 2 Royal Kadas, Gift Box"
    }
  },
  {
    id: "QN-EAR-601",
    name: "Chandbali Shahi Kundan Pearl Jhumkas with Ear Chains",
    category: "Earrings",
    price: 1899,
    originalPrice: 3799,
    rating: 4.9,
    reviewsCount: 175,
    inStock: true,
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
    ],
    youtubeVideos: [
      "https://www.youtube.com/shorts/5j19s9cE8QY"
    ],
    description: "Crescent-shaped Chandbali jhumkas featuring delicate dangling seed pearls and Kundan polki setting. Designed with detachable hair/ear support chains (saharas) to distribute weight effortlessly during festive evenings.",
    specs: {
      "Base Material": "Brass Alloy",
      "Plating": "1-Micron 24K Gold Plated",
      "Stones": "Kundan Polki & Freshwater Faux Pearls",
      "Closure": "Push Back with Comfort Ear Clips",
      "Package Contents": "1 Pair Chandbalis with Detachable Saharas"
    }
  },
  {
    id: "QN-ATN-202",
    name: "Celeste Clover Emerald Anti-Tarnish Pendant Necklace",
    category: "Anti-Tarnish",
    price: 1299,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    tag: "Anti-Tarnish",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611591475819-79b8b1a72645?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
    ],
    youtubeVideos: [
      "https://www.youtube.com/shorts/5j19s9cE8QY"
    ],
    description: "Inspired by high-jewellery Parisian motifs. Features a vibrant double-sided malachite-green four-leaf clover pendant on an anti-tarnish golden box chain. Sweatproof, showerproof, and perfume-resistant.",
    specs: {
      "Base Material": "316L Surgical Grade Stainless Steel",
      "Plating": "18K Real Gold PVD Coating",
      "Pendant Inlay": "Synthetic Malachite Onyx Stone",
      "Chain Length": "40cm + 5cm Extender",
      "Package Contents": "1 Pendant Necklace with Velvet Pouch"
    }
  }
];
