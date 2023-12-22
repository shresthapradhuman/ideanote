"use client";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React from "react";
import Sidebar from "./sidebar";

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
    <header className="flex items-center justify-between h-16 px-4 md:px-0">
      <Link href={"/"} className="flex items-center text-xl">
        <i className="ri-brain-line text-xl font-semibold mr-1"></i> LNOTE
      </Link>
      <div className="md:flex items-center space-x-6 hidden">
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
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
