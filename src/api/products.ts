import { RequestHandler } from "express";
import { isCategory } from "../util";
import { getProducts } from "./legacy";

/**
 * Returns all available products in a category
 * Endpoint URL: /api/products/:category?
 * @param req
 * @param res
 */
const productsListener: RequestHandler = async (req, res) => {
  const { category } = req.params;
  if (!category) {
    res.writeHead(400);
    return res.end(
      JSON.stringify({
        code: "400",
        error: "Bad Request",
        reason: "category is required",
      })
    );
  }

  if (!isCategory(category)) {
    res.writeHead(400);
    return res.end(
      JSON.stringify({
        code: "400",
        error: "Bad Request",
        reason: "invalid category",
      })
    );
  }

  const products = JSON.stringify(await getProducts(category));
  res.end(products);
};
export default productsListener;
