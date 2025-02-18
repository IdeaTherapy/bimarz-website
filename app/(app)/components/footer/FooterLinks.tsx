import { FC } from "react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
}

const FooterLinks: FC<FooterLinksProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col items-start">
      <h3 className="text-xl font-semibold mb-4 text-[var(--primary-700)]">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-[var(--heading)] hover:text-[var(--primary-700)] transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
