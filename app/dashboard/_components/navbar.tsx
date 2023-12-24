"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
const navItems = [
  {
    label: "Notes",
    href: "/dashboard/notes",
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
  },
];

const handleLogout = () => {
  try {
    signOut();
    toast.success("Logout success");
  } catch (error) {
    console.log(error);
  }
};

const Navbar = () => {
  const { status } = useSession();
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
          <div className="flex flex-col pt-6">
            {navItems.map((item) => (
              <SheetClose asChild key={item.label}>
                <Link href={item.href} className="flex items-center p-2">
                  {item.label}
                </Link>
              </SheetClose>
            ))}
            <Separator className="my-2" />
            {status === "unauthenticated" && (
              <SheetClose asChild>
                <Link href={"/login"} className="flex items-center p-2">
                  Login
                </Link>
              </SheetClose>
            )}
            {status === "authenticated" && (
              <SheetClose asChild>
                <Button
                  variant={"ghost"}
                  className="flex justify-start pl-2 hover:bg-transparent"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
