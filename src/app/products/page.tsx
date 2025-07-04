"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import ProductPagination from "@/components/products/ProductPagination";
import Image from "next/image";
import { Product } from "@/types/product/types";
import {
  decrementQuantity,
  incrementQuantity,
  selectCartItemQuantity,
} from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, isFetching } = useGetProductsQuery({
    page: currentPage,
    limit: 10,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products!</div>;
  if (!data?.data) return <div>No products found</div>;

  return (
    <div className="product-list">
      <h2 className="text-center text-heading1 font-bold lg:my-8 my-4">
        Products
      </h2>
      {isFetching && <div>Updating products...</div>}

      <div className="grid grid-cols-1 lg:max-w-7xl p-4 lg:p-0 mx-auto  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination info */}
      <div className="flex justify-center my-6">
        <div className="max-w-3xl">
          <ProductPagination
            data={data}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector((state) =>
    selectCartItemQuantity(state, product.id)
  );
  const router = useRouter();
  const handleViewProduct = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  const discountPrice = parseFloat(product.discount_price);
  const regularPrice = parseFloat(product.regular_price);
  const hasDiscount = discountPrice > 0 && discountPrice < regularPrice;

  return (
    <div className="product-card border-2 border-gray-200 rounded-lg p-4 shadow-md">
      <Image
        src={product.thumbnail}
        alt={product.name}
        width={250}
        height={120}
        className="w-full h-48 object-cover rounded mb-3"
      />

      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

      <div className="price-section mb-3">
        {hasDiscount ? (
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">
              ৳{discountPrice.toFixed(2)}
            </span>
            <span className="text-sm line-through text-gray-500">
              ৳{regularPrice.toFixed(2)}
            </span>
          </div>
        ) : (
          <span className="text-lg font-bold">৳{regularPrice.toFixed(2)}</span>
        )}
      </div>

      <div className="rating-section mb-3">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span>{product.rating_avg.toFixed(1)}</span>
          <span className="text-gray-500">({product.rating_count})</span>
        </div>
      </div>

      <div className="stock-info mb-3">
        <span
          className={`text-sm ${
            product.available_stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.available_stock > 0
            ? `${product.available_stock} in stock`
            : "Out of stock"}
        </span>
      </div>

      {/* Badges */}
      {product.badges.length > 0 && (
        <div className="badges mb-3">
          {product.badges.map((badge) => (
            <span
              key={badge.id}
              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1"
            >
              {badge.name}
            </span>
          ))}
        </div>
      )}

      {/* Add to Cart Section */}
      {product.available_stock > 0 ? (
        <div className="cart-actions">
          {cartQuantity === 0 ? (
            <button
              onClick={handleViewProduct}
              className="w-full bg-[var(--color-brand-500)] cursor-pointer text-white py-2 px-4 rounded hover:bg-[var(--color-brand-600)] transition-colors"
            >
              View Product
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrement}
                  className="bg-gray-200 cursor-pointer text-gray-800 w-8 h-8 rounded hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                <span className="font-semibold">{cartQuantity}</span>
                <button
                  onClick={handleIncrement}
                  disabled={cartQuantity >= product.available_stock}
                  className="bg-gray-200 cursor-pointer text-gray-800 w-8 h-8 rounded hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              <span className="text-green-600 font-medium">In Cart</span>
            </div>
          )}
        </div>
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
        >
          Out of Stock
        </button>
      )}
    </div>
  );
};

export default ProductList;
