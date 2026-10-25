import React from 'react';
import { ShopProvider } from './context/ShopContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { CollectionsSection } from './components/CollectionsSection.tsx';
import { ProductCatalogue } from './components/ProductCatalogue.tsx';
import { CraftsmanshipSection } from './components/CraftsmanshipSection.tsx';
import { BrandStorySection } from './components/BrandStorySection.tsx';
import { CustomerReviews } from './components/CustomerReviews.tsx';
import { ConciergeContact } from './components/ConciergeContact.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { AccountModal } from './components/AccountModal.tsx';
import { SearchModal } from './components/SearchModal.tsx';

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col selection:bg-[#c5a059]/30 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Experience */}
      <main className="flex-1">
        {/* Cinematic Hero (Antigravity animation slot included) */}
        <Hero />

        {/* Collections Overview */}
        <CollectionsSection />

        {/* Full Product Catalogue */}
        <ProductCatalogue />

        {/* Metrology & Craftsmanship */}
        <CraftsmanshipSection />

        {/* Brand Story & Philosophy */}
        <BrandStorySection />

        {/* Patron Impressions / Reviews */}
        <CustomerReviews />

        {/* Private Concierge & FAQ */}
        <ConciergeContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <AccountModal />
      <SearchModal />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
