import { ImageOff } from "lucide-react";

export default function EmptyBanner() {
  return (
    <div className="bg-white rounded-xl shadow p-16 text-center">

      <ImageOff
        size={70}
        className="mx-auto text-gray-400"
      />

      <h2 className="text-xl font-semibold mt-4">

        No Banners Found

      </h2>

      <p className="text-gray-500 mt-2">

        Click "Add Banner" to create your first banner.

      </p>

    </div>
  );
}