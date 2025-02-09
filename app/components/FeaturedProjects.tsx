import ProjectCard from "./ProjectCard";

const FeaturedProjects = () => {
  const projects = [
    {
      title: "تجهیز کتابخانه‌های مدارس",
      totalAmount: "16,506,532",
      contributors: 8111,
      // TODO: make contributors and total amount dynamic
      imageUrl: "/project1.jpg",
    },
    {
      title: "آبونمان کتاب",
      totalAmount: "12,345,678",
      // TODO: make contributors and total amount dynamic
      contributors: 5432,
      imageUrl: "/project2.jpg",
    },
    {
      title: "آموزش تسهیلگر کتابخوانی",
      totalAmount: "8,765,432",
      // TODO: make contributors and total amount dynamic
      contributors: 3456,
      imageUrl: "/project3.jpg",
    },
  ];

  return (
    <section className="mt-32 md:mt-0 py-16 px-4 bg-gray-50" id="projects">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          پروژه‌های منتخب
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
