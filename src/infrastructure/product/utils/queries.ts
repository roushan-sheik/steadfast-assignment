import { productAPIClient } from "../productAPIClient";
import { PRODUCT_QUERY_KEYS } from "./keys";

export const BLOG_QUERIES = {
  getBlogs: {
    queryKey: PRODUCT_QUERY_KEYS.list(),
    queryFn: productAPIClient.getProducts,
  },
};
