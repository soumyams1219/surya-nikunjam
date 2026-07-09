import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Amenity } from "../../../types/amenity";

interface AmenityTableProps {
  amenities: Amenity[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function AmenityTable({
  amenities,
  onDelete,
  onToggle,
}: AmenityTableProps) {
  //const API_URL =import.meta.env.VITE_IMG_URL || "http://localhost:5000";

  if (amenities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No amenities found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            {/*<th className="px-4 py-3 text-left">
              Image
            </th>*/}

            <th className="px-4 py-3 text-left">
              Title
            </th>

            <th className="px-4 py-3 text-left">
              Description
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
          {amenities.map((amenity) => (
            <tr
              key={amenity._id}
              className="border-t hover:bg-gray-50"
            >
              {/* Image */}
              {/*<td className="px-4 py-3">
                <img
                  src={`${API_URL}${amenity.image}`}
                  alt={amenity.title}
                  className="w-28 h-16 rounded-lg border object-cover"
                />
              </td>*/}

              {/* Title */}
              <td className="px-4 py-3 font-medium">
                {amenity.title}
              </td>

              {/* Description */}
              <td className="px-4 py-3 max-w-xs">
                <p className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-gray-600">
                  {amenity.description}
                </p>
              </td>

              {/* Order */}
              <td className="px-4 py-3 text-center">
                {amenity.order}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() =>
                    onToggle(amenity._id!)
                  }
                  className={`px-4 py-1 rounded-full text-white text-sm transition ${
                    amenity.isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {amenity.isActive
                    ? "Active"
                    : "Inactive"}
                </button>
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <Link
                    to={`/admin/amenities/edit/${amenity._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(amenity._id!)
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