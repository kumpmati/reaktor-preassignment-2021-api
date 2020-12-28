import { Category } from "../types";
import { fetchProductsByCategory } from "./fetcher";

/**
 * Returns parsed product data based on category
 */
export const getProducts = async (category: Category) => {
  fetchProductsByCategory(category);
};
