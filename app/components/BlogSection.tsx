"use client";

import BlogCard from "./BlogCard";
import { useViewportSize } from "../hooks/useViewportSize";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function BlogSection() {
  const viewportSize = useViewportSize();
  return (
    <div className="flex flex-row flex-wrap gap-10 justify-center mx-10 my-5">
      <div className="flex  justify-center w-full">
        <h1 className="text-4xl font-bold text-right">
          گزارش فعالیت‌های بی‌مرز
        </h1>
      </div>
      <BlogCard id={1} />
      <BlogCard id={2} />
      <BlogCard id={3} />
      <BlogCard id={4} />
      {viewportSize !== "sm" && (
        <>
          <BlogCard id={5} />
          <BlogCard id={6} />
        </>
      )}
      <div className="flex justify-center w-full my-10">
        <Link href="/blog">
          <Button className="bg-[#671D57] text-white px-6 py-7 rounded-full hover:bg-[#320d2a] transition-colors text-2xl">
            مشاهده همه گزارش‌ها
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default BlogSection;
