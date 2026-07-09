import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

import type { SiteVisit } from "../../../types/siteVisit";

interface SiteVisitTableProps {
  visits: SiteVisit[];
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: "Pending" | "Contacted"
  ) => void;
}

export default function SiteVisitTable({
  visits,
  onDelete,
  onStatusChange,
}: SiteVisitTableProps) {
  if (visits.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No site visit requests found.
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
              Name
            </th>

            <th className="px-4 py-3 text-left">
              Phone
            </th>

            <th className="px-4 py-3 text-left">
              Email
            </th>

            <th className="px-4 py-3 text-center">
              Visit Date
            </th>

            <th className="px-4 py-3 text-center">
              Visit Time
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
          {visits.map((visit) => (
            <tr
              key={visit._id}
              className="border-t hover:bg-gray-50"
            >
              {/* Name */}

              <td className="px-4 py-3 font-medium">
                {visit.name}
              </td>

              {/* Phone */}

              <td className="px-4 py-3">
                {visit.phone}
              </td>

              {/* Email */}

              <td className="px-4 py-3">
                {visit.email}
              </td>

              {/* Visit Date */}

              <td className="px-4 py-3 text-center">
                {new Date(
                  visit.visitDate
                ).toLocaleDateString()}
              </td>

              {/* Visit Time */}

              <td className="px-4 py-3 text-center">
                {visit.visitTime}
              </td>

              {/* Status */}

              <td className="px-4 py-3 text-center">
                <select
                  value={visit.status}
                  onChange={(e) =>
                    onStatusChange(
                      visit._id,
                      e.target.value as
                        | "Pending"
                        | "Contacted"
                    )
                  }
                  className={`px-3 py-2 rounded-lg text-white font-medium ${
                    visit.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Contacted">
                    Contacted
                  </option>
                </select>
              </td>

              {/* Actions */}

              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">

                  {/* View */}

                  <Link
                    to={`/admin/site-visits/view/${visit._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={18} />
                  </Link>

                  {/* Delete */}

                  <button
                    onClick={() =>
                      onDelete(visit._id)
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