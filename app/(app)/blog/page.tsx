"use client";
import BlogCard from "../components/BlogCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalItems = 30; // This should be replaced with actual total count from your data source
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate pagination range

  // mock
  const startIndex = (currentPage - 1) * itemsPerPage;
  const blogCards = Array.from(
    { length: Math.min(itemsPerPage, totalItems - startIndex) },
    (_, index) => <BlogCard key={startIndex + index} id={startIndex + index} />
  );

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex flex-row flex-wrap gap-10 justify-center mx-[50px] my-5">
        {blogCards}
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-2 my-8">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2"
        >
          قبلی
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => handlePageChange(i + 1)}
            className="px-4 py-2"
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2"
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
