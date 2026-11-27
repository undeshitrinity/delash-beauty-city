import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag, Search, Menu, X, Calendar, MapPin, Phone, Clock,
  CheckCircle, AlertTriangle, Plus, Minus, Trash2, Copy, Check,
  ExternalLink, Sparkles, Lock, LogOut, LayoutDashboard, Package,
  ShoppingCart, Users, Settings, FileText, Printer, ArrowRight,
  ChevronLeft, ChevronRight, SlidersHorizontal, ShieldCheck,
  CreditCard, Banknote, Smartphone, Store, Home, Eye, Edit3,
  TrendingUp, Award, Heart, Star, Info
} from 'lucide-react';

// ============================================================================
// 1. CONSTANTS, CATEGORIES & SEED DATA
// ============================================================================

const PRODUCT_CATEGORIES = [
  "Household Items",
  "Hair Kits",
  "Content Kits",
  "Exercise Kits",
  "Skin Care Kits",
  "Gift Ideas",
  "Hand Bags",
  "Slippers",
  "Wedge",
  "Sandals",
  "Cosmetics",
  "Perfumes",
  "Designer Perfumes",
  "Oils"
];

const INITIAL_STORE_SETTINGS = {
  businessName: "Delash Beauty City",
  address: "185, Goldies by Mount Zion",
  hotline: "+234 800 335 2740",
  whatsappNumber: "2348003352740", // digits only for wa.me
  businessHours: "Mon - Sat: 8:30 AM – 8:00 PM | Sun: 1:00 PM – 6:00 PM",
  opayBankName: "Opay Digital Services",
  opayAccountNumber: "8003352740",
  opayAccountName: "DELASH BEAUTY CITY ENTERPRISES",
  socials: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    facebook: "https://facebook.com"
  }
};

const INITIAL_STAFF_USERS = [
  { id: "staff-1", name: "Chief Admin (CEO)", role: "Admin", pin: "1234" },
  { id: "staff-2", name: "Front Desk Cashier", role: "Cashier", pin: "0000" }
];

const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    title: "Oud Royale Elixir Designer Perfume (100ml)",
    category: "Designer Perfumes",
    retailPrice: 28500,
    wholesalePrice: 22000,
    minWholesaleQty: 6,
    stock: 24,
    description: "Long-lasting Arabian & French fusion woody-amber eau de parfum. Ideal for retail luxury buyers and boutique resellers.",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-01T10:00:00Z"
  },
  {
    id: "prod-2",
    title: "Velvet Rose & Vanilla Body Mist & Perfume Duo",
    category: "Perfumes",
    retailPrice: 9500,
    wholesalePrice: 7200,
    minWholesaleQty: 6,
    stock: 42,
    description: "Sweet floral daily wear fragrance with 12-hour skin projection. Wholesale tier unlocks at 6 pieces.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-02T10:00:00Z"
  },
  {
    id: "prod-3",
    title: "24K Moroccan Argan & Jojoba Glow Oil (250ml)",
    category: "Oils",
    retailPrice: 11000,
    wholesalePrice: 8500,
    minWholesaleQty: 6,
    stock: 35,
    description: "Cold-pressed hydrating body & hair oil enriched with Vitamin E for luminous, even-toned skin.",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-03T10:00:00Z"
  },
  {
    id: "prod-4",
    title: "HD Matte Full-Coverage Liquid Foundation & Concealer Set",
    category: "Cosmetics",
    retailPrice: 14500,
    wholesalePrice: 11000,
    minWholesaleQty: 6,
    stock: 19,
    description: "Sweat-resistant, breathable skin-finish foundation paired with brightening under-eye concealer.",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-04T10:00:00Z"
  },
  {
    id: "prod-5",
    title: "Delash Complete Glass-Skin 5-Step Skincare Kit",
    category: "Skin Care Kits",
    retailPrice: 34000,
    wholesalePrice: 28000,
    minWholesaleQty: 4,
    stock: 14,
    description: "Includes Vitamin C Cleanser, Niacinamide Toner, Hyaluronic Serum, Barrier Repair Cream, and SPF 50 Sunscreen.",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-05T10:00:00Z"
  },
  {
    id: "prod-6",
    title: "Creator Pro 18-Inch Ring Light & Tripod Content Kit",
    category: "Content Kits",
    retailPrice: 48000,
    wholesalePrice: 41000,
    minWholesaleQty: 3,
    stock: 8,
    description: "3 color temperatures, wireless remote shutter, dual phone holders, and carry bag for crisp beauty & lifestyle reels.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-06T10:00:00Z"
  },
  {
    id: "prod-7",
    title: "Silk Press & Edge Control Salon Hair Kit",
    category: "Hair Kits",
    retailPrice: 22500,
    wholesalePrice: 18000,
    minWholesaleQty: 5,
    stock: 16,
    description: "Ceramic straightening comb, heat protectant serum, extreme-hold edge control, and satin bonnet.",
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-07T10:00:00Z"
  },
  {
    id: "prod-8",
    title: "Quilted Gold-Chain Luxury Crossbody Hand Bag",
    category: "Hand Bags",
    retailPrice: 26000,
    wholesalePrice: 21500,
    minWholesaleQty: 4,
    stock: 11,
    description: "Structured vegan leather evening & brunch bag with tarnish-free gold chain strap and interior compartments.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-08T10:00:00Z"
  },
  {
    id: "prod-9",
    title: "Plush Cloud Orthopedic Indoor/Outdoor Slippers",
    category: "Slippers",
    retailPrice: 8500,
    wholesalePrice: 6500,
    minWholesaleQty: 6,
    stock: 29,
    description: "Ultra-cushioned non-slip EVA sole slides available in versatile neutral shades.",
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-09T10:00:00Z"
  },
  {
    id: "prod-10",
    title: "Sunset Espadrille Platform Wedge Heels",
    category: "Wedge",
    retailPrice: 24000,
    wholesalePrice: 19500,
    minWholesaleQty: 4,
    stock: 4,
    description: "Comfortable 3.5-inch cushioned ankle-strap wedges built for all-day elegance.",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-10T10:00:00Z"
  },
  {
    id: "prod-11",
    title: "Minimalist Strappy Gold-Buckle Flat Sandals",
    category: "Sandals",
    retailPrice: 15500,
    wholesalePrice: 12500,
    minWholesaleQty: 5,
    stock: 18,
    description: "Handcrafted breathable leatherette sandals with padded footbed for everyday chic.",
    images: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-11T10:00:00Z"
  },
  {
    id: "prod-12",
    title: "Sculpt & Tone Resistance Bands + Yoga Mat Exercise Kit",
    category: "Exercise Kits",
    retailPrice: 19000,
    wholesalePrice: 15000,
    minWholesaleQty: 5,
    stock: 15,
    description: "High-density 10mm non-slip mat, 3 fabric booty resistance bands, and skipping rope.",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-12T10:00:00Z"
  },
  {
    id: "prod-13",
    title: "Aromatic Reed Diffuser & Ultrasonic Humidifier Household Set",
    category: "Household Items",
    retailPrice: 17500,
    wholesalePrice: 14000,
    minWholesaleQty: 5,
    stock: 22,
    description: "Transform your living room or bedroom into a serene luxury spa with warm LED mist.",
    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-13T10:00:00Z"
  },
  {
    id: "prod-14",
    title: "Royal Pamper Hamper Luxury Gift Box",
    category: "Gift Ideas",
    retailPrice: 45000,
    wholesalePrice: 38000,
    minWholesaleQty: 3,
    stock: 9,
    description: "Curated gift box featuring mini designer perfume, scented soy candle, silk eye mask, and body shimmer oil.",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: "2026-11-14T10:00:00Z"
  }
];

const INITIAL_SERVICES = [
  {
    id: "srv-1",
    name: "Facial Spa",
    price: 18000,
    duration: "60 mins",
    requiresSkinFields: true,
    description: "Deep pore steam cleansing, gentle exfoliation, blackhead extraction, hydrating jelly mask, and LED light therapy."
  },
  {
    id: "srv-2",
    name: "Teeth Scaling & Whitening",
    price: 35000,
    duration: "45 mins",
    requiresSkinFields: false,
    description: "Ultrasonic plaque & tartar scaling followed by enamel-safe laser whitening for up to 6 shades brighter smile."
  },
  {
    id: "srv-3",
    name: "Skin Tag Removal",
    price: 20000,
    duration: "30 mins",
    requiresSkinFields: true,
    description: "Safe, precise, minimal-discomfort cosmetic removal of benign skin tags with soothing post-care recovery serum."
  },
  {
    id: "srv-4",
    name: "Skincare Treatments",
    price: 25000,
    duration: "75 mins",
    requiresSkinFields: true,
    description: "Targeted clinical facials including chemical peels, microneedling glow therapy, and hyperpigmentation repair."
  },
  {
    id: "srv-5",
    name: "Pimple / Dull Skin / White Patch Consultations",
    price: 10000,
    duration: "40 mins",
    requiresSkinFields: true,
    description: "One-on-one skin barrier diagnosis and customized product & treatment roadmap for acne, dullness, and white patches."
  },
  {
    id: "srv-6",
    name: "Massage & Spa Services",
    price: 22000,
    duration: "60 mins",
    requiresSkinFields: false,
    description: "Full-body Swedish, deep tissue, or hot stone aromatherapy massage to melt away stress and muscle tension."
  }
];

const ORDER_STATUSES = [
  "Pending Payment",
  "Payment Confirmed",
  "Processing",
  "Out for Delivery",
  "Completed",
  "Cancelled"
];

const INITIAL_ORDERS = [
  {
    id: "DBC-1041",
    customerName: "Chidinma Okafor",
    phone: "08031234567",
    whatsapp: "08031234567",
    address: "14 Marian Road, Calabar",
    notes: "Please call when outside the gate.",
    items: [
      {
        productId: "prod-1",
        title: "Oud Royale Elixir Designer Perfume (100ml)",
        qty: 6,
        unitPrice: 22000,
        isWholesale: true
      }
    ],
    total: 132000,
    status: "Completed",
    createdAt: "2026-11-25T14:30:00Z"
  },
  {
    id: "DBC-1042",
    customerName: "Amina Bello",
    phone: "08129876543",
    whatsapp: "08129876543",
    address: "Plot 8 State Housing Estate",
    notes: "Gift wrap if possible.",
    items: [
      {
        productId: "prod-5",
        title: "Delash Complete Glass-Skin 5-Step Skincare Kit",
        qty: 1,
        unitPrice: 34000,
        isWholesale: false
      },
      {
        productId: "prod-3",
        title: "24K Moroccan Argan & Jojoba Glow Oil (250ml)",
        qty: 2,
        unitPrice: 11000,
        isWholesale: false
      }
    ],
    total: 56000,
    status: "Payment Confirmed",
    createdAt: "2026-11-26T11:15:00Z"
  }
];

