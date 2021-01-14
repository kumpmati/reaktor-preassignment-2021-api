import { Category, Config } from "../types";

export const DEFAULT_CONFIG: Config = {
  port: 9000,
  mock: false,
  development: true,
};

export const API_URL = "https://bad-api-assignment.reaktor.com/v2";

export const STATUS_REGEX = /<INSTOCKVALUE>(.*)<\/INSTOCKVALUE>/;

export const PRODUCTS_ENDPOINT = (c: Category) => `${API_URL}/products/${c}`;
export const AVAILABILITY_ENDPOINT = (m: string) => `${API_URL}/availability/${m}`;
