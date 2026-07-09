import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import LifestyleTable from "../../../components/admin/lifestyle/LifestyleTable";

import {
  getLifestyles,
  deleteLifestyle,
  toggleLifestyleStatus,
} from "../../../services/lifestyleService";

import type { Lifestyle } from "../../../types/lifestyle";

export default function LifestyleList() {
 const [lifestyles, setLifestyles] = useState<Lifestyle[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadLifestyles();
  }, []);

  const loadLifestyles = async () => {
  try {
    setLoading(true);

    const response = await getLifestyles();

    if (response.success) {
      setLifestyles(response.lifestyles ?? []);
    }
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Failed to load lifestyles",
    });
  } finally {
    setLoading(false);
  }
};

  const filteredLifestyles = useMemo(() => {
  return lifestyles.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
}, [lifestyles, search]);

  const totalPages = Math.ceil(
    filteredLifestyles.length / itemsPerPage
  );

  const paginatedLifestyles = filteredLifestyles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Lifestyle?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteLifestyle(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadLifestyles();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleLifestyleStatus(id);

      loadLifestyles();
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
            Loading Lifestyles...
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
              Lifestyles
            </h1>

            <p className="text-gray-500">
              Manage community lifestyles
            </p>

          </div>

          <Link
            to="/admin/lifestyles/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Lifestyle
          </Link>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search lifestyles..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-80 border rounded-lg p-3"
        />

        {/* Table */}

        <LifestyleTable
          lifestyles={paginatedLifestyles}
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