import { Router } from "express";
import { ApiResponse } from "../types";
import { isCategory, sleep } from "../util";
import { mockResponses } from "./response";

/**
 * MOCK version of the API,
 * returns placeholder data from memory
 */

/**
 * API endpoint router
 * URL: /api
 */
export const mockApiRoutes = Router();

/**
 *
 * Returns all available products in a category
 * URL: /api/products/:category?
 */
mockApiRoutes.use("/products/:category?", async (req, res) => {
  const { category } = req.params;

  if (!isCategory(category)) {
    res.writeHead(400);
    const response: ApiResponse = {
      error: "Invalid category",
      response: null,
    };

    return res.end(JSON.stringify(response));
  }

  const mockResponse: ApiResponse = {
    response: mockResponses[category],
  };

  await sleep(250);
  res.end(JSON.stringify(mockResponse));
});
