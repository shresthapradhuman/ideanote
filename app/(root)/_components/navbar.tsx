"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
  // {
  //   label: "My Notes",
  //   href: "/notes",
  // }
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
  const pathname = usePathname();
  const { status, data: session } = useSession();
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-0">
      <Link href={"/"} className="flex items-center text-xl">
        <span className="h-7 w-7 p-6 bg-foreground text-background">PS</span>
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
        <ModeToggle />
        {status === "unauthenticated" && (
          <Button
            variant={"outline"}
            onClick={() => signIn()}
            className={cn(" text-muted-foreground hover:text-foreground", {
              "text-foreground": pathname === "/login",
            })}
          >
            Login
          </Button>
        )}
        {status === "authenticated" && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-6 h-6 bg-white">
                <AvatarImage src={session?.user.image} alt={session?.user.id} />
                <AvatarFallback>
                  {session?.user.name.split(" ")[0].substring(0, 1)}
                  {session?.user.name.split(" ")[1].substring(0, 1)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              sideOffset={10}
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {session?.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {session?.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={`/profile`} className=" cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="md:hidden">
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
                <>
                  <SheetClose asChild>
                    <Link href={"/profile"} className="flex items-center p-2">
                      Profile
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant={"ghost"}
                      className="flex justify-start pl-2 hover:bg-transparent"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
