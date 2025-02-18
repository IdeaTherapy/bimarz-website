import ProjectCard from "./ProjectCard";

const FeaturedProjects = () => {
  const projects = [
    {
      title: "آبونمان کتاب",
      description: "ارسال کتاب",
      // totalAmount: "12,345,678",
      receivedAid: "۴۵۶ نفر",
      // TODO: make contributors and total amount dynamic
      // contributors: 5432,
      imageUrl: "/project2.jpg",
    },

    {
      title: "ماراتن",
      description: "آموزش تسهیلگر کتابخوانی",
      // totalAmount: "8,765,432",
      receivedAid: "۱۰۴۲ تسهیلگر",
      // TODO: make contributors and total amount dynamic
      // contributors: 3456,
      imageUrl: "/project3.jpg",
    },
    {
      title: "شهرزاد",
      description: "تجهیز کتابخانه‌های مدارس",
      // totalAmount: "16,506,532",
      receivedAid: "۳۱ کتابخانه",
      // contributors: 8111,
      // TODO: make contributors and total amount dynamic
      imageUrl: "/project1.jpg",
    },
  ];

  return (
    <section
      className="mt-[-32] md:mt-[-45] py-16 px-4 bg-[(var(--background))]"
      id="projects"
    >
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          پویش‌های بی‌مرز
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
