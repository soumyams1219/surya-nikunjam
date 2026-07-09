import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Lifestyle } from "../../../types/lifestyle";

interface LifestyleTableProps {
  lifestyles: Lifestyle[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function LifestyleTable({
  lifestyles,
  onDelete,
  onToggle,
}: LifestyleTableProps) {
  //const API_URL = import.meta.env.VITE_IMG_URL || "http://localhost:5000";

  if (lifestyles.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No lifestyles found.
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
          {lifestyles.map((lifestyle) => (
            <tr
              key={lifestyle._id}
              className="border-t hover:bg-gray-50"
            >
              {/* Image */}
              {/*<td className="px-4 py-3">
                <img
                  src={`${API_URL}${lifestyle.image}`}
                  alt={lifestyle.title}
                  className="w-28 h-16 rounded-lg border object-cover"
                />
              </td>*/}

              {/* Title */}
              <td className="px-4 py-3 font-medium">
                {lifestyle.title}
              </td>

              {/* Description */}
              <td className="px-4 py-3 max-w-xs">
                <p className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-gray-600">
                  {lifestyle.description}
                </p>
              </td>

              {/* Order */}
              <td className="px-4 py-3 text-center">
                {lifestyle.order}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() =>
                    onToggle(lifestyle._id!)
                  }
                  className={`px-4 py-1 rounded-full text-white text-sm transition ${
                    lifestyle.isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {lifestyle.isActive
                    ? "Active"
                    : "Inactive"}
                </button>
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <Link
                    to={`/admin/lifestyles/edit/${lifestyle._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(lifestyle._id!)
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