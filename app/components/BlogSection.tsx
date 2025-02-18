"use client";

import BlogCard from "./BlogCard";
import { useViewportSize } from "../hooks/useViewportSize";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function BlogSection() {
  const viewportSize = useViewportSize();
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          گزارش فعالیت‌های بی‌مرز
        </h2>
        <div className="flex flex-row flex-wrap gap-10 justify-center">
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
      </div>
    </section>
  );
}

export default BlogSection;
