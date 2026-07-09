import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";

import { getSiteVisit } from "../../../services/siteVisitService";

import type { SiteVisit } from "../../../types/siteVisit";

export default function SiteVisitView() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [visit, setVisit] =
    useState<SiteVisit>();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadVisit();
  }, []);

  const loadVisit = async () => {
    try {
      const response =
        await getSiteVisit(id!);

      if (response.success) {
        setVisit(response.visit);
      } else {
        Swal.fire({
          icon: "error",
          title: "Site Visit not found",
        });

        navigate("/admin/site-visits");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title:
          "Failed to load site visit",
      });

      navigate("/admin/site-visits");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  if (!visit) return null;

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Site Visit Details
            </h1>

            <p className="text-gray-500 mt-2">
              View visitor enquiry details
            </p>
          </div>

          <Link
            to="/admin/site-visits"
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Back
          </Link>

        </div>

        {/* Details */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Name
            </label>

            <div className="border rounded-lg p-3 bg-gray-50">
              {visit.name}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Phone
            </label>

            <div className="border rounded-lg p-3 bg-gray-50">
              {visit.phone}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Email
            </label>

            <div className="border rounded-lg p-3 bg-gray-50">
              {visit.email}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Visit Date
            </label>

            <div className="border rounded-lg p-3 bg-gray-50">
              {new Date(
                visit.visitDate
              ).toLocaleDateString()}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Visit Time
            </label>

            <div className="border rounded-lg p-3 bg-gray-50">
              {visit.visitTime}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Status
            </label>

            <div
              className={`border rounded-lg p-3 text-white font-semibold ${
                visit.status ===
                "Contacted"
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}
            >
              {visit.status}
            </div>
          </div>

        </div>

        {/* Message */}

        <div className="mt-8">

          <label className="block font-semibold text-gray-600 mb-2">
            Message
          </label>

          <div className="border rounded-lg p-4 bg-gray-50 min-h-[140px] whitespace-pre-wrap">
            {visit.message ||
              "No message provided."}
          </div>

        </div>

        {/* Created Date */}

        <div className="mt-8">

          <label className="block font-semibold text-gray-600 mb-2">
            Submitted On
          </label>

          <div className="border rounded-lg p-3 bg-gray-50">
            {new Date(
              visit.createdAt
            ).toLocaleString()}
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}