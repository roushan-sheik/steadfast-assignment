"use client";

import React from "react";
import { Smartphone, Apple } from "lucide-react";

interface AppStore {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  hoverColor: string;
  label: string;
  subtitle: string;
}

const appStores: AppStore[] = [
  {
    id: "google-play",
    name: "Google Play",
    href: "https://play.google.com/store",
    icon: Smartphone,
    bgColor: "bg-green-600",
    hoverColor: "hover:bg-green-700",
    label: "GET IT ON",
    subtitle: "Google Play",
  },
  {
    id: "app-store",
    name: "App Store",
    href: "https://apps.apple.com",
    icon: Apple,
    bgColor: "bg-gray-900",
    hoverColor: "hover:bg-black",
    label: "Download on the",
    subtitle: "App Store",
  },
];

const AppDownload: React.FC = () => {
  return (
    <div>
      <h3 className="text-heading3 font-semibold mb-4 text-white">
        DOWNLOAD APP
      </h3>
      <div className="space-y-3">
        {appStores.map((store) => {
          const IconComponent = store.icon;
          return (
            <a
              key={store.id}
              href={store.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${store.bgColor} ${store.hoverColor} text-white rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-200 transform hover:scale-105 hover:shadow-lg group`}
            >
              <div className="flex-shrink-0">
                {store.id === "google-play" ? (
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 border-2 border-white rounded-sm transform rotate-45"></div>
                    </div>
                  </div>
                ) : (
                  <IconComponent className="w-8 h-8" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-caption2 text-gray-200 group-hover:text-white transition-colors">
                  {store.label}
                </div>
                <div className="text-body3 font-semibold text-white truncate">
                  {store.subtitle}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default AppDownload;
