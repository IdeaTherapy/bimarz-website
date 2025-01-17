import BlogCard from "./BlogCard";

function BlogSection() {
  return (
    <div className="flex flex-row flex-wrap gap-10 justify-center mx-10 my-4">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}

export default BlogSection;
