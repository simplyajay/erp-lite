import React from "react";
import { ChevronLeft, ChevronRight } from "../icons/Icons";

const Pagination = ({ handlePrevious, handleNext, currentPage, totalPages, loading }) => {
  return (
    <div className="w-full flex justify-center items-center p-2 gap-12">
      <button
        type="button"
        disabled={currentPage <= 1 || loading}
        className="rounded-sm hover:cursor-pointer"
        onClick={handlePrevious}
      >
        <ChevronLeft />
      </button>
      <span className="flex gap-4">
        <strong>{currentPage ? currentPage : 1}</strong>
        <p>of</p>
        <strong>{totalPages ? totalPages : 1}</strong>
      </span>
      <button
        type="button"
        disabled={currentPage >= totalPages || loading}
        className="rounded-sm hover:cursor-pointer"
        onClick={handleNext}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
