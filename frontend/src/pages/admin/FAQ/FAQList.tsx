import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import FAQTable from "../../../components/admin/faq/FAQTable";

import {
  getFAQs,
  deleteFAQ,
  toggleFAQStatus,
} from "../../../services/faqService";

import type { FAQ } from "../../../types/faq";

export default function FAQList() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);

      const response = await getFAQs();

      if (response.success) {
        setFaqs(response.faqs || []);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load FAQs",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const keyword = search.toLowerCase();

      return (
        faq.question
          .toLowerCase()
          .includes(keyword) ||
        faq.answer
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [faqs, search]);

  const totalPages = Math.ceil(
    filteredFAQs.length / itemsPerPage
  );

  const paginatedFAQs = filteredFAQs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete FAQ?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteFAQ(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadFAQs();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleFAQStatus(id);

      loadFAQs();
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
            Loading FAQs...
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
              FAQ Management
            </h1>

            <p className="text-gray-500">
              Manage frequently asked questions
            </p>
          </div>

          <Link
            to="/admin/faqs/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add FAQ
          </Link>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-96 border rounded-lg p-3"
        />

        {/* Table */}

        <FAQTable
          faqs={paginatedFAQs}
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
                      : "bg-gray-200 hover:bg-gray-300"
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