const INITIAL_WALKIN_SALES = [
  {
    id: "POS-5001",
    customerName: "Walk-In Customer (Mercy)",
    cashierName: "Front Desk Cashier",
    paymentMethod: "POS Card",
    status: "Payment Confirmed",
    items: [
      {
        productId: "prod-2",
        title: "Velvet Rose & Vanilla Body Mist & Perfume Duo",
        qty: 6,
        unitPrice: 7200,
        isWholesale: true
      }
    ],
    total: 43200,
    createdAt: "2026-11-26T13:20:00Z"
  }
];

const INITIAL_BOOKINGS = [
  {
    id: "BK-201",
    customerName: "Blessing Effiong",
    phone: "07065554433",
    whatsapp: "07065554433",
    services: [
      { id: "srv-1", name: "Facial Spa", price: 18000 },
      { id: "srv-5", name: "Pimple / Dull Skin / White Patch Consultations", price: 10000 }
    ],
    total: 28000,
    date: "2026-11-28",
    timeSlot: "11:00 AM",
    locationType: "In-Store",
    locationAddress: "185, Goldies by Mount Zion",
    skinType: "Combination",
    skinConcerns: "Mild cheek pimples and uneven forehead dullness.",
    status: "Pending",
    createdAt: "2026-11-26T09:45:00Z"
  }
];

// ============================================================================
// 2. UTILITY FUNCTIONS
// ============================================================================

const formatNaira = (amount) => {
  return `₦${Number(amount || 0).toLocaleString('en-NG')}`;
};

const getEffectiveUnitPrice = (product, quantity) => {
  if (
    product.wholesalePrice &&
    product.minWholesaleQty &&
    quantity >= product.minWholesaleQty
  ) {
    return {
      unitPrice: Number(product.wholesalePrice),
      isWholesale: true
    };
  }
  return {
    unitPrice: Number(product.retailPrice),
    isWholesale: false
  };
};

// Persistent state hook backed by localStorage with safe fallback
function usePersistedState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      // Ignore storage quota errors in restricted environments
    }
  }, [key, state]);

  return [state, setState];
}

