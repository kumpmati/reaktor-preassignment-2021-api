import fetch from "node-fetch";
import { API_URL } from "../../config";
import {
  Category,
  LegacyAvailabilityResponse,
  LegacyProductsResponse,
} from "../../types";

export const productsEndpointURL = (c: Category) => `${API_URL}/products/${c}`;
export const availabilityEndpointURL = (m: string) => `${API_URL}/availability/${m}`;

/**
 * Fetches product data from the legacy API endpoint /v2/products/:category
 * @param {Category} category Category of products to fetch
 */
export const fetchProducts = async (
  category: Category
): Promise<LegacyProductsResponse> => {
  const response = await (await fetch(productsEndpointURL(category))).json();

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
  const availabilities: LegacyAvailabilityResponse = await (
    await fetch(availabilityEndpointURL(manufacturer))
  ).json();

  if (typeof availabilities.response === "string") {
    throw new Error("Legacy API error");
  }

  return availabilities;
};
