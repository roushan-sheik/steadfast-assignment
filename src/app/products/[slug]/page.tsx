/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  Clock,
  Shield,
  Award,
} from "lucide-react";
import { useGetProductBySlugQuery } from "@/redux/api/productsApi";
import { RootState } from "@/redux/store";
import { addToCart, selectCartItemQuantity } from "@/redux/features/cartSlice";
import { toast, ToastContainer } from "react-toastify";

// Define types based on your API response
interface ProductImage {
  url: string;
}

interface ProductVariation {
  id: number;
  product_id: number;
  sku: string;
  barcode: string;
  purchase_price: string;
  regular_price: string;
  discount_price: string;
  e_price: string;
  e_discount_price: string;
  wholesale_price: string;
  minimum_qty: number;
  total_stock_qty: number;
  status: number;
  id_delivery_fee: string;
  od_delivery_fee: string;
  ed_delivery_fee: string;
  image: string;
  variation_attributes: any[];
}

interface ProductDetail {
  id: number;
  product_id: number;
  regular_price: string;
  discount_price: string;
}

interface Merchant {
  id: number;
  shop_name: string;
}

interface Product {
  id: number;
  name: string;
  category_id: number;
  sku: string;
  barcode: string;
  product_type_id: number;
  sub_category_id: number;
  sub_category_child_id: number;
  brand_id: number | null;
  slug: string;
  description: string;
  merchant_id: number;
  total_stock_qty: number;
  image: ProductImage[];
  is_variant: boolean;
  thumbnail: string;
  rating_avg: number;
  rating_count: number;
  product_detail: ProductDetail;
  variations: ProductVariation[];
  merchant: Merchant;
  brand: any;
  shop_product: any;
  // Add computed properties for compatibility
  regular_price?: string;
  discount_price?: string;
  available_stock?: number;
  badges?: any[];
  seller?: string;
}

const ProductDetailsPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("XS");
  const [selectedColor, setSelectedColor] = useState("Navy Blue");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetProductBySlugQuery(slug);

  // Transform API response to match component expectations
  const product: Product | null = apiResponse?.data
    ? {
        ...apiResponse.data,
        regular_price: apiResponse.data.product_detail?.regular_price || "0",
        discount_price: apiResponse.data.product_detail?.discount_price || "0",
        available_stock: apiResponse.data.total_stock_qty || 0,
        badges: [], // Add empty badges array if not present
        seller: apiResponse.data.merchant?.shop_name || "BD FASHION HOUSE",
      }
    : null;

  const cartQuantity = useSelector((state: RootState) =>
    product ? selectCartItemQuantity(state, product.id) : 0
  );

  const sizes = ["XL", "XS", "S", "M", "L"];
  const colors = [
    { name: "Beige", color: "#F5F5DC" },
    { name: "Burgundy", color: "#800020" },
    { name: "Navy Blue", color: "#000080" },
    { name: "Black", color: "#000000" },
  ];

  // Get product images from API response
  const productImages: string[] =
    product?.image && product.image.length > 0
      ? product.image.map((img) => img.url)
      : product?.thumbnail
      ? [product.thumbnail]
      : ["/images/placeholder.jpg"];

  // Ensure we have at least 5 images for the thumbnail grid
  const displayImages = [...productImages];
  while (displayImages.length < 5) {
    displayImages.push(productImages[0] || "/images/placeholder.jpg");
  }

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      dispatch(addToCart({ ...product, quantity }));

      toast.success(`${quantity} item(s) of ${product.name} added to cart`, {
        position: "top-right",
      });
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.available_stock!) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist or couldn't be loaded.
          </p>
        </div>
      </div>
    );
  }

  // Calculate display price
  const displayPrice = product.discount_price || product.regular_price;
  const hasDiscount =
    product.discount_price && product.discount_price !== product.regular_price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500">Products</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden border">
              <Image
                src={displayImages[selectedImageIndex]}
                alt={`${product.name} thumbnail ${selectedImageIndex}`}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder.jpg";
                }}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-2">
              {displayImages.slice(0, 5).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-teal-500 ring-2 ring-teal-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder.jpg";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating_avg || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating_avg || 0} ({product.rating_count || 0}{" "}
                    reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600 hover:text-blue-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-teal-600">
                  ৳{displayPrice}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-500 line-through">
                    ৳{product.regular_price}
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    {Math.round(
                      ((Number(product.regular_price) - Number(displayPrice!)) /
                        Number(product.regular_price)) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.available_stock! > 0 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    In Stock ({product.available_stock} available)
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Display Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {product.badges.map((badge) => (
                      <span
                        key={badge.id}
                        className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                      >
                        {badge.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Available Color:{" "}
                <span className="text-teal-600">{selectedColor}</span>
              </h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-gray-900 ring-2 ring-offset-2 ring-teal-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Select Size:{" "}
                <span className="text-teal-600">{selectedSize}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-teal-500 bg-teal-50 text-teal-600"
                        : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md bg-white">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={quantity >= product.available_stock!}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.available_stock} available
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={
                product.available_stock! <= 0 ||
                quantity > product.available_stock!
              }
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-md font-medium hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>
                {product.available_stock! <= 0 ? "Out of Stock" : "Add to Cart"}
              </span>
            </button>

            {/* Current cart quantity display */}
            {cartQuantity > 0 && (
              <div className="text-sm text-center p-2 bg-teal-50 text-teal-700 rounded-md">
                {cartQuantity} item(s) already in cart
              </div>
            )}

            {/* Delivery Options */}
            <div className="bg-white rounded-lg p-4 border">
              <h3 className="font-medium text-gray-900 mb-3">
                Delivery Options
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm font-medium">Standard Delivery</p>
                    <p className="text-xs text-gray-600">
                      Delivery within 2-3 business days
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Express Delivery
                    </p>
                    <p className="text-xs text-gray-400">
                      Currently unavailable
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Sold by</h3>
                <span className="text-sm text-teal-600 font-medium">
                  {product.seller}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Ship on Time
                  </p>
                  <p className="text-lg font-bold text-teal-600">100%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Chat Response
                  </p>
                  <p className="text-lg font-bold text-teal-600">90%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Shop Rating
                  </p>
                  <p className="text-lg font-bold text-teal-600">99.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 bg-white rounded-lg p-6 border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="prose max-w-none text-gray-700">
            {product?.description ? (
              <div dangerouslySetInnerHTML={{ __html: product?.description }} />
            ) : (
              <p className="text-gray-500">
                Product description will be available soon.
              </p>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-8 bg-white rounded-lg p-6 border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-teal-600" />
              <span className="text-sm">Quality Assured</span>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-teal-600" />
              <span className="text-sm">Authentic Product</span>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-teal-600" />
              <span className="text-sm">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-teal-600" />
              <span className="text-sm">Warranty Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
