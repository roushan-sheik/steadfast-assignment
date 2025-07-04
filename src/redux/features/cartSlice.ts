import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { CartItem, Product } from "@/types/product/types";

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

// Initial state: empty cart (safe for SSR)
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

// Helper: calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.discount_price || item.regular_price);
    return sum + price * item.quantity;
  }, 0);
  return { totalItems, totalPrice };
};

// Helper: save to localStorage (only client)
const saveCartToLocalStorage = (state: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Load cart from localStorage after client hydration
    loadCartFromStorage: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
      state.isOpen = action.payload.isOpen;
    },

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
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      saveCartToLocalStorage(state);
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.available_stock) {
        item.quantity += 1;
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        saveCartToLocalStorage(state);
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (cartItem) => cartItem.id !== action.payload
          );
        }
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        saveCartToLocalStorage(state);
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((cartItem) => cartItem.id !== id);
        } else if (quantity <= item.available_stock) {
          item.quantity = quantity;
        }
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        saveCartToLocalStorage(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      saveCartToLocalStorage(state);
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
      saveCartToLocalStorage(state);
    },

    openCart: (state) => {
      state.isOpen = true;
      saveCartToLocalStorage(state);
    },

    closeCart: (state) => {
      state.isOpen = false;
      saveCartToLocalStorage(state);
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
  loadCartFromStorage,
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
