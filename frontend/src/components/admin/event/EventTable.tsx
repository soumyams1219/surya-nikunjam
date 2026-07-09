import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Event } from "../../../types/event";

interface EventTableProps {
  events: Event[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function EventTable({
  events,
  onDelete,
  onToggle,
}: EventTableProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No events found.
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

            <th className="px-4 py-3 text-left">
              Date
            </th>

            <th className="px-4 py-3 text-left">
              Time
            </th>

            <th className="px-4 py-3 text-left">
              Location
            </th>

            <th className="px-4 py-3 text-center">
              Featured
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
          {events.map((event) => (
            <tr
              key={event._id}
              className="border-t hover:bg-gray-50"
            >
              {/* Image */}
              <td className="px-4 py-3">
                <img
                  src={`${API_URL}${event.image}`}
                  alt={event.title}
                  className="w-28 h-16 rounded-lg border object-cover"
                />
              </td>

              {/* Title */}
              <td className="px-4 py-3 font-medium">
                {event.title}
              </td>

              {/* Date */}
              <td className="px-4 py-3">
                {new Date(
                  event.eventDate
                ).toLocaleDateString()}
              </td>

              {/* Time */}
              <td className="px-4 py-3">
                {event.eventTime}
              </td>

              {/* Location */}
              <td className="px-4 py-3">
                {event.location}
              </td>

              {/* Featured */}
              <td className="px-4 py-3 text-center">
                {event.featured ? (
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                    Featured
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                    No
                  </span>
                )}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() =>
                    onToggle(event._id!)
                  }
                  className={`px-4 py-1 rounded-full text-white text-sm transition ${
                    event.isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {event.isActive
                    ? "Active"
                    : "Inactive"}
                </button>
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <Link
                    to={`/admin/events/edit/${event._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(event._id!)
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