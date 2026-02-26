import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export const StickyNoteDeleteZone: React.FC = () => {
  return (
    <div
      id="sticky-notes-delete-zone"
      className="
        w-16 h-16 
        bg-red-500 
        rounded-full 
        flex items-center justify-center
        shadow-md
        cursor-pointer
        transition-transform duration-200
        hover:scale-110
      "
    >
      <TrashIcon className="w-8 h-8 text-white" />
    </div>
  );
};