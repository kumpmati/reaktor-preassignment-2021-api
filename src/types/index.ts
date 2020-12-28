export enum Category {
  Beanies = "beanies",
  Facemasks = "facemasks",
  Gloves = "gloves",
}

/**
 * Format of a successful response from the legacy API endpoint /v2/products/:category
 */
export type LegacyProductsResponse = LegacyProduct[];

/**
 * Format of a legacy product
 */
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
  response: LegacyAvailabilityStatus[];
};

/**
 * Format of a legacy product's availability status
 */
export type LegacyAvailabilityStatus = {
  id: string;
  DATAPAYLOAD: string;
};
