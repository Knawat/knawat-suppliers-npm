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
  getProducts(): { products: SPProduct[] };
  addProducts(
    products: SPProduct[]
  ): Promise<{
    count: number;
    products: SPProduct[];
    warning: string;
  }>;

  // Unthrottled Fetch
  _fetch<T>(...args: any): Promise<T>;
  $fetch<T>(...args: any): Promise<T>;
  updateBulkProduct(
    products: Partial<SPProduct>[]
  ): Promise<{
    requestCount: number;
    updatedCount: number;
  }>;

  updateProductBySku(
    sku: string,
    product: Partial<SPProduct>
  ): Promise<{ product: SPProduct }>;
}
