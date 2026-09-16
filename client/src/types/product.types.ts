export interface ProductColor { name: string; hex: string; }

export interface Product {
  _id: string;
  id: string;
  name: string;
  slug: string;
  description: string;
  details: string[];
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewsCount: number;
  featured: boolean;
  newArrival: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  featured?: boolean;
  newArrival?: boolean;
  maxPrice?: number;
  minPrice?: number;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating';
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pages: number;
}
