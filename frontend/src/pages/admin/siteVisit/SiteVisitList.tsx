import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import SiteVisitTable from "../../../components/admin/siteVisit/SiteVisitTable";

import {
  getSiteVisits,
  deleteSiteVisit,
  updateSiteVisitStatus,
} from "../../../services/siteVisitService";

import type { SiteVisit } from "../../../types/siteVisit";

export default function SiteVisitList() {
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      setLoading(true);

      const response = await getSiteVisits();

      if (response.success) {
        setVisits(response.visits || []);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load site visits",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const keyword = search.toLowerCase();

      return (
        visit.name.toLowerCase().includes(keyword) ||
        visit.phone
          .toLowerCase()
          .includes(keyword) ||
        visit.email
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [visits, search]);

  const totalPages = Math.ceil(
    filteredVisits.length / itemsPerPage
  );

  const paginatedVisits =
    filteredVisits.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const handleDelete = async (
    id: string
  ) => {
    const result = await Swal.fire({
      title: "Delete Site Visit?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteSiteVisit(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadVisits();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  const handleStatusChange = async (
    id: string,
    status: "Pending" | "Contacted"
  ) => {
    try {
      await updateSiteVisitStatus(
        id,
        status
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        timer: 1000,
        showConfirmButton: false,
      });

      loadVisits();
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
            Loading Site Visits...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold">
            Site Visit Management
          </h1>

          <p className="text-gray-500">
            Manage all site visit requests
          </p>
        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search by name, phone or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-96 border rounded-lg p-3"
        />

        {/* Table */}

        <SiteVisitTable
          visits={paginatedVisits}
          onDelete={handleDelete}
          onStatusChange={
            handleStatusChange
          }
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
                    setCurrentPage(
                      index + 1
                    )
                  }
                  className={`px-4 py-2 rounded ${
                    currentPage ===
                    index + 1
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