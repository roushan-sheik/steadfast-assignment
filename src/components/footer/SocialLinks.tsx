"use client";

import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hoverColor: string;
}

const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    name: "Facebook",
    href: "https://facebook.com/falcon",
    icon: Facebook,
    hoverColor: "hover:text-blue-400",
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://instagram.com/falcon",
    icon: Instagram,
    hoverColor: "hover:text-pink-400",
  },
  {
    id: "twitter",
    name: "Twitter",
    href: "https://twitter.com/falcon",
    icon: Twitter,
    hoverColor: "hover:text-blue-300",
  },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 bg-[color:var(--color-neutral-700)] rounded-full flex items-center justify-center text-[color:var(--color-neutral-300)] ${social.hoverColor} hover:bg-[color:var(--color-neutral-600)] transition-all duration-200 transform hover:scale-105`}
            aria-label={`Follow us on ${social.name}`}
          >
            <IconComponent className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
