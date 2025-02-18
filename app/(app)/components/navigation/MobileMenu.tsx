import { FC } from "react";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      id="mobile-menu"
      className={`lg:hidden fixed top-0 right-0 h-screen w-1/2 bg-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div className="h-full">
        {/* Close button positioned exactly where hamburger menu is */}
        <div className="max-w-7xl mx-auto px-4 h-[var(--navbar-height)]">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="بستن منو"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <NavLinks
          className="flex flex-col gap-6 pr-8 mt-8"
          onLinkClick={onClose}
          isMobile={true}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
