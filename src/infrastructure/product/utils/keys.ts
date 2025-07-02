export const PRODUCT_QUERY_KEYS = {
  default: () => ["products"] as const,
  list: (params?: string) =>
    [...PRODUCT_QUERY_KEYS.default(), "list", params] as const,
};
