import { Category, LegacyProduct, LegacyProductAvailability } from "../../types";
import { fetchAvailabilities, fetchProducts } from "./fetcher";
import { promiseAll } from "../../util";
import { MAX_API_RETRIES } from "../../config";

/**
 * Returns the products for all the available categories
 */
export const getLegacyProducts = async (): Promise<LegacyProduct[]> => {
  const categories = [Category.Beanies, Category.Facemasks, Category.Gloves];
  return (await promiseAll(categories.map(fetchProducts))).flat(1);
};

/**
 * Returns the availability data for all manufacturers in the array.
 * If a fetch for a manufacturer fails, it will try again it for 5 times total
 * @param manufacturers
 */
export const getLegacyAvailabilities = async (
  manufacturers: string[]
): Promise<LegacyProductAvailability[]> => {
  const responses = await promiseAll(
    manufacturers.map(async m => {
      let i = MAX_API_RETRIES;
      while (i-- > 0) {
        try {
          return await fetchAvailabilities(m);
        } catch (err) {
          console.log(` - error while fetching ${m}, retrying... (${5 - i})`);
        }
      }
    })
  );

  const availabilities = responses.map(r => r.response).flat(1);
  return availabilities;
};
