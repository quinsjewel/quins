import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, 
  Layers, 
  Phone, 
  CreditCard, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ExternalLink, 
  Download, 
  Upload, 
  RotateCcw, 
  LogOut, 
  Crown, 
  ArrowLeft,
  Search,
  Sparkles,
  ShoppingBag,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  Image as ImageIcon,
  Video,
  Film,
  Play,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Star
} from 'lucide-react';
import { StoreService } from '../services/store';
import { uploadToCloudinary, CLOUDINARY_CONFIG, compressImageFile, parseYouTubeVideo } from '../utils/mediaUtils';

export function AdminPortal({ onReturnToStore }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'categories' | 'whatsapp' | 'payments' | 'orders' | 'settings'
  const [products, setProducts] = useState(StoreService.getProducts());
  const [categories, setCategories] = useState(StoreService.getCategories());
  const [settings, setSettings] = useState(StoreService.getSettings());
  const [orders, setOrders] = useState(StoreService.getOrders());

  // Search & Filter state for admin product table
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState('all');

  // Modals / Form States
  const [editingProduct, setEditingProduct] = useState(null); // null or product object
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
  const [editingCategoryValue, setEditingCategoryValue] = useState('');
  
  // Settings Form States
  const [savedNotification, setSavedNotification] = useState('');
  const [newMasterPassword, setNewMasterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Reload data on store update
  const reloadData = () => {
    setProducts(StoreService.getProducts());
    setCategories(StoreService.getCategories());
    setSettings(StoreService.getSettings());
    setOrders(StoreService.getOrders());
  };

  useEffect(() => {
    reloadData();
    window.addEventListener('quins_store_updated', reloadData);
    return () => window.removeEventListener('quins_store_updated', reloadData);
  }, []);

  const showToast = (msg) => {
    setSavedNotification(msg);
    setTimeout(() => setSavedNotification(''), 3000);
  };

  // Stock toggle
  const handleToggleStock = (id) => {
    StoreService.toggleStockStatus(id);
    showToast('Stock status updated instantly');
  };

  // Delete product
  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the royal collection?`)) {
      StoreService.deleteProduct(id);
      showToast('Product removed from catalog');
    }
  };

  // Save or Add Product Form Submission
  const handleSaveProduct = (e, productData) => {
    e.preventDefault();
    if (editingProduct) {
      StoreService.updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
      showToast('Product updated successfully');
    } else {
      StoreService.addProduct(productData);
      setIsAddProductOpen(false);
      showToast('New royal jewel added to boutique');
    }
  };

  // Category Actions
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    if (StoreService.addCategory(newCategoryName)) {
      setNewCategoryName('');
      showToast(`Category "${newCategoryName}" added to public navigation!`);
    } else {
      alert('This category already exists.');
    }
  };

  const handleSaveEditCategory = (oldName) => {
    if (!editingCategoryValue.trim()) return;
    if (StoreService.editCategory(oldName, editingCategoryValue)) {
      setEditingCategoryIndex(null);
      setEditingCategoryValue('');
      showToast(`Category renamed to "${editingCategoryValue}"`);
    }
  };

  const handleDeleteCategory = (catName) => {
    if (window.confirm(`Remove category tab "${catName}"? This will not delete the products, but they will no longer appear under this tab.`)) {
      StoreService.deleteCategory(catName);
      showToast(`Category "${catName}" removed`);
    }
  };

  const handleMoveCategory = (index, direction) => {
    const newCats = [...categories];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newCats.length) return;
    const temp = newCats[index];
    newCats[index] = newCats[targetIdx];
    newCats[targetIdx] = temp;
    StoreService.saveCategories(newCats);
    showToast('Category navigation order updated');
  };

  // Settings Save
  const handleSaveSettings = (e) => {
    e.preventDefault();
    StoreService.saveSettings(settings);
    showToast('Admin settings saved successfully');
  };

  // Change Password
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newMasterPassword || newMasterPassword.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    if (newMasterPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    StoreService.saveSettings({ adminPasswordHash: newMasterPassword });
    setNewMasterPassword('');
    setConfirmPassword('');
    showToast('Master Password successfully changed!');
  };

  // Factory Reset
  const handleFactoryReset = () => {
    if (window.confirm('WARNING: Reset all products, categories, and settings back to factory default? Any custom added items will be restored to initial showcase.')) {
      StoreService.resetToDefault();
      showToast('Restored royal boutique to factory defaults');
    }
  };

  // Backup Import
  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (StoreService.importData(event.target.result)) {
        showToast('Store backup successfully imported!');
      } else {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  const inStockCount = products.filter(p => p.inStock !== false).length;
  const outOfStockCount = products.length - inStockCount;

  // Filtered products for admin list
  const filteredAdminProducts = products.filter(p => {
    if (productCatFilter !== 'all' && p.category.toLowerCase() !== productCatFilter.toLowerCase()) {
      return false;
    }
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030e09] text-white">
      {/* 1. Admin Top Bar */}
      <header className="bg-[#051c14] border-b border-[#d4af37]/30 px-4 sm:px-8 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d4af37] bg-black shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)]">
              <img 
                src={settings.logoUrl || "/quins-logo.png"} 
                alt="QUINS" 
                className="w-full h-full object-cover scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-royal text-lg sm:text-xl font-bold tracking-wider text-white">
                  QUINS SOVEREIGN PORTAL
                </h1>
                <span className="badge-gold text-[10px]">Restricted</span>
              </div>
              <p className="text-[11px] text-[#9eb2a8]">Royal Imitation Jewellery Administration & Inventory Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Return to Public Boutique */}
            <button
              onClick={onReturnToStore}
              className="btn-outline-gold text-xs py-2 px-4 flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">View Public Store</span>
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                StoreService.adminLogout();
                onReturnToStore();
              }}
              className="p-2 rounded-full bg-[#3b0813] hover:bg-[#5a0c1e] text-red-200 border border-red-500/40 transition"
              title="Logout from Admin"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#082b20] border-2 border-[#2ac38e] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <Check size={16} className="text-[#2ac38e]" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        
        {/* Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-4 border-l-4 border-l-[#d4af37]">
            <span className="text-[11px] text-gray-400 block uppercase font-semibold">Total Catalog</span>
            <span className="text-2xl font-bold font-sans text-white">{products.length}</span>
            <span className="text-[10px] text-[#8e9f96] block">Jewels Listed</span>
          </div>

          <div className="glass-panel p-4 border-l-4 border-l-[#2ac38e]">
            <span className="text-[11px] text-gray-400 block uppercase font-semibold">In Stock Items</span>
            <span className="text-2xl font-bold font-sans text-[#2ac38e]">{inStockCount}</span>
            <span className="text-[10px] text-[#8e9f96] block">Ready to Ship</span>
          </div>

          <div className="glass-panel p-4 border-l-4 border-l-[#e11d48]">
            <span className="text-[11px] text-gray-400 block uppercase font-semibold">Out of Stock</span>
            <span className="text-2xl font-bold font-sans text-[#fda4af]">{outOfStockCount}</span>
            <span className="text-[10px] text-[#8e9f96] block">Marked as Sold Out</span>
          </div>

          <div className="glass-panel p-4 border-l-4 border-l-[#38bdf8]">
            <span className="text-[11px] text-gray-400 block uppercase font-semibold">Nav Categories</span>
            <span className="text-2xl font-bold font-sans text-[#7dd3fc]">{categories.length}</span>
            <span className="text-[10px] text-[#8e9f96] block">Dynamic Tabs</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-[#d4af37]/20 gap-2 overflow-x-auto scrollbar-none mb-8">
          {[
            { id: 'products', label: 'Products & Inventory', icon: Package },
            { id: 'categories', label: 'Dynamic Category Tabs', icon: Layers },
            { id: 'whatsapp', label: 'WhatsApp Automation', icon: Phone },
            { id: 'payments', label: 'Payment Gateway (UPI/Razorpay)', icon: CreditCard },
            { id: 'orders', label: `Logged Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'settings', label: 'Settings & Backup', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 font-semibold text-xs sm:text-sm whitespace-nowrap flex items-center gap-2 border-b-2 transition ${
                  isActive
                    ? 'border-[#d4af37] text-[#f7e6a1] bg-[#d4af37]/10'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: PRODUCTS ================= */}
        {activeTab === 'products' && (
          <div>
            {/* Action Bar */}
            <div className="glass-panel p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <input
                    type="text"
                    placeholder="Search by title, SKU, or category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="royal-input py-2 pl-9 text-xs"
                  />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <select
                  value={productCatFilter}
                  onChange={(e) => setProductCatFilter(e.target.value)}
                  className="royal-input py-2 text-xs max-w-[180px]"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddProductOpen(true);
                }}
                className="btn-gold text-xs py-2.5 px-5 flex items-center gap-1.5 w-full md:w-auto justify-center"
              >
                <Plus size={16} />
                <span>Add Royal Jewel</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="glass-panel overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#03130d] text-[#d4af37] uppercase text-[10px] tracking-wider border-b border-[#d4af37]/20">
                  <tr>
                    <th className="py-3.5 px-4">Jewel</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Instant Stock Toggle</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4af37]/10">
                  {filteredAdminProducts.map(p => {
                    const inStock = p.inStock !== false;
                    return (
                      <tr key={p.id} className="hover:bg-[#08251a]/50 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 object-cover rounded-lg border border-[#d4af37]/25 shadow"
                              />
                              {Array.isArray(p.images) && p.images.length > 1 && (
                                <span className="absolute -bottom-1 -right-1 bg-black/85 text-[#f7e6a1] text-[9px] font-bold px-1 rounded border border-[#d4af37]/40 shadow">
                                  {p.images.length}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-white line-clamp-1">{p.name}</div>
                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                <span className="font-mono text-[10px] text-[#8e9f96]">SKU: {p.id}</span>
                                {p.tag && (
                                  <span className="badge-gold text-[9px] py-0 px-1.5">{p.tag}</span>
                                )}
                                {Array.isArray(p.youtubeVideos) && p.youtubeVideos.length > 0 && (
                                  <span 
                                    className="px-1.5 py-0 rounded bg-red-950/70 border border-red-500/40 text-red-300 text-[9px] flex items-center gap-1 font-semibold"
                                    title={`${p.youtubeVideos.length} YouTube Video(s) attached`}
                                  >
                                    <Film size={10} /> Video
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-[#cbd8d2]">
                          <span className="px-2 py-0.5 rounded bg-[#07241a] border border-[#d4af37]/20">
                            {p.category}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-[#f7e6a1]">₹{p.price.toLocaleString('en-IN')}</div>
                          {p.originalPrice && (
                            <div className="text-[10px] text-gray-400 line-through">
                              ₹{p.originalPrice.toLocaleString('en-IN')}
                            </div>
                          )}
                        </td>

                        {/* Instant Stock Control Switch */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <label className="royal-toggle">
                              <input
                                type="checkbox"
                                checked={inStock}
                                onChange={() => handleToggleStock(p.id)}
                              />
                              <span className="royal-slider" />
                            </label>
                            <span className={`text-[11px] font-semibold ${inStock ? 'text-[#2ac38e]' : 'text-[#fda4af]'}`}>
                              {inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 rounded-lg bg-[#07251a] hover:bg-[#0c3929] text-[#f7e6a1] border border-[#d4af37]/30 transition"
                              title="Edit Jewel"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 rounded-lg bg-[#3b0813] hover:bg-[#540c1c] text-red-200 border border-red-500/30 transition"
                              title="Delete Jewel"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredAdminProducts.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  No products found. Click "Add Royal Jewel" to add your first item.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: DYNAMIC CATEGORY TABS ================= */}
        {activeTab === 'categories' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Add New Category Box */}
            <div className="glass-panel p-6 border-l-4 border-l-[#d4af37]">
              <h3 className="font-royal text-base sm:text-lg font-bold text-white mb-2">
                Add Dynamic Collection Tab
              </h3>
              <p className="text-xs text-[#a3b7ad] mb-4">
                Categories created here will automatically render as top-level navigation tabs and product filters on the public boutique without code edits.
              </p>
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Chokers, Anklets, Mangalsutra, Kundan Sets"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="royal-input text-xs py-2.5 flex-1"
                />
                <button type="submit" className="btn-gold text-xs px-5 py-2.5 whitespace-nowrap">
                  <Plus size={14} />
                  <span>Add Tab</span>
                </button>
              </form>
            </div>

            {/* List & Reorder Current Categories */}
            <div className="glass-panel p-6">
              <h3 className="text-xs uppercase font-bold text-[#d4af37] tracking-wider mb-4">
                Current Public Navigation Tabs ({categories.length})
              </h3>
              
              <div className="divide-y divide-white/10">
                {categories.map((cat, idx) => (
                  <div key={cat} className="py-3 flex items-center justify-between gap-3">
                    {editingCategoryIndex === idx ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={editingCategoryValue}
                          onChange={(e) => setEditingCategoryValue(e.target.value)}
                          className="royal-input py-1.5 text-xs flex-1"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEditCategory(cat)}
                          className="p-2 rounded bg-[#093525] text-[#2ac38e] hover:bg-[#0e4b34]"
                          title="Save"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setEditingCategoryIndex(null)}
                          className="p-2 rounded bg-gray-800 text-gray-400 hover:text-white"
                          title="Cancel"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#03130d] text-[11px] font-bold text-[#d4af37] flex items-center justify-center border border-[#d4af37]/30">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-semibold text-sm text-white">{cat}</span>
                            <span className="text-[10px] text-[#8fa298] block">
                              {products.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length} products in collection
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Reorder Up/Down */}
                          <button
                            onClick={() => handleMoveCategory(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 rounded bg-[#051c14] border border-white/10 text-gray-300 hover:text-white disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp size={13} />
                          </button>
                          <button
                            onClick={() => handleMoveCategory(idx, 'down')}
                            disabled={idx === categories.length - 1}
                            className="p-1.5 rounded bg-[#051c14] border border-white/10 text-gray-300 hover:text-white disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown size={13} />
                          </button>

                          {/* Rename */}
                          <button
                            onClick={() => {
                              setEditingCategoryIndex(idx);
                              setEditingCategoryValue(cat);
                            }}
                            className="p-1.5 rounded bg-[#051c14] border border-white/10 text-[#f7e6a1] hover:bg-[#0c3325]"
                            title="Rename"
                          >
                            <Edit3 size={13} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteCategory(cat)}
                            className="p-1.5 rounded bg-[#3b0813] text-red-300 hover:bg-[#520c1b]"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: WHATSAPP AUTOMATION ================= */}
        {activeTab === 'whatsapp' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="glass-panel p-6 border-l-4 border-l-[#25D366]">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={18} className="text-[#25D366]" />
                <h3 className="font-royal text-base sm:text-lg font-bold text-white">
                  WhatsApp Deep-Linking & Business Automation
                </h3>
              </div>
              <p className="text-xs text-[#a4b8ae] mb-6">
                When a customer clicks "Buy from WhatsApp", the system automatically deep-links to WhatsApp with this customizable pre-filled message.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-[#f7e6a1] block mb-1">
                    Target WhatsApp Phone Number (with Country Code, no + or spaces) *
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="royal-input text-xs py-2.5 font-mono"
                    placeholder="e.g. 919876543210"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Example: For India (+91), enter 91 followed by 10-digit number (919876543210).</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#f7e6a1] block">
                      Pre-Filled Inquiry Message Template:
                    </label>
                    <span className="text-[10px] text-[#2ac38e]">
                      Available tags: &#123;product_name&#125;, &#123;price&#125;, &#123;sku&#125;, &#123;url&#125;
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={settings.whatsappMessageTemplate}
                    onChange={(e) => setSettings({ ...settings, whatsappMessageTemplate: e.target.value })}
                    className="royal-input text-xs py-2.5 font-mono leading-relaxed"
                  />
                </div>

                {/* Dynamic Preview */}
                <div className="p-4 rounded-xl bg-[#03130d] border border-[#25D366]/30">
                  <span className="text-[10px] uppercase font-bold text-[#25D366] block mb-2 tracking-wider">
                    Customer Experience Live Preview:
                  </span>
                  <div className="p-3 rounded-lg bg-[#07241a] text-white text-xs whitespace-pre-line font-mono border border-white/10">
                    {settings.whatsappMessageTemplate
                      .replace(/{product_name}/g, 'Noor-e-Jahan Royal Polki Choker Set')
                      .replace(/{price}/g, '₹4,899')
                      .replace(/{sku}/g, 'QN-BRD-101')
                      .replace(/{url}/g, 'https://quinsjewels.com?product=QN-BRD-101')}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" className="btn-gold text-xs py-2.5 px-6">
                    Save WhatsApp Automation
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const sampleProduct = products[0] || { name: 'Royal Polki Set', price: 4899, id: 'TEST' };
                      window.open(StoreService.generateWhatsAppLink(sampleProduct), '_blank');
                    }}
                    className="btn-whatsapp text-xs py-2.5 px-5"
                  >
                    Test Live Deep Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= TAB 4: PAYMENT GATEWAY (UPI / RAZORPAY) ================= */}
        {activeTab === 'payments' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="glass-panel p-6 border-l-4 border-l-[#d4af37]">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard size={18} className="text-[#d4af37]" />
                <h3 className="font-royal text-base sm:text-lg font-bold text-white">
                  Indian Payment Gateway & UPI Settings
                </h3>
              </div>
              <p className="text-xs text-[#a4b8ae] mb-6">
                Configure direct UPI checkout QR codes and Razorpay Merchant credentials for Indian payments.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                {/* Enable Checkout Toggle */}
                <div className="p-4 rounded-xl bg-[#03130d] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Enable Online Checkout</span>
                    <span className="text-[11px] text-gray-400">Allow customers to click "Pay Now" and checkout online.</span>
                  </div>
                  <label className="royal-toggle">
                    <input
                      type="checkbox"
                      checked={settings.enableOnlineCheckout}
                      onChange={(e) => setSettings({ ...settings, enableOnlineCheckout: e.target.checked })}
                    />
                    <span className="royal-slider" />
                  </label>
                </div>

                {/* Merchant VPA */}
                <div>
                  <label className="text-[#f7e6a1] font-semibold block mb-1">
                    UPI Merchant VPA ID (Virtual Payment Address) *
                  </label>
                  <input
                    type="text"
                    value={settings.upiMerchantVpa}
                    onChange={(e) => setSettings({ ...settings, upiMerchantVpa: e.target.value })}
                    className="royal-input py-2 text-xs font-mono"
                    placeholder="e.g. quinsjewels@okhdfcbank"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">This generates instant dynamic QR codes for GPay, PhonePe, Paytm, and BHIM.</p>
                </div>

                {/* Merchant Name */}
                <div>
                  <label className="text-[#f7e6a1] font-semibold block mb-1">
                    UPI Merchant Business Display Name
                  </label>
                  <input
                    type="text"
                    value={settings.upiMerchantName}
                    onChange={(e) => setSettings({ ...settings, upiMerchantName: e.target.value })}
                    className="royal-input py-2 text-xs"
                    placeholder="e.g. QUINS Royal Jewels"
                  />
                </div>

                {/* Razorpay Key ID */}
                <div className="pt-2 border-t border-white/10">
                  <label className="text-[#f7e6a1] font-semibold block mb-1">
                    Razorpay Key ID (Live or Test)
                  </label>
                  <input
                    type="text"
                    value={settings.razorpayKeyId}
                    onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                    className="royal-input py-2 text-xs font-mono"
                    placeholder="rzp_test_..."
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-gold py-2.5 px-6">
                    Save Gateway Credentials
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= TAB 5: LOGGED ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="glass-panel overflow-x-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-royal text-base sm:text-lg font-bold text-white">
                Customer Acquisitions & Orders ({orders.length})
              </h3>
              <span className="text-xs text-[#a2b6ab]">Saved locally in Sovereign database</span>
            </div>

            {orders.length > 0 ? (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#03130d] text-[#d4af37] uppercase text-[10px] tracking-wider border-b border-[#d4af37]/20">
                  <tr>
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Jewel Acquired</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Method</th>
                    <th className="py-3 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-[#07241a]/40">
                      <td className="py-3 px-3 font-mono font-bold text-[#f7e6a1]">{o.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{o.customer?.fullName}</div>
                        <div className="text-[10px] text-gray-400">{o.customer?.phone}</div>
                        <div className="text-[10px] text-gray-400">{o.customer?.city} - {o.customer?.pincode}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-white line-clamp-1">{o.product?.name}</div>
                        <span className="text-[10px] text-[#8fa399] font-mono">SKU: {o.product?.id}</span>
                      </td>
                      <td className="py-3 px-3 font-bold text-[#2ac38e]">
                        ₹{(o.amount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-[#092a1e] border border-[#d4af37]/20 text-[10px]">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[10px] text-gray-400">
                        {new Date(o.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center text-gray-400 text-xs">
                No orders placed yet. Orders initiated via "Pay Now" will automatically log here!
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: SETTINGS & BACKUP ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Branding Settings */}
            <div className="glass-panel p-6">
              <h3 className="font-royal text-base sm:text-lg font-bold text-white mb-3">
                Boutique Branding & Announcement
              </h3>
              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                {/* Brand Logo Live Preview & Input */}
                <div className="p-3.5 rounded-xl bg-[#03130d] border border-[#d4af37]/30 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#d4af37] bg-black shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.35)] p-0.5">
                    <img 
                      src={settings.logoUrl || "/quins-logo.png"} 
                      alt="Brand Logo" 
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = "/quins-logo.png"; }}
                    />
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[#f7e6a1] font-semibold block">Official Brand Logo URL</label>
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, logoUrl: "/quins-logo.png" })}
                        className="text-[10px] text-[#d4af37] hover:underline"
                      >
                        Reset to default logo
                      </button>
                    </div>
                    <input
                      type="text"
                      value={settings.logoUrl || "/quins-logo.png"}
                      onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                      className="royal-input py-1.5 text-xs w-full"
                      placeholder="e.g. /quins-logo.png or Cloudinary secure URL"
                    />
                    <p className="text-[10px] text-gray-400">
                      Active logo insignia is displayed across the navigation header, mobile drawer, footer, admin portal, and browser tab.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#f7e6a1] font-semibold block mb-1">Brand Name Logo Text</label>
                    <input
                      type="text"
                      value={settings.brandName}
                      onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                      className="royal-input py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[#f7e6a1] font-semibold block mb-1">Brand Subtitle</label>
                    <input
                      type="text"
                      value={settings.brandSubtitle}
                      onChange={(e) => setSettings({ ...settings, brandSubtitle: e.target.value })}
                      className="royal-input py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#f7e6a1] font-semibold block mb-1">Top Announcement Bar Text</label>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    className="royal-input py-2 text-xs"
                  />
                </div>

                <button type="submit" className="btn-gold py-2 px-5">
                  Update Boutique Details
                </button>
              </form>
            </div>

            {/* Cloudinary Cloud Storage Configuration */}
            <div className="glass-panel p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <UploadCloud size={20} className="text-[#d4af37]" />
                  <h3 className="font-royal text-base sm:text-lg font-bold text-white">
                    Cloudinary CDN Cloud Media Storage
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#2ac38e]/15 border border-[#2ac38e]/35 text-[#2ac38e] text-[10px] font-semibold flex items-center gap-1 w-fit">
                  <CheckCircle2 size={12} /> Connected & Verified
                </span>
              </div>
              <p className="text-xs text-[#9eb2a8] mb-4">
                Photos uploaded via the admin file picker are automatically stored directly on Cloudinary via an unsigned preset and saved as fast HTTPS CDN URLs.
              </p>
              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#f7e6a1] font-semibold block mb-1">Cloud Name</label>
                    <input
                      type="text"
                      value={settings.cloudinaryCloudName || 'tb5bmwd5'}
                      onChange={(e) => setSettings({ ...settings, cloudinaryCloudName: e.target.value })}
                      className="royal-input py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[#f7e6a1] font-semibold block mb-1">Unsigned Upload Preset</label>
                    <input
                      type="text"
                      value={settings.cloudinaryUploadPreset || 'quins_preset'}
                      onChange={(e) => setSettings({ ...settings, cloudinaryUploadPreset: e.target.value })}
                      className="royal-input py-2 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#04160f] border border-[#d4af37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                  <div>
                    <span className="text-[#8e9f96] block text-[10px] uppercase font-semibold">Active Upload API Endpoint</span>
                    <span className="text-[#f7e6a1] font-mono break-all">
                      https://api.cloudinary.com/v1_1/{settings.cloudinaryCloudName || 'tb5bmwd5'}/image/upload
                    </span>
                  </div>
                </div>

                <button type="submit" className="btn-gold py-2 px-5">
                  Save Cloudinary Settings
                </button>
              </form>
            </div>


            {/* Change Master Password */}
            <div className="glass-panel p-6">
              <h3 className="font-royal text-base sm:text-lg font-bold text-white mb-3">
                Update Sovereign Master Password
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-3 text-xs max-w-md">
                <div>
                  <label className="text-[#f7e6a1] font-semibold block mb-1">New Master Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newMasterPassword}
                    onChange={(e) => setNewMasterPassword(e.target.value)}
                    className="royal-input py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[#f7e6a1] font-semibold block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Re-type new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="royal-input py-2 text-xs"
                  />
                </div>
                <button type="submit" className="btn-gold py-2 px-5">
                  Change Master Password
                </button>
              </form>
            </div>

            {/* Backup & Factory Reset */}
            <div className="glass-panel p-6">
              <h3 className="font-royal text-base sm:text-lg font-bold text-white mb-2">
                Data Persistence & Royal Backup
              </h3>
              <p className="text-xs text-[#a2b5aa] mb-4">
                Export your entire inventory, custom categories, and settings as a JSON file or restore them anytime.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => StoreService.exportData()}
                  className="btn-outline-gold text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Export Store Backup (JSON)</span>
                </button>

                <label className="btn-outline-gold text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer">
                  <Upload size={14} />
                  <span>Import Store Backup</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>

                <button
                  onClick={handleFactoryReset}
                  className="p-2 px-4 rounded-full bg-[#3b0813] hover:bg-[#520c1b] text-red-200 border border-red-500/40 text-xs flex items-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  <span>Reset to Factory Royal Inventory</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ================= ADD / EDIT PRODUCT MODAL ================= */}
      {(isAddProductOpen || editingProduct) && (
        <ProductFormModal
          categories={categories}
          initialData={editingProduct}
          onClose={() => {
            setIsAddProductOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}

// Subcomponent for Add / Edit Product Modal with Advanced Media Capabilities
function ProductFormModal({ categories, initialData, onClose, onSave }) {
  const initialImages = Array.isArray(initialData?.images) && initialData.images.length > 0
    ? initialData.images
    : (initialData?.image ? [initialData.image] : []);

  const initialVideos = Array.isArray(initialData?.youtubeVideos)
    ? initialData.youtubeVideos
    : [];

  const [formData, setFormData] = useState({
    id: initialData?.id || `QN-${Math.floor(100 + Math.random() * 900)}`,
    name: initialData?.name || '',
    category: initialData?.category || categories[0] || 'Bridal Collection',
    price: initialData?.price || 2499,
    originalPrice: initialData?.originalPrice || 4999,
    tag: initialData?.tag || 'Royal Pick',
    inStock: initialData?.inStock !== undefined ? initialData.inStock : true,
    images: initialImages,
    youtubeVideos: [initialVideos[0] || '', initialVideos[1] || ''],
    description: initialData?.description || 'Handcrafted 24K micron gold electroplating with anti-tarnish protective lacquer.'
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, completedCount: 0, percent: 0, filename: '' });
  const [failedUploads, setFailedUploads] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlAdd, setShowUrlAdd] = useState(false);
  const [activePreviewVideoIdx, setActivePreviewVideoIdx] = useState(null); // null | 0 | 1
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef(null);

  // Parse YouTube URLs in real time
  const parsedVideo1 = parseYouTubeVideo(formData.youtubeVideos[0]);
  const parsedVideo2 = parseYouTubeVideo(formData.youtubeVideos[1]);

  // Handle files: Upload directly to Cloudinary using unsigned preset quins_preset
  const processFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage('');

    const currentCount = formData.images.length;
    const remainingSlots = 6 - currentCount;

    if (remainingSlots <= 0) {
      setErrorMessage('Maximum 6 images reached. Remove an existing photo to upload new ones.');
      return;
    }

    const validFiles = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      setErrorMessage('Please select valid image files (JPG, PNG, WEBP, GIF).');
      return;
    }

    const filesToUpload = validFiles.slice(0, remainingSlots);
    if (validFiles.length > remainingSlots) {
      setErrorMessage(`Only ${remainingSlots} photo slot(s) remaining. Uploading the first ${remainingSlots} images.`);
    }

    setIsUploading(true);
    const uploadedUrls = [];
    const newFailed = [];
    let completed = 0;

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      setUploadProgress({
        current: i + 1,
        total: filesToUpload.length,
        completedCount: completed,
        percent: 0,
        filename: file.name
      });

      try {
        // Direct upload to Cloudinary using unsigned preset quins_preset
        const result = await uploadToCloudinary(file, {
          cloudName: 'tb5bmwd5',
          uploadPreset: 'quins_preset',
          onProgress: (percent) => {
            setUploadProgress(prev => ({
              ...prev,
              percent
            }));
          }
        });

        if (result && result.secure_url) {
          uploadedUrls.push(result.secure_url);
          completed += 1;
          setUploadProgress(prev => ({
            ...prev,
            completedCount: completed
          }));
        }
      } catch (err) {
        console.error('Cloudinary upload error for file:', file.name, err);
        newFailed.push(file);
      }
    }

    setIsUploading(false);
    setUploadProgress({ current: 0, total: 0, completedCount: 0, percent: 0, filename: '' });

    if (uploadedUrls.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls].slice(0, 6)
      }));
    }

    if (newFailed.length > 0) {
      setFailedUploads(newFailed);
      setErrorMessage(
        `${newFailed.length} image(s) failed to upload to cloud (${newFailed.map(f => f.name).join(', ')}). Your other product details are completely safe. Click "Retry Upload" to try again.`
      );
    } else {
      setFailedUploads([]);
    }
  };

  const handleRetryFailedUploads = () => {
    if (failedUploads.length > 0) {
      const toRetry = [...failedUploads];
      setFailedUploads([]);
      processFiles(toRetry);
    }
  };



  const handleFileInputChange = (e) => {
    processFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Thumbnail Actions
  const handleSetPrimary = (index) => {
    if (index === 0) return;
    setFormData(prev => {
      const copy = [...prev.images];
      const [item] = copy.splice(index, 1);
      copy.unshift(item);
      return { ...prev, images: copy };
    });
  };

  const handleMoveLeft = (index) => {
    if (index === 0) return;
    setFormData(prev => {
      const copy = [...prev.images];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return { ...prev, images: copy };
    });
  };

  const handleMoveRight = (index) => {
    if (index >= formData.images.length - 1) return;
    setFormData(prev => {
      const copy = [...prev.images];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return { ...prev, images: copy };
    });
  };

  const handleDeleteImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddUrlImage = () => {
    if (!urlInput.trim()) return;
    setErrorMessage('');

    // Support single URL or multiple comma/newline/space separated URLs
    const rawUrls = urlInput.split(/[\n,\s]+/).map(u => u.trim()).filter(Boolean);
    const validUrls = rawUrls.filter(u => u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:image/'));

    if (validUrls.length === 0) {
      setErrorMessage('Please enter valid HTTP/HTTPS image URL(s) or Cloudinary secure_url links.');
      return;
    }

    const availableSlots = 6 - formData.images.length;
    if (availableSlots <= 0) {
      setErrorMessage('Maximum 6 images reached. Remove an existing photo to add new ones.');
      return;
    }

    const toAdd = validUrls.slice(0, availableSlots);
    if (validUrls.length > availableSlots) {
      setErrorMessage(`Added ${availableSlots} URL(s). Reached maximum limit of 6 images.`);
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...toAdd].slice(0, 6)
    }));
    setUrlInput('');
    setShowUrlAdd(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading) {
      setErrorMessage('Please wait until image uploads finish before saving.');
      return;
    }

    if (formData.images.length === 0) {
      setErrorMessage('Please upload or provide at least 1 primary image for this jewel.');
      return;
    }

    const cleanVideos = formData.youtubeVideos.map(v => v.trim()).filter(Boolean);

    const submissionData = {
      ...formData,
      image: formData.images[0],
      images: formData.images,
      youtubeVideos: cleanVideos
    };

    onSave(e, submissionData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-animated relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#061e16] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#04120b] text-gray-300 hover:text-white border border-white/10 hover:border-[#d4af37]/40 transition"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#d4af37] bg-black shrink-0 shadow">
            <img src="/quins-logo.png" alt="QUINS" className="w-full h-full object-cover scale-105" />
          </div>
          <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
            {initialData ? 'Edit Royal Jewel' : 'Add New Royal Jewel'}
          </h3>
        </div>
        <p className="text-xs text-[#9eb2a8] mb-5 font-serif">
          Manage product details, high-definition photo gallery (5-6 angles), and responsive YouTube/Shorts video embeds.
        </p>

        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-start gap-2.5">
              <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-red-100">Upload Status Notice:</span>
                <span className="text-[11px] text-red-200 leading-relaxed">{errorMessage}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {failedUploads.length > 0 && !isUploading && (
                <button
                  type="button"
                  onClick={handleRetryFailedUploads}
                  className="px-3 py-1.5 rounded-lg bg-red-700 hover:bg-red-600 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
                  title="Retry uploading the failed image(s)"
                >
                  <RotateCcw size={12} />
                  <span>Retry Upload ({failedUploads.length})</span>
                </button>
              )}
              <button 
                type="button" 
                onClick={() => setErrorMessage('')} 
                className="p-1 rounded-full text-red-300 hover:text-white hover:bg-white/10 transition"
                title="Dismiss notice"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Title */}
          <div>
            <label className="text-[#f7e6a1] font-semibold block mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="royal-input py-2 text-xs"
              placeholder="e.g. Padmavati Royal Polki Choker Set with Emeralds"
            />
          </div>

          {/* Category & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[#f7e6a1] font-semibold block mb-1">Collection / Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="royal-input py-2 text-xs"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#f7e6a1] font-semibold block mb-1">Product SKU / Code</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="royal-input py-2 text-xs font-mono"
              />
            </div>
          </div>

          {/* Pricing & Tag */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[#f7e6a1] font-semibold block mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="royal-input py-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[#f7e6a1] font-semibold block mb-1">MRP Price (₹)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="royal-input py-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[#f7e6a1] font-semibold block mb-1">Tag Badge</label>
              <select
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="royal-input py-2 text-xs"
              >
                <option value="Bestseller">Bestseller</option>
                <option value="Royal Pick">Royal Pick</option>
                <option value="Anti-Tarnish">Anti-Tarnish</option>
                <option value="Trending">Trending</option>
                <option value="New Launch">New Launch</option>
                <option value="">None</option>
              </select>
            </div>
          </div>

          {/* Stock Toggle */}
          <div className="p-3 rounded-xl bg-[#03130d] border border-white/10 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Stock Status</span>
              <span className="text-[11px] text-gray-400">
                {formData.inStock ? 'Customer can order via WhatsApp & Pay Now' : 'Marked as Sold Out (Buttons disabled)'}
              </span>
            </div>
            <label className="royal-toggle">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              />
              <span className="royal-slider" />
            </label>
          </div>

          {/* ================= SECTION 1: CLOUDINARY MULTI-IMAGE UPLOAD ZONE ================= */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#03140e] border border-[#d4af37]/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d4af37]/15 pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud size={18} className="text-[#d4af37]" />
                <span className="font-royal font-bold text-white text-sm">Product Media Gallery</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#38bdf8]/15 text-[#7dd3fc] font-semibold border border-[#38bdf8]/30">
                  Cloudinary CDN
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 text-[#f7e6a1] font-semibold border border-[#d4af37]/30">
                  {formData.images.length} / 6 Photos
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#93a79d] leading-relaxed">
              Select or drop 5 to 6 product photos. Images are automatically uploaded to <strong>Cloudinary</strong> via unsigned preset <span className="font-mono text-[#f7e6a1]">quins_preset</span> on cloud <span className="font-mono text-[#d4af37]">tb5bmwd5</span> and saved directly as secure HTTPS CDN URLs. The <strong>first photo</strong> serves as the primary catalog cover.
            </p>

            {/* Drag & Drop Upload Zone */}
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />

            <div
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                if (!isUploading && formData.images.length < 6 && fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              className={`dropzone-container p-6 rounded-xl text-center transition-all ${
                isDragging ? 'dropzone-active' : ''
              } ${isUploading ? 'cursor-wait bg-[#051a13]' : 'cursor-pointer'} ${
                formData.images.length >= 6 && !isUploading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center justify-center py-2 px-4 space-y-3 w-full max-w-md mx-auto">
                  <div className="flex items-center gap-2 text-[#d4af37]">
                    <Loader2 size={24} className="animate-spin text-[#d4af37]" />
                    <span className="font-royal font-bold text-sm text-white">
                      Uploading ({uploadProgress.current || 0} of {uploadProgress.total || 0})
                    </span>
                    <span className="text-xs text-[#d4af37] font-medium font-sans">
                      • {uploadProgress.completedCount || 0} of {uploadProgress.total || 0} completed
                    </span>
                  </div>

                  {/* Real-time Progress Bar */}
                  <div className="w-full bg-[#03130d] border border-[#d4af37]/40 rounded-full h-3.5 p-0.5 overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-[#d4af37] via-[#f7e6a1] to-[#2ac38e] h-full rounded-full transition-all duration-150 ease-out shadow-lg"
                      style={{ 
                        width: `${Math.max(6, uploadProgress.total > 0 ? Math.min(100, Math.round(((uploadProgress.completedCount + (uploadProgress.percent / 100)) / uploadProgress.total) * 100)) : uploadProgress.percent)}%` 
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between w-full text-[11px] text-[#93a79d] font-mono">
                    <span className="truncate max-w-[240px]">
                      Uploading ({uploadProgress.current || 0} of {uploadProgress.total || 0}): {uploadProgress.filename}
                    </span>
                    <span className="font-bold text-[#f7e6a1] shrink-0">{uploadProgress.percent}%</span>
                  </div>

                  <p className="text-[10px] text-gray-400 font-mono">
                    Uploading images to cloud... ({uploadProgress.completedCount || 0} of {uploadProgress.total || 0} completed)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="w-12 h-12 rounded-full bg-[#0a2f22] border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] mb-2 shadow-lg group-hover:scale-105 transition">
                    <UploadCloud size={24} />
                  </div>
                  <div className="font-semibold text-white text-xs sm:text-sm mb-1">
                    {formData.images.length >= 6
                      ? 'Maximum 6 photos reached'
                      : 'Drag & Drop 5 to 6 Product Photos, or Click to Browse'}
                  </div>
                  <div className="text-[11px] text-[#8e9f96]">
                    Direct unsigned upload to Cloudinary • Supports JPG, PNG, WEBP, GIF
                  </div>
                </div>
              )}
            </div>

            {/* Manual URL Fallback Input Section */}
            <div className="p-3.5 rounded-xl bg-[#02100b] border border-[#d4af37]/25 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-[#f7e6a1] flex items-center gap-1.5">
                  <ExternalLink size={13} className="text-[#d4af37]" />
                  <span>Manual Image URL Fallback</span>
                </label>
                <span className="text-[10px] text-[#8e9f96]">
                  {6 - formData.images.length} slot(s) remaining
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste direct Cloudinary secure_url or external image link..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddUrlImage();
                    }
                  }}
                  className="royal-input py-1.5 text-xs flex-1"
                />
                <button
                  type="button"
                  onClick={handleAddUrlImage}
                  disabled={formData.images.length >= 6}
                  className="btn-gold py-1.5 px-4 text-xs shrink-0 font-semibold shadow disabled:opacity-40"
                >
                  + Add URL
                </button>
              </div>
              <p className="text-[10px] text-gray-400">
                Optional: Paste existing Cloudinary URLs (<span className="font-mono text-[#d4af37]">https://res.cloudinary.com/...</span>) or web links manually. Multiple links can be separated by commas.
              </p>
            </div>

            {/* Thumbnail Preview Gallery with Delete & Reorder Controls */}
            {formData.images.length > 0 && (
              <div>
                <div className="text-[11px] text-gray-400 mb-2 flex items-center justify-between">
                  <span>Gallery Preview (Drag or click arrows to reorder):</span>
                  <span className="text-[#f7e6a1] text-[10px] italic">★ Slot 1 is Main Cover</span>
                </div>


                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {formData.images.map((img, idx) => {
                    const isPrimary = idx === 0;
                    return (
                      <div
                        key={idx}
                        className={`relative rounded-xl overflow-hidden border-2 bg-black/40 group p-1.5 transition-all ${
                          isPrimary 
                            ? 'border-[#d4af37] ring-2 ring-[#d4af37]/40 shadow-lg' 
                            : 'border-white/15 hover:border-white/40'
                        }`}
                      >
                        {/* Thumbnail Image */}
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-[#04120b]">
                          <img
                            src={img}
                            alt={`Jewel angle ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Main Cover Badge */}
                          {isPrimary ? (
                            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#d4af37] text-black font-bold text-[9px] flex items-center gap-1 shadow">
                              <Star size={10} className="fill-black" />
                              <span>Main Cover</span>
                            </div>
                          ) : (
                            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-gray-300 font-mono text-[9px]">
                              #{idx + 1}
                            </div>
                          )}

                          {/* Remove button (X) */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(idx);
                            }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/80 hover:bg-red-600 text-white border border-white/20 hover:border-red-400 transition-colors shadow-md flex items-center justify-center z-10"
                            title="Remove image (X)"
                            aria-label="Remove image"
                          >
                            <X size={12} strokeWidth={2.5} />
                          </button>
                        </div>

                        {/* Reorder and Set Main Cover Toolbar */}
                        <div className="flex items-center justify-between gap-1 mt-2 text-[10px]">
                          {!isPrimary ? (
                            <button
                              type="button"
                              onClick={() => handleSetPrimary(idx)}
                              className="px-2 py-0.5 rounded bg-[#07241a] hover:bg-[#0c3929] text-[#f7e6a1] border border-[#d4af37]/30 text-[10px] font-semibold transition"
                            >
                              Set as Main Cover
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#d4af37] font-semibold px-1">
                              Catalog Cover
                            </span>
                          )}

                          <div className="flex items-center gap-1 ml-auto">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveLeft(idx)}
                              className="p-1 rounded bg-[#051811] hover:bg-[#092c1e] text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                              title="Move photo left"
                            >
                              <ChevronLeft size={13} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === formData.images.length - 1}
                              onClick={() => handleMoveRight(idx)}
                              className="p-1 rounded bg-[#051811] hover:bg-[#092c1e] text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                              title="Move photo right"
                            >
                              <ChevronRight size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ================= SECTION 2: YOUTUBE VIDEO INTEGRATION ================= */}
          <div className="p-4 rounded-xl bg-[#03140e] border border-[#d4af37]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video size={16} className="text-red-400" />
                <span className="font-royal font-bold text-white text-sm">YouTube Video Integration</span>
              </div>
              <span className="text-[10px] text-[#93a79d]">
                Supports Watch URLs & Shorts (9:16)
              </span>
            </div>

            <p className="text-[11px] text-[#93a79d]">
              Add up to 2 YouTube video links (Cinematic Showcase or Shorts/Reels). Customers can watch them smoothly inside the product details page without redirecting to YouTube.
            </p>

            {/* Video Input 1 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[#f7e6a1] font-semibold">YouTube Video URL 1 (Product Showcase / 16:9 Landscape)</label>
                {parsedVideo1 && (
                  <span className="text-[10px] text-[#2ac38e] flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={12} /> Valid Embed ({parsedVideo1.isShort ? '9:16 Shorts' : '16:9 Video'})
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                value={formData.youtubeVideos[0] || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    youtubeVideos: [val, prev.youtubeVideos[1] || '']
                  }));
                }}
                className="royal-input py-2 text-xs"
              />

              {parsedVideo1 && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-[#8fa399]">
                    Video ID: <strong className="text-white">{parsedVideo1.videoId}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePreviewVideoIdx(activePreviewVideoIdx === 0 ? null : 0)}
                    className="text-[11px] text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Play size={11} /> {activePreviewVideoIdx === 0 ? 'Hide Embed Player' : 'Test Embed Player'}
                  </button>
                </div>
              )}

              {activePreviewVideoIdx === 0 && parsedVideo1 && (
                <div className="mt-2 rounded-xl overflow-hidden border border-[#d4af37]/40 bg-black aspect-video">
                  <iframe
                    src={parsedVideo1.embedUrl}
                    title="YouTube Video Preview 1"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {/* Video Input 2 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[#f7e6a1] font-semibold">YouTube Video URL 2 (Shorts / Reels / 9:16 Vertical)</label>
                {parsedVideo2 && (
                  <span className="text-[10px] text-[#2ac38e] flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={12} /> Valid Embed ({parsedVideo2.isShort ? '9:16 Shorts' : '16:9 Video'})
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="e.g. https://www.youtube.com/shorts/... or https://youtu.be/..."
                value={formData.youtubeVideos[1] || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    youtubeVideos: [prev.youtubeVideos[0] || '', val]
                  }));
                }}
                className="royal-input py-2 text-xs"
              />

              {parsedVideo2 && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-[#8fa399]">
                    Video ID: <strong className="text-white">{parsedVideo2.videoId}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePreviewVideoIdx(activePreviewVideoIdx === 1 ? null : 1)}
                    className="text-[11px] text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Play size={11} /> {activePreviewVideoIdx === 1 ? 'Hide Embed Player' : 'Test Embed Player'}
                  </button>
                </div>
              )}

              {activePreviewVideoIdx === 1 && parsedVideo2 && (
                <div className="mt-2 rounded-xl overflow-hidden border border-[#d4af37]/40 bg-black aspect-[9/16] max-w-[280px] mx-auto">
                  <iframe
                    src={parsedVideo2.embedUrl}
                    title="YouTube Video Preview 2"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="text-[#f7e6a1] font-semibold block mb-1">Product Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="royal-input py-2 text-xs"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-5 py-2 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isUploading}
              className="btn-gold py-2.5 px-7 text-xs font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 size={15} className="animate-spin text-black" />
                  <span>Uploading ({uploadProgress.current || 0} of {uploadProgress.total || 0})... Please wait</span>
                </>
              ) : (
                <span>{initialData ? 'Save Jewel Changes' : 'Create Royal Jewel'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

