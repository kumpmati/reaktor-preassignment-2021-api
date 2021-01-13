import { STATUS_REGEX } from "../../config";
import { isCategory } from "../../util";
import {
  LegacyProduct,
  LegacyProductAvailability,
  LegacyProductsResponse,
  Product,
} from "../../types";

/**
 * Finds the availability value from the DATAPAYLOAD field
 * @param payload
 */
const parseStatusString = (product: LegacyProductAvailability) => {
  const status = product.DATAPAYLOAD.replace("\n", "").match(STATUS_REGEX);
  return status ? status[1].toLocaleLowerCase() : "";
};

/**
 * Creates a final product by combining the legacy product info
 * with the corresponding availability data for that product,
 * and checking that the type is an existing category.
 * @param product Legacy product
 * @param availabilities Map of availabilities
 * @returns Complete product
 */
const createProduct = (product: LegacyProduct, availabilities: Map<string, string>) => {
  const type = isCategory(product.type) ? product.type : null;
  const availability = availabilities.get(product.id) || null;

  return {
    ...product,
    type,
    availability,
  };
};

/**
 * Parses raw legacy API responses into a new API response
 * @param products List of products from the legacy /products endpoint
 * @param availabilities
 */
export const parseLegacyApiData = (
  products: LegacyProductsResponse,
  availabilities: LegacyProductAvailability[]
): Product[] => {
  const statuses = new Map<string, string>(
    availabilities.map(a => [a.id.toLowerCase(), parseStatusString(a)])
  );

  return products.map(product => createProduct(product, statuses));
};
