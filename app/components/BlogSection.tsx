import BlogCard from "./BlogCard";

function BlogSection() {
  return (
    <div className="flex flex-row flex-wrap gap-10 justify-center mx-10 my-5">
      <div className="flex  justify-center w-full">
        <h1 className="text-4xl font-bold text-right">
          گزارش فعالیت‌های بی‌مرز
        </h1>
      </div>
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}

export default BlogSection;
