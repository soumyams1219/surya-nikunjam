import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import EventTable from "../../../components/admin/event/EventTable";

import {
  getEvents,
  deleteEvent,
  toggleEventStatus,
} from "../../../services/eventService";

import type { Event } from "../../../types/event";

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);

      const response = await getEvents();

      if (response.success) {
        setEvents(response.events || []);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load events",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [events, search]);

  const totalPages = Math.ceil(
    filteredEvents.length / itemsPerPage
  );

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteEvent(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadEvents();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleEventStatus(id);

      loadEvents();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Status update failed",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-500">
            Loading Events...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Events
            </h1>

            <p className="text-gray-500">
              Manage community events
            </p>
          </div>

          <Link
            to="/admin/events/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Event
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-80 border rounded-lg p-3"
        />

        {/* Table */}
        <EventTable
          events={paginatedEvents}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}