import { Router } from "express";
import productsHandler from "./products";

/**
 * API endpoint router
 * URL: /api
 */
export const apiRoutes = Router();

apiRoutes.use("/products/:category?", productsHandler);
