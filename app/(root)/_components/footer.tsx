import { Separator } from "@/components/ui/separator";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-4">
        <Separator className="my-4" />
        <p className="text-center">
          Copyright © 2022 - All right reserved by{" "}
          <span className="font-semibold text-foreground-muted">
            Pixel Craft
          </span>
        </p>
      </footer>
    </>
  );
};

export default Footer;
