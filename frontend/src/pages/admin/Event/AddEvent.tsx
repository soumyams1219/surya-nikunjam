import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import EventForm from "../../../components/admin/event/EventForm";

import { createEvent } from "../../../services/eventService";

export default function AddEvent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setLoading(true);

      const response = await createEvent(
        formData
      );

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Event created successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/events");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to create event",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-8">
          Add Event
        </h1>

        <EventForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Save Event"
        />
      </div>
    </AdminLayout>
  );
}