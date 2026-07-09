import type { Banner } from "../../../types/banner";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";

interface Props {
  banners: Banner[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function BannerTable({
  banners,
  onDelete,
  onToggle,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-center">Order</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {banners.length > 0 ? (
            banners.map((banner) => (
              <tr
                key={banner._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Image */}
                <td className="px-4 py-3">
                  <img
                   src={`${API_BASE_URL}${banner.image}`}
                    alt={banner.title}
                    className="w-36 h-20 rounded-lg object-cover border"
                  />
                </td>

                {/* Title */}
                <td className="px-4 py-3">
                  <h3 className="font-semibold text-gray-800">
                    {banner.title}
                  </h3>

                  {banner.subtitle && (
                    <p className="text-sm text-gray-500 mt-1">
                      {banner.subtitle}
                    </p>
                  )}
                </td>

                {/* Order */}
                <td className="px-4 py-3 text-center">
                  {banner.order}
                </td>

                {/* Status */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onToggle(banner._id!)}
                    className={`px-4 py-1 rounded-full text-white text-sm transition ${
                      banner.isActive
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    {banner.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-4">
                    <Link
                      to={`/admin/banner/edit/${banner._id}`}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit Banner"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() => onDelete(banner._id!)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete Banner"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center py-10 text-gray-500"
              >
                No banners found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}