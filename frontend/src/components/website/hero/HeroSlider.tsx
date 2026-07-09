import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { Banner } from "../../../types/banner";

import { getActiveBanners } from "../../../services/websiteBannerService";

export default function HeroSlider() {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  const [banners, setBanners] =
    useState<Banner[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const response =
        await getActiveBanners();
        console.log("Banner response",response);

      if (response.success) {
        const active =
          response.banners.filter(
            (banner: Banner) =>
              banner.isActive
          );

        active.sort(
          (a: Banner, b: Banner) =>
            a.order - b.order
        );

        setBanners(active);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="h-[600px] bg-gray-100 animate-pulse" />
    );

  if (!banners.length) return null;

  return (
    <Swiper
      modules={[
        Navigation,
        Pagination,
        Autoplay,
      ]}
      navigation
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
      }}
      loop
      className="h-[650px]"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner._id}>
          <div className="relative h-full">

            <img
              src={`${API_URL}${banner.image}`}
              className="w-full h-full object-cover"
              alt={banner.title}
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/45 flex items-center">

              <div className="max-w-7xl mx-auto px-10 text-white">

                {banner.subtitle && (
                  <p className="uppercase tracking-widest mb-4 text-blue-300">
                    {banner.subtitle}
                  </p>
                )}

                <h1 className="text-5xl md:text-7xl font-bold mb-6">

                  {banner.title}

                </h1>

                {banner.description && (
                  <p className="max-w-xl text-lg leading-8 mb-8">

                    {banner.description}

                  </p>
                )}

                {banner.buttonText &&
                  banner.buttonLink && (
                    <a
                      href={banner.buttonLink}
                      className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition"
                    >
                      {banner.buttonText}
                    </a>
                  )}

              </div>

            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}