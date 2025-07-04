// components/CartHydrator.tsx
"use client";

import { loadCartFromStorage } from "@/redux/features/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CartHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      if (saved) {
        try {
          const cartState = JSON.parse(saved);
          dispatch(loadCartFromStorage(cartState));
        } catch {
          // ignore JSON parse errors
        }
      }
    }
  }, [dispatch]);

  return null; // This component renders nothing
}
