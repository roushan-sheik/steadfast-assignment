"use client";

import React from "react";
import {
  Search,
  Menu,
  Truck,
  HelpCircle,
  Store,
  ChevronRight,
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { id: "electronics", label: "Electronics", href: "/electronics" },
  { id: "home-appliances", label: "Home Appliances", href: "/home-appliances" },
  { id: "mother-baby", label: "Mother & Baby", href: "/mother-baby" },
  { id: "automotive", label: "Automotive", href: "/automotive" },
  { id: "sports-gear", label: "Sports Gear", href: "/sports-gear" },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto">
        <div className="p-4">
          {/* Search Bar */}
          <div className="mb-6 ">
            <div className="relative ">
              <input
                type="text"
                placeholder="Search for anything...."
                className="w-full px-4 py-3 pr-12 border border-[color:var(--color-neutral-300)] rounded-lg text-body2 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-500)]"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--color-neutral-500)]">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-6">
            <button className="flex items-center justify-between w-full px-4 py-3 bg-[color:var(--color-neutral-100)] rounded-lg text-body2 text-[color:var(--color-neutral-700)]">
              <div className="flex items-center gap-3">
                <Menu className="w-5 h-5" />
                <span>Categories</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="mb-6">
            <h3 className="text-body3 font-semibold text-[color:var(--color-neutral-800)] mb-3 px-2">
              Shop by Category
            </h3>
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 text-body2 text-[color:var(--color-neutral-700)] hover:bg-[color:var(--color-neutral-50)] rounded-lg transition-colors"
                  onClick={onClose}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[color:var(--color-neutral-400)]" />
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[color:var(--color-neutral-200)] my-6"></div>

          {/* Service Links */}
          <div className="space-y-1">
            <h3 className="text-body3 font-semibold text-[color:var(--color-neutral-800)] mb-3 px-2">
              Services
            </h3>

            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-body2 text-[color:var(--color-neutral-700)] hover:bg-[color:var(--color-neutral-50)] rounded-lg transition-colors"
              onClick={onClose}
            >
              <Truck className="w-5 h-5" />
              <span>Track Order</span>
            </button>

            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-body2 text-[color:var(--color-neutral-700)] hover:bg-[color:var(--color-neutral-50)] rounded-lg transition-colors"
              onClick={onClose}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help Center</span>
            </button>

            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-body2 text-[color:var(--color-neutral-700)] hover:bg-[color:var(--color-neutral-50)] rounded-lg transition-colors"
              onClick={onClose}
            >
              <Store className="w-5 h-5" />
              <span>Sell With Us</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
