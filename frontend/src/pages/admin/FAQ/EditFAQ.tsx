import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import FAQForm from "../../../components/admin/faq/FAQForm";

import {
  getFAQ,
  updateFAQ,
} from "../../../services/faqService";

import type { FAQ } from "../../../types/faq";

export default function EditFAQ() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [faq, setFaq] = useState<FAQ>();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadFAQ();
  }, []);

  const loadFAQ = async () => {
    try {
      const response = await getFAQ(id!);

      if (response.success) {
        setFaq(response.faq);
      } else {
        Swal.fire({
          icon: "error",
          title: "FAQ not found",
        });

        navigate("/admin/faqs");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load FAQ",
      });

      navigate("/admin/faqs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: FAQ) => {
    try {
      setSaving(true);

      const response = await updateFAQ(
        id!,
        data
      );

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "FAQ Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/faqs");
      } else {
        Swal.fire({
          icon: "error",
          title:
            response.message ||
            "Update failed",
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
      setSaving(false);
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

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit FAQ
          </h1>

          <p className="text-gray-500 mt-2">
            Update FAQ details
          </p>
        </div>

        {faq && (
          <FAQForm
            initialData={faq}
            loading={saving}
            submitText="Update FAQ"
            onSubmit={handleSubmit}
          />
        )}

      </div>
    </AdminLayout>
  );
}