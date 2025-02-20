import ProjectCard from "./ProjectCard";
import { ABOONEMAN_PRICE, MARATON_PRICE, SHAHRZAD_PRICE } from "../const";
const FeaturedProjects = () => {
  const projects = [
    {
      title: "آبونمان",

      // totalAmount: "12,345,678",
      receivedAid: "۴۵۶ نفر",
      // TODO: make contributors and total amount dynamic
      // contributors: 5432,
      description:
        "معادل پوشش ۱۰ کودک و نوجوان برای یک سال ارسال کتاب به صورت ماهیانه",
      imageUrl: "/abooneman.jpeg",
      price: ABOONEMAN_PRICE,
    },

    {
      title: "ماراتن",
      // totalAmount: "8,765,432",
      description: "معادل پوشش آموزش برای ۱ تسهیلگر کتابخوانی و پشتیبانی",
      receivedAid: "۱۰۴۲ تسهیلگر",
      // TODO: make contributors and total amount dynamic
      // contributors: 3456,
      imageUrl: "/maraton.jpeg",
      price: MARATON_PRICE,
    },
    {
      title: "شهرزاد",
      description: "معادل تجهیز یک کتابخانه ۳۰۰ جلدی",
      // totalAmount: "16,506,532",
      receivedAid: "۳۱ کتابخانه",
      // contributors: 8111,
      // TODO: make contributors and total amount dynamic
      imageUrl: "/project1.jpg",
      price: SHAHRZAD_PRICE,
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
