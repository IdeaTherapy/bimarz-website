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
    : "nav-link relative text-[#671D57] hover:text-[#8B2676] transition-colors duration-200 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#671D57] after:bottom-[-2px] after:left-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-right";

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
      {/* <Link
        href="/about"
        className={linkClass}
        onClick={onLinkClick}
        role="menuitem"
        aria-label="درباره بی‌مرز"
      >
        درباره ما
      </Link> */}
      <Link
        href="#projects"
        className={linkClass}
        onClick={onLinkClick}
        role="menuitem"
        aria-label="پروژه‌های بی‌مرز"
      >
        پروژه‌ها
      </Link>
      <Link
        href="/blog"
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
