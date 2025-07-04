// slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import { CartItem, Product } from "@/types/product/types";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.length; // Count unique products, not total quantity
  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.discount_price || item.regular_price);
    return sum + price * item.quantity;
  }, 0);

  return { totalItems, totalPrice };
};

// Helper function to update state totals
const updateStateTotals = (state: CartState) => {
  const totals = calculateTotals(state.items);
  state.totalItems = totals.totalItems;
  state.totalPrice = totals.totalPrice;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    // cartSlice.ts
    addToCart: (
      state,
      action: PayloadAction<Product & { quantity: number }>
    ) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        const newQty = existingItem.quantity + product.quantity;
        existingItem.quantity = Math.min(newQty, existingItem.available_stock);
      } else {
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          slug: product.slug,
          regular_price: product.regular_price,
          discount_price: product.discount_price,
          thumbnail: product.thumbnail,
          quantity: product.quantity,
          available_stock: product.available_stock,
        };
        state.items.push(cartItem);
      }

      updateStateTotals(state);
    },

    // Remove item from cart completely
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      updateStateTotals(state);
    },

    // Increment item quantity
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.available_stock) {
        item.quantity += 1;
        updateStateTotals(state);
      }
    },

    // Decrement item quantity
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity would become 0
          state.items = state.items.filter(
            (cartItem) => cartItem.id !== action.payload
          );
        }
        updateStateTotals(state);
      }
    },

    // Update item quantity directly
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          state.items = state.items.filter((cartItem) => cartItem.id !== id);
        } else if (quantity <= item.available_stock) {
          // Update quantity if within stock limit
          item.quantity = quantity;
        }
        updateStateTotals(state);
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    // Toggle cart visibility
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    // Open cart
    openCart: (state) => {
      state.isOpen = true;
    },

    // Close cart
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;
export const selectCartItemById = (state: RootState, id: number) =>
  state.cart.items.find((item) => item.id === id);
export const selectCartItemQuantity = (state: RootState, id: number) =>
  state.cart.items.find((item) => item.id === id)?.quantity || 0;

export default cartSlice.reducer;
