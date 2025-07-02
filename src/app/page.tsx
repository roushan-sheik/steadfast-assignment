import Cart from "@/components/redux/Cart";
import ProductList from "@/components/redux/ProductList";
import React from "react";

const HomePage = () => {
  return (
    <div className="App min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">E-Commerce Store</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProductList page={1} limit={12} />
      </main>

      {/* Cart Component */}
      <Cart />
    </div>
  );
};

export default HomePage;
