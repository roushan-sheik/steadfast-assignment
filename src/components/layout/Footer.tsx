"use client";

import React from "react";
import { MapPin, Phone, Mail, Headphones, Panda } from "lucide-react";
import SocialLinks from "../footer/SocialLinks";
import AppDownload from "../footer/AppDownload";
import PaymentMethods from "../footer/PaymentMethods";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[color:var(--color-neutral-800)] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <Panda />
              <span className="text-heading2 text-white pl-2 font-bold">
                FALCON
              </span>
            </div>

            {/* Description */}
            <p className="text-body3 text-[color:var(--color-neutral-300)] mb-6 leading-relaxed">
              Experience our new platform & Enjoy exciting deals and offers on
              your day to day
            </p>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[color:var(--color-brand-400)] mt-0.5 flex-shrink-0" />
                <div className="text-body3 text-[color:var(--color-neutral-300)]">
                  <p>House #64, Road 13, ASA Center,</p>
                  <p>Uttara, Dhaka-1402</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[color:var(--color-brand-400)] flex-shrink-0" />
                <a
                  href="tel:01729-1497201"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  01729-1497201
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[color:var(--color-brand-400)] flex-shrink-0" />
                <a
                  href="mailto:falcon@gmail.com"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  falcon@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-body3 text-[color:var(--color-neutral-300)] mb-4">
                Follow us on
              </p>
              <SocialLinks />
            </div>
          </div>

          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-heading3 font-semibold mb-6 text-white">
              ABOUT
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/contact"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/press"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="/cancellation-returns"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Cancellation & Returns
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="lg:col-span-1">
            <h3 className="text-heading3 font-semibold mb-6 text-white">
              HELP
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/payments"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Payments
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="/my-orders"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  My Orders
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-use"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/security"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-body3 text-[color:var(--color-neutral-300)] hover:text-[color:var(--color-brand-400)] transition-colors"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Download Section */}
          <div className="lg:col-span-1">
            {/* Customer Support */}
            <div className="mb-8">
              <h3 className="text-heading3 font-semibold mb-4 text-white">
                Need Support?
              </h3>
              <div className="flex items-center gap-3 p-4 border border-[color:var(--color-brand-400)] rounded-lg">
                <Headphones className="w-6 h-6 text-[color:var(--color-brand-400)] flex-shrink-0" />
                <div>
                  <p className="text-body3 text-[color:var(--color-neutral-300)] mb-1">
                    Call us now
                  </p>
                  <a
                    href="tel:10724-7814XX"
                    className="text-body2 font-semibold text-[color:var(--color-brand-400)] hover:text-[color:var(--color-brand-300)] transition-colors"
                  >
                    10724-7814XX
                  </a>
                </div>
              </div>
            </div>

            {/* App Download */}
            <AppDownload />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-[color:var(--color-neutral-700)]">
          <PaymentMethods />
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[color:var(--color-neutral-900)] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-body3 text-[color:var(--color-neutral-400)]">
            Falcon ©2025. Design by{" "}
            <a
              href="#"
              className="text-[color:var(--color-brand-400)] hover:text-[color:var(--color-brand-300)] transition-colors"
            >
              xyz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
