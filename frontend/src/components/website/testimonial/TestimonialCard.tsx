import { Quote, Star } from "lucide-react";

import type { Testimonial } from "../../../types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 relative">

      {/* Quote Icon */}

      <div className="absolute top-6 right-6 text-green-100 group-hover:text-green-200 transition">
        <Quote size={50} />
      </div>

      {/* Profile */}

      <div className="flex items-center gap-5">

        <img
          src={`${API_URL}${testimonial.image}`}
          alt={testimonial.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-green-100"
        />

        <div>

          <h3 className="text-xl font-bold text-gray-900">
            {testimonial.name}
          </h3>

          {testimonial.designation && (
            <p className="text-gray-500">
              {testimonial.designation}
            </p>
          )}

        </div>

      </div>

      {/* Rating */}

      <div className="flex gap-1 mt-6">

        {[...Array(testimonial.rating || 5)].map(
          (_, index) => (
            <Star
              key={index}
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          )
        )}

      </div>

      {/* Message */}

      <p className="mt-6 text-gray-600 leading-8 italic">
        "{testimonial.message}"
      </p>

    </div>
  );
}