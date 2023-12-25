import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React from "react";

const NoteThumbnail = ({ url }: { url: string }) => {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="bg-muted rounded overflow-hidden shadow-md border"
    >
      <Image
        src={url}
        alt="thumbnail"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="eager"
        className="h-full w-full object-cover object-center"
      />
    </AspectRatio>
  );
};

export default NoteThumbnail;
