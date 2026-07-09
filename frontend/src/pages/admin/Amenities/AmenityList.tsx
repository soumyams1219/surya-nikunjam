import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import AmenityTable from "../../../components/admin/amenity/AmenityTable";

import {
  getAmenities,
  deleteAmenity,
  toggleAmenityStatus,
} from "../../../services/amenityService";

import type { Amenity } from "../../../types/amenity";

export default function AmenityList() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      setLoading(true);

      const response = await getAmenities();

      if (response.success) {
        setAmenities(response.amenities);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load amenities",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAmenities = useMemo(() => {
    return amenities.filter((amenity) =>
      amenity.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [amenities, search]);

  const totalPages = Math.ceil(
    filteredAmenities.length / itemsPerPage
  );

  const paginatedAmenities = filteredAmenities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Amenity?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAmenity(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadAmenities();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleAmenityStatus(id);

      loadAmenities();
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
            Loading Amenities...
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
              Amenities
            </h1>

            <p className="text-gray-500">
              Manage community amenities
            </p>

          </div>

          <Link
            to="/admin/amenities/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Amenity
          </Link>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search amenities..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-80 border rounded-lg p-3"
        />

        {/* Table */}

        <AmenityTable
          amenities={paginatedAmenities}
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