import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Villa } from "../../../types/villa";

interface VillaTableProps {
  villas: Villa[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function VillaTable({
  villas,
  onDelete,
  onToggle,
}: VillaTableProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  if (villas.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No villas found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>

            <th className="px-4 py-3 text-left">Title</th>

            <th className="px-4 py-3 text-center">
              Plot Size
            </th>

            <th className="px-4 py-3 text-center">
              Built-up Area
            </th>

            <th className="px-4 py-3 text-center">
              Bedrooms
            </th>

            <th className="px-4 py-3 text-center">
              Bathrooms
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
          {villas.map((villa) => (
            <tr
              key={villa._id}
              className="border-t hover:bg-gray-50"
            >
              {/* Image */}

              <td className="px-4 py-3">
                <img
                  src={`${API_URL}${villa.image}`}
                  alt={villa.title}
                  className="w-28 h-20 object-cover rounded-lg border"
                />
              </td>

              {/* Title */}

              <td className="px-4 py-3 font-medium">
                <div>{villa.title}</div>

                <div className="text-sm text-gray-500 truncate max-w-xs">
                  {villa.description}
                </div>
              </td>

              {/* Plot Size */}

              <td className="px-4 py-3 text-center">
                {villa.plotSize}
              </td>

              {/* Built-up Area */}

              <td className="px-4 py-3 text-center">
                {villa.builtUpArea}
              </td>

              {/* Bedrooms */}

              <td className="px-4 py-3 text-center">
                {villa.bedrooms}
              </td>

              {/* Bathrooms */}

              <td className="px-4 py-3 text-center">
                {villa.bathrooms}
              </td>

              {/* Order */}

              <td className="px-4 py-3 text-center">
                {villa.order}
              </td>

              {/* Status */}

              <td className="px-4 py-3 text-center">
                <button
                  onClick={() =>
                    onToggle(villa._id!)
                  }
                  className={`px-4 py-1 rounded-full text-white text-sm transition ${
                    villa.isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {villa.isActive
                    ? "Active"
                    : "Inactive"}
                </button>
              </td>

              {/* Actions */}

              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <Link
                    to={`/admin/villas/edit/${villa._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(villa._id!)
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