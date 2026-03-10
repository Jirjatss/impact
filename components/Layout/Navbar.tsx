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
    <nav className="navbar bg-white border-b border-gray-300 shadow-md z-50">
      <div className="flex justify-between items-center gap-8 w-full p-6">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="text-xl md:text-3xl font-bold text-[#c1121f] shrink-0 flex items-center gap-2"
        >
          IMPACT
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-medium ">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-red-600 transition font-bold text-lg"
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
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-red-600 transition font-bold"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
