import type { Event } from "../../../types/event";

interface Props {
  events: Event[];
}

export default function RecentEvents({
  events,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-5">
        Recent Events
      </h2>

      {events.length === 0 ? (
        <p className="text-gray-500">
          No events found.
        </p>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Title
                </th>

                <th className="px-4 py-3 text-left">
                  Date
                </th>

                <th className="px-4 py-3 text-center">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {events.map((event) => (
                <tr
                  key={event._id}
                  className="border-t"
                >
                  <td className="px-4 py-3">
                    {event.title}
                  </td>

                  <td className="px-4 py-3">
  {new Date(event.eventDate).toLocaleDateString()}
</td>

                  <td className="px-4 py-3 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        event.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {event.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}