"use client";

import React from "react";
import { Menu, Truck, HelpCircle, Store } from "lucide-react";

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

const Navigation: React.FC = () => {
  return (
    <nav className="bg-[color:var(--color-neutral-100)] border-b border-[color:var(--color-neutral-200)] hidden lg:block">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Categories and Navigation Items */}
          <div className="flex items-center">
            {/* Categories Button */}
            <button className="flex items-center gap-2 px-4 py-4 text-body2 text-[color:var(--color-neutral-700)] hover:text-[color:var(--color-brand-500)] transition-colors border-r border-[color:var(--color-neutral-200)]">
              <Menu className="w-5 h-5" />
              Categories
            </button>

            {/* Navigation Links */}
            <div className="flex items-center">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="px-4 py-4 text-body2 text-[color:var(--color-neutral-700)] hover:text-[color:var(--color-brand-500)] transition-colors border-r border-[color:var(--color-neutral-200)] last:border-r-0"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-body3 text-[color:var(--color-neutral-600)] hover:text-[color:var(--color-brand-500)] transition-colors">
              <Truck className="w-4 h-4" />
              TRACK ORDER
            </button>

            <button className="flex items-center gap-2 text-body3 text-[color:var(--color-neutral-600)] hover:text-[color:var(--color-brand-500)] transition-colors">
              <HelpCircle className="w-4 h-4" />
              HELP CENTER
            </button>

            <button className="flex items-center gap-2 text-body3 text-[color:var(--color-neutral-600)] hover:text-[color:var(--color-brand-500)] transition-colors">
              <Store className="w-4 h-4" />
              SELL WITH US
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
