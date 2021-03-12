import fetch from "node-fetch";
import { availabilityEndpoint, productsEndpoint } from "../../config";
import {
  Category,
  LegacyAvailabilityResponse,
  LegacyProductsResponse,
} from "../../types";

/**
 * Fetches product data from the legacy API endpoint /v2/products/:category
 * @param {Category} category Category of products to fetch
 */
export const fetchProducts = async (
  category: Category
): Promise<LegacyProductsResponse> => {
  const response = await (await fetch(productsEndpoint(category))).json();

  // TODO: validity checking
  return response;
};

/**
 * Fetches availability data from the legacy API endpoint /v2/availability/:manufacturer
 * @param manufacturer
 */
export const fetchAvailabilities = async (
  manufacturer: string
): Promise<LegacyAvailabilityResponse> => {
  const availabilities = await (await fetch(availabilityEndpoint(manufacturer))).json();

  if (typeof availabilities.response === "string") {
    throw new Error("Legacy API error");
  }

  return availabilities;
};
