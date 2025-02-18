import { FC } from "react";
import Link from "next/link";
import { Instagram, Send } from "lucide-react";

const SocialLinks: FC = () => {
  return (
    <div className="flex gap-4">
      <Link
        href="https://t.me/bimarz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--heading)] hover:text-[var(--primary-700)] transition-colors duration-200"
        aria-label="Telegram"
      >
        <Send />
      </Link>

      <Link
        href="https://instagram.com/bimarz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--heading)] hover:text-[var(--primary-700)] transition-colors duration-200"
        aria-label="Instagram"
      >
        <Instagram />
      </Link>
    </div>
  );
};

export default SocialLinks;
