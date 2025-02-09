import { FC } from "react";
import Image from "next/image";

const Certificates: FC = () => {
  return (
    <div className="flex justify-center md:justify-end gap-4">
      <div className="relative w-24 h-24">
        <Image
          src="/placeholder-certificate-1.png"
          alt="Certificate 1"
          fill
          className="object-contain"
        />
      </div>
      <div className="relative w-24 h-24">
        <Image
          src="/placeholder-certificate-2.png"
          alt="Certificate 2"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Certificates;
