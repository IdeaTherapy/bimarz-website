import Landing from "./components/Landing";
import BlogSection from "./components/BlogSection";
import FeaturedProjects from "./components/FeaturedProjects";
export default function Home() {
  return (
    <div>
      <Landing />
      <FeaturedProjects />
      <BlogSection />
    </div>
  );
}
