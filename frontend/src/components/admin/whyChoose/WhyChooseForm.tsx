import { useEffect, useState } from "react";
//import Swal from "sweetalert2";
import type { WhyChoose } from "../../../types/whyChoose";

interface WhyChooseFormProps {
  initialData?: WhyChoose;
  loading: boolean;
  submitText?: string;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function WhyChooseForm({
  initialData,
  loading,
  submitText = "Save",
  onSubmit,
}: WhyChooseFormProps) {
  const [preview, setPreview] = useState("");

  const [icon, setIcon] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    isActive: true,
  });

  // Load edit data
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        isActive: initialData.isActive ?? true,
      });

      setPreview(
        initialData.icon
          ? `http://localhost:5000${initialData.icon}`
          : ""
      );
    }
  }, [initialData]);

  // cleanup blob
  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const changeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const imageHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setIcon(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    /*if (!icon && !initialData?.icon) {
      Swal.fire({
        icon: "warning",
        title: "Icon is required",
      });
      return;
    }*/

    const formData = new FormData();

    formData.append("title", form.title.trim());
    formData.append("description", form.description.trim());
    formData.append("isActive", String(form.isActive));

    if (icon) {
      formData.append("icon", icon);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">

      {/* Title */}
      <div>
        <label className="block mb-2 font-medium">
          Title *
        </label>

        <input
          type="text"
          name="title"
          required
          value={form.title}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">
          Description *
        </label>

        <textarea
          rows={5}
          name="description"
          required
          value={form.description}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block mb-2 font-medium">
          Status
        </label>

        <select
          value={String(form.isActive)}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              isActive: e.target.value === "true",
            }))
          }
          className="w-full border rounded-lg p-3"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Icon */}
      <div>
        <label className="block mb-2 font-medium">
          Icon
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={imageHandler}
          className="w-full"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div>
          <label className="block mb-2 font-medium">
            Icon Preview
          </label>

          <img
            src={preview}
            alt="Icon Preview"
            className="w-24 h-24 object-cover rounded-lg border"
          />
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg"
      >
        {loading ? "Saving..." : submitText}
      </button>

    </form>
  );
}