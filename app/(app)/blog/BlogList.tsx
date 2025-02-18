"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/app/(app)/components/BlogCard";
import type { Post } from "@/payload-types";

const dateFilters = [
  { id: 1, name: "همه" },
  { id: 2, name: "هفته اخیر" },
  { id: 3, name: "ماه اخیر" },
  { id: 4, name: "سال اخیر" },
];

interface PostsResponse {
  docs: Post[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface TagsResponse {
  docs: Tag[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

interface BlogListProps {
  initialData: PostsResponse;
}

export default function BlogList({ initialData }: BlogListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<Tag[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",") || []
  );
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>(
    searchParams.get("dateFilter") || "همه"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [postsData, setPostsData] = useState<PostsResponse>(initialData);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();

    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }

    if (selectedDateFilter && selectedDateFilter !== "همه") {
      params.set("dateFilter", selectedDateFilter);
    }

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    router.push(params.toString() ? `?${params.toString()}` : "/blog");
  }, [selectedTags, selectedDateFilter, currentPage, router]);

  useEffect(() => {
    updateURL();
  }, [selectedTags, selectedDateFilter, currentPage, updateURL]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
    setCurrentPage(1);
  };

  const handleDateFilterChange = (filterName: string) => {
    setSelectedDateFilter(filterName);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchPosts = useCallback(async () => {
    let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?depth=1&page=${currentPage}&limit=10&sort=-createdAt`;

    if (selectedTags.length > 0) {
      url += `&where[tags][in][]=${selectedTags.join("&where[tags][in][]=")}`;
    }

    if (selectedDateFilter !== "همه") {
      const now = new Date();
      let fromDate = new Date();

      switch (selectedDateFilter) {
        case "هفته اخیر":
          fromDate.setDate(now.getDate() - 7);
          break;
        case "ماه اخیر":
          fromDate.setMonth(now.getMonth() - 1);
          break;
        case "سال اخیر":
          fromDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          fromDate = new Date(0);
      }

      url += `&where[createdAt][greater_than]=${fromDate.toISOString()}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPostsData(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [currentPage, selectedTags, selectedDateFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchTags = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tags`);
      if (!res.ok) throw new Error("Failed to fetch tags");
      const data: TagsResponse = await res.json();
      setTags(data.docs);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <div className="flex min-h-screen mt-20">
      {/* Filter Sidebar */}
      <div className="min-w-64 px-8 py-6">
        <div className="space-y-6">
          {/* Tags Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">دسته‌بندی‌ها</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={"default"}
                  className={`cursor-pointer ${
                    selectedTags.includes(tag.id)
                      ? "bg-[var(--primary-700)] text-[var(--primary-foreground)] hover:bg-[var(--primary-700)]"
                      : "bg-[var(--tag-badge)] text-[var(--heading)] hover:bg-[var(--tag-badge)]"
                  }`}
                  onClick={() => handleTagToggle(tag.id)}
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
                    selectedDateFilter === filter.name ? "default" : "default"
                  }
                  className={`justify-start ${
                    selectedDateFilter === filter.name
                      ? "bg-[var(--primary-700)] text-[var(--primary-foreground)] hover:bg-[var(--primary-700)]"
                      : "bg-[var(--tag-badge)] text-[var(--heading)] hover:bg-[var(--tag-badge)]"
                  }`}
                  onClick={() => handleDateFilterChange(filter.name)}
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
            {selectedTags.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId);
              if (!tag) return null;
              return (
                <Badge
                  key={tagId}
                  variant="default"
                  className="cursor-pointer bg-[var(--primary-700)] text-[var(--primary-foreground)] hover:bg-[var(--primary-700)]"
                  onClick={() => handleTagToggle(tagId)}
                >
                  {tag.name} ✕
                </Badge>
              );
            })}
            {selectedDateFilter !== "همه" && (
              <Badge
                variant="default"
                className="cursor-pointer bg-[var(--primary-700)] text-[var(--primary-foreground)] hover:bg-[var(--primary-700)]"
                onClick={() => handleDateFilterChange("همه")}
              >
                {selectedDateFilter} ✕
              </Badge>
            )}
          </div>
        )}

        <div className="flex flex-row flex-wrap gap-10 justify-center mx-[50px] my-5">
          {postsData.docs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination Controls */}
        {postsData.totalPages > 1 && (
          <div className="flex gap-2 my-8 justify-center">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!postsData.hasPrevPage}
              className="px-4 py-2"
            >
              قبلی
            </Button>

            {Array.from({ length: postsData.totalPages }, (_, i) => (
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
              disabled={!postsData.hasNextPage}
              className="px-4 py-2"
            >
              بعدی
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
