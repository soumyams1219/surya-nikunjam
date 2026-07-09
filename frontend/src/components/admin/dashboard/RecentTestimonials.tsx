import type { Testimonial } from "../../../types/testimonial";

interface Props {
  testimonials: Testimonial[];
}

export default function RecentTestimonials({
  testimonials,
}: Props) {

  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-5">
        Recent Testimonials
      </h2>

      {testimonials.length === 0 ? (
        <p className="text-gray-500">
          No testimonials available.
        </p>
      ) : (
        <div className="space-y-5">

          {testimonials.map(
            (testimonial) => (
              <div
                key={testimonial._id}
                className="flex gap-4 border rounded-lg p-4"
              >

                <img
                  src={`${API_URL}${testimonial.image}`}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-semibold">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {
                      testimonial.designation
                    }
                  </p>

                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {
                      testimonial.message
                    }
                  </p>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}