import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

import type { RecentSiteVisit } from "../../../types/dashboard";

interface RecentSiteVisitTableProps {
  visits: RecentSiteVisit[];
}

export default function RecentSiteVisitTable({
  visits,
}: RecentSiteVisitTableProps) {
  if (visits.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <p className="text-gray-500">
          No recent site visit requests.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold">
          Recent Site Visits
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Latest booking requests
        </p>
      </div>

      <table className="min-w-full">

        <thead className="bg-gray-100">
          <tr>

            <th className="px-4 py-3 text-left">
              Name
            </th>

            <th className="px-4 py-3 text-left">
              Phone
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
              Action
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
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    visit.status === "Contacted"
                      ? "bg-green-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {visit.status}
                </span>
              </td>

              {/* View */}

              <td className="px-4 py-3">
                <div className="flex justify-center">

                  <Link
                    to={`/admin/site-visits/view/${visit._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={18} />
                  </Link>

                </div>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {/* Footer */}

      <div className="border-t px-6 py-4 flex justify-end">

        <Link
          to="/admin/site-visits"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All →
        </Link>

      </div>

    </div>
  );
}