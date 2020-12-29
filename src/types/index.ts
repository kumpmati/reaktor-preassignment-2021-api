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

/**
 * Format of a successful response from the legacy API endpoint /v2/products/:category
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
 * Format of a successful response from the legacy API endpoint /v2/availability/:manufacturer
 */
export type LegacyAvailabilityResponse = {
  code: number;
  response: LegacyProductAvailability[];
};
export type LegacyProductAvailability = {
  id: string;
  DATAPAYLOAD: string;
};
