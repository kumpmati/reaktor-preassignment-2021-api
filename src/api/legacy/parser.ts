import {
  LegacyAvailabilityResponse,
  LegacyProductsResponse,
  Product,
} from "../../types";
import { isCategory } from "../../util";

// finds the instock value from the DATAPAYLOAD
const inStockRegex = /<INSTOCKVALUE>(.*)<\/INSTOCKVALUE>/;

/**
 * Parses raw legacy API responses into a new API response
 * @param products
 * @param availabilities
 */
export const parseLegacyApiData = (
  products: LegacyProductsResponse,
  availabilities: LegacyAvailabilityResponse[]
): Product[] => {
  const availabilityArr = availabilities.map(a => a.response).flat(1);

  return products.map(product => {
    const status = availabilityArr.find(a => a.id === product.id);
    const match = status?.DATAPAYLOAD?.replace("\n", "").match(inStockRegex);
    const type = isCategory(product.type) ? product.type : null;

    return {
      ...product,
      type,
      availability: match ? match[0] : "",
    };
  });
};
