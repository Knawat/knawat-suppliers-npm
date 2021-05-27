import { SPProduct } from '@knawat/types';

interface RateLimit {
  apiRateLimit?: Partial<{
    reservoir: string;
    reservoirRefreshInterval: string;
    reservoirRefreshAmount: string;
    maxConcurrent: string;
  }>;
}
export class Products {
  constructor(
    args: { key: string; secret: string } | { token: string } & RateLimit
  );
  getProducts(): { products: SPProduct[]; errors: ResMessage[] };
  addProducts(
    products: SPProduct[]
  ): Promise<{
    count: number;
    products: SPProduct[];
    warning: string;
    errors: ResMessage[];
  }>;

  // Unthrottled Fetch
  _fetch<T>(...args: any): Promise<T | { errors: ResMessage[] }>;
  $fetch<T>(...args: any): Promise<T | { errors: ResMessage[] }>;
  updateBulkProduct(
    products: Partial<SPProduct>[]
  ): Promise<{
    requestCount: number;
    updatedCount: number;
    errors: ResMessage[];
  }>;

  updateProductBySku(
    sku: string,
    product: Partial<SPProduct>
  ): Promise<{ product: SPProduct; errors: ResMessage[] }>;
}

interface ResMessage {
  message: string;
}
