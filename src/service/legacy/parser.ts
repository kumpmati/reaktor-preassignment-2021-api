import {
  LegacyProduct,
  LegacyProductAvailability,
  LegacyProductsResponse,
  Product,
} from "../../types";
import { isCategory } from "../../util";

const inStockRegex = /<INSTOCKVALUE>(.*)<\/INSTOCKVALUE>/;

const parseStatusFromPayload = (payload: string) => {
  const status = payload.replace("\n", "").match(inStockRegex);
  return status ? status[1].toLocaleLowerCase() : "";
};

const findProductAvailability = (
  product: LegacyProduct,
  availabilities: Map<string, string>
) => {
  const type = isCategory(product.type) ? product.type : null;
  const availability = availabilities.get(product.id);

  if (!availability) console.log("no availability for", product.id);

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
    availabilities.map(a => [a.id.toLowerCase(), parseStatusFromPayload(a.DATAPAYLOAD)])
  );

  return products.map(product => findProductAvailability(product, statuses));
};
