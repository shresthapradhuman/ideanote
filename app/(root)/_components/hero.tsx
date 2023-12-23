import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="py-20 px-2 md:px-0 mx-auto text-center flex flex-col items-center max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl sm:leading-tight leading-snug">
        High Quality Full Stack Web Development
        <span className="text-muted-foreground"> Notes</span>
      </h1>
      <p className="mt-6 text-lg max-w-prose text-muted-foreground">
        WELCOME TO <i className="ri-brain-line mr-1"></i>LNOTE. EVERY NOTE ON
        OUR PAGE IS TESTED TO ENSURE QUALITY.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link
          href="/notes"
          className={buttonVariants({
            className: "font-medium",
          })}
        >
          Browse All Notes
        </Link>
        {/* <Button variant="ghost">Our quality promise &rarr;</Button> */}
      </div>
    </div>
  );
};

export default Hero;
