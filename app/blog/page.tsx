"use client";
import BlogCard from "../components/BlogCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for tags
const mockTags = [
  { id: 1, name: "آموزشی" },
  { id: 2, name: "رویداد" },
  { id: 3, name: "خبری" },
  { id: 4, name: "گزارش" },
];

// Mock data for date filters
const dateFilters = [
  { id: 1, name: "همه" },
  { id: 2, name: "هفته اخیر" },
  { id: 3, name: "ماه اخیر" },
  { id: 4, name: "سال اخیر" },
];

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("همه");

  const itemsPerPage = 9;
  const totalItems = 30;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleTagToggle = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  };

  // mock
  const startIndex = (currentPage - 1) * itemsPerPage;
  const blogCards = Array.from(
    { length: Math.min(itemsPerPage, totalItems - startIndex) },
    (_, index) => <BlogCard key={startIndex + index} id={startIndex + index} />
  );

  return (
    <div className="flex min-h-screen mt-20">
      {/* Filter Sidebar */}
      <div className="w-64 px-4 py-6 border-l">
        <div className="space-y-6">
          {/* Tags Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">دسته‌بندی‌ها</h3>
            <div className="flex flex-wrap gap-2">
              {mockTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={
                    selectedTags.includes(tag.name) ? "default" : "secondary"
                  }
                  className="cursor-pointer"
                  onClick={() => handleTagToggle(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">تاریخ</h3>
            <div className="flex flex-col gap-2">
              {dateFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={
                    selectedDateFilter === filter.name ? "default" : "outline"
                  }
                  className="justify-start"
                  onClick={() => setSelectedDateFilter(filter.name)}
                >
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-right">
            گزارش فعالیت‌های بی‌مرز
          </h1>
        </div>

        {/* Active Filters Display */}
        {(selectedTags.length > 0 || selectedDateFilter !== "همه") && (
          <div className="flex flex-wrap gap-2 mx-[50px] mt-4">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                {tag} ✕
              </Badge>
            ))}
            {selectedDateFilter !== "همه" && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSelectedDateFilter("همه")}
              >
                {selectedDateFilter} ✕
              </Badge>
            )}
          </div>
        )}

        <div className="flex flex-row flex-wrap gap-10 justify-center mx-[50px] my-5">
          {blogCards}
        </div>

        {/* Pagination Controls */}
        <div className="flex gap-2 my-8 justify-center">
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
    </div>
  );
}
