import Image from "next/image";
import { FC } from "react";

interface ProjectCardProps {
  title: string;
  totalAmount: string;
  contributors: number;
  imageUrl: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  totalAmount,
  contributors,
  imageUrl,
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-[400px] transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg"
      dir="rtl"
    >
      {/* Project Image */}
      <div className="relative h-[300px] w-full shadow">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>

        {/* Stats Container */}
        <div className="space-y-4 mb-6">
          {/* Total Amount */}
          <div className="flex flex-row justify-between items-center">
            <span className="text-gray-600">حمایت‌ شده تا به حال</span>
            <span className="text-lg font-bold text-gray-900">
              {totalAmount}
            </span>
          </div>

          {/* Contributors */}
          <div className="flex flex-row justify-between items-center">
            <span className="text-gray-600">حامیان</span>
            <span className="text-lg font-bold text-gray-900">
              {contributors}
            </span>
          </div>
        </div>

        {/* Help Button */}
        <button className="w-full bg-[#FD8F00] text-white py-3 rounded-xl hover:bg-[#e58100] transition-colors text-lg font-bold">
          حمایت می‌کنم
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
