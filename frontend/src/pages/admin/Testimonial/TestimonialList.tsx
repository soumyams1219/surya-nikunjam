import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import TestimonialTable from "../../../components/admin/testimonial/TestimonialTable";

import {
  getTestimonials,
  deleteTestimonial,
  toggleTestimonialStatus,
} from "../../../services/testimonialService";

import type { Testimonial } from "../../../types/testimonial";

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);

      const response = await getTestimonials();

      if (response.success) {
        setTestimonials(response.testimonials || []);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load testimonials",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTestimonials = useMemo(() => {
    const keyword = search.toLowerCase();

    return testimonials.filter(
      (testimonial) =>
        testimonial.name
          .toLowerCase()
          .includes(keyword) ||
        testimonial.designation
          .toLowerCase()
          .includes(keyword)
    );
  }, [testimonials, search]);

  const totalPages = Math.ceil(
    filteredTestimonials.length / itemsPerPage
  );

  const paginatedTestimonials =
    filteredTestimonials.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Testimonial?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteTestimonial(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadTestimonials();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleTestimonialStatus(id);

      loadTestimonials();
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
            Loading Testimonials...
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
              Testimonials
            </h1>

            <p className="text-gray-500">
              Manage resident testimonials
            </p>
          </div>

          <Link
            to="/admin/testimonials/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Testimonial
          </Link>

        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by resident or designation..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-80 border rounded-lg p-3"
        />

        {/* Table */}
        <TestimonialTable
          testimonials={paginatedTestimonials}
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