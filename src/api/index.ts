import { Router } from "express";
import productsHandler from "./products";

/**
 * API endpoint router
 * URL: /api
 * e.g. /products/:category ==> /api/products/:category
 */
export const apiRoutes = Router();

/**
 * Returns all available products in a category
 */
apiRoutes.use("/products/:category?", productsHandler); // api/products/:category
