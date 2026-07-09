import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import VillaTable from "../../../components/admin/villa/VillaTable";

import {
  getVillas,
  deleteVilla,
  toggleVillaStatus,
} from "../../../services/villaService";

import type { Villa } from "../../../types/villa";

export default function VillaList() {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadVillas();
  }, []);

  const loadVillas = async () => {
    try {
      setLoading(true);

      const response = await getVillas();

      if (response.success) {
        setVillas(response.villas || []);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load villas",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredVillas = useMemo(() => {
    return villas.filter((villa) =>
      villa.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [villas, search]);

  const totalPages = Math.ceil(
    filteredVillas.length / itemsPerPage
  );

  const paginatedVillas = filteredVillas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Villa?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteVilla(id);

      Swal.fire({
        icon: "success",
        title: "Villa Deleted",
        timer: 1200,
        showConfirmButton: false,
      });

      loadVillas();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleVillaStatus(id);

      loadVillas();
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
            Loading Villas...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              Villa Management
            </h1>

            <p className="text-gray-500">
              Manage villa options
            </p>
          </div>

          <Link
            to="/admin/villas/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Villa
          </Link>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search villa..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-80 border rounded-lg p-3"
        />

        {/* Table */}

        <VillaTable
          villas={paginatedVillas}
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