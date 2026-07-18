import React, { useState } from 'react';
import { 
  ShoppingCart, X, Search, Check, Clock, Shield, Zap, Users, 
  MessageCircle, Star, ArrowRight 
} from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  stock: string;
  badge?: string;
  popular?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

// Product Data
const products: Product[] = [
  { id: 1, name: "USA WhatsApp", category: "Numbers", price: 2900, description: "Premium verified USA WhatsApp numbers. Ready to use instantly.", features: ["Verified", "Clean", "Fast Delivery"], stock: "In Stock", badge: "BESTSELLER", popular: true },
  { id: 2, name: "Google Voice Accounts", category: "Numbers", price: 4500, description: "Fresh USA Google Voice accounts with full access.", features: ["USA Number", "Verified", "No Reclaim"], stock: "In Stock" },
  { id: 3, name: "USA Facebook (Dating)", category: "Social", price: 3800, description: "High quality USA Facebook accounts optimized for Dating.", features: ["Aged", "Clean", "Profile Ready"], stock: "In Stock", popular: true },
  { id: 4, name: "USA Facebook (Non-Dating)", category: "Social", price: 3200, description: "Premium USA Facebook accounts for general use.", features: ["Active", "Aged", "Full Access"], stock: "In Stock" },
  { id: 5, name: "UK Facebook Accounts", category: "Social", price: 4100, description: "Clean and reliable UK Facebook accounts.", features: ["UK Based", "Verified", "Fast Setup"], stock: "In Stock" },
  { id: 6, name: "All Country Facebook", category: "Social", price: 2500, description: "Facebook accounts from multiple countries worldwide.", features: ["Multi-Country", "Fresh", "Bulk Ready"], stock: "In Stock" },
  { id: 7, name: "Instagram Accounts", category: "Social", price: 3500, description: "Premium Instagram accounts — aged and high quality.", features: ["Aged", "Active", "Ready To Use"], stock: "In Stock", popular: true },
  { id: 8, name: "TikTok Accounts", category: "Social", price: 2800, description: "Verified TikTok accounts from various regions.", features: ["Verified", "Clean", "Fast Delivery"], stock: "In Stock" },
  { id: 9, name: "Snapchat Accounts", category: "Social", price: 3000, description: "Fresh and active Snapchat accounts.", features: ["Active", "High Quality", "Instant Access"], stock: "In Stock" },
  { id: 10, name: "Twitter / X Accounts", category: "Social", price: 2700, description: "Clean Twitter/X accounts. Aged and ready.", features: ["Aged", "Clean", "Full Access"], stock: "In Stock" },
  { id: 11, name: "LinkedIn Accounts", category: "Social", price: 5200, description: "Premium professional LinkedIn accounts.", features: ["Professional", "Aged", "Verified"], stock: "In Stock" },
  { id: 12, name: "POF Login & Numbers", category: "Numbers", price: 2400, description: "POF accounts + numbers. Perfect for dating platforms.", features: ["Verified", "Number Included", "Instant"], stock: "In Stock" },
  { id: 13, name: "All Countries Numbers", category: "Numbers", price: 1800, description: "Fresh mobile numbers from all countries. Bulk available.", features: ["Multi-Country", "Verified", "Clean"], stock: "In Stock" },
  { id: 14, name: "Premium Netflix Logs", category: "Entertainment", price: 6200, description: "Premium high-quality Netflix accounts and logs.", features: ["Premium", "4K Ready", "Long Lasting"], stock: "In Stock", popular: true },
  { id: 15, name: "Apple Music E-Codes", category: "Entertainment", price: 3500, description: "Apple Music gift codes and E-codes.", features: ["Instant", "Valid", "Global"], stock: "In Stock" },
  { id: 16, name: "iCloud Storage", category: "Entertainment", price: 4700, description: "Premium iCloud storage upgrades and accounts.", features: ["Secure", "Fast", "Reliable"], stock: "In Stock" },
  { id: 17, name: "Vons Logs", category: "Entertainment", price: 3900, description: "Verified Vons logs. Fresh and premium quality.", features: ["Verified", "Clean", "High Value"], stock: "In Stock" },
  { id: 18, name: "ID Card Editing Tools", category: "Tools", price: 7500, description: "Professional ID card editing tools. Tested & trusted.", features: ["Professional", "Tested", "Full Access"], stock: "Limited" },
];

