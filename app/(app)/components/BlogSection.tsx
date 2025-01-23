"use client";

import BlogCard from "./BlogCard";
import { useViewportSize } from "../hooks/useViewportSize";
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
    </div>
  );
}

export default BlogSection;
