import { getLegacyAvailabilities, getLegacyProducts } from "./legacy";
import { ApiResponse, Category } from "../types";
import { uniqueArr } from "../util";
import { parseLegacyApiData } from "./legacy/parser";

/**
 * Starts periodically fetching from the legacy API and caching the results
 * @param interval number of milliseconds between fetch attempts
 */
export const startBackgroundFetch = async (
  interval: number,
  cache: Map<Category, ApiResponse>,
  immediate?: boolean
) => {
  console.log("started background fetch service");

  const task = async () => {
    console.log("fetching new data");
    const legacyProducts = await getLegacyProducts();

    const manufacturers = uniqueArr(legacyProducts.map(p => p.manufacturer));
    const availabilities = await getLegacyAvailabilities(manufacturers);

    const products = parseLegacyApiData(legacyProducts, availabilities);

    for (const product of products) {
      if (!cache.has(product.type))
        cache.set(product.type, {
          success: true,
          response: [],
        });

      const r = cache.get(product.type);
      if (r) {
        r.response.push(product);
      }
    }

    console.log("finished fetching new data");
  };

  if (immediate) task();
  return setInterval(task, interval);
};
