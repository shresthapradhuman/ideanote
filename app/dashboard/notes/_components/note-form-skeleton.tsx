import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NoteFormSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="max-w-xl w-full h-14" />
      <Skeleton className="max-w-xl w-full h-14" />
      <Skeleton className="max-w-xl w-full h-96" />
      <Skeleton className="max-w-sm w-40 h-14" />
    </div>
  );
};

export default NoteFormSkeleton;
