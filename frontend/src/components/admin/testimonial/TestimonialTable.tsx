import { Link } from "react-router-dom";
import { Pencil, Trash2, Star } from "lucide-react";

import type { Testimonial } from "../../../types/testimonial";

interface TestimonialTableProps {
  testimonials: Testimonial[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TestimonialTable({
  testimonials,
  onDelete,
  onToggle,
}: TestimonialTableProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  if (testimonials.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No testimonials found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Photo
            </th>

            <th className="px-4 py-3 text-left">
              Resident
            </th>

            <th className="px-4 py-3 text-left">
              Designation
            </th>

            <th className="px-4 py-3 text-center">
              Rating
            </th>

            <th className="px-4 py-3 text-center">
              Featured
            </th>

            <th className="px-4 py-3 text-center">
              Order
            </th>

            <th className="px-4 py-3 text-center">
              Status
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {testimonials.map((testimonial) => (
            <tr
              key={testimonial._id}
              className="border-t hover:bg-gray-50"
            >
              {/* Photo */}
              <td className="px-4 py-3">
                <img
                  src={`${API_URL}${testimonial.image}`}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border object-cover"
                />
              </td>

              {/* Name */}
              <td className="px-4 py-3 font-medium">
                {testimonial.name}
              </td>

              {/* Designation */}
              <td className="px-4 py-3">
                {testimonial.designation}
              </td>

              {/* Rating */}
              <td className="px-4 py-3">
                <div className="flex justify-center">
                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill="#facc15"
                      color="#facc15"
                    />
                  ))}
                </div>
              </td>

              {/* Featured */}
              <td className="px-4 py-3 text-center">
                {testimonial.featured ? (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    Featured
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                    No
                  </span>
                )}
              </td>

              {/* Order */}
              <td className="px-4 py-3 text-center">
                {testimonial.order}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() =>
                    onToggle(testimonial._id!)
                  }
                  className={`px-4 py-1 rounded-full text-white text-sm transition ${
                    testimonial.isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {testimonial.isActive
                    ? "Active"
                    : "Inactive"}
                </button>
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <Link
                    to={`/admin/testimonials/edit/${testimonial._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(testimonial._id!)
                    }
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}