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
    const response: ApiResponse = {
      error: "Invalid category",
      response: null,
    };
    return res.json(response);
  }

  const response = productsCache.get(category);
  if (!response) {
    return res.json({
      error: "Server is starting...",
      response: null,
    });
  }

  res.json(response);
};

export default productsHandler;
