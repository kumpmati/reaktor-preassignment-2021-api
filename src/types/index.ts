export type Config = {
  development?: boolean;
  mock?: boolean;
  port: number;
};

export enum Category {
  Beanies = "beanies",
  Facemasks = "facemasks",
  Gloves = "gloves",
}

export type Product = {
  id: string;
  type: Category;
  name: string;
  color: string[];
  price: number;
  manufacturer: string;
  availability: string;
};

export type ApiResponse = {
  error?: string;
  response: Product[];
};

/**
 * Response from the legacy API endpoint /v2/products/:category
 */
export type LegacyProductsResponse = LegacyProduct[];
export type LegacyProduct = {
  id: string;
  type: string;
  name: string;
  color: string[];
  price: number;
  manufacturer: string;
};

/**
 * Response from the legacy API endpoint /v2/availability/:manufacturer
 */
export type LegacyAvailabilityResponse = {
  code: number;
  response: LegacyProductAvailability[];
};
export type LegacyProductAvailability = {
  id: string;
  DATAPAYLOAD: string;
};
