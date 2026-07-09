import { useEffect, useState } from "react";

import LifestyleCard from "./LifestyleCard";

import { getLifestyles } from "../../../services/lifestyleService";

import type { Lifestyle } from "../../../types/lifestyle";

export default function LifestyleSection() {
  const [lifestyles, setLifestyles] = useState<Lifestyle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLifestyles();
  }, []);

  const loadLifestyles = async () => {
    try {
      setLoading(true);

      const response = await getLifestyles();

      if (response.success) {
        const activeLifestyles = (response.lifestyles || [])
          .filter(
            (item: Lifestyle) => item.isActive
          )
          .sort(
            (a: Lifestyle, b: Lifestyle) =>
              a.order - b.order
          );

        setLifestyles(activeLifestyles);
      }
    } catch (error) {
      console.error(
        "Failed to load lifestyles",
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
            Loading lifestyles...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-green-600 font-semibold uppercase tracking-widest">
            Community Living
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Experience a Better Lifestyle
          </h2>

          <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8 text-lg">
            At Surya Nikunjam, every day is designed to
            promote wellness, happiness, meaningful
            relationships, and a peaceful environment
            where residents can truly enjoy community
            living.
          </p>

        </div>

        {/* Empty State */}

        {lifestyles.length === 0 ? (
          <div className="bg-gray-50 rounded-xl shadow p-12 text-center">
            <p className="text-xl text-gray-500">
              No lifestyle information available.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {lifestyles.map((lifestyle) => (
              <LifestyleCard
                key={lifestyle._id}
                lifestyle={lifestyle}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
}