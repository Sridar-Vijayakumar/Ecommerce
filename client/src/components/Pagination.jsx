const Pagination = ({
  pages,
  page,
  onPageChange,
}) => {
  return (
    <div className="flex gap-2 mt-5">
      {[...Array(pages).keys()].map((x) => (
        <button
          key={x + 1}
          onClick={() => onPageChange(x + 1)}
          className={`px-3 py-1 border rounded ${
            x + 1 === page
              ? "bg-blue-600 text-white"
              : ""
          }`}
        >
          {x + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;