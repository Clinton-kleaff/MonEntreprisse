import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="w-6 h-6 text-[#d81b60] animate-spin" />
    </div>
  );
}