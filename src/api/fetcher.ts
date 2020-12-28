import fetch from "node-fetch";
import { API_URL } from "../config";
import {
  Category,
  LegacyAvailabilityResponse,
  LegacyProductsResponse,
} from "../types";

export const productsEndpointURL = (c: Category) => `${API_URL}/products/${c}`;
export const availabilityEndpointURL = (m: string) =>
  `${API_URL}/availability/${m}`;

/**
 * Fetches product data from the legacy API endpoint /v2/products/:category
 * @param {Category} category Category of products to fetch
 */
export const fetchProductsByCategory = async (
  category: Category
): Promise<LegacyProductsResponse> => {
  try {
    const products = await (await fetch(productsEndpointURL(category))).json();

    // TODO: validity checking
    return products;
  } catch (err) {
    console.error("ERROR fetching products", err);
  }
};

/**
 * Fetches availability data from the legacy API endpoint /v2/availability/:manufacturer
 * @param manufacturer
 */
export const fetchAvailabilityByManufacturer = async (
  manufacturer: string
): Promise<LegacyAvailabilityResponse> => {
  try {
    const availabilities = await (
      await fetch(availabilityEndpointURL(manufacturer))
    ).json();

    // TODO: validity checking
    return availabilities;
  } catch (err) {
    console.error("ERROR fetching availabilities", err);
  }
};
