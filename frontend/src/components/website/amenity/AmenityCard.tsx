import type { Amenity } from "../../../types/amenity";

interface AmenityCardProps {
  amenity: Amenity;
}

export default function AmenityCard({
  amenity,
}: AmenityCardProps) {
  //const API_URL = import.meta.env.VITE_IMG_URL || "http://localhost:5000";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300">

      {/* Image */}

      <div className="overflow-hidden">

        {/*<img
          src={`${API_URL}${amenity.image}`}
          alt={amenity.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
        />*/}

      </div>

      {/* Content */}

      <div className="p-6">

        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {amenity.title}
        </h3>

        <p className="text-gray-600 leading-7">
          {amenity.description}
        </p>

      </div>

    </div>
  );
}