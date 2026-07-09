import { useEffect, useState } from "react";

import VillaCard from "./VillaCard";

import { getPublicVillas } from "../../../services/villaService";

import type { Villa } from "../../../types/villa";

export default function VillaSection() {
  const [villas, setVillas] =
    useState<Villa[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadVillas();
  }, []);

  const loadVillas = async () => {
    try {
      const response =
        await getPublicVillas();

      if (response.success) {
        const activeVillas =
          (response.villas || [])
            .filter(
              (villa: Villa) =>
                villa.isActive
            )
            .sort(
              (a: Villa, b: Villa) =>
                a.order - b.order
            );

        setVillas(activeVillas);
      }
    } catch (error) {
      console.error(
        "Failed to load villas",
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
            Loading villas...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-green-600 font-semibold uppercase tracking-widest">
            Our Villas
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Villa Options
          </h2>

          <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8 text-lg">
           Choose a home that perfectly suits your lifestyle.
          </p>
        <div className="mt-8 flex justify-center">
  <ul className="space-y-3 text-left text-gray-700">
    <li className="flex items-center gap-3">
      <span className="text-green-600 text-xl">✓</span>
      Plot Sizes: 4 to 10 Cents
    </li>

    <li className="flex items-center gap-3">
      <span className="text-green-600 text-xl">✓</span>
      Custom Villa Designs
    </li>

    <li className="flex items-center gap-3">
      <span className="text-green-600 text-xl">✓</span>
      Modern Architecture
    </li>

    <li className="flex items-center gap-3">
      <span className="text-green-600 text-xl">✓</span>
      Premium Quality Construction
    </li>
     <li className="flex items-center gap-3">
      <span className="text-green-600 text-xl">✓</span>
      Spacious Interiors
    </li>

    <li className="flex items-center gap-3">
      <span className="text-green-600 text-xl">✓</span>
      Excellent Ventilation
    </li>
  </ul>
</div>

        </div>

        {/* Empty */}

        {villas.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">

            <p className="text-xl text-gray-500">
              No villas available.
            </p>

          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {villas.map((villa) => (
              <VillaCard
                key={villa._id}
                villa={villa}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
}