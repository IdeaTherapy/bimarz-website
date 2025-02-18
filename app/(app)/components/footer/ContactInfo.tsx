import { FC } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { formatPersianNumber } from "../../utils/numbers";

const ContactInfo: FC = () => {
  return (
    <div className="flex flex-col items-start">
      <h3 className="text-xl font-semibold mb-4 text-[var(--primary-700)]">
        ارتباط با ما
      </h3>
      <div className="space-y-4">
        <a
          href="mailto:bimarzproject@gmail.com"
          className="flex items-center gap-2 text-[var(--heading)] hover:text-[var(--primary-700)] transition-colors duration-200"
        >
          <Mail className="w-5 h-5" />
          <span>bimarzproject@gmail.com</span>
        </a>

        <a
          href="tel:+982188064683"
          className="flex items-center gap-2 text-[var(--heading)] hover:text-[var(--primary-700)] transition-colors duration-200"
        >
          <Phone className="w-5 h-5" />
          <span dir="ltr">{formatPersianNumber("021-88064683")}</span>
        </a>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Tehran+Brazil+Street"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[var(--heading)] hover:text-[var(--primary-700)] transition-colors duration-200"
        >
          <MapPin className="w-5 h-5" />
          <span>تهران - برزیل غربی</span>
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
