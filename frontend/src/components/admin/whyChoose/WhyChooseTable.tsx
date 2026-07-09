import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { WhyChoose } from "../../../types/whyChoose";

interface WhyChooseTableProps {
  items: WhyChoose[];
  onDelete: (id: string) => void;
  onToggle?: (id: string) => void;
}

export default function WhyChooseTable({
  items,
  onDelete,
  onToggle,
}: WhyChooseTableProps) {
  //const API_URL =import.meta.env.VITE_IMG_URL || "http://localhost:5000";

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No items found.
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
              Icon
            </th>*/}

            <th className="px-4 py-3 text-left">
              Title
            </th>

            <th className="px-4 py-3 text-left">
              Description
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
          {items.map((item) => (
            <tr
              key={item._id}
              className="border-t hover:bg-gray-50"
            >

              {/* Icon */}
              {/*<td className="px-4 py-3">
                {item.icon ? (
                  <img
                    src={`${API_URL}${item.icon}`}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                    No Icon
                  </div>
                )}
              </td>*/}

              {/* Title */}
              <td className="px-4 py-3 font-medium">
                {item.title}
              </td>

              {/* Description */}
              <td className="px-4 py-3 text-sm text-gray-600 max-w-md">
                <div className="truncate">
                  {item.description}
                </div>
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                {onToggle && (
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
                )}
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">

                  <Link
                    to={`/admin/why-choose/edit/${item._id}`}
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