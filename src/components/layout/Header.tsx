"use client";

import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import Navigation from "@/components/header/Navigation";
import MobileMenu from "@/components/header/MobileMenu";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full">
      {/* Main Header */}
      <div className="bg-[color:var(--color-neutral-800)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-white text-heading2 font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-[color:var(--color-neutral-800)] rounded-full"></div>
              </div>
              FALCON
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for anything...."
                className="w-full px-4 py-3 pr-12 rounded-l-lg border-0 text-body2 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-500)]"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-[color:var(--color-brand-500)] text-white rounded-r-lg hover:bg-[color:var(--color-brand-600)] transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search Icon - Mobile only */}
            <button className="md:hidden text-white hover:text-[color:var(--color-brand-300)] transition-colors">
              <Search className="w-6 h-6" />
            </button>

            {/* Cart */}
            <button className="relative text-white hover:text-[color:var(--color-brand-300)] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* User */}
            <button className="text-white hover:text-[color:var(--color-brand-300)] transition-colors">
              <User className="w-6 h-6" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white hover:text-[color:var(--color-brand-300)] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <Navigation />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
