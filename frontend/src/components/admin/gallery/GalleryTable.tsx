import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import type { Gallery } from "../../../types/gallery";

interface GalleryTableProps {
  gallery: Gallery[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function GalleryTable({
  gallery,
  onDelete,
  onToggle,
}: GalleryTableProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  if (gallery.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No gallery images found.
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
              Image
            </th>

            <th className="px-4 py-3 text-left">
              Title
            </th>

            {/*<th className="px-4 py-3 text-left">
              Category
            </th>*/}

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
          {gallery.map((item) => (
            <tr
              key={item._id}
              className="border-t hover:bg-gray-50"
            >
              {/* Image */}

              <td className="px-4 py-3">
                <img
                  src={`${API_URL}${item.image}`}
                  alt={item.title}
                  className="w-28 h-20 rounded-lg border object-cover"
                />
              </td>

              {/* Title */}

              <td className="px-4 py-3 font-medium">
                {item.title}
              </td>

              {/* Category */}

              {/*<td className="px-4 py-3">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  {item.category}
                </span>
              </td>*/}

              {/* Order */}

              <td className="px-4 py-3 text-center">
                {item.order}
              </td>

              {/* Status */}

              <td className="px-4 py-3 text-center">
                <button
                  onClick={() =>
                    onToggle(item._id!)
                  }
                  className={`px-4 py-1 rounded-full text-white text-sm transition ${
                    item.isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {item.isActive
                    ? "Active"
                    : "Inactive"}
                </button>
              </td>

              {/* Actions */}

              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">

                  <Link
                    to={`/admin/gallery/edit/${item._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(item._id!)
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