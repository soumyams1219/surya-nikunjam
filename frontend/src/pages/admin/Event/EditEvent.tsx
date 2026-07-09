import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import EventForm from "../../../components/admin/event/EventForm";

import {
  getEventById,
  updateEvent,
} from "../../../services/eventService";

import type { Event } from "../../../types/event";

export default function EditEvent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [event, setEvent] =
    useState<Event>();

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      setPageLoading(true);

      const response =
        await getEventById(id!);

      if (response.success) {
        setEvent(response.event);
      } else {
        throw new Error();
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load event",
      });

      navigate("/admin/events");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setLoading(true);

      const response =
        await updateEvent(
          id!,
          formData
        );

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Event updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/events");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Update failed",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-500">
            Loading Event...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-8">
          Edit Event
        </h1>

        {event && (
          <EventForm
            initialData={event}
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Update Event"
          />
        )}
      </div>
    </AdminLayout>
  );
}