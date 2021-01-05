import { Router } from "express";
import productsHandler from "./products";

/**
 * API endpoint router
 * URL: /api
 */
export const apiRoutes = Router();

/**
 * Returns all available products in a category
 * URL: /api/products/:category?
 */
apiRoutes.use("/products/:category?", productsHandler);
