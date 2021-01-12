import { EventEmitter } from "events";
import { Category, LegacyProduct, LegacyProductAvailability } from "../../types";
import { promiseAll } from "../../util";
import { fetchAvailabilities, fetchProducts } from "./fetcher";

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
      let i = 5;
      while (i-- > 0) {
        try {
          return await fetchAvailabilities(m);
        } catch (err) {
          console.log("erroria");
        }
      }
    })
  );

  const availabilities = responses.map(r => r.response).flat(1);
  return availabilities;
};

export const getLegacyAvailabilitiesStream = (manufacturers: string[]): EventEmitter => {
  const emitter = new EventEmitter();

  for (const m of manufacturers) {
    (async () => {
      let i = 5;
      while (i-- > 0) {
        try {
          const response = await fetchAvailabilities(m);
          emitter.emit("data", response.response);
          break;
        } catch (err) {
          console.log("erroria");
        }
      }
    })();
  }

  return emitter;
};
