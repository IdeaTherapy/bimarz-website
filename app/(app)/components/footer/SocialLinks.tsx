import { FC } from "react";
import Link from "next/link";
import { Instagram, Send } from "lucide-react";
import { INSTAGRAM_URL, TELEGRAM_URL } from "@/app/(app)/const";
const SocialLinks: FC = () => {
  return (
    <div className="flex gap-4">
      <Link
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--heading)] hover:text-[var(--primary-700)] transition-colors duration-200"
        aria-label="Telegram"
      >
        <Send />
      </Link>

      <Link
        href={INSTAGRAM_URL}
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
