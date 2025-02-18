"use client";

import BlogCard from "@/app/(app)/components/BlogCard";
import { useViewportSize } from "../hooks/useViewportSize";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import type { Post } from "@/payload-types";

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

function BlogSection() {
  const viewportSize = useViewportSize();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchRecentPosts = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?depth=1&page=1&limit=6&sort=-createdAt`
      );
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data: PostsResponse = await res.json();
      setPosts(data.docs);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchRecentPosts();
  }, [fetchRecentPosts]);

  const displayPosts = viewportSize === "sm" ? posts.slice(0, 4) : posts;

  return (
    <div className="flex flex-row flex-wrap gap-10 justify-center mx-10 my-5">
      <div className="flex justify-center w-full">
        <h1 className="text-4xl font-bold text-right">
          گزارش فعالیت‌های بی‌مرز
        </h1>
      </div>

      {displayPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}

      <div className="flex justify-center w-full my-10">
        <Link href="/blog">
          <Button className="bg-[var(--secondary-400)] text-white px-6 py-7 rounded-xl hover:bg-[var(--secondary-600)] transition-colors text-2xl">
            مشاهده همه گزارش‌ها
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default BlogSection;
