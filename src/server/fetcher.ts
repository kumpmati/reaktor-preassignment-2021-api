import { getLegacyProducts } from "../legacy";
import { ApiResponse, Category } from "../types";

/**
 * Starts periodically fetching from the legacy API and caching the results
 * @param interval number of milliseconds between fetch attempts
 */
export const startBackgroundFetch = (
  interval: number,
  cache: Map<Category, ApiResponse>,
  immediate?: boolean
) => {
  const categories = [Category.Beanies, Category.Facemasks, Category.Gloves];

  const tasks = categories.map(category => {
    const task = async () => {
      try {
        const response = await getLegacyProducts(category);
        cache.set(category, { success: true, response });
      } catch (err) {
        console.log("background fetch error:", err);
      }
    };

    if (immediate) task();
    return setInterval(task, interval);
  });

  return tasks;
};
