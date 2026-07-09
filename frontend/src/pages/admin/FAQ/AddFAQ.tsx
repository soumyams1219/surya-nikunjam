import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import FAQForm from "../../../components/admin/faq/FAQForm";

import { createFAQ } from "../../../services/faqService";

import type { FAQ } from "../../../types/faq";

export default function AddFAQ() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FAQ) => {
    try {
      setLoading(true);

      const response = await createFAQ(data);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "FAQ Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/faqs");
      } else {
        Swal.fire({
          icon: "error",
          title: response.message || "Failed to create FAQ",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error?.response?.data?.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Add FAQ
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new frequently asked question
          </p>
        </div>

        <FAQForm
          loading={loading}
          submitText="Add FAQ"
          onSubmit={handleSubmit}
        />

      </div>
    </AdminLayout>
  );
}