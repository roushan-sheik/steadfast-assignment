"use client";
import React from "react";

import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  selectCartIsOpen,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  clearCart,
  closeCart,
  toggleCart,
} from "../../redux/features/cartSlice";
import { CartItem } from "@/types/product/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const isOpen = useAppSelector(selectCartIsOpen);

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={handleToggleCart}
        className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <div className="relative">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Cart Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleCloseCart}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={handleCloseCart}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total: ৳{totalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Checkout
                </button>
                <button
                  onClick={handleClearCart}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface CartItemComponentProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || 0;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const itemPrice = parseFloat(item.discount_price || item.regular_price);
  const totalItemPrice = itemPrice * item.quantity;

  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <img
        src={item.thumbnail}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />

      <div className="flex-1">
        <h4 className="font-medium text-sm mb-1">{item.name}</h4>
        <p className="text-green-600 font-semibold">৳{itemPrice.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrement}
            className="bg-gray-200 text-gray-800 w-6 h-6 rounded text-sm hover:bg-gray-300 transition-colors"
          >
            -
          </button>

          <input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            min="1"
            max={item.available_stock}
            className="w-12 h-6 text-center text-sm border rounded"
          />

          <button
            onClick={handleIncrement}
            disabled={item.quantity >= item.available_stock}
            className="bg-gray-200 text-gray-800 w-6 h-6 rounded text-sm hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">
            Stock: {item.available_stock}
          </span>
          <span className="font-semibold">৳{totalItemPrice.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    </div>
  );
};

export default Cart;
