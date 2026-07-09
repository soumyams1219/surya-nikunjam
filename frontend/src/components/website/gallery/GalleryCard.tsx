import type { Gallery } from "../../../types/gallery";

interface GalleryCardProps {
  gallery: Gallery;
  onClick: (gallery: Gallery) => void;
}

export default function GalleryCard({
  gallery,
  onClick,
}: GalleryCardProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  return (
    <div
      onClick={() => onClick(gallery)}
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300"
    >
      {/* Image */}

      <img
        src={`${API_URL}${gallery.image}`}
        alt={gallery.title}
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300" />

      {/* Title */}

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">

        <h3 className="text-xl font-semibold drop-shadow-md">
          {gallery.title}
        </h3>

      </div>
    </div>
  );
}