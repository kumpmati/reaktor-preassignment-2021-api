import { Category, Product } from "../../types";
import { promiseAll } from "../../util";
import {
  fetchAvailabilityByManufacturer,
  fetchProductsByCategory,
} from "./fetcher";
import { parseLegacyApiData } from "./parser";

/**
 * Returns parsed product data based on category
 */
export const getProducts = async (category: Category): Promise<Product[]> => {
  const products = await fetchProductsByCategory(category);

  const manufacturers = [...new Set(products.map(p => p.manufacturer))]; // remove duplicates
  const availabilities = await promiseAll(
    manufacturers.map(async m => {
      let i = 5;
      while (i-- >= 0) {
        try {
          return await fetchAvailabilityByManufacturer(m);
        } catch {}
      }
    })
  );

  return parseLegacyApiData(products, availabilities);
};
