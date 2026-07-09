import { useEffect } from "react";
import { X } from "lucide-react";

import type { Gallery } from "../../../types/gallery";

interface GalleryModalProps {
  gallery: Gallery | null;
  onClose: () => void;
}

export default function GalleryModal({
  gallery,
  onClose,
}: GalleryModalProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  if (!gallery) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl w-full"
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
        >
          <X size={32} />
        </button>

        {/* Image */}

        <img
          src={`${API_URL}${gallery.image}`}
          alt={gallery.title}
          className="w-full max-h-[80vh] object-contain rounded-xl bg-white"
        />

        {/* Caption */}

        <div className="mt-4 text-center">

          <h3 className="text-white text-2xl font-bold">
            {gallery.title}
          </h3>

        </div>
      </div>
    </div>
  );
}