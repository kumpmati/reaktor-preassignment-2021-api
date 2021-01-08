import { RequestHandler } from "express";
import { ApiResponse, Category } from "../types";
import { isCategory } from "../util";

/**
 * Cache for the /api/products/:category? API endpoint
 */
export const productsCache = new Map<Category, ApiResponse>();

/**
 * Returns all available products in a category
 * Endpoint URL: /api/products/:category?
 * @param req
 * @param res
 */
const productsHandler: RequestHandler = async (req, res) => {
  const { category } = req.params;

  if (!isCategory(category)) {
    res.writeHead(400);
    const response: ApiResponse = {
      success: false,
      error: "Invalid category",
      response: null,
    };

    return res.end(JSON.stringify(response));
  }

  try {
    const response = productsCache.get(category); // get response from cache
    res.end(JSON.stringify(response));
  } catch (err) {
    console.error(err);
  }
};

export default productsHandler;
