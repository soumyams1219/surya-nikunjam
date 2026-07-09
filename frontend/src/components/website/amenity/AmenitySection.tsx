import { useEffect, useState } from "react";

import AmenityCard from "./AmenityCard";

import { getAmenities } from "../../../services/amenityService";

import type { Amenity } from "../../../types/amenity";

export default function AmenitySection() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      setLoading(true);

      const response = await getAmenities();

      if (response.success) {
        const activeAmenities = (response.amenities || [])
          .filter(
            (amenity: Amenity) => amenity.isActive
          )
          .sort(
            (a: Amenity, b: Amenity) =>
              a.order - b.order
          );

        setAmenities(activeAmenities);
      }
    } catch (error) {
      console.error(
        "Failed to load amenities",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-500">
            Loading amenities...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 py-20 bg-green-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-green-600 font-semibold uppercase tracking-widest">
            Community Facilities
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Premium Amenities
          </h2>

          <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8 text-lg">
            Surya Nikunjam offers thoughtfully planned
            amenities that promote comfort, wellness,
            convenience, and an enjoyable community
            lifestyle for every resident.
          </p>

        </div>

        {/* Empty State */}

        {amenities.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-xl text-gray-500">
              No amenities available.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {amenities.map((amenity) => (
              <AmenityCard
                key={amenity._id}
                amenity={amenity}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
}