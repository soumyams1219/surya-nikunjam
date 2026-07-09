import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import TestimonialForm from "../../../components/admin/testimonial/TestimonialForm";

import { createTestimonial } from "../../../services/testimonialService";

export default function AddTestimonial() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setLoading(true);

      const response =
        await createTestimonial(formData);

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title:
            "Testimonial added successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/testimonials");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to add testimonial",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-8">
          Add Testimonial
        </h1>

        <TestimonialForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Save Testimonial"
        />
      </div>
    </AdminLayout>
  );
}