const categories = ["All", "Social", "Numbers", "Entertainment", "Tools"];

const features = [
  { icon: Zap, title: "Fast & Clean", desc: "Instant delivery. No delays." },
  { icon: Shield, title: "Tested & Trusted", desc: "All accounts are verified and clean." },
  { icon: Clock, title: "No Excuses", desc: "Always available. No system slow days." },
  { icon: Users, title: "Premium Quality", desc: "Aged accounts, ready to use." },
];

const testimonials = [
  { name: "Khalid", role: "Reseller", text: "Best quality logs I’ve ever bought. USA WhatsApp is clean asf. Delivery is always instant." },
  { name: "Amara", role: "Power User", text: "Been using FAZELOGS for months. No issues with any accounts. They always deliver sharp." },
  { name: "David O.", role: "Business", text: "My go-to plug for everything. Facebook + Numbers always fresh. Highly recommended." },
];

const steps = [
  { num: "01", title: "Browse & Select", desc: "Choose from our wide selection of premium accounts and logs." },
  { num: "02", title: "Add to Cart", desc: "Pick your quantity and add items to your cart." },
  { num: "03", title: "Checkout & Pay", desc: "Complete your order with our secure process." },
  { num: "04", title: "Instant Delivery", desc: "Receive your accounts instantly via chat. No waiting." },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [checkoutForm, setCheckoutForm] = useState({ name: "", whatsapp: "", email: "" });
  const [orderComplete, setOrderComplete] = useState(false);

  // Filter products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.findIndex(item => item.id === product.id);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing].quantity += quantity;
        return updated;
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Open product modal
  const openProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  // Checkout handling
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    setOrderComplete(false);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.whatsapp) return;
    
    setOrderComplete(true);
    
    // Clear cart after successful "purchase"
    setTimeout(() => {
      setCart([]);
      setCheckoutForm({ name: "", whatsapp: "", email: "" });
    }, 2000);
  };

  const closeAllModals = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setSelectedProduct(null);
    setOrderComplete(false);
    setCheckoutForm({ name: "", whatsapp: "", email: "" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-emerald-600 py-2.5 text-center text-sm font-medium tracking-wide">
        🔥 Trusted & Approved • Tested Accounts • Instant Delivery • No Excuses
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center">
                <span className="font-bold text-xl tracking-tighter text-black">FL</span>
              </div>
              <div>
                <div className="font-semibold tracking-tighter text-2xl">FAZE LOGS</div>
                <div className="text-[10px] text-emerald-500 -mt-1.5 font-mono">PREMIUM MARKETPLACE</div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-9 text-sm font-medium">
            <button onClick={() => scrollToSection('shop')} className="hover:text-emerald-400 transition-colors">Shop</button>
            <button onClick={() => scrollToSection('categories')} className="hover:text-emerald-400 transition-colors">Categories</button>
            <button onClick={() => scrollToSection('how')} className="hover:text-emerald-400 transition-colors">How it Works</button>
            <button onClick={() => scrollToSection('support')} className="hover:text-emerald-400 transition-colors">Support</button>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/2340000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all text-sm font-medium border border-white/10"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Admin</span>
            </a>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-2xl font-semibold text-sm hover:bg-emerald-400 transition-all active:scale-[0.985]"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-mono tabular-nums">{cartCount}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm mb-6">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          DELIVERING SHARP SHARP ⚡
        </div>
        
        <h1 className="text-[3.15rem] sm:text-6xl md:text-8xl font-semibold tracking-tighter leading-none mb-6">
          FAZE LOGS<br />MARKETPLACE
        </h1>
        <p className="max-w-xl mx-auto text-lg sm:text-2xl text-zinc-400 tracking-tight mb-4">
          Premium accounts, foreign numbers &amp; verified logs.
        </p>
        <p className="max-w-md mx-auto text-base sm:text-lg text-emerald-400 mb-10">
          Your old plug is getting nervous already.<br />Once you try us, there’s no going back.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('shop')}
            className="group flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 transition-all px-9 py-4 rounded-3xl text-xl font-semibold text-black"
          >
            SHOP NOW 
            <ArrowRight className="group-hover:translate-x-0.5 transition" />
          </button>
          <button 
            onClick={() => scrollToSection('how')}
            className="flex items-center justify-center gap-3 px-9 py-4 rounded-3xl border border-white/20 hover:bg-white/5 transition-all text-lg font-medium"
          >
            How it Works
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-zinc-500">
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Fast Delivery</div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 100% Tested</div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Clean Accounts</div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-y border-white/10 py-5 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-sm">
          <div className="flex items-center gap-2 text-emerald-400">
            <Shield className="w-4 h-4" /> <span className="font-medium">Tested • Trusted • Approved</span>
          </div>
          <div>🇺🇸 USA Numbers Ready</div>
          <div>🇬🇧 UK Numbers Ready</div>
          <div>🌍 All Countries Available</div>
        </div>
      </div>

      {/* SHOP SECTION */}
      <div id="shop" className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-emerald-400 mb-1 font-medium">PREMIUM COLLECTION</div>
            <h2 className="text-5xl tracking-tighter font-semibold">Shop Accounts &amp; Logs</h2>
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-5 top-4 text-zinc-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 focus:border-emerald-500 transition pl-12 py-3.5 rounded-2xl placeholder:text-zinc-500 outline-none text-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div id="categories" className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat 
                  ? 'bg-white text-black border-white' 
                  : 'bg-zinc-900 border-white/10 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => openProduct(product)}
                className="group bg-zinc-900 border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col cursor-pointer transition-all active:scale-[0.985] hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs tracking-[1px] text-emerald-400 font-medium mb-1">{product.category.toUpperCase()}</div>
                    <h3 className="font-semibold text-2xl tracking-tight pr-2">{product.name}</h3>
                  </div>
                  {product.badge && (
                    <div className="text-[10px] font-mono bg-emerald-500 text-black px-3 py-px rounded font-semibold tracking-wider h-fit mt-1">{product.badge}</div>
                  )}
                </div>

                <p className="text-sm text-zinc-400 flex-1 leading-snug mb-5">{product.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {product.features.map((f, i) => (
                    <div key={i} className="text-xs bg-zinc-950 border border-white/10 px-3 py-px rounded-full text-zinc-400">{f}</div>
                  ))}
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-white/10 mt-auto">
                  <div>
                    <div className="text-xs text-zinc-500">FROM</div>
                    <div className="text-3xl font-semibold tracking-tighter tabular-nums">₦{product.price.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className={`px-3 py-1 rounded-full text-xs ${product.stock === "In Stock" ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"}`}>
                      {product.stock}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="bg-white hover:bg-emerald-400 transition px-5 py-2 text-sm font-semibold text-black rounded-2xl"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-zinc-500">
              No products found. Try a different search.
            </div>
          )}
        </div>
      </div>

      {/* HIGHLIGHT: USA WhatsApp */}
      <div className="bg-zinc-900 border-y border-white/10 py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="inline-block px-4 py-1 text-xs font-medium bg-emerald-500 text-black rounded-full tracking-widest mb-4">MOST POPULAR</div>
            <h3 className="font-semibold text-5xl tracking-tighter leading-none mb-3">USA WhatsApp</h3>
            <p className="text-xl text-zinc-400 mb-1">N2,900</p>
            <p className="text-lg">Verified. Clean. Ready to use instantly. Your old plug is already nervous.</p>
          </div>
          <button 
            onClick={() => {
              const wa = products.find(p => p.id === 1)!;
              openProduct(wa);
            }}
            className="flex-shrink-0 bg-emerald-500 hover:bg-white transition px-10 py-4 text-xl font-semibold rounded-3xl text-black flex items-center gap-3"
          >
            BUY USA WHATSAPP <ArrowRight />
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-6">
        {features.map((feat, index) => (
          <div key={index} className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
            <feat.icon className="w-8 h-8 mb-5 text-emerald-400" />
            <div className="font-semibold text-xl tracking-tight mb-1.5">{feat.title}</div>
            <div className="text-zinc-400">{feat.desc}</div>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div id="how" className="bg-zinc-900 py-16 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-emerald-400 font-medium tracking-[2px] text-sm mb-2">SIMPLE PROCESS</div>
            <h2 className="text-5xl font-semibold tracking-tighter">How it Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="border border-white/10 rounded-3xl p-8 bg-zinc-950">
                <div className="text-6xl font-mono font-bold text-white/10 mb-2 tracking-tighter">{step.num}</div>
                <div className="font-semibold text-2xl tracking-tight mb-2">{step.title}</div>
                <p className="text-zinc-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="font-medium tracking-[3px] text-emerald-400 text-xs mb-2">REAL RESULTS</div>
          <h3 className="text-4xl tracking-tighter font-semibold">What our customers say</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-zinc-900 p-8 rounded-3xl border border-white/10 flex flex-col">
              <div className="flex gap-1 mb-5">
                {Array(5).fill(0).map((_,i) => <Star key={i} className="w-4 h-4 text-emerald-400 fill-emerald-400" />)}
              </div>
              <div className="italic text-lg text-zinc-300 flex-1">“{t.text}”</div>
              <div className="pt-6 mt-auto text-sm">
                <span className="font-semibold">{t.name}</span> <span className="text-zinc-500">— {t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support & CTA */}
      <div id="support" className="max-w-4xl mx-auto px-6 pb-20 pt-8 text-center">
        <div className="rounded-3xl border border-white/10 bg-zinc-900 px-10 py-14">
          <div className="text-emerald-400 text-sm tracking-[3px] mb-2">NEED SOMETHING SPECIFIC?</div>
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Message the Community Admin</h2>
          <p className="text-zinc-400 max-w-xs mx-auto mb-8">We’re available 24/7. No delays. No excuses.</p>
          
          <a 
            href="https://wa.me/2340000000000" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-3xl text-lg font-semibold hover:bg-emerald-400 transition-all"
          >
            <MessageCircle className="w-5 h-5" /> CHAT WITH ADMIN ON WHATSAPP
          </a>
          
          <div className="mt-5 text-xs text-zinc-500">Accounts &amp; Foreign Numbers • @FAZELOGS 💚</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto px-6">
          © FAZE LOGS MARKETPLACE — All products are tested &amp; trusted. For entertainment &amp; personal use only.
          <div className="mt-1">Fast • Clean • Reliable</div>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-zinc-900 rounded-3xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="uppercase tracking-[3px] text-xs text-emerald-400 font-medium">{selectedProduct.category}</div>
                  <h3 className="text-4xl font-semibold tracking-tighter mt-1">{selectedProduct.name}</h3>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="p-2 -mr-2 text-zinc-400 hover:text-white"><X size={22} /></button>
              </div>

              <div className="my-8">
                <div className="text-5xl font-semibold tracking-tighter">₦{selectedProduct.price.toLocaleString()}</div>
                <div className="text-sm text-zinc-400 mt-0.5">per unit</div>
              </div>

              <p className="text-lg text-zinc-300 mb-7 leading-snug">{selectedProduct.description}</p>

              <div className="mb-6">
                <div className="font-medium mb-3 text-sm tracking-widest text-emerald-400">WHAT’S INCLUDED</div>
                <ul className="space-y-2 text-sm">
                  {selectedProduct.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="text-emerald-400"><Check className="w-4 h-4" /></div> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 py-4 bg-white hover:bg-emerald-400 transition text-lg font-semibold text-black rounded-2xl"
                >
                  ADD TO CART
                </button>
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setIsCartOpen(true);
                  }} 
                  className="flex-1 py-4 border border-white/20 hover:bg-white/5 transition text-lg font-semibold rounded-2xl"
                >
                  BUY NOW
                </button>
              </div>
            </div>
            <div className="px-8 py-4 text-xs bg-black/40 flex justify-center items-center gap-2 text-zinc-500 border-t border-white/10">
              <Clock className="w-3.5 h-3.5" /> Delivered instantly after purchase
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[80] flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="relative w-full max-w-md bg-zinc-950 h-full flex flex-col border-l border-white/10">
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
              <div className="font-semibold text-2xl flex items-center gap-3">
                Your Cart <span className="text-emerald-400 text-base font-mono">({cartCount})</span>
              </div>
              <button onClick={() => setIsCartOpen(false)}><X /></button>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="flex-1 overflow-auto p-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-zinc-900 p-4 rounded-2xl border border-white/10">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium tracking-tight">{item.name}</div>
                        <div className="text-emerald-400 text-sm font-mono tabular-nums">₦{item.price.toLocaleString()} × {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold tracking-tight">₦{(item.price * item.quantity).toLocaleString()}</div>
                        <div className="flex gap-px mt-2 justify-end">
                          <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-2.5 py-px text-sm bg-zinc-800 hover:bg-zinc-700 rounded-l-lg">-</button>
                          <div className="px-3 py-px text-sm bg-zinc-800 tabular-nums">{item.quantity}</div>
                          <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="px-2.5 py-px text-sm bg-zinc-800 hover:bg-zinc-700 rounded-r-lg">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="mt-1 text-[11px] text-red-400 hover:text-red-500">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-white/10 bg-zinc-900">
                  <div className="flex justify-between mb-4 text-lg">
                    <div>Total</div>
                    <div className="font-semibold tracking-tighter">₦{cartTotal.toLocaleString()}</div>
                  </div>
                  <button 
                    onClick={openCheckout} 
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 transition font-semibold text-lg rounded-2xl text-black"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                  <div className="text-center mt-3 text-xs text-zinc-500">Secure checkout • Instant delivery after payment</div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <ShoppingCart className="w-12 h-12 text-white/20 mb-4" />
                <div className="text-xl font-medium mb-1">Your cart is empty</div>
                <p className="text-zinc-500 mb-7">Add some premium accounts or numbers</p>
                <button onClick={() => setIsCartOpen(false)} className="px-8 py-3 bg-white text-black font-medium rounded-2xl">Continue Shopping</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[90] flex items-center justify-center p-6">
          <div className="bg-zinc-900 rounded-3xl max-w-md w-full">
            {!orderComplete ? (
              <>
                <div className="p-8">
                  <div className="flex justify-between mb-6">
                    <div>
                      <div className="text-xl font-semibold">Complete Your Order</div>
                      <div className="text-emerald-400 text-sm">Instant delivery on confirmation</div>
                    </div>
                    <button onClick={closeAllModals}><X /></button>
                  </div>

                  <div className="bg-zinc-950 border border-white/10 rounded-2xl p-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm py-1.5">
                        <div>{item.name} × {item.quantity}</div>
                        <div className="font-mono">₦{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-semibold">
                      <div>Total</div><div>₦{cartTotal.toLocaleString()}</div>
                    </div>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium tracking-widest text-white/60 block mb-1.5">YOUR NAME</label>
                      <input 
                        type="text" required 
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-2xl py-3 px-5 text-base focus:outline-none focus:border-emerald-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium tracking-widest text-white/60 block mb-1.5">WHATSAPP NUMBER</label>
                      <input 
                        type="tel" required 
                        value={checkoutForm.whatsapp}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, whatsapp: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-2xl py-3 px-5 text-base focus:outline-none focus:border-emerald-400"
                        placeholder="+234 801 234 5678"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium tracking-widest text-white/60 block mb-1.5">EMAIL (OPTIONAL)</label>
                      <input 
                        type="email"
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-2xl py-3 px-5 text-base focus:outline-none focus:border-emerald-400"
                        placeholder="you@example.com"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="mt-4 w-full bg-emerald-500 py-[17px] text-lg font-semibold rounded-2xl text-black hover:bg-emerald-400 active:bg-emerald-600 transition"
                    >
                      CONFIRM ORDER • PAY ₦{cartTotal.toLocaleString()}
                    </button>
                  </form>
                  <div className="text-[11px] text-center text-zinc-500 mt-5">You will be contacted on WhatsApp shortly after payment confirmation.</div>
                </div>
              </>
            ) : (
              <div className="p-10 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                  <Check className="text-emerald-400 w-8 h-8" />
                </div>
                <h3 className="text-3xl font-semibold tracking-tighter mb-2">Order Placed Successfully!</h3>
                <p className="text-emerald-400 mb-8">Your accounts &amp; logs will be delivered instantly.</p>
                
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5 text-left mb-6 text-sm">
                  <div className="font-medium mb-1 text-emerald-400">Next Step:</div>
                  Message the admin on WhatsApp with your order number.<br />
                  Delivery happens within minutes.
                </div>
                
                <a href="https://wa.me/2340000000000" target="_blank" className="inline-block text-sm font-semibold px-8 py-3.5 bg-white text-black rounded-2xl">OPEN WHATSAPP TO CHAT ADMIN →</a>
                <button onClick={closeAllModals} className="block mx-auto mt-5 text-xs text-zinc-500 hover:text-zinc-300">Close window</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
