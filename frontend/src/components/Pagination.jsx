const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        Prev
      </button>

      <span className="px-4 py-2 font-semibold">
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;