import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";

import {
  getWhyChoose,
  deleteWhyChoose,toggleWhyChooseStatus
} from "../../../services/whyChooseService";

import type { WhyChoose } from "../../../types/whyChoose";
import WhyChooseTable from "../../../components/admin/whyChoose/WhyChooseTable";

export default function WhyChooseList() {
  const [items, setItems] = useState<WhyChoose[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const response = await getWhyChoose();

      if (response.success) {
        setItems(response.data || []);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load data",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [items, search]);

  const totalPages = Math.ceil(
    filteredItems.length / itemsPerPage
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Item?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteWhyChoose(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadData();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };
const handleToggle = async (id: string) => {
  try {
    await toggleWhyChooseStatus(id);

    Swal.fire({
      icon: "success",
      title: "Status Updated",
      timer: 1000,
      showConfirmButton: false,
    });

    loadData(); // refresh list
  } catch (error) {
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
            Loading...
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
              Why Choose Us
            </h1>

            <p className="text-gray-500">
              Manage Why Choose section
            </p>
          </div>

          <Link
            to="/admin/why-choose/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Item
          </Link>

        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-80 border rounded-lg p-3"
        />

       
       <WhyChooseTable
                 items={paginatedItems}
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