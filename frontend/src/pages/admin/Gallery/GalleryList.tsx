import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import GalleryTable from "../../../components/admin/gallery/GalleryTable";

import {
  getGallery,
  deleteGallery,
  toggleGalleryStatus,
} from "../../../services/galleryService";

import type { Gallery } from "../../../types/gallery";

export default function GalleryList() {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);

      const response = await getGallery();

      if (response.success) {
        setGallery(response.gallery || []);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load gallery",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.title
          .toLowerCase()
          .includes(keyword) ||
        item.category
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [gallery, search]);

  const totalPages = Math.ceil(
    filteredGallery.length / itemsPerPage
  );

  const paginatedGallery = filteredGallery.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Image?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteGallery(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadGallery();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleGalleryStatus(id);

      loadGallery();
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
            Loading Gallery...
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
              Gallery Management
            </h1>

            <p className="text-gray-500">
              Manage gallery images
            </p>
          </div>

          <Link
            to="/admin/gallery/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Image
          </Link>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-96 border rounded-lg p-3"
        />

        {/* Table */}

        <GalleryTable
          gallery={paginatedGallery}
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