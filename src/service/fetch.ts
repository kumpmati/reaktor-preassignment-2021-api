import { getLegacyAvailabilities, getLegacyProducts } from "./legacy";
import { ApiResponse, BackgroundFetchOptions, Category, Product } from "../types";
import { uniqueArr } from "../util";
import { parseLegacyApiData } from "./legacy/parser";

const updateCache = (cache: Map<Category, ApiResponse>, products: Product[]) => {
  const beanies = [];
  const facemasks = [];
  const gloves = [];

  for (const product of products) {
    switch (product.type) {
      case Category.Beanies:
        beanies.push(product);
        break;
      case Category.Facemasks:
        facemasks.push(product);
        break;
      case Category.Gloves:
        gloves.push(product);
        break;
    }
  }

  cache.clear();
  cache.set(Category.Beanies, { response: beanies });
  cache.set(Category.Facemasks, { response: facemasks });
  cache.set(Category.Gloves, { response: gloves });
};

/**
 * Starts periodically fetching from the legacy API and caching the results
 * @param interval number of milliseconds between fetch attempts
 */
export const startBackgroundFetch = async ({
  interval,
  cache,
  immediate,
  broadcast,
}: BackgroundFetchOptions) => {
  console.log("started background fetch service");

  const task = async () => {
    console.log("fetching new data");
    const startTime = process.hrtime();
    const legacyProducts = await getLegacyProducts();

    const manufacturers = uniqueArr(legacyProducts.map(p => p.manufacturer));
    const availabilities = await getLegacyAvailabilities(manufacturers);

    const products = parseLegacyApiData(legacyProducts, availabilities);
    updateCache(cache, products);

    const endTime = process.hrtime(startTime);
    console.info(`done fetching, took ${endTime[0]}s ${endTime[1] / 1000000} ms`);
    broadcast("cache_updated"); // notify WS clients of new data
  };

  if (immediate) task();
  return setInterval(task, interval);
};
