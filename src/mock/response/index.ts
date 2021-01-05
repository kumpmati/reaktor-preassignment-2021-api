import { Category, Product } from "../../types";
import beanies from "./beanies.json";
import gloves from "./gloves.json";
import facemasks from "./facemasks.json";

export const mockResponses = {
  [Category.Beanies]: beanies as Product[],
  [Category.Gloves]: gloves as Product[],
  [Category.Facemasks]: facemasks as Product[],
};
