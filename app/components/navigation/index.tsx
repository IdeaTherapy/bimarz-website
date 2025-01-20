"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  TelegramIcon,
} from "./Icons";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [opacity, setOpacity] = useState(0.4);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Keep 40% opacity while in landing section, then gradually increase
      if (scrollPosition > viewportHeight - 100) {
        const scrollPastLanding = scrollPosition - (viewportHeight - 100);
        const newOpacity = Math.min(1, 0.4 + (scrollPastLanding / 200) * 0.6);
        setOpacity(newOpacity);
      } else {
        setOpacity(0.4);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById("mobile-menu");
      const hamburgerButton = document.getElementById("hamburger-button");
      if (
        mobileMenu &&
        !mobileMenu.contains(event.target as Node) &&
        hamburgerButton &&
        !hamburgerButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header role="banner">
      <nav
        className="sticky top-0 z-50 h-[var(--navbar-height)] overflow-visible w-full"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          backdropFilter: "blur(5px)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Right Side - Navigation Links (Desktop) and Hamburger (Mobile) */}
            <div className="flex items-center">
              {/* Desktop Navigation Links */}
              <NavLinks className="hidden lg:flex items-center gap-5" />

              {/* Hamburger Menu Button (Mobile) */}
              <button
                id="hamburger-button"
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "بستن منو" : "باز کردن منو"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
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
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Left Side - Social Icons */}
            <div
              className="flex items-center gap-[5px]"
              role="navigation"
              aria-label="Social media links"
            >
              <Link
                href="#"
                className="social-icon"
                aria-label="Instagram بی‌مرز"
              >
                <InstagramIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="#"
                className="social-icon"
                aria-label="Facebook بی‌مرز"
              >
                <FacebookIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="#"
                className="social-icon"
                aria-label="LinkedIn بی‌مرز"
              >
                <LinkedInIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="#"
                className="social-icon"
                aria-label="Telegram بی‌مرز"
              >
                <TelegramIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile Menu */}
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
