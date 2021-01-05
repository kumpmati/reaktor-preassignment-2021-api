import { RequestHandler } from "express";
import { ApiResponse } from "../types";
import { isCategory } from "../util";
import { getProducts } from "./legacy";

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
    const products = await getProducts(category);
    res.end(JSON.stringify(products));
  } catch (err) {
    console.error(err);
  }
};

export default productsHandler;