// ============================================================================
// 3. MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Core Persistent Database Tables
  const [products, setProducts] = usePersistedState("dbc_products_v1", INITIAL_PRODUCTS);
  const [services, setServices] = usePersistedState("dbc_services_v1", INITIAL_SERVICES);
  const [orders, setOrders] = usePersistedState("dbc_orders_v1", INITIAL_ORDERS);
  const [walkInSales, setWalkInSales] = usePersistedState("dbc_walkin_v1", INITIAL_WALKIN_SALES);
  const [bookings, setBookings] = usePersistedState("dbc_bookings_v1", INITIAL_BOOKINGS);
  const [staffUsers, setStaffUsers] = usePersistedState("dbc_staff_v1", INITIAL_STAFF_USERS);
  const [storeSettings, setStoreSettings] = usePersistedState("dbc_settings_v1", INITIAL_STORE_SETTINGS);

  // Navigation & Routing State (supports /, /booking, /admin, /admin_2.l)
  const [activeRoute, setActiveRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const path = window.location.pathname;
    if (hash.includes('admin') || path.includes('admin')) return 'admin';
    if (hash === 'booking') return 'booking';
    return 'store';
  });

  // Sync route changes cleanly
  const navigateTo = (route) => {
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Storefront UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart & Checkout State
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Toast Notification Banner (No alert() / confirm())
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3600);
  };

  // Staff Portal Auth State
  const [currentStaff, setCurrentStaff] = useState(null);

  // ==========================================================================
  // CART & ATOMIC STOCK LOGIC
  // ==========================================================================

  const addToCart = (product, qtyToAdd = 1) => {
    const liveProduct = products.find((p) => p.id === product.id);
    if (!liveProduct || liveProduct.stock <= 0) {
      showToast("Sorry, this item is currently out of stock.", "error");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      const currentQty = existing ? existing.qty : 0;
      const nextQty = Math.min(liveProduct.stock, currentQty + qtyToAdd);

      if (currentQty >= liveProduct.stock) {
        showToast(`Maximum available stock (${liveProduct.stock}) reached.`, "warning");
        return prev;
      }

      showToast(`Added "${product.title}" to cart!`);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, qty: nextQty } : item
        );
      }
      return [...prev, { productId: product.id, qty: nextQty }];
    });
  };

  const updateCartQty = (productId, delta) => {
    const liveProduct = products.find((p) => p.id === productId);
    if (!liveProduct) return;

    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId !== productId) return item;
          const nextQty = item.qty + delta;
          if (nextQty <= 0) return null;
          if (nextQty > liveProduct.stock) {
            showToast(`Only ${liveProduct.stock} units available in stock.`, "warning");
            return { ...item, qty: liveProduct.stock };
          }
          return { ...item, qty: nextQty };
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Enriched cart items with real-time pricing & wholesale calculations
  const enrichedCart = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        const safeQty = Math.min(item.qty, product.stock);
        if (safeQty <= 0) return null;
        const { unitPrice, isWholesale } = getEffectiveUnitPrice(product, safeQty);
        const retailTotal = product.retailPrice * safeQty;
        const lineTotal = unitPrice * safeQty;
        return {
          product,
          qty: safeQty,
          unitPrice,
          isWholesale,
          lineTotal,
          savings: retailTotal - lineTotal
        };
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartSummary = useMemo(() => {
    const totalItems = enrichedCart.reduce((acc, item) => acc + item.qty, 0);
    const subtotal = enrichedCart.reduce((acc, item) => acc + item.lineTotal, 0);
    const totalSavings = enrichedCart.reduce((acc, item) => acc + item.savings, 0);
    return { totalItems, subtotal, totalSavings };
  }, [enrichedCart]);

  // ==========================================================================
  // ONLINE ORDER PLACEMENT (ATOMIC STOCK DEDUCTION)
  // ==========================================================================

  const handlePlaceOnlineOrder = (customerForm) => {
    if (enrichedCart.length === 0) {
      showToast("Your cart is empty.", "error");
      return;
    }

    // Atomic verification: ensure every item still has enough stock
    for (const item of enrichedCart) {
      const freshProd = products.find((p) => p.id === item.product.id);
      if (!freshProd || freshProd.stock < item.qty) {
        showToast(
          `Insufficient stock for ${item.product.title}. Please adjust quantity.`,
          "error"
        );
        return;
      }
    }

    // Deduct stock atomically
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const ordered = enrichedCart.find((c) => c.product.id === prod.id);
        if (!ordered) return prod;
        return {
          ...prod,
          stock: Math.max(0, prod.stock - ordered.qty)
        };
      })
    );

    // Generate unique Order ID
    const randomNum = Math.floor(1043 + Math.random() * 8900);
    const orderId = `DBC-${randomNum}`;

    const newOrder = {
      id: orderId,
      customerName: customerForm.fullName.trim(),
      phone: customerForm.phone.trim(),
      whatsapp: customerForm.whatsapp.trim() || customerForm.phone.trim(),
      address: customerForm.address.trim(),
      notes: customerForm.notes.trim(),
      items: enrichedCart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        qty: item.qty,
        unitPrice: item.unitPrice,
        isWholesale: item.isWholesale
      })),
      total: cartSummary.subtotal,
      status: "Pending Payment",
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    setCompletedOrder(newOrder);
    showToast(`Order ${orderId} created! Send your receipt on WhatsApp.`);
  };

  // ==========================================================================
  // ADMIN / STAFF VIEW RENDERING
  // ==========================================================================

  if (activeRoute === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <ToastNotification toast={toast} onClose={() => setToast(null)} />
        {!currentStaff ? (
          <StaffPinLogin
            staffUsers={staffUsers}
            storeSettings={storeSettings}
            onSuccess={(staff) => {
              setCurrentStaff(staff);
              showToast(`Welcome back, ${staff.name}!`);
            }}
            onBackToStore={() => navigateTo('store')}
          />
        ) : (
          <StaffDashboard
            currentStaff={currentStaff}
            onLogout={() => {
              setCurrentStaff(null);
              showToast("Logged out of Staff Portal.");
            }}
            onBackToStore={() => navigateTo('store')}
            products={products}
            setProducts={setProducts}
            services={services}
            setServices={setServices}
            orders={orders}
            setOrders={setOrders}
            walkInSales={walkInSales}
            setWalkInSales={setWalkInSales}
            bookings={bookings}
            setBookings={setBookings}
            staffUsers={staffUsers}
            setStaffUsers={setStaffUsers}
            storeSettings={storeSettings}
            setStoreSettings={setStoreSettings}
            showToast={showToast}
          />
        )}
      </div>
    );
  }

  // ==========================================================================
  // PUBLIC CUSTOMER STOREFRONT & BOOKING PLATFORM
  // ==========================================================================

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Top Announcement Strip */}
      <div className="bg-black text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>{storeSettings.address}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-orange-400 font-medium">
              Automatic Wholesale Discounts on Perfumes, Oils & Cosmetics!
            </span>
            <span className="text-slate-400">|</span>
            <a
              href={`tel:${storeSettings.hotline}`}
              className="hover:text-orange-400 transition flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-orange-500" />
              {storeSettings.hotline}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => {
                navigateTo('store');
                setSelectedCategory('All');
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition">
                D
              </div>
              <div>
                <span className="block font-extrabold text-base sm:text-lg tracking-tight text-slate-900 leading-none">
                  DELASH
                </span>
                <span className="block text-[11px] font-bold tracking-widest text-orange-600 uppercase mt-0.5">
                  Beauty City
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          {activeRoute === 'store' && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search perfumes, oils, skincare, bags, kits..."
                  className="w-full pl-10 pr-9 py-2.5 bg-slate-100 border border-transparent focus:border-orange-500 focus:bg-white rounded-full text-sm outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigateTo('store')}
              className={`hidden sm:inline-flex px-3.5 py-2 rounded-full text-sm font-semibold transition ${
                activeRoute === 'store'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Shop Store
            </button>

            <button
              onClick={() => navigateTo('booking')}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-sm ${
                activeRoute === 'booking'
                  ? 'bg-orange-600 text-white ring-2 ring-orange-300'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Spa/Service</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full bg-slate-100 hover:bg-orange-50 text-slate-900 hover:text-orange-600 transition"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartSummary.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center shadow">
                  {cartSummary.totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {activeRoute === 'store' && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products & categories..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        )}

        {/* Category Strip (Desktop) */}
        {activeRoute === 'store' && (
          <div className="hidden lg:block border-t border-slate-100 bg-slate-50/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === "All"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-slate-700 hover:bg-white hover:text-orange-600"
                }`}
              >
                All Products
              </button>
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-slate-700 hover:bg-white hover:text-orange-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 shadow-xl">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  navigateTo('store');
                  setMobileMenuOpen(false);
                }}
                className={`py-2.5 px-3 rounded-xl text-sm font-bold text-center ${
                  activeRoute === 'store'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                Shop Catalog
              </button>
              <button
                onClick={() => {
                  navigateTo('booking');
                  setMobileMenuOpen(false);
                }}
                className={`py-2.5 px-3 rounded-xl text-sm font-bold text-center ${
                  activeRoute === 'booking'
                    ? 'bg-orange-600 text-white'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                Book Spa & Skincare
              </button>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Shop by Category
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    navigateTo('store');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    selectedCategory === "All"
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  All
                </button>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      navigateTo('store');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedCategory === cat
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeRoute === 'store' ? (
          <StorefrontView
            products={products}
            services={services}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onAddToCart={addToCart}
            onOpenProduct={(prod) => setSelectedProduct(prod)}
            onNavigateBooking={() => navigateTo('booking')}
            storeSettings={storeSettings}
          />
        ) : (
          <BookingPlatformView
            services={services}
            bookings={bookings}
            setBookings={setBookings}
            storeSettings={storeSettings}
            showToast={showToast}
            onBackToStore={() => navigateTo('store')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-slate-900 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-xl">
                  D
                </div>
                <div>
                  <h3 className="font-extrabold text-lg tracking-tight">DELASH BEAUTY CITY</h3>
                  <p className="text-xs text-orange-400 font-semibold">
                    Retail • Wholesale • Luxury Spa
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your premier destination for authentic designer perfumes, skincare kits, lifestyle essentials, and clinical spa treatments.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {["Instagram", "WhatsApp", "TikTok", "Facebook"].map((social) => (
                  <a
                    key={social}
                    href={
                      social === "WhatsApp"
                        ? `https://wa.me/${storeSettings.whatsappNumber}`
                        : "#"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-orange-500 text-xs font-semibold text-slate-200 hover:text-white transition"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Popular Categories */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-orange-500 mb-4">
                Shop Categories
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {[
                  "Designer Perfumes",
                  "Perfumes",
                  "Oils",
                  "Cosmetics",
                  "Skin Care Kits",
                  "Hair Kits",
                  "Hand Bags"
                ].map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        navigateTo('store');
                      }}
                      className="hover:text-orange-400 transition"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spa & Clinical Services */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-orange-500 mb-4">
                Spa & Consultations
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {services.slice(0, 6).map((srv) => (
                  <li key={srv.id}>
                    <button
                      onClick={() => navigateTo('booking')}
                      className="hover:text-orange-400 transition text-left"
                    >
                      {srv.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Store Location & Hours */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-orange-500">
                Visit Our Store & Spa
              </h4>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-1" />
                  <span>{storeSettings.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{storeSettings.hotline}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-1" />
                  <span>{storeSettings.businessHours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Delash Beauty City. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href="#/admin_2.l"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('admin');
                }}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-orange-400 transition font-medium"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Staff / Admin Login</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={products.find((p) => p.id === selectedProduct.id) || selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Slide-out Smart Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        enrichedCart={enrichedCart}
        cartSummary={cartSummary}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
        onProceedCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Opay Checkout Modal */}
      {checkoutOpen && (
        <CheckoutModal
          enrichedCart={enrichedCart}
          cartSummary={cartSummary}
          storeSettings={storeSettings}
          onClose={() => setCheckoutOpen(false)}
          onSubmitOrder={handlePlaceOnlineOrder}
          showToast={showToast}
        />
      )}

      {/* WhatsApp Order Confirmation Modal */}
      {completedOrder && (
        <OrderSuccessModal
          order={completedOrder}
          storeSettings={storeSettings}
          onClose={() => setCompletedOrder(null)}
        />
      )}
    </div>
  );
}

// ============================================================================
// 4. CUSTOMER STOREFRONT COMPONENT
// ============================================================================

function StorefrontView({
  products,
  services,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onAddToCart,
  onOpenProduct,
  onNavigateBooking,
  storeSettings
}) {
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat =
          selectedCategory === "All" || p.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q));

        let matchesPrice = true;
        if (priceRange === "under15k") matchesPrice = p.retailPrice < 15000;
        else if (priceRange === "15kto30k")
          matchesPrice = p.retailPrice >= 15000 && p.retailPrice <= 30000;
        else if (priceRange === "above30k") matchesPrice = p.retailPrice > 30000;

        return matchesCat && matchesQuery && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.retailPrice - b.retailPrice;
        if (sortBy === "price-desc") return b.retailPrice - a.retailPrice;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f9731633,transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>185, Goldies by Mount Zion • Retail & Wholesale</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Glow Beyond Limits at{" "}
                <span className="text-orange-500">Delash Beauty City</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Shop luxury designer perfumes, body oils, skincare kits, fashion bags & creator kits—with{" "}
                <strong className="text-white">automatic wholesale discounts</strong> when you buy in bulk, plus clinical spa & skincare treatments.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#catalog"
                  className="px-6 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition flex items-center gap-2"
                >
                  <span>Shop Retail & Wholesale</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={onNavigateBooking}
                  className="px-6 py-3.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm sm:text-base transition flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-orange-600" />
                  <span>Book Spa & Skin Consultation</span>
                </button>
              </div>

              {/* Trust Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-lg">
                <div>
                  <p className="text-lg sm:text-xl font-black text-orange-400">14+</p>
                  <p className="text-xs text-slate-400">Curated Categories</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-black text-white">Auto-Tier</p>
                  <p className="text-xs text-slate-400">Wholesale Cart Pricing</p>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-black text-orange-400">In-Store/Home</p>
                  <p className="text-xs text-slate-400">Spa & Skin Specialists</p>
                </div>
              </div>
            </div>

            {/* Right Visual Feature Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Featured Spa & Skin Services
                  </span>
                  <span className="text-xs text-slate-400">In-Store or Hotel/Home</span>
                </div>
                <div className="space-y-3">
                  {services.slice(0, 4).map((srv) => (
                    <div
                      key={srv.id}
                      onClick={onNavigateBooking}
                      className="p-3.5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 cursor-pointer transition flex items-center justify-between gap-3 group"
                    >
                      <div>
                        <p className="font-bold text-sm text-white group-hover:text-orange-400 transition">
                          {srv.name}
                        </p>
                        <p className="text-xs text-slate-400">{srv.duration}</p>
                      </div>
                      <span className="font-extrabold text-sm text-orange-400 shrink-0">
                        {formatNaira(srv.price)}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onNavigateBooking}
                  className="w-full py-3 rounded-xl bg-orange-500/15 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 font-bold text-sm transition"
                >
                  View All 6 Services & Book Slot →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Delash Storefront
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {selectedCategory === "All" ? "All Beauty & Lifestyle Products" : selectedCategory}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Dropdown (Mobile/Tablet convenience) */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:border-orange-500 outline-none"
            >
              <option value="All">All Categories ({products.length})</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:border-orange-500 outline-none"
            >
              <option value="all">All Prices</option>
              <option value="under15k">Under ₦15,000</option>
              <option value="15kto30k">₦15,000 – ₦30,000</option>
              <option value="above30k">Above ₦30,000</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:border-orange-500 outline-none"
            >
              <option value="newest">Sort: Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center space-y-3">
            <p className="text-lg font-bold text-slate-800">No matching products found</p>
            <p className="text-sm text-slate-500">
              Try clearing your search filter or switching categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setPriceRange("all");
              }}
              className="px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock <= 0;
              const isLowStock = product.stock > 0 && product.stock <= 5;
              const hasWholesale =
                product.wholesalePrice &&
                product.minWholesaleQty &&
                product.wholesalePrice < product.retailPrice;

              return (
                <div
                  key={product.id}
                  className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 transition flex flex-col"
                >
                  {/* Product Image */}
                  <div
                    onClick={() => onOpenProduct(product)}
                    className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {hasWholesale && (
                        <span className="px-2.5 py-1 rounded-full bg-black/85 text-orange-400 text-[11px] font-bold backdrop-blur-sm">
                          Wholesale: {product.minWholesaleQty}+ @ {formatNaira(product.wholesalePrice)}
                        </span>
                      )}
                    </div>

                    {/* Stock Status Badge */}
                    <div className="absolute bottom-3 left-3">
                      {isOutOfStock ? (
                        <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold">
                          Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[11px] font-bold">
                          Low Stock ({product.stock} left)
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-bold">
                          In Stock ({product.stock})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                        {product.category}
                      </span>
                      <h3
                        onClick={() => onOpenProduct(product)}
                        className="font-bold text-slate-900 text-base mt-1 line-clamp-2 cursor-pointer hover:text-orange-600 transition"
                      >
                        {product.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-black text-slate-900">
                            {formatNaira(product.retailPrice)}
                          </span>
                          <span className="text-xs text-slate-400 ml-1">/ unit</span>
                        </div>
                        <button
                          onClick={() => onOpenProduct(product)}
                          className="text-xs font-semibold text-slate-500 hover:text-orange-600 underline"
                        >
                          Details
                        </button>
                      </div>

                      <button
                        disabled={isOutOfStock}
                        onClick={() => onAddToCart(product, 1)}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                          isOutOfStock
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white shadow-sm"
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{isOutOfStock ? "Sold Out" : "Add to Cart"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

// ============================================================================
// 5. PRODUCT DETAIL MODAL WITH MULTI-PHOTO GALLERY & ZOOM
// ============================================================================

function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [qty, setQty] = useState(1);

  const photos = product.images?.length
    ? product.images
    : ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"];

  const { unitPrice, isWholesale } = getEffectiveUnitPrice(product, qty);
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            {product.category}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Gallery with Click Zoom */}
          <div className="space-y-3">
            <div
              onClick={() => setZoomed(!zoomed)}
              className="relative aspect-square rounded-2xl bg-slate-100 overflow-hidden cursor-zoom-in border border-slate-200"
            >
              <img
                src={photos[activePhotoIdx]}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  zoomed ? "scale-150 cursor-zoom-out" : "hover:scale-110"
                }`}
              />
              <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-medium">
                {zoomed ? "Click to reset zoom" : "Click or hover to zoom"}
              </span>
            </div>

            {photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {photos.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActivePhotoIdx(idx);
                      setZoomed(false);
                    }}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                      activePhotoIdx === idx
                        ? "border-orange-500 ring-2 ring-orange-200"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Wholesale Pricing */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {product.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl font-black text-slate-900">
                  {formatNaira(unitPrice)}
                </span>
                {isWholesale && (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Wholesale Price Active! (Was {formatNaira(product.retailPrice)})
                  </span>
                )}
              </div>

              {/* Wholesale Tier Callout */}
              {product.wholesalePrice && product.minWholesaleQty && (
                <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 flex items-start gap-3">
                  <Award className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-800">
                    <p className="font-bold text-orange-800">Wholesale Bulk Tier Available</p>
                    <p className="mt-0.5">
                      Buy <strong>{product.minWholesaleQty}+ units</strong> at{" "}
                      <strong className="text-orange-700">
                        {formatNaira(product.wholesalePrice)}
                      </strong>{" "}
                      each (Save{" "}
                      {formatNaira(product.retailPrice - product.wholesalePrice)} per unit!).
                    </p>
                  </div>
                </div>
              )}

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description || "Premium quality item from Delash Beauty City."}
              </p>

              <div className="text-sm font-semibold">
                Availability:{" "}
                {isOutOfStock ? (
                  <span className="text-red-600">Out of Stock</span>
                ) : (
                  <span className="text-emerald-600">{product.stock} units ready to ship</span>
                )}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            {!isOutOfStock && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">Select Quantity:</span>
                  <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-1">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold hover:text-orange-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-black text-base">{qty}</span>
                    <button
                      onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                      className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold hover:text-orange-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>
                    Add {qty} to Cart — {formatNaira(unitPrice * qty)}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. SMART SLIDE-OUT SHOPPING CART DRAWER
// ============================================================================

function CartDrawer({
  isOpen,
  onClose,
  enrichedCart,
  cartSummary,
  onUpdateQty,
  onRemove,
  onProceedCheckout
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-black text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h2 className="font-bold text-lg">Your Shopping Bag</h2>
            <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs font-bold">
              {cartSummary.totalItems}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {enrichedCart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-900 text-lg">Your bag is empty</p>
              <p className="text-sm text-slate-500 max-w-xs">
                Explore our perfumes, oils, skincare kits, bags, and lifestyle items.
              </p>
            </div>
          ) : (
            enrichedCart.map(({ product, qty, unitPrice, isWholesale, lineTotal }) => {
              const unitsNeededForWholesale =
                product.wholesalePrice && product.minWholesaleQty && !isWholesale
                  ? product.minWholesaleQty - qty
                  : 0;

              return (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-2">
                        {product.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-extrabold text-sm text-orange-600">
                          {formatNaira(unitPrice)}
                        </span>
                        {isWholesale && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Wholesale Discount Applied
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="text-slate-400 hover:text-red-600 p-1 self-start"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Upsell hint if close to wholesale threshold */}
                  {unitsNeededForWholesale > 0 &&
                    product.stock >= product.minWholesaleQty && (
                      <div className="text-[11px] bg-orange-100/80 text-orange-800 px-2.5 py-1.5 rounded-lg font-medium">
                        Add <strong>{unitsNeededForWholesale} more</strong> to unlock{" "}
                        <strong>{formatNaira(product.wholesalePrice)}/unit</strong> wholesale price!
                      </div>
                    )}

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQty(product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold">{qty}</span>
                      <button
                        onClick={() => onUpdateQty(product.id, 1)}
                        disabled={qty >= product.stock}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="font-black text-sm text-slate-900">
                      {formatNaira(lineTotal)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cart Summary Footer */}
        {enrichedCart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            {cartSummary.totalSavings > 0 && (
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                <span>Wholesale Bulk Savings</span>
                <span>-{formatNaira(cartSummary.totalSavings)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-base">
              <span className="font-semibold text-slate-600">Total Amount</span>
              <span className="text-2xl font-black text-slate-900">
                {formatNaira(cartSummary.subtotal)}
              </span>
            </div>

            <button
              onClick={onProceedCheckout}
              className="w-full py-3.5 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 7. OPAY CHECKOUT & WHATSAPP ORDER CONFIRMATION MODALS
// ============================================================================

function CheckoutModal({
  enrichedCart,
  cartSummary,
  storeSettings,
  onClose,
  onSubmitOrder,
  showToast
}) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    address: "",
    notes: ""
  });
  const [copied, setCopied] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText(storeSettings.opayAccountNumber);
    setCopied(true);
    showToast("Opay account number copied!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address) {
      showToast("Please complete your Name, Phone, and Delivery Address.", "error");
      return;
    }
    onSubmitOrder(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto">
        <div className="px-6 py-4 bg-black text-white flex items-center justify-between">
          <h2 className="font-bold text-lg">Complete Your Order</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Opay Bank Transfer Box */}
          <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-3 border border-emerald-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Step 1: Opay Bank Transfer Details
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                Total: {formatNaira(cartSummary.subtotal)}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm bg-black/30 p-3.5 rounded-xl">
              <div>
                <p className="text-xs text-slate-400">Bank Name</p>
                <p className="font-bold text-white">{storeSettings.opayBankName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Account Name</p>
                <p className="font-bold text-white">{storeSettings.opayAccountName}</p>
              </div>
              <div className="sm:col-span-2 flex items-center justify-between pt-2 border-t border-white/10">
                <div>
                  <p className="text-xs text-slate-400">Account Number</p>
                  <p className="text-xl font-black tracking-wider text-orange-400">
                    {storeSettings.opayAccountNumber}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied" : "Copy Account"}</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-emerald-200/90">
              Transfer <strong>{formatNaira(cartSummary.subtotal)}</strong> via Opay or any bank app, then submit below to send your payment receipt on WhatsApp.
            </p>
          </div>

          {/* Customer Delivery Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">
              Step 2: Customer & Delivery Details
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Grace Bassey"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. 08012345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Number (for delivery updates)
                </label>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="Same as phone if left blank"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Street address, landmark, city..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery / Order Notes (Optional)
                </label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any special delivery instructions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/20 transition"
          >
            Place Order & Generate WhatsApp Receipt ({formatNaira(cartSummary.subtotal)})
          </button>
        </form>
      </div>
    </div>
  );
}

function OrderSuccessModal({ order, storeSettings, onClose }) {
  const whatsappText = useMemo(() => {
    const itemsList = order.items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.title} x${i.qty} (${formatNaira(i.unitPrice * i.qty)})${
            i.isWholesale ? " [Wholesale]" : ""
          }`
      )
      .join("\n");

    return encodeURIComponent(
      `Hello *Delash Beauty City*! 🧡\n\nI just placed an order and made my Opay transfer. Here are my details:\n\n` +
        `*Order ID:* ${order.id}\n` +
        `*Name:* ${order.customerName}\n` +
        `*Phone:* ${order.phone}\n` +
        `*Delivery Address:* ${order.address}\n` +
        (order.notes ? `*Notes:* ${order.notes}\n` : "") +
        `\n*Ordered Items:*\n${itemsList}\n\n` +
        `*Total Paid:* ${formatNaira(order.total)}\n\n` +
        `_(Attaching my Opay payment receipt screenshot below)_`
    );
  }, [order]);

  const whatsappUrl = `https://wa.me/${storeSettings.whatsappNumber}?text=${whatsappText}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Order Reserved
          </span>
          <h2 className="text-2xl font-black text-slate-900">Order ID: {order.id}</h2>
          <p className="text-sm text-slate-600">
            Thank you, <strong>{order.customerName}</strong>! Click below to send your order summary and Opay transfer screenshot to our WhatsApp desk.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Total Amount:</span>
            <span className="font-black text-slate-900">{formatNaira(order.total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Items Count:</span>
            <span className="font-bold text-slate-800">{order.items.length} product(s)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment Method:</span>
            <span className="font-bold text-emerald-700">Opay Transfer</span>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
          >
            <span>Send Receipt on WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 8. BEAUTY, SPA & SKINCARE CONSULTATION BOOKING PLATFORM
// ============================================================================

function BookingPlatformView({
  services,
  bookings,
  setBookings,
  storeSettings,
  showToast,
  onBackToStore
}) {
  const [selectedServiceIds, setSelectedServiceIds] = useState([services[0]?.id].filter(Boolean));
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("11:00 AM");
  const [locationType, setLocationType] = useState("In-Store");
  const [hotelOrHomeAddress, setHotelOrHomeAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [skinType, setSkinType] = useState("Combination");
  const [skinConcerns, setSkinConcerns] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const toggleService = (id) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const chosenServices = useMemo(
    () => services.filter((s) => selectedServiceIds.includes(s.id)),
    [services, selectedServiceIds]
  );

  const totalBookingCost = useMemo(
    () => chosenServices.reduce((sum, s) => sum + Number(s.price), 0),
    [chosenServices]
  );

  const showSkincareFields = useMemo(
    () => chosenServices.some((s) => s.requiresSkinFields),
    [chosenServices]
  );

  const timeSlots = [
    "09:30 AM",
    "11:00 AM",
    "12:30 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM"
  ];

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (chosenServices.length === 0) {
      showToast("Please select at least one spa or consultation service.", "error");
      return;
    }
    if (!date || !customerName || !phone) {
      showToast("Please fill in preferred date, name, and phone number.", "error");
      return;
    }
    if (locationType === "Home/Hotel" && !hotelOrHomeAddress.trim()) {
      showToast("Please enter your Hotel or Home address for mobile service.", "error");
      return;
    }

    const refId = `BK-${Math.floor(202 + Math.random() * 8900)}`;
    const newBooking = {
      id: refId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      services: chosenServices.map((s) => ({ id: s.id, name: s.name, price: s.price })),
      total: totalBookingCost,
      date,
      timeSlot,
      locationType,
      locationAddress:
        locationType === "In-Store"
          ? storeSettings.address
          : hotelOrHomeAddress.trim(),
      skinType: showSkincareFields ? skinType : "N/A",
      skinConcerns: showSkincareFields ? skinConcerns.trim() : "",
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
    showToast(`Booking ${refId} confirmed!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#f9731640,transparent_60%)]" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Delash Beauty City Spa & Skin Clinic</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">
              Book Luxury Spa, Dental Whitening & Skin Consultations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Visit our serene studio at <strong>{storeSettings.address}</strong> or request a private Home / Hotel spa session.
            </p>
          </div>
          <button
            onClick={onBackToStore}
            className="self-start md:self-center px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition"
          >
            ← Back to Store
          </button>
        </div>
      </div>

      {/* Main Booking Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Step 1: Select Services */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-xl font-black text-slate-900">
            1. Select One or More Services
          </h2>
          <div className="space-y-3">
            {services.map((srv) => {
              const isSelected = selectedServiceIds.includes(srv.id);
              return (
                <div
                  key={srv.id}
                  onClick={() => toggleService(srv.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    isSelected
                      ? "border-orange-500 bg-orange-50/50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border ${
                          isSelected
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{srv.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {srv.description}
                        </p>
                        <span className="inline-block mt-2 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          Duration: {srv.duration}
                        </span>
                      </div>
                    </div>
                    <span className="font-black text-base text-orange-600 shrink-0">
                      {formatNaira(srv.price)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Appointment Details Form */}
        <form
          onSubmit={handleBookSubmit}
          className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
        >
          <h2 className="text-xl font-black text-slate-900">
            2. Schedule & Client Information
          </h2>

          {/* Date & Time Slot */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Preferred Date *
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Preferred Time Slot *
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-orange-500 outline-none"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Service Location Toggle */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-700">
              Service Location *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLocationType("In-Store")}
                className={`p-3 rounded-xl border-2 text-left transition flex items-center gap-2.5 ${
                  locationType === "In-Store"
                    ? "border-orange-500 bg-orange-50 text-slate-900"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <Store className="w-5 h-5 text-orange-500 shrink-0" />
                <div>
                  <p className="font-bold text-xs sm:text-sm">In-Store Spa</p>
                  <p className="text-[11px] text-slate-500">185, Goldies by Mt. Zion</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLocationType("Home/Hotel")}
                className={`p-3 rounded-xl border-2 text-left transition flex items-center gap-2.5 ${
                  locationType === "Home/Hotel"
                    ? "border-orange-500 bg-orange-50 text-slate-900"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <Home className="w-5 h-5 text-orange-500 shrink-0" />
                <div>
                  <p className="font-bold text-xs sm:text-sm">Home / Hotel Service</p>
                  <p className="text-[11px] text-slate-500">We come to your location</p>
                </div>
              </button>
            </div>

            {locationType === "Home/Hotel" && (
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter Hotel Name & Room or Full Home Address *
                </label>
                <input
                  type="text"
                  required
                  value={hotelOrHomeAddress}
                  onChange={(e) => setHotelOrHomeAddress(e.target.value)}
                  placeholder="e.g. Transcorp Hotel Room 204 or 12 Barracks Road"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-orange-300 bg-orange-50/30 text-sm focus:border-orange-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* Conditional Skincare Consultation Fields */}
          {showSkincareFields && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                <Sparkles className="w-4 h-4" />
                <span>Skincare & Consultation Profile</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Skin Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Oily", "Dry", "Combination", "Sensitive", "Normal"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setSkinType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        skinType === type
                          ? "bg-slate-900 text-white"
                          : "bg-white border border-slate-200 text-slate-700 hover:border-orange-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Skin Concerns / Consultation Notes
                </label>
                <textarea
                  rows={2}
                  value={skinConcerns}
                  onChange={(e) => setSkinConcerns(e.target.value)}
                  placeholder="Describe pimples, dull skin, white patches, hyperpigmentation, or products currently used..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:border-orange-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Client Contact Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="080..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Optional if same as phone"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Booking Summary & Submit */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  {chosenServices.length} Service(s) Selected
                </p>
                <p className="text-2xl font-black text-slate-900">
                  {formatNaira(totalBookingCost)}
                </p>
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/20 transition"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Booking Reference Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <Calendar className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Appointment Scheduled
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                Ref ID: {confirmedBooking.id}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                We look forward to pampering you on{" "}
                <strong>{confirmedBooking.date}</strong> at{" "}
                <strong>{confirmedBooking.timeSlot}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
              <p>
                <strong>Services:</strong>{" "}
                {confirmedBooking.services.map((s) => s.name).join(", ")}
              </p>
              <p>
                <strong>Location:</strong> {confirmedBooking.locationType} (
                {confirmedBooking.locationAddress})
              </p>
              {confirmedBooking.skinType !== "N/A" && (
                <p>
                  <strong>Skin Type:</strong> {confirmedBooking.skinType}
                </p>
              )}
              <p>
                <strong>Estimated Total:</strong>{" "}
                <span className="font-black text-orange-600">
                  {formatNaira(confirmedBooking.total)}
                </span>
              </p>
            </div>

            <a
              href={`https://wa.me/${storeSettings.whatsappNumber}?text=${encodeURIComponent(
                `Hello *Delash Beauty City*! ✨\nI just booked a spa/skincare appointment:\n\n*Booking Ref:* ${confirmedBooking.id}\n*Name:* ${confirmedBooking.customerName}\n*Services:* ${confirmedBooking.services
                  .map((s) => s.name)
                  .join(", ")}\n*Date & Time:* ${confirmedBooking.date} at ${
                  confirmedBooking.timeSlot
                }\n*Location:* ${confirmedBooking.locationType} (${
                  confirmedBooking.locationAddress
                })\n*Total:* ${formatNaira(confirmedBooking.total)}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <span>Send Booking Confirmation on WhatsApp</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 9. PIN-PROTECTED STAFF LOGIN KEYPAD
// ============================================================================

function StaffPinLogin({ staffUsers, storeSettings, onSuccess, onBackToStore }) {
  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState("");

  const handleDigit = (digit) => {
    if (pinInput.length >= 6) return;
    const next = pinInput + digit;
    setPinInput(next);
    setError("");

    // Auto-check when 4+ digits match a staff user
    const matched = staffUsers.find((u) => u.pin === next);
    if (matched) {
      onSuccess(matched);
    }
  };

  const handleClear = () => {
    setPinInput("");
    setError("");
  };

  const handleVerify = () => {
    const matched = staffUsers.find((u) => u.pin === pinInput);
    if (matched) {
      onSuccess(matched);
    } else {
      setError("Invalid Staff PIN. Please try again.");
      setPinInput("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg shadow-orange-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black tracking-tight">
            {storeSettings.businessName}
          </h1>
          <p className="text-xs text-slate-400">
            Staff Portal & Walk-In POS Authentication
          </p>
        </div>

        {/* PIN Display Dots */}
        <div className="space-y-2">
          <div className="h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-full transition ${
                  pinInput.length > idx
                    ? "bg-orange-500 scale-110"
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
          {error && (
            <p className="text-xs text-red-400 text-center font-semibold">{error}</p>
          )}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigit(num)}
              className="h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 active:bg-orange-500 text-xl font-black transition"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="h-14 rounded-2xl bg-slate-800/60 hover:bg-red-950 text-xs font-bold text-red-400 transition"
          >
            CLEAR
          </button>
          <button
            type="button"
            onClick={() => handleDigit("0")}
            className="h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 active:bg-orange-500 text-xl font-black transition"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleVerify}
            className="h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-xs font-black text-white transition"
          >
            ENTER
          </button>
        </div>

        {/* Demo PIN Hints for Testing */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <p className="font-bold text-slate-300">Quick Access PINs:</p>
          <div className="flex justify-between">
            <span>Admin Full Access:</span>
            <span className="font-mono font-bold text-orange-400">
              {staffUsers.find((u) => u.role === "Admin")?.pin || "1234"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Cashier POS Access:</span>
            <span className="font-mono font-bold text-emerald-400">
              {staffUsers.find((u) => u.role === "Cashier")?.pin || "0000"}
            </span>
          </div>
        </div>

        <button
          onClick={onBackToStore}
          className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          ← Return to Public Storefront
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 10. STAFF PORTAL & MANAGEMENT DASHBOARD (ADMIN & CASHIER RBAC)
// ============================================================================

function StaffDashboard({
  currentStaff,
  onLogout,
  onBackToStore,
  products,
  setProducts,
  services,
  setServices,
  orders,
  setOrders,
  walkInSales,
  setWalkInSales,
  bookings,
  setBookings,
  staffUsers,
  setStaffUsers,
  storeSettings,
  setStoreSettings,
  showToast
}) {
  const isAdmin = currentStaff.role === "Admin";
  const [activeTab, setActiveTab] = useState(isAdmin ? "overview" : "pos");

  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard, adminOnly: true },
    { id: "pos", label: "Walk-In POS", icon: ShoppingCart, adminOnly: false },
    { id: "orders", label: "Online Orders", icon: ShoppingBag, adminOnly: false },
    { id: "products", label: "Products & Stock", icon: Package, adminOnly: false },
    { id: "bookings", label: "Spa Bookings", icon: Calendar, adminOnly: false },
    { id: "services", label: "Spa Services", icon: Sparkles, adminOnly: true },
    { id: "history", label: "Sales History", icon: FileText, adminOnly: true },
    { id: "settings", label: "Settings & PINs", icon: Settings, adminOnly: true }
  ].filter((item) => isAdmin || !item.adminOnly);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-100">
      {/* Sidebar */}
      <aside className="lg:w-64 bg-slate-950 text-white flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center font-black text-lg">
                D
              </div>
              <div>
                <p className="font-black text-sm leading-none">DELASH PORTAL</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase">
                  {currentStaff.role}
                </span>
              </div>
            </div>
          </div>

          <nav className="p-3 flex lg:flex-col gap-1.5 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                    active
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 px-2">
            Signed in as <strong className="text-white">{currentStaff.name}</strong>
          </div>
          <button
            onClick={onBackToStore}
            className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 text-left flex items-center gap-2"
          >
            <Store className="w-4 h-4 text-orange-500" />
            <span>View Public Storefront</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full py-2 px-3 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-xs font-bold text-red-400 text-left flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock / Switch PIN</span>
          </button>
        </div>
      </aside>

      {/* Main Portal Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === "overview" && isAdmin && (
          <AdminOverviewTab
            products={products}
            orders={orders}
            walkInSales={walkInSales}
            bookings={bookings}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "pos" && (
          <WalkInPosTab
            products={products}
            setProducts={setProducts}
            walkInSales={walkInSales}
            setWalkInSales={setWalkInSales}
            currentStaff={currentStaff}
            storeSettings={storeSettings}
            showToast={showToast}
          />
        )}

        {activeTab === "orders" && (
          <OnlineOrdersTab
            orders={orders}
            setOrders={setOrders}
            products={products}
            setProducts={setProducts}
            showToast={showToast}
          />
        )}

        {activeTab === "products" && (
          <ProductsManagerTab
            products={products}
            setProducts={setProducts}
            isAdmin={isAdmin}
            showToast={showToast}
          />
        )}

        {activeTab === "bookings" && (
          <BookingsManagerTab
            bookings={bookings}
            setBookings={setBookings}
            showToast={showToast}
          />
        )}

        {activeTab === "services" && isAdmin && (
          <ServicesManagerTab
            services={services}
            setServices={setServices}
            showToast={showToast}
          />
        )}

        {activeTab === "history" && isAdmin && (
          <SalesHistoryTab
            orders={orders}
            walkInSales={walkInSales}
            setWalkInSales={setWalkInSales}
            showToast={showToast}
          />
        )}

        {activeTab === "settings" && isAdmin && (
          <SettingsManagerTab
            storeSettings={storeSettings}
            setStoreSettings={setStoreSettings}
            staffUsers={staffUsers}
            setStaffUsers={setStaffUsers}
            showToast={showToast}
          />
        )}
      </main>
    </div>
  );
}

// ============================================================================
// 11. ADMIN OVERVIEW DASHBOARD TAB
// ============================================================================

function AdminOverviewTab({ products, orders, walkInSales, bookings, setActiveTab }) {
  const confirmedOnlineOrders = orders.filter((o) => o.status === "Payment Confirmed");
  const onlineRevenue = confirmedOnlineOrders.reduce((sum, o) => sum + o.total, 0);
  const confirmedWalkInSales = walkInSales.filter(
    (sale) => (sale.status || "Payment Confirmed") === "Payment Confirmed"
  );
  const walkInRevenue = confirmedWalkInSales.reduce((sum, s) => sum + s.total, 0);
  const totalRevenue = onlineRevenue + walkInRevenue;

  const lowStockProducts = products.filter((p) => p.stock <= 5);
  const pendingBookings = bookings.filter((b) => b.status === "Pending");

  const stats = [
    {
      label: "Total Combined Revenue",
      value: formatNaira(totalRevenue),
      sub: "Online + Walk-In POS",
      color: "bg-slate-950 text-white",
      accent: "text-orange-400"
    },
    {
      label: "Online Orders Revenue",
      value: formatNaira(onlineRevenue),
      sub: `${confirmedOnlineOrders.length} payment-confirmed orders`,
      color: "bg-white text-slate-900 border border-slate-200",
      accent: "text-emerald-600"
    },
    {
      label: "Walk-In POS Revenue",
      value: formatNaira(walkInRevenue),
      sub: `${walkInSales.length} in-shop transactions`,
      color: "bg-white text-slate-900 border border-slate-200",
      accent: "text-orange-600"
    },
    {
      label: "Total Catalog Products",
      value: products.length,
      sub: `${products.reduce((s, p) => s + p.stock, 0)} total units in stock`,
      color: "bg-white text-slate-900 border border-slate-200",
      accent: "text-slate-900"
    },
    {
      label: "Low-Stock Alerts",
      value: lowStockProducts.length,
      sub: "Items with ≤ 5 units left",
      color: "bg-white text-slate-900 border border-slate-200",
      accent: lowStockProducts.length > 0 ? "text-red-600" : "text-emerald-600"
    },
    {
      label: "Pending Spa Bookings",
      value: pendingBookings.length,
      sub: `${bookings.length} total appointments`,
      color: "bg-white text-slate-900 border border-slate-200",
      accent: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Executive Overview
          </h1>
          <p className="text-sm text-slate-500">
            Real-time storefront, POS, inventory, and spa performance.
          </p>
        </div>
        <button
          onClick={() => setActiveTab("pos")}
          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-sm transition"
        >
          + Open Walk-In POS
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {stats.map((st, idx) => (
          <div key={idx} className={`p-6 rounded-2xl shadow-sm ${st.color}`}>
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">
              {st.label}
            </p>
            <p className={`text-2xl sm:text-3xl font-black mt-2 ${st.accent}`}>
              {st.value}
            </p>
            <p className="text-xs opacity-70 mt-1">{st.sub}</p>
          </div>
        ))}
      </div>

      {/* Low Stock Watchlist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-lg text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Low-Stock & Out-of-Stock Alerts</span>
          </h2>
          <button
            onClick={() => setActiveTab("products")}
            className="text-xs font-bold text-orange-600 hover:underline"
          >
            Manage Inventory →
          </button>
        </div>

        {lowStockProducts.length === 0 ? (
          <p className="text-sm text-slate-500">All products have healthy stock levels.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-sm text-slate-900">{p.title}</p>
                  <p className="text-xs text-slate-500">{p.category}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    p.stock === 0
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {p.stock === 0 ? "Out of Stock" : `${p.stock} units left`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 12. WALK-IN POS (POINT OF SALE) TERMINAL
// ============================================================================

function WalkInPosTab({
  products,
  setProducts,
  walkInSales,
  setWalkInSales,
  currentStaff,
  storeSettings,
  showToast
}) {
  const [posSearch, setPosSearch] = useState("");
  const [posCart, setPosCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [customerName, setCustomerName] = useState("");
  const [lastReceipt, setLastReceipt] = useState(null);

  const filteredPosProducts = useMemo(() => {
    const q = posSearch.toLowerCase().trim();
    return products.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, posSearch]);

  const addToPosCart = (product) => {
    if (product.stock <= 0) {
      showToast("Item is out of stock!", "error");
      return;
    }
    setPosCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          showToast(`Max stock (${product.stock}) reached.`, "warning");
          return prev;
        }
        return prev.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { productId: product.id, qty: 1 }];
    });
  };

  const updatePosQty = (productId, delta) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    setPosCart((prev) =>
      prev
        .map((item) => {
          if (item.productId !== productId) return item;
          const next = item.qty + delta;
          if (next <= 0) return null;
          if (next > prod.stock) {
            showToast(`Only ${prod.stock} units available.`, "warning");
            return { ...item, qty: prod.stock };
          }
          return { ...item, qty: next };
        })
        .filter(Boolean)
    );
  };

  const enrichedPosCart = useMemo(() => {
    return posCart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        const { unitPrice, isWholesale } = getEffectiveUnitPrice(product, item.qty);
        return {
          product,
          qty: item.qty,
          unitPrice,
          isWholesale,
          lineTotal: unitPrice * item.qty
        };
      })
      .filter(Boolean);
  }, [posCart, products]);

  const posTotal = useMemo(
    () => enrichedPosCart.reduce((sum, i) => sum + i.lineTotal, 0),
    [enrichedPosCart]
  );

  const handleCompleteWalkInSale = () => {
    if (enrichedPosCart.length === 0) {
      showToast("Add items to POS cart first.", "error");
      return;
    }

    // Atomic stock verification
    for (const item of enrichedPosCart) {
      const fresh = products.find((p) => p.id === item.product.id);
      if (!fresh || fresh.stock < item.qty) {
        showToast(`Insufficient stock for ${item.product.title}.`, "error");
        return;
      }
    }

    // Deduct stock atomically
    setProducts((prev) =>
      prev.map((prod) => {
        const sold = enrichedPosCart.find((c) => c.product.id === prod.id);
        if (!sold) return prod;
        return { ...prod, stock: Math.max(0, prod.stock - sold.qty) };
      })
    );

    const saleId = `POS-${Math.floor(5002 + Math.random() * 4900)}`;
    const saleRecord = {
      id: saleId,
      customerName: customerName.trim() || "Walk-In Customer",
      cashierName: currentStaff.name,
      paymentMethod,
      status: "Payment Confirmed",
      items: enrichedPosCart.map((i) => ({
        productId: i.product.id,
        title: i.product.title,
        qty: i.qty,
        unitPrice: i.unitPrice,
        isWholesale: i.isWholesale
      })),
      total: posTotal,
      createdAt: new Date().toISOString()
    };

    setWalkInSales((prev) => [saleRecord, ...prev]);
    setLastReceipt(saleRecord);
    setPosCart([]);
    setCustomerName("");
    showToast(`Walk-In Sale ${saleId} recorded!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Walk-In Point of Sale (POS)</h1>
        <p className="text-sm text-slate-500">
          Fast in-shop checkout with automatic wholesale tier pricing & instant stock deduction.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Product Selector Grid */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={posSearch}
              onChange={(e) => setPosSearch(e.target.value)}
              placeholder="Search product by name or category..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-h-[540px] overflow-y-auto pr-1">
            {filteredPosProducts.map((prod) => {
              const outOfStock = prod.stock <= 0;
              return (
                <button
                  key={prod.id}
                  type="button"
                  disabled={outOfStock}
                  onClick={() => addToPosCart(prod)}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                    outOfStock
                      ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                      : "border-slate-200 hover:border-orange-500 hover:bg-orange-50/40"
                  }`}
                >
                  <img
                    src={prod.images?.[0]}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs text-slate-900 line-clamp-1">
                      {prod.title}
                    </p>
                    <p className="text-xs font-black text-orange-600 mt-0.5">
                      {formatNaira(prod.retailPrice)}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span>Stock: {prod.stock}</span>
                      {prod.wholesalePrice && (
                        <span>
                          {prod.minWholesaleQty}+ @ {formatNaira(prod.wholesalePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current POS Ticket */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-black text-base text-slate-900">Current Walk-In Ticket</h2>
            {posCart.length > 0 && (
              <button
                onClick={() => setPosCart([])}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto">
            {enrichedPosCart.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">
                Tap products on the left to add them to the sale.
              </p>
            ) : (
              enrichedPosCart.map(({ product, qty, unitPrice, isWholesale, lineTotal }) => (
                <div
                  key={product.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs text-slate-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      {formatNaira(unitPrice)} × {qty}{" "}
                      {isWholesale && (
                        <span className="text-emerald-700 font-bold">(Wholesale)</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updatePosQty(product.id, -1)}
                      className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{qty}</span>
                    <button
                      onClick={() => updatePosQty(product.id, 1)}
                      className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-black text-xs text-slate-900 w-20 text-right">
                    {formatNaira(lineTotal)}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Payment Method & Customer Name */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Customer Name (Optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Walk-In Customer"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Cash", "Bank Transfer", "POS Card", "Other"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      paymentMethod === method
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:border-orange-400"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-bold text-slate-600">Total Payable:</span>
              <span className="text-2xl font-black text-slate-900">
                {formatNaira(posTotal)}
              </span>
            </div>

            <button
              onClick={handleCompleteWalkInSale}
              disabled={enrichedPosCart.length === 0}
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm shadow-md transition"
            >
              Complete Sale & Print Receipt
            </button>
          </div>
        </div>
      </div>

      {/* Digital / Printable Walk-In Receipt Modal */}
      {lastReceipt && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl font-mono text-xs">
            <div className="text-center border-b border-dashed border-slate-300 pb-3 space-y-1">
              <p className="font-black text-base uppercase">{storeSettings.businessName}</p>
              <p className="text-slate-500">{storeSettings.address}</p>
              <p className="text-slate-500">Tel: {storeSettings.hotline}</p>
              <p className="font-bold text-orange-600 pt-1">
                WALK-IN RECEIPT: {lastReceipt.id}
              </p>
            </div>

            <div className="space-y-1 text-slate-600">
              <p>Date: {new Date(lastReceipt.createdAt).toLocaleString()}</p>
              <p>Customer: {lastReceipt.customerName}</p>
              <p>Payment: {lastReceipt.paymentMethod}</p>
              <p>Served By: {lastReceipt.cashierName}</p>
            </div>

            <div className="border-y border-dashed border-slate-300 py-3 space-y-2">
              {lastReceipt.items.map((item, i) => (
                <div key={i} className="flex justify-between gap-2">
                  <span>
                    {item.title} x{item.qty}
                  </span>
                  <span className="font-bold">
                    {formatNaira(item.unitPrice * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm font-black">
              <span>TOTAL PAID</span>
              <span>{formatNaira(lastReceipt.total)}</span>
            </div>

            <div className="flex gap-2 pt-2 font-sans">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button
                onClick={() => setLastReceipt(null)}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 13. ONLINE ORDERS MANAGEMENT TAB (WITH AUTO STOCK RESTORE ON CANCEL)
// ============================================================================

function OnlineOrdersTab({ orders, setOrders, products, setProducts, showToast }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const handleStatusChange = (order, newStatus) => {
    if (order.status === newStatus) return;

    // Restore stock automatically if moving into Cancelled from a non-cancelled state
    if (newStatus === "Cancelled" && order.status !== "Cancelled") {
      setProducts((prev) =>
        prev.map((prod) => {
          const item = order.items.find((i) => i.productId === prod.id);
          if (!item) return prod;
          return { ...prod, stock: prod.stock + item.qty };
        })
      );
      showToast(`Order ${order.id} cancelled and stock restored!`);
    } else if (order.status === "Cancelled" && newStatus !== "Cancelled") {
      // Re-deduct stock if un-cancelling an order
      for (const item of order.items) {
        const prod = products.find((p) => p.id === item.productId);
        if (!prod || prod.stock < item.qty) {
          showToast(`Not enough stock to reactivate order ${order.id}.`, "error");
          return;
        }
      }
      setProducts((prev) =>
        prev.map((prod) => {
          const item = order.items.find((i) => i.productId === prod.id);
          if (!item) return prod;
          return { ...prod, stock: Math.max(0, prod.stock - item.qty) };
        })
      );
      showToast(`Order ${order.id} reactivated and stock deducted.`);
    } else {
      showToast(`Order ${order.id} updated to "${newStatus}".`);
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter(
    (o) => statusFilter === "All" || o.status === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Online Storefront Orders</h1>
          <p className="text-sm text-slate-500">
            Verify Opay transfers, manage deliveries, and update statuses.
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold"
        >
          <option value="All">All Statuses ({orders.length})</option>
          {ORDER_STATUSES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
            No orders found for this filter.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-black text-lg text-slate-900">{order.id}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        order.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(order.createdAt).toLocaleString()} •{" "}
                    <strong>{order.customerName}</strong> ({order.phone})
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    <strong>Delivery:</strong> {order.address}
                    {order.notes && ` — Note: "${order.notes}"`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Order Total</p>
                    <p className="text-xl font-black text-slate-900">
                      {formatNaira(order.total)}
                    </p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 focus:border-orange-500 outline-none"
                  >
                    {ORDER_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ordered Line Items */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex justify-between items-center gap-2"
                  >
                    <span className="font-semibold text-slate-800 truncate">
                      {item.title} ×{item.qty}
                    </span>
                    <span className="font-black text-slate-900 shrink-0">
                      {formatNaira(item.unitPrice * item.qty)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 14. PRODUCT & WHOLESALE INVENTORY MANAGER TAB
// ============================================================================

function ProductsManagerTab({ products, setProducts, isAdmin, showToast }) {
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!isAdmin) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Product removed from catalog.");
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...formData } : p))
      );
      showToast("Product updated successfully!");
    } else {
      const newProd = {
        ...formData,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setProducts((prev) => [newProd, ...prev]);
      showToast("New product added to store!");
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Product & Wholesale Inventory
          </h1>
          <p className="text-sm text-slate-500">
            {isAdmin
              ? "Manage retail & wholesale pricing tiers, stock quantities, and product galleries."
              : "View live inventory stock levels and wholesale pricing tiers."}
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by title or category..."
          className="w-full sm:max-w-md px-4 py-2.5 rounded-xl bg-slate-100 text-sm outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4">Product</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Retail Price</th>
              <th className="py-3.5 px-4">Wholesale Tier</th>
              <th className="py-3.5 px-4">Stock</th>
              {isAdmin && <th className="py-3.5 px-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.images?.[0]}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <span className="font-bold text-slate-900 line-clamp-1">
                      {prod.title}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">
                  {prod.category}
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {formatNaira(prod.retailPrice)}
                </td>
                <td className="py-3.5 px-4 text-xs">
                  {prod.wholesalePrice ? (
                    <span className="font-semibold text-emerald-700">
                      {formatNaira(prod.wholesalePrice)} ({prod.minWholesaleQty}+ units)
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      prod.stock === 0
                        ? "bg-red-100 text-red-700"
                        : prod.stock <= 5
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {prod.stock} units
                  </span>
                </td>
                {isAdmin && (
                  <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setEditingProduct(prod);
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-700"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal (Admin Only) */}
      {isModalOpen && isAdmin && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}

function ProductFormModal({ product, onClose, onSave }) {
  const [title, setTitle] = useState(product?.title || "");
  const [category, setCategory] = useState(product?.category || PRODUCT_CATEGORIES[0]);
  const [retailPrice, setRetailPrice] = useState(product?.retailPrice || "");
  const [wholesalePrice, setWholesalePrice] = useState(product?.wholesalePrice || "");
  const [minWholesaleQty, setMinWholesaleQty] = useState(product?.minWholesaleQty || 6);
  const [stock, setStock] = useState(product?.stock ?? 10);
  const [description, setDescription] = useState(product?.description || "");
  const [imageUrlsText, setImageUrlsText] = useState(
    product?.images?.join("\n") ||
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
  );

  // Support local file upload to data URL as well as image URLs
  const handleImageFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageUrlsText((prev) =>
            prev.trim() ? `${prev.trim()}\n${reader.result}` : reader.result
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const images = imageUrlsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      category,
      retailPrice: Number(retailPrice),
      wholesalePrice: wholesalePrice ? Number(wholesalePrice) : null,
      minWholesaleQty: wholesalePrice ? Number(minWholesaleQty || 6) : null,
      stock: Number(stock),
      description: description.trim(),
      images: images.length
        ? images
        : ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"]
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl my-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-black text-lg text-slate-900">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Retail Price (₦) *
              </label>
              <input
                type="number"
                min="0"
                required
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Wholesale Price (₦) (Optional)
              </label>
              <input
                type="number"
                min="0"
                value={wholesalePrice}
                onChange={(e) => setWholesalePrice(e.target.value)}
                placeholder="Leave blank if retail only"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Min Wholesale Qty
              </label>
              <input
                type="number"
                min="2"
                value={minWholesaleQty}
                onChange={(e) => setMinWholesaleQty(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Product Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Product Photos (One URL per line or Upload)
              </label>
              <label className="text-xs font-bold text-orange-600 cursor-pointer hover:underline">
                + Upload Photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              rows={3}
              value={imageUrlsText}
              onChange={(e) => setImageUrlsText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// 15. SPA & SKINCARE BOOKINGS MANAGER TAB
// ============================================================================

function BookingsManagerTab({ bookings, setBookings, showToast }) {
  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    showToast(`Appointment ${id} marked as ${status}.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">
          Spa & Skincare Appointments
        </h1>
        <p className="text-sm text-slate-500">
          Manage in-store and mobile Home/Hotel service bookings and consultation profiles.
        </p>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
            No bookings recorded yet.
          </div>
        ) : (
          bookings.map((bk) => (
            <div
              key={bk.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-black text-base text-slate-900">{bk.id}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        bk.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : bk.status === "Completed"
                          ? "bg-slate-200 text-slate-800"
                          : bk.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {bk.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mt-1">
                    {bk.customerName} • {bk.phone}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    <strong>When:</strong> {bk.date} at {bk.timeSlot} |{" "}
                    <strong>Location:</strong> {bk.locationType} ({bk.locationAddress})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-black text-lg text-orange-600">
                    {formatNaira(bk.total)}
                  </span>
                  <select
                    value={bk.status}
                    onChange={(e) => updateBookingStatus(bk.id, e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50"
                  >
                    {["Pending", "Confirmed", "Completed", "Cancelled"].map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {bk.services.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-800"
                  >
                    {s.name} ({formatNaira(s.price)})
                  </span>
                ))}
              </div>

              {(bk.skinType !== "N/A" || bk.skinConcerns) && (
                <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/70 text-xs text-slate-700">
                  <strong>Skincare Notes:</strong> Skin Type:{" "}
                  <span className="font-bold">{bk.skinType}</span>
                  {bk.skinConcerns && ` — "${bk.skinConcerns}"`}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 16. SERVICES MANAGER TAB (ADMIN ONLY)
// ============================================================================

function ServicesManagerTab({ services, setServices, showToast }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("60 mins");
  const [description, setDescription] = useState("");
  const [requiresSkinFields, setRequiresSkinFields] = useState(true);

  const handleAddService = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    const newSrv = {
      id: `srv-${Date.now()}`,
      name: name.trim(),
      price: Number(price),
      duration: duration.trim(),
      description: description.trim(),
      requiresSkinFields
    };
    setServices((prev) => [...prev, newSrv]);
    setName("");
    setPrice("");
    setDescription("");
    showToast("Spa/Clinical service added!");
  };

  const handleRemoveService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast("Service removed.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Spa & Clinical Services</h1>
        <p className="text-sm text-slate-500">
          Add, price, or remove bookable treatments displayed on the public booking page.
        </p>
      </div>

      <form
        onSubmit={handleAddService}
        className="bg-white rounded-2xl border border-slate-200 p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Service Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. HydraFacial Glow"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Price (₦) *
          </label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25000"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Duration
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
          />
        </div>

        <button
          type="submit"
          className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm"
        >
          + Add Service
        </button>

        <div className="sm:col-span-3">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of what the treatment includes..."
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <input
            type="checkbox"
            checked={requiresSkinFields}
            onChange={(e) => setRequiresSkinFields(e.target.checked)}
            className="accent-orange-500"
          />
          <span>Show Skin Type Fields</span>
        </label>
      </form>

      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-slate-900">{srv.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{srv.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs font-bold">
                <span className="text-orange-600">{formatNaira(srv.price)}</span>
                <span className="text-slate-400">• {srv.duration}</span>
              </div>
            </div>
            <button
              onClick={() => handleRemoveService(srv.id)}
              className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 17. SALES HISTORY & REPORTING TAB (FILTER BY DAY, MONTH, YEAR)
// ============================================================================

function SalesHistoryTab({ orders, walkInSales, setWalkInSales, showToast }) {
  const [tab, setTab] = useState("online");
  const [filterDay, setFilterDay] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const matchesDateFilters = (isoString) => {
    const d = new Date(isoString);
    if (filterYear && d.getFullYear().toString() !== filterYear) return false;
    if (filterMonth && (d.getMonth() + 1).toString().padStart(2, "0") !== filterMonth)
      return false;
    if (filterDay && d.getDate().toString().padStart(2, "0") !== filterDay) return false;
    return true;
  };

  const filteredOnline = useMemo(
    () =>
      orders.filter(
        (o) => o.status !== "Cancelled" && matchesDateFilters(o.createdAt)
      ),
    [orders, filterDay, filterMonth, filterYear]
  );

  const filteredWalkIn = useMemo(
    () => walkInSales.filter((s) => matchesDateFilters(s.createdAt)),
    [walkInSales, filterDay, filterMonth, filterYear]
  );

  const activeRecords = tab === "online" ? filteredOnline : filteredWalkIn;
  const filteredTotal = activeRecords
    .filter((record) => (record.status || "Payment Confirmed") === "Payment Confirmed")
    .reduce((sum, r) => sum + r.total, 0);

  const handleWalkInStatusChange = (sale, newStatus) => {
    const currentStatus = sale.status || "Payment Confirmed";
    if (currentStatus === newStatus) return;

    setWalkInSales((prev) =>
      prev.map((record) =>
        record.id === sale.id ? { ...record, status: newStatus } : record
      )
    );
    showToast(`Sale ${sale.id} updated to "${newStatus}".`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Sales History & Reports</h1>
          <p className="text-sm text-slate-500">
            Filter online orders and walk-in POS sales by Day, Month, and Year.
          </p>
        </div>

        {/* Channel Switcher */}
        <div className="flex bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setTab("online")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === "online"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Online Sales History ({filteredOnline.length})
          </button>
          <button
            onClick={() => setTab("walkin")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === "walkin"
                ? "bg-orange-500 text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Walk-In Sales History ({filteredWalkIn.length})
          </button>
        </div>
      </div>

      {/* Day / Month / Year Filters + Filtered Total */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
          >
            <option value="">All Days</option>
            {Array.from({ length: 31 }, (_, i) =>
              (i + 1).toString().padStart(2, "0")
            ).map((d) => (
              <option key={d} value={d}>
                Day {d}
              </option>
            ))}
          </select>

          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
          >
            <option value="">All Months</option>
            {[
              ["01", "January"],
              ["02", "February"],
              ["03", "March"],
              ["04", "April"],
              ["05", "May"],
              ["06", "June"],
              ["07", "July"],
              ["08", "August"],
              ["09", "September"],
              ["10", "October"],
              ["11", "November"],
              ["12", "December"]
            ].map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
          >
            <option value="">All Years</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>

          {(filterDay || filterMonth || filterYear) && (
            <button
              onClick={() => {
                setFilterDay("");
                setFilterMonth("");
                setFilterYear("");
              }}
              className="text-xs font-bold text-orange-600 hover:underline"
            >
              Reset Dates
            </button>
          )}
        </div>

        <div className="bg-slate-950 text-white px-4 py-2.5 rounded-xl">
          <span className="text-xs text-slate-400 mr-2">Filtered Revenue:</span>
          <span className="text-lg font-black text-orange-400">
            {formatNaira(filteredTotal)}
          </span>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4">Reference ID</th>
              <th className="py-3.5 px-4">Date & Time</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Payment / Status</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {activeRecords.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  No sales records match the selected date filters.
                </td>
              </tr>
            ) : (
              activeRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-black text-slate-900">{rec.id}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">
                    {new Date(rec.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {rec.customerName}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-bold text-slate-600">
                    {tab === "online" ? (
                      rec.status
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={rec.status || "Payment Confirmed"}
                          onChange={(e) => handleWalkInStatusChange(rec, e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white focus:border-orange-500 outline-none"
                          aria-label={`Payment status for ${rec.id}`}
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <span className="text-slate-500">via {rec.paymentMethod}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">
                    {formatNaira(rec.total)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// 18. STORE SETTINGS & STAFF PIN MANAGEMENT TAB (ADMIN ONLY)
// ============================================================================

function SettingsManagerTab({
  storeSettings,
  setStoreSettings,
  staffUsers,
  setStaffUsers,
  showToast
}) {
  const [settingsForm, setSettingsForm] = useState(storeSettings);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setStoreSettings(settingsForm);
    showToast("Store & Opay bank transfer settings saved!");
  };

  const handlePinChange = (staffId, newPin) => {
    const cleaned = newPin.replace(/\D/g, "").slice(0, 6);
    setStaffUsers((prev) =>
      prev.map((u) => (u.id === staffId ? { ...u, pin: cleaned } : u))
    );
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">
          Store Settings & Staff PIN Access
        </h1>
        <p className="text-sm text-slate-500">
          Update Opay transfer details, WhatsApp order phone number, and staff login PINs.
        </p>
      </div>

      {/* Opay & Store Contact Settings */}
      <form
        onSubmit={handleSaveSettings}
        className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5"
      >
        <h2 className="font-black text-lg text-slate-900 border-b border-slate-100 pb-3">
          Opay Bank Account & Contact Details
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Opay Bank Name
            </label>
            <input
              type="text"
              value={settingsForm.opayBankName}
              onChange={(e) =>
                setSettingsForm({ ...settingsForm, opayBankName: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Opay Account Number
            </label>
            <input
              type="text"
              value={settingsForm.opayAccountNumber}
              onChange={(e) =>
                setSettingsForm({ ...settingsForm, opayAccountNumber: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-mono font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Opay Account Name
            </label>
            <input
              type="text"
              value={settingsForm.opayAccountName}
              onChange={(e) =>
                setSettingsForm({ ...settingsForm, opayAccountName: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              WhatsApp Receiving Number (e.g. 2348003352740)
            </label>
            <input
              type="text"
              value={settingsForm.whatsappNumber}
              onChange={(e) =>
                setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Customer Service Hotline
            </label>
            <input
              type="text"
              value={settingsForm.hotline}
              onChange={(e) =>
                setSettingsForm({ ...settingsForm, hotline: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm"
        >
          Save Store Settings
        </button>
      </form>

      {/* Staff PIN Management */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-black text-lg text-slate-900 border-b border-slate-100 pb-3">
          Staff Role-Based PIN Credentials
        </h2>
        <div className="space-y-3">
          {staffUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold text-sm text-slate-900">{user.name}</p>
                <span className="text-xs font-bold text-orange-600 uppercase">
                  Role: {user.role}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-600">4-Digit PIN:</label>
                <input
                  type="text"
                  value={user.pin}
                  onChange={(e) => handlePinChange(user.id, e.target.value)}
                  className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 text-center font-mono font-bold text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 19. TOAST NOTIFICATION BANNER
// ============================================================================

function ToastNotification({ toast, onClose }) {
  if (!toast) return null;
  const bg =
    toast.type === "error"
      ? "bg-red-600"
      : toast.type === "warning"
      ? "bg-amber-600"
      : "bg-slate-900";

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 ${bg} text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm border border-white/10`}
    >
      <span className="text-xs sm:text-sm font-bold">{toast.message}</span>
      <button onClick={onClose} className="text-white/70 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
