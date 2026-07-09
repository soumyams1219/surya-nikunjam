import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  BedDouble,
  Bath,
  Ruler,
  LandPlot,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import type { Villa } from "../../../types/villa";

import {
  getPublicVilla,
  getPublicVillas,
} from "../../../services/villaService";

import VillaCard from "./VillaCard";

export default function VillaDetailsSection() {
  const { id } = useParams();

  const [villa, setVilla] = useState<Villa | null>(null);

  const [relatedVillas, setRelatedVillas] = useState<Villa[]>([]);

  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  useEffect(() => {
    if (id) {
      loadVilla();
    }
  }, [id]);

  const loadVilla = async () => {
    try {
      setLoading(true);

      const villaResponse =
        await getPublicVilla(id!);

      if (villaResponse.success) {
        setVilla(villaResponse.villa);
      }

      const villasResponse =
        await getPublicVillas();

      if (villasResponse.success) {
        const villas = villasResponse.villas || [];

        setRelatedVillas(
          villas
            .filter(
              (item: Villa) =>
                item._id !== id &&
                item.isActive
            )
            .slice(0, 3)
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        Loading villa...
      </section>
    );
  }

  if (!villa) {
    return (
      <section className="py-20 text-center">
        Villa not found.
      </section>
    );
  }

  return (
    <section className="pt-32 py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Back */}

        <Link
          to="/villas"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Villas
        </Link>

        {/* Main Card */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* Image */}

            <div>

              <img
                src={`${API_URL}${villa.image}`}
                alt={villa.title}
                className="w-full h-full min-h-[500px] object-cover"
              />

            </div>

            {/* Content */}

            <div className="p-8 lg:p-10">

              <h1 className="text-4xl font-bold text-gray-900">
                {villa.title}
              </h1>

              <div className="grid grid-cols-2 gap-6 mt-10">

                <div className="flex items-center gap-3">

                  <LandPlot className="text-green-600" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Plot Size
                    </p>

                    <p className="font-semibold">
                      {villa.plotSize}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Ruler className="text-green-600" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Built-up Area
                    </p>

                    <p className="font-semibold">
                      {villa.builtUpArea}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <BedDouble className="text-green-600" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Bedrooms
                    </p>

                    <p className="font-semibold">
                      {villa.bedrooms}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Bath className="text-green-600" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Bathrooms
                    </p>

                    <p className="font-semibold">
                      {villa.bathrooms}
                    </p>

                  </div>

                </div>

              </div>

              {/* Description */}

              <div className="mt-10">

                <h2 className="text-2xl font-semibold mb-4">
                  Description
                </h2>

                <p className="text-gray-600 leading-8">
                  {villa.description}
                </p>

              </div>

              {/* Button */}

              <div className="mt-10">

                <Link
                  to="/site-visit"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition"
                >
                  Book Site Visit

                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* Related Villas */}

        {relatedVillas.length > 0 && (

          <div className="mt-20">

            <div className="text-center mb-12">

              <h2 className="text-3xl font-bold">
                Other Villa Options
              </h2>

              <p className="text-gray-500 mt-2">
                Explore more villa choices.
              </p>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {relatedVillas.map((item) => (

                <VillaCard
                  key={item._id}
                  villa={item}
                />

              ))}

            </div>

          </div>

        )}

      </div>

    </section>
  );
}