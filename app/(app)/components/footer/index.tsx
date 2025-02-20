import { FC } from "react";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";
import Image from "next/image";
const Footer: FC = () => {
  return (
    <footer className="py-8 mt-10 bg-[var(--background)]" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold mb-4 text-[var(--primary-700)]">
              <Image src="/logo.jpeg" alt="logo" width={70} height={70} />
            </h2>
            <p className="text-[var(--heading)] text-sm mb-4">
              با «بی مرز» محدودیت‌های جریان آگاهی را درنوردیم.
            </p>
            <SocialLinks />
          </div>

          {/* Contact Info */}
          <div>
            <ContactInfo />
          </div>
        </div>

        {/* Certificates */}
        {/* <div className="mt-12 border-t pt-8">
          <Certificates />
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
