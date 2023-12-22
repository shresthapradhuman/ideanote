"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React from "react";

const navItems = [
  {
    label: "Notes",
    href: "/notes",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contacts",
    href: "/contacts",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between h-16">
      <Link href={"/"} className="flex items-center text-xl">
        <i className="ri-brain-line text-xl mr-1"></i> LNOTE
      </Link>
      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(" text-muted-foreground hover:text-foreground", {
              "text-foreground": pathname === item.href,
            })}
          >
            {item.label}
          </Link>
        ))}

        <Link
          href={"/api/auth/signin"}
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
