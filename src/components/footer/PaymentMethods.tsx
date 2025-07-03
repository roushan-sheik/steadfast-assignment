"use client";

import React from "react";
import { CreditCard } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  image: string;
  bgColor: string;
  textColor: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "visa",
    name: "Visa",
    image: "VISA",
    bgColor: "bg-blue-600",
    textColor: "text-white",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    image: "mastercard",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
    textColor: "text-white",
  },
  {
    id: "amex",
    name: "American Express",
    image: "AMERICAN EXPRESS",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: "bkash",
    name: "bKash",
    image: "bkash",
    bgColor: "bg-pink-500",
    textColor: "text-white",
  },
  {
    id: "nagad",
    name: "Nagad",
    image: "নগদ",
    bgColor: "bg-orange-500",
    textColor: "text-white",
  },
];

const PaymentMethods: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      {/* Payment Methods Label */}
      <div className="flex items-center gap-3">
        <CreditCard className="w-5 h-5 text-[color:var(--color-brand-400)]" />
        <span className="text-body2 text-[color:var(--color-neutral-300)] font-medium">
          PAYMENTS ACCEPTED
        </span>
      </div>

      {/* Payment Method Cards */}
      <div className="flex flex-wrap items-center gap-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`${method.bgColor} ${method.textColor} px-3 py-2 rounded-md min-w-[60px] h-10 flex items-center justify-center text-caption1 font-bold shadow-lg`}
          >
            {method.id === "visa" && (
              <span className="text-sm font-black tracking-wider">VISA</span>
            )}
            {method.id === "mastercard" && (
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-80 -ml-2"></div>
              </div>
            )}
            {method.id === "amex" && (
              <span className="text-xs font-black">
                AMERICAN
                <br />
                EXPRESS
              </span>
            )}
            {method.id === "bkash" && (
              <span className="text-sm font-bold">bkash</span>
            )}
            {method.id === "nagad" && (
              <span className="text-sm font-bold">নগদ</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
