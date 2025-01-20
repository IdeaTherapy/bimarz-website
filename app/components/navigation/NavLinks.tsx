import Link from "next/link";
import { FC } from "react";

interface NavLinksProps {
  className?: string;
  onLinkClick?: () => void;
  isMobile?: boolean;
}

const NavLinks: FC<NavLinksProps> = ({
  className = "",
  onLinkClick,
  isMobile,
}) => {
  const linkClass = isMobile
    ? "text-[#671D57] text-2xl hover:opacity-80 transition-opacity"
    : "nav-link";

  return (
    <nav
      className={className}
      role="navigation"
      aria-label={isMobile ? "Mobile navigation" : "Desktop navigation"}
    >
      <Link
        href="/"
        className={linkClass}
        onClick={onLinkClick}
        role="menuitem"
        aria-label="صفحه اصلی"
      >
        خانه
      </Link>
      <Link
        href="/about"
        className={linkClass}
        onClick={onLinkClick}
        role="menuitem"
        aria-label="درباره بی‌مرز"
      >
        درباره ما
      </Link>
      <Link
        href="/projects"
        className={linkClass}
        onClick={onLinkClick}
        role="menuitem"
        aria-label="پروژه‌های بی‌مرز"
      >
        پروژه‌ها
      </Link>
      <Link
        href="/reports"
        className={linkClass}
        onClick={onLinkClick}
        role="menuitem"
        aria-label="گزارش‌های بی‌مرز"
      >
        گزارش‌ها
      </Link>
    </nav>
  );
};

export default NavLinks;
