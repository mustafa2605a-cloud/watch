import React, { createContext, useContext, useState, useEffect } from 'react';
import { WatchProduct, WATCH_PRODUCTS } from '../data/products.ts';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CHF';

export interface CartItem {
  product: WatchProduct;
  variantId: string;
  quantity: number;
}

export interface PlacedOrder {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    variantName: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  shippingMethod: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  currency: Currency;
  status: 'Atelier Testing' | 'Vault Packaging' | 'Dispatched via Armored Courier';
}

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: WatchProduct, variantId?: string, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;
  
  selectedProduct: WatchProduct | null;
  openProductModal: (product: WatchProduct) => void;
  closeProductModal: () => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCollectionFilter: string;
  setSelectedCollectionFilter: (coll: string) => void;
  sortOption: string;
  setSortOption: (sort: string) => void;
  
  orders: PlacedOrder[];
  saveOrder: (order: PlacedOrder) => void;
  
  activeView: 'home' | 'catalogue' | 'craftsmanship' | 'story' | 'concierge';
  setActiveView: (view: 'home' | 'catalogue' | 'craftsmanship' | 'story' | 'concierge') => void;
  scrollToSection: (sectionId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; prefix: boolean }> = {
  USD: { symbol: '$', rate: 1.0, prefix: true },
  EUR: { symbol: '€', rate: 0.92, prefix: false },
  GBP: { symbol: '£', rate: 0.79, prefix: true },
  CHF: { symbol: 'CHF ', rate: 0.90, prefix: true },
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('veltron_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('veltron_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Currency
  const [currency, setCurrency] = useState<Currency>('USD');

  // Modal / Drawer states
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [activeView, setActiveView] = useState<'home' | 'catalogue' | 'craftsmanship' | 'story' | 'concierge'>('home');

  // Orders history persisted
  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('veltron_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('veltron_cart', JSON.stringify(cart));
    } catch {
      // silent
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('veltron_wishlist', JSON.stringify(wishlist));
    } catch {
      // silent
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('veltron_orders', JSON.stringify(orders));
    } catch {
      // silent
    }
  }, [orders]);

  const addToCart = (product: WatchProduct, variantId?: string, quantity: number = 1) => {
    const chosenVariantId = variantId || product.variants[0]?.id || 'default';
    setCart((prev) => {
      const index = prev.findIndex(
        (item) => item.product.id === product.id && item.variantId === chosenVariantId
      );
      if (index > -1) {
        const next = [...prev];
        next[index].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, variantId: chosenVariantId, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variantId === variantId))
    );
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => {
    const variant = item.product.variants.find((v) => v.id === item.variantId);
    const itemPrice = item.product.priceUSD + (variant?.priceModifier || 0);
    return sum + itemPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const formatPrice = (usdAmount: number): string => {
    const conf = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = Math.round(usdAmount * conf.rate);
    const formatted = converted.toLocaleString('en-US');
    return conf.prefix ? `${conf.symbol}${formatted}` : `${formatted} ${conf.symbol}`;
  };

  const openProductModal = (product: WatchProduct) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const saveOrder = (order: PlacedOrder) => {
    setOrders((prev) => [order, ...prev]);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveView('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currency,
        setCurrency,
        formatPrice,
        selectedProduct,
        openProductModal,
        closeProductModal,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        selectedCollectionFilter,
        setSelectedCollectionFilter,
        sortOption,
        setSortOption,
        orders,
        saveOrder,
        activeView,
        setActiveView,
        scrollToSection,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
