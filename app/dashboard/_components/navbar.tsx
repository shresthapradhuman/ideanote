"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Sidebar from "./sidebar";

const Navbar = () => {
  return (
    <header className=" relative flex items-center justify-between h-16 px-4 md:px-0">
      <Link href={"/"} className="flex items-center text-xl">
        <i className="ri-brain-line text-xl font-semibold mr-1"></i> LNOTE
      </Link>
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
