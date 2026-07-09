import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WhyChooseCard from "./WhyChooseCard";

import { getWhyChoose } from "../../../services/whyChooseService";

import type { WhyChoose } from "../../../types/whyChoose";

interface WhyChooseSectionProps {
  limit?: number;
}

export default function WhyChooseSection({
  limit,
}: WhyChooseSectionProps) {
  const [items, setItems] = useState<WhyChoose[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  try {
    setLoading(true);

    const response =
      await getWhyChoose();

    if (response.success) {
      let data =
        response.whyChoose ||
        response.data ||
        [];

      data = data.filter(
        (item: WhyChoose) =>
          item.isActive
      );

      if (limit) {
        data = data.slice(0, limit);
      }

      setItems(data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <section className="pt-32 py-20">
        <div className="text-center">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <>
    <section className="pt-32 py-20 bg-green-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

       <div className="text-center mb-16">

  <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold uppercase tracking-widest">
    Why Choose Us
  </span>

  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5">
    Why Choose Surya Nikunjam?
  </h1>

  <div className="w-24 h-1 bg-green-600 mx-auto mt-6 rounded-full"></div>

  <p className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-gray-600">
    Discover the unique advantages that make
    Surya Nikunjam the perfect place for
    peaceful community living, featuring
    premium villas, modern amenities,
    lush green surroundings, and a vibrant neighborhood.
  </p>

</div>
        {/* Cards */}

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">

            <p className="text-gray-500">
              No records available.
            </p>

          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {items.map((item) => (
                <WhyChooseCard
                  key={item._id}
                  item={item}
                />
              ))}

            </div>

            {/* View All */}

            {limit && (
              <div className="text-center mt-12">

                <Link
                  to="/why-choose"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  View More
                </Link>

              </div>
            )}
          </>
        )}

      </div>

    </section>
    </>
  );
}