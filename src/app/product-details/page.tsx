/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Image from "next/image";
// import { useParams } from "next/navigation";
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
import { RootState } from "@/redux/store"; // Fixed import path
import { addToCart, selectCartItemQuantity } from "@/redux/features/cartSlice"; // Added missing import

// interface ProductDetailsPageProps {
//   params: {
//     slug: string;
//   };
// }

const ProductDetailsPage = () => {
  // const params = useParams();
  //   const slug = params.slug as string;
  const slug = "portable-mini-rechargeable-fan-3200-mah";

  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("XS");
  const [selectedColor, setSelectedColor] = useState("Navy Blue");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading, error } = useGetProductBySlugQuery(slug);
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

  // Use product thumbnail as fallback if no additional images
  const productImages = product?.thumbnail
    ? [
        product.thumbnail,
        product.thumbnail,
        product.thumbnail,
        product.thumbnail,
        product.thumbnail,
      ]
    : [
        "/images/shirt-1.jpg",
        "/images/shirt-2.jpg",
        "/images/shirt-3.jpg",
        "/images/shirt-4.jpg",
        "/images/shirt-5.jpg",
      ];
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.available_stock) {
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
            The product you're looking for doesn't exist.
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
            <span className="text-gray-500">Tops</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900">T-Shirts</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <Image
                src={productImages[selectedImageIndex]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? "border-teal-500"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Product ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating_avg)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating_avg} ({product.rating_count})
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Share2 className="h-5 w-5 text-gray-600" />
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
              </div>

              {/* Promotion Badge */}
              <div className="mb-6">
                <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
                  Min. spend ৳550
                </span>
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
                Available Color: {selectedColor}
              </h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.name
                        ? "border-gray-900"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Select Size: {selectedSize}
              </h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? "border-teal-500 bg-teal-50 text-teal-600"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
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
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= product.available_stock}
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
                product.available_stock <= 0 ||
                quantity > product.available_stock
              }
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-md font-medium hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>
                {product.available_stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </span>
            </button>

            {/* Current cart quantity display */}
            {cartQuantity > 0 && (
              <div className="text-sm text-gray-600 text-center">
                {cartQuantity} item(s) in cart
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
                    <p className="text-sm font-medium">Regular</p>
                    <p className="text-xs text-gray-600">
                      Delivery within 2-3 days
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Express</p>
                    <p className="text-xs text-gray-400">Not Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Sold by</h3>
                <span className="text-sm text-teal-600">BD FASHION HOUSE</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium">Ship on Time</p>
                  <p className="text-lg font-bold text-teal-600">100%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Chat Response</p>
                  <p className="text-lg font-bold text-teal-600">90%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Shop Rating</p>
                  <p className="text-lg font-bold text-teal-600">99.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="prose max-w-none text-gray-700">
            <p>
              Just as a book is judged by its cover, the first thing you notice
              when you pick up a modern smartphone is the display. Nothing
              surprising, because advanced technologies allow you to practically
              level the display frames and cutouts for the front camera and
              speaker, leaving no room for bold design solutions. And how good
              that in such realities Apple everything is fine with displays.
            </p>
            <p className="mt-4 text-gray-500">
              Advanced technologies allow you to practically level the display
              frames and cutouts for the front camera and speaker, leaving no
              room for bold design solutions. And how good that in such
              realities Apple everything...
            </p>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-8 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Specification
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-teal-600" />
              <span className="text-sm">
                GMP Cosmetic Good Manufacturing Practice
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-teal-600" />
              <span className="text-sm">Cruelty Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-teal-600" />
              <span className="text-sm">No Animal Testing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-teal-600" />
              <span className="text-sm">Zenpia Global Standard</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-teal-600" />
              <span className="text-sm">Comply with Global Standard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
