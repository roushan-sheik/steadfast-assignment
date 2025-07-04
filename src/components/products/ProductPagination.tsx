import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { ProductApiResponse } from "@/types/product/types"; // adjust import path if needed

interface ProductPaginationProps {
  data: Pick<ProductApiResponse, "current_page" | "last_page" | "total">;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
  data,
  onPageChange = () => {},
  isLoading = false,
}) => {
  if (!data || isLoading) return null;

  const { current_page, last_page, total } = data;
  const per_page = Math.ceil(total / last_page);
  const startItem = (current_page - 1) * per_page + 1;
  const endItem = Math.min(current_page * per_page, total);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (last_page <= maxVisiblePages) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, current_page - 1);
      const end = Math.min(last_page - 1, current_page + 1);

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== last_page) {
          pages.push(i);
        }
      }

      if (end < last_page - 1) pages.push("...");
      if (last_page > 1) pages.push(last_page);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-white rounded-lg border">
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{total}</span> products
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className={`flex items-center cursor-pointer px-3 py-2 text-sm rounded border transition-colors ${
            current_page === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed border-gray-200"
              : "text-gray-700 bg-white hover:bg-gray-50 hover:text-[var(--color-brand-500)] border-gray-300"
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-2 py-1 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(Number(page))}
                  className={`px-3 py-2 text-sm rounded border transition-colors min-w-[40px] ${
                    page === current_page
                      ? "bg-[var(--color-brand-500)] text-white border-[var(--color-brand-500)]"
                      : "text-gray-700 bg-white hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
          className={`flex items-center px-3 py-2 cursor-pointer text-sm rounded border transition-colors ${
            current_page === last_page
              ? "text-gray-400 bg-gray-100 cursor-not-allowed border-gray-200"
              : "text-gray-700 bg-white hover:bg-gray-50 hover:text-[var(--color-brand-500)] border-gray-300"
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ProductPagination;
