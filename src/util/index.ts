import { Category } from "../types";

export const isCategory = (s: string): s is Category =>
  s !== null && Object.values(Category).includes(s as any);

export const promiseAll = async <T>(arr: Promise<T>[]) =>
  (await Promise.allSettled(arr)).map(item =>
    item.status === "fulfilled" ? item.value : null
  );
