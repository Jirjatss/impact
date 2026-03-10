"use client";

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

function Layout({ children, className }) {
  const pathname = usePathname();
  return (
    <>
      <Navbar />
      <div
        className={`w-full min-h-screen card-mentor pb-10 ${pathname !== "/" && "pt-4 md:px-8"} ${className}`}
      >
        {children}
      </div>
    </>
  );
}

export default Layout;
