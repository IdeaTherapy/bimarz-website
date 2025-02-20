"use client";

import Image from "next/image";
import { FC, useState } from "react";
import DonationDialog from "./DonationDialog";
import { Price } from "../const";
interface ProjectCardProps {
  title: string;
  imageUrl: string;
  description: string;
  price: Price;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  imageUrl,
  description,
  price,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
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

          {/* Help Button */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="w-full bg-[var(--secondary-400)] text-white py-3 rounded-xl hover:bg-[var(--secondary-600)] transition-colors text-lg font-bold"
          >
            حمایت می‌کنم
          </button>
        </div>
      </div>

      <DonationDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        projectTitle={title}
        projectImage={imageUrl}
        description={description}
        price={price}
      />
    </>
  );
};

export default ProjectCard;
