"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/Logo.png";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Check In", href: "/check-in" },
  { name: "Check Out", href: "/check-out" },
  { name: "Performance", href: "/performance" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 md:top-6 md:left-6 md:right-auto md:w-fit z-50 bg-white shadow-md md:shadow-2xl md:rounded-full border-b md:border border-gray-200 py-4 md:py-3 px-6 md:px-8 transition-all duration-300">
      <div className="flex justify-between items-center gap-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="text-xl md:text-2xl font-bold text-[#c1121f] shrink-0 flex items-center gap-2"
        >
          <Image src={Logo} alt="" className="w-8 h-8" />
          IMPACT
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-red-600 transition font-bold"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-gray-600 font-medium hover:text-blue-600"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
