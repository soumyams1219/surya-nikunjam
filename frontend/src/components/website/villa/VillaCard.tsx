import { Link } from "react-router-dom";

import {
  BedDouble,
  Bath,
  Ruler,
  LandPlot,
  ArrowRight,
} from "lucide-react";

import type { Villa } from "../../../types/villa";

interface VillaCardProps {
  villa: Villa;
}

export default function VillaCard({
  villa,
}: VillaCardProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300">

      {/* Image */}

      <div className="overflow-hidden">

        <img
          src={`${API_URL}${villa.image}`}
          alt={villa.title}
          className="w-full h-72 object-cover hover:scale-105 transition duration-500"
        />

      </div>

      {/* Content */}

      <div className="p-6">

        {/* Title */}

        <h3 className="text-2xl font-bold text-gray-900">
          {villa.title}
        </h3>

        {/* Specifications */}

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="flex items-center gap-2 text-gray-700">

            <LandPlot
              size={18}
              className="text-green-600"
            />

            <span>{villa.plotSize}</span>

          </div>

          <div className="flex items-center gap-2 text-gray-700">

            <Ruler
              size={18}
              className="text-green-600"
            />

            <span>{villa.builtUpArea}</span>

          </div>

          <div className="flex items-center gap-2 text-gray-700">

            <BedDouble
              size={18}
              className="text-green-600"
            />

            <span>
              {villa.bedrooms} Bedrooms
            </span>

          </div>

          <div className="flex items-center gap-2 text-gray-700">

            <Bath
              size={18}
              className="text-green-600"
            />

            <span>
              {villa.bathrooms} Bathrooms
            </span>

          </div>

        </div>

        {/* Description */}

        <p className="mt-6 text-gray-600 leading-7">
          {villa.description}
        </p>

        {/* Button */}

        <div className="mt-8">

          <Link
            to={`/villas/${villa._id}`}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
          >
            Book Site Visit

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>

    </div>
  );
}