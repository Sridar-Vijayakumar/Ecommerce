import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pages, page, onPageChange }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
          page === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-brand-600 hover:text-white"
        }`}
      >
        <ChevronLeft size={18} />
        Prev
      </button>  

      {/* Page Numbers */}
      {[...Array(pages).keys()].map((x) => (
        <button
          key={x + 1}
          onClick={() => onPageChange(x + 1)}
          className={`w-10 h-10 rounded-lg border font-medium transition ${
            page === x + 1
              ? "bg-brand-600 text-white border-brand-600"
              : "bg-white hover:bg-brand-50"
          }`}
        >
          {x + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
          page === pages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-brand-600 hover:text-white"
        }`}
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
