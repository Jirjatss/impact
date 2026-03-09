"use client";

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

function Layout({ children, className }) {
  const pathname = usePathname();
  return (
    <>
      <Navbar />
      <div
        className={`w-full min-h-screen card-mentor pb-24 ${pathname !== "/" && "md:pt-24 pt-16 md:px-8"} ${className}`}
      >
        {children}
      </div>
    </>
  );
}

export default Layout;
