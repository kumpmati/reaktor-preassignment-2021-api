import { Category } from "../types";

export const API_URL = "https://bad-api-assignment.reaktor.com/v2";

export const STATUS_REGEX = /<INSTOCKVALUE>(.*)<\/INSTOCKVALUE>/;

export const PRODUCTS_ENDPOINT = (c: Category) => `${API_URL}/products/${c}`;
export const AVAILABILITY_ENDPOINT = (m: string) => `${API_URL}/availability/${m}`;
