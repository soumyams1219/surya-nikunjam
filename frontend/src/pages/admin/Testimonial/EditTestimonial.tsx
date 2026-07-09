import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import TestimonialForm from "../../../components/admin/testimonial/TestimonialForm";

import {
  getTestimonialById,
  updateTestimonial,
} from "../../../services/testimonialService";

import type { Testimonial } from "../../../types/testimonial";

export default function EditTestimonial() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [testimonial, setTestimonial] =
    useState<Testimonial>();

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    if (id) {
      loadTestimonial();
    }
  }, [id]);

  const loadTestimonial = async () => {
    try {
      setPageLoading(true);

      const response =
        await getTestimonialById(id!);

      if (response.success) {
        setTestimonial(response.testimonial);
      } else {
        throw new Error();
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load testimonial",
      });

      navigate("/admin/testimonials");
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
        await updateTestimonial(
          id!,
          formData
        );

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title:
            "Testimonial updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/testimonials");
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
            Loading Testimonial...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-8">
          Edit Testimonial
        </h1>

        {testimonial && (
          <TestimonialForm
            initialData={testimonial}
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Update Testimonial"
          />
        )}
      </div>
    </AdminLayout>
  );
}