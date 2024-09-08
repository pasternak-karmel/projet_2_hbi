import { Loader } from "lucide-react";
import React from "react";

export default function LoaderState() {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center ">
      <div className="" role="status">
        <Loader className="animate-spin text-gray-500" />
      </div>
    </div>
  );
}
