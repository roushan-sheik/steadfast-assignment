import { BLOG_QUERIES } from "@/infrastructure/product/utils/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useBlogService = () => {
  const useGetBlog = () => {
    return useSuspenseQuery(BLOG_QUERIES.getBlogs);
  };
  return {
    useGetBlog,
  };
};
