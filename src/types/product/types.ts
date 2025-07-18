/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Badge {
  id: number;
  name: string;
  type: number;
  type_label: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  regular_price: string;
  discount_price: string;
  is_variant: boolean;
  thumbnail: string;
  rating_avg: number;
  rating_count: number;
  available_stock: number;
  badges: Badge[];
  badgeProductVariationsExclude: any[];
}

export interface ProductApiResponse {
  message: string;
  data: Product[];
  total: number;
  last_page: number;
  current_page: number;
  next_page_url: string | null;
}

export interface CartItem {
  id: number;
  name: string;
  slug: string;
  regular_price: string;
  discount_price: string;
  thumbnail: string;
  quantity: number;
  available_stock: number;
}
