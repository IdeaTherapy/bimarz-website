import { FC } from "react";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";

const Footer: FC = () => {
  return (
    <footer className="py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold mb-4 text-[#671D57]">بی‌مرز</h2>
            <p className="text-gray-600 text-sm mb-4">
              توضیحات بسیار کوتاهی درباره پروژه‌های بی‌مرز و اهدافشان.
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
