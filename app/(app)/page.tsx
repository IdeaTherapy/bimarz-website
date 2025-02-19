import Landing from "./components/Landing";
import BlogSection from "./components/BlogSection";
import FeaturedProjects from "./components/FeaturedProjects";
import ManualPay from "./components/ManualPay";

export default function Home() {
  return (
    <main>
      <Landing />
      <FeaturedProjects />
      <ManualPay />
      <BlogSection />
    </main>
  );
}
