import {
  LegacyProduct,
  LegacyProductAvailability,
  LegacyProductsResponse,
  Product,
} from "../../types";
import { isCategory } from "../../util";

const inStockRegex = /<INSTOCKVALUE>(.*)<\/INSTOCKVALUE>/;

const findProductAvailability = (
  product: LegacyProduct,
  availabilities: LegacyProductAvailability[]
) => {
  const type = isCategory(product.type) ? product.type : null;

  const status = availabilities.find(a => a.id.toLowerCase() === product.id);
  const match = status?.DATAPAYLOAD?.replace("\n", "").match(inStockRegex);
  const availability = match ? match[1].toLowerCase() : "";

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
  const avs = availabilities.flat(1);
  return products.map(product => findProductAvailability(product, avs));
};
