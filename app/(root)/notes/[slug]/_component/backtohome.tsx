import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackToHome = () => {
  return (
    <Link
      href="/"
      className="flex items-center mb-10 text-sm text-muted-foreground hover:text-accent-foreground"
    >
      <ArrowLeft className="w-4 h-4 cursor-pointer mr-2" />
      Back To Homepage
    </Link>
  );
};

export default BackToHome;
