"use client";

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

function Layout({ children }) {
  const pathname = usePathname();
  return (
    <>
      <Navbar />
      <div
        className={`w-full min-h-screen card-mentor bg-cover pb-24 ${pathname !== "/" && "md:pt-24 pt-16 md:px-8"}`}
      >
        {children}
      </div>
    </>
  );
}

export default Layout;
