import { useEffect, useState } from "react";

import GalleryCard from "./GalleryCard";
import GalleryModal from "./GalleryModal";

import { getGalleries } from "../../../services/galleryService";

import type { Gallery } from "../../../types/gallery";

export default function GallerySection() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] =
    useState<Gallery | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);

      const response = await getGalleries();
      //console.log("Gallery Response:", response);

      if (response.success) {
        const galleryList = (
          response.gallery ||
          response.galleries ||
          response.data ||
          []
        )
          .filter(
            (item: Gallery) => item.isActive
          )
          .sort(
            (a: Gallery, b: Gallery) =>
              a.order - b.order
          );

        setGalleries(galleryList);
      }
    } catch (error) {
      console.error(
        "Failed to load gallery",
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
            Loading gallery...
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}

          <div className="text-center mb-16">

            <span className="text-green-600 font-semibold uppercase tracking-widest">
              Our Gallery
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              Explore Surya Nikunjam
            </h2>

            <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

            <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8 text-lg">
              Take a glimpse into the peaceful
              surroundings, premium villas,
              beautifully landscaped gardens,
              and vibrant community life at
              Surya Nikunjam.
            </p>

          </div>

          {/* Empty State */}

          {galleries.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-12 text-center">
              <p className="text-xl text-gray-500">
                No gallery images available.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

              {galleries.map((gallery) => (
                <GalleryCard
                  key={gallery._id}
                  gallery={gallery}
                  onClick={setSelectedGallery}
                />
              ))}

            </div>
          )}

        </div>

      </section>

      {/* Lightbox */}

      <GalleryModal
        gallery={selectedGallery}
        onClose={() => setSelectedGallery(null)}
      />
    </>
  );
}