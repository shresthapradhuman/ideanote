import { Separator } from "@/components/ui/separator";
import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
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
  return (
    <div className="flex flex-col pt-6">
      {navItems.map((item) => (
        <SheetClose asChild key={item.label}>
          <Link href={item.href} className="flex items-center p-2">
            {item.label}
          </Link>
        </SheetClose>
      ))}
      <Separator className="my-2" />
      <SheetClose asChild>
        <Link href={"/login"} className="flex items-center p-2">
          Login
        </Link>
      </SheetClose>
    </div>
  );
};

export default Sidebar;
