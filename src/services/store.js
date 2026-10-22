import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'quins_products_v1',
  CATEGORIES: 'quins_categories_v1',
  SETTINGS: 'quins_settings_v1',
  ORDERS: 'quins_orders_v1',
  ADMIN_SESSION: 'quins_admin_authenticated'
};

// Helper to notify all components about store updates
const notifyUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('quins_store_updated'));
  }
};

export const StoreService = {
  // ---- Products ----
  getProducts: () => {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return INITIAL_PRODUCTS;
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      const parsed = JSON.parse(data);
      // Auto-migrate products to ensure images array and youtubeVideos exist
      return parsed.map((p) => {
        const images = Array.isArray(p.images) && p.images.length > 0
          ? p.images
          : [p.image, ...(p.additionalImages || [])].filter(Boolean);
        return {
          ...p,
          images,
          image: images[0] || p.image,
          youtubeVideos: Array.isArray(p.youtubeVideos) ? p.youtubeVideos : []
        };
      });
    } catch (e) {
      console.error('Error reading products from localStorage:', e);
      return INITIAL_PRODUCTS;
    }
  },

  saveProducts: (products) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      notifyUpdate();
    } catch (e) {
      console.error('Error saving products:', e);
    }
  },

  addProduct: (productData) => {
    const products = StoreService.getProducts();
    const images = Array.isArray(productData.images) && productData.images.length > 0
      ? productData.images
      : [productData.image, ...(productData.additionalImages || [])].filter(Boolean);

    const newProduct = {
      ...productData,
      id: productData.id || `QN-${Date.now().toString(36).toUpperCase()}`,
      rating: productData.rating || 5.0,
      reviewsCount: productData.reviewsCount || 1,
      inStock: productData.inStock !== undefined ? productData.inStock : true,
      images,
      image: images[0] || productData.image,
      youtubeVideos: Array.isArray(productData.youtubeVideos) ? productData.youtubeVideos.filter(Boolean) : []
    };
    const updated = [newProduct, ...products];
    StoreService.saveProducts(updated);
    return newProduct;
  },

  updateProduct: (id, updatedFields) => {
    const products = StoreService.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      const merged = { ...products[index], ...updatedFields };
      if (Array.isArray(updatedFields.images) && updatedFields.images.length > 0) {
        merged.image = updatedFields.images[0];
      }
      if (Array.isArray(updatedFields.youtubeVideos)) {
        merged.youtubeVideos = updatedFields.youtubeVideos.filter(Boolean);
      }
      products[index] = merged;
      StoreService.saveProducts(products);
      return products[index];
    }
    return null;
  },

  toggleStockStatus: (id) => {
    const products = StoreService.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index].inStock = !products[index].inStock;
      StoreService.saveProducts(products);
      return products[index];
    }
    return null;
  },

  deleteProduct: (id) => {
    const products = StoreService.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    StoreService.saveProducts(filtered);
    return filtered;
  },

  // ---- Categories ----
  getCategories: () => {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return INITIAL_CATEGORIES;
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading categories:', e);
      return INITIAL_CATEGORIES;
    }
  },

  saveCategories: (categories) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      notifyUpdate();
    } catch (e) {
      console.error('Error saving categories:', e);
    }
  },

  addCategory: (categoryName) => {
    const trimmed = categoryName.trim();
    if (!trimmed) return false;
    const categories = StoreService.getCategories();
    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      return false; // Already exists
    }
    const updated = [...categories, trimmed];
    StoreService.saveCategories(updated);
    return true;
  },

  editCategory: (oldName, newName) => {
    const trimmedNew = newName.trim();
    if (!trimmedNew || oldName === trimmedNew) return false;
    const categories = StoreService.getCategories();
    const index = categories.findIndex((c) => c.toLowerCase() === oldName.toLowerCase());
    if (index === -1) return false;

    categories[index] = trimmedNew;
    StoreService.saveCategories(categories);

    // Also update products with this category
    const products = StoreService.getProducts();
    let productUpdated = false;
    const updatedProducts = products.map((p) => {
      if (p.category.toLowerCase() === oldName.toLowerCase()) {
        productUpdated = true;
        return { ...p, category: trimmedNew };
      }
      return p;
    });
    if (productUpdated) {
      StoreService.saveProducts(updatedProducts);
    }
    return true;
  },

  deleteCategory: (categoryName) => {
    const categories = StoreService.getCategories();
    const updated = categories.filter((c) => c.toLowerCase() !== categoryName.toLowerCase());
    StoreService.saveCategories(updated);
    return true;
  },

  // ---- Settings ----
  getSettings: () => {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return INITIAL_SETTINGS;
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        return INITIAL_SETTINGS;
      }
      const parsed = JSON.parse(data);
      return {
        ...INITIAL_SETTINGS,
        ...parsed,
        logoUrl: parsed.logoUrl || INITIAL_SETTINGS.logoUrl,
        brandSubtitle: (parsed.brandSubtitle && parsed.brandSubtitle !== "Royal Imitation Jewellery") ? parsed.brandSubtitle : INITIAL_SETTINGS.brandSubtitle
      };
    } catch (e) {
      console.error('Error reading settings:', e);
      return INITIAL_SETTINGS;
    }
  },

  saveSettings: (newSettings) => {
    try {
      const current = StoreService.getSettings();
      const updated = { ...current, ...newSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      notifyUpdate();
      return updated;
    } catch (e) {
      console.error('Error saving settings:', e);
      return null;
    }
  },

  // ---- Orders ----
  getOrders: () => {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveOrder: (order) => {
    try {
      const orders = StoreService.getOrders();
      const newOrder = {
        ...order,
        id: order.id || `QN-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString()
      };
      orders.unshift(newOrder);
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      notifyUpdate();
      return newOrder;
    } catch (e) {
      console.error('Error saving order:', e);
      return null;
    }
  },

  getProductById: (id) => {
    if (!id) return null;
    const products = StoreService.getProducts();
    return products.find((p) => p.id.toLowerCase() === id.toLowerCase()) || null;
  },

  // ---- WhatsApp Link Generator ----
  generateWhatsAppLink: (product) => {
    const settings = StoreService.getSettings();
    const phone = (settings.whatsappNumber || "919876543210").replace(/[^0-9]/g, "");
    const template = settings.whatsappMessageTemplate || INITIAL_SETTINGS.whatsappMessageTemplate;

    const productUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/product/${encodeURIComponent(product.id || '')}`
      : `https://quinsjewels.com/product/${product.id}`;

    const formattedPrice = `₹${(product.price || 0).toLocaleString('en-IN')}`;

    const message = template
      .replace(/{product_name}/g, product.name || 'Quins Jewellery Item')
      .replace(/{price}/g, formattedPrice)
      .replace(/{sku}/g, product.id || 'N/A')
      .replace(/{url}/g, productUrl);

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  },

  // ---- Admin Authentication ----
  isAdminAuthenticated: () => {
    if (typeof sessionStorage === 'undefined') return false;
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  },

  adminLogin: (password) => {
    const settings = StoreService.getSettings();
    if (password === settings.adminPasswordHash) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
      return true;
    }
    return false;
  },

  adminLogout: () => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
  },

  // ---- Factory Reset & Data Export/Import ----
  resetToDefault: () => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    notifyUpdate();
  },

  exportData: () => {
    const data = {
      products: StoreService.getProducts(),
      categories: StoreService.getCategories(),
      settings: StoreService.getSettings(),
      orders: StoreService.getOrders(),
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quins-jewels-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importData: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.products)) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
      }
      if (Array.isArray(data.categories)) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
      }
      if (data.settings && typeof data.settings === 'object') {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
      }
      notifyUpdate();
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }
};
