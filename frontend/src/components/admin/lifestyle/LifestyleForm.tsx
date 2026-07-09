import { useEffect, useState } from "react";
//import Swal from "sweetalert2";
import type { Lifestyle } from "../../../types/lifestyle";

interface LifestyleFormProps {
  initialData?: Lifestyle;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitText?: string;
}

export default function LifestyleForm({
  initialData,
  onSubmit,
  loading,
  submitText = "Save Lifestyle",
}: LifestyleFormProps) {
  const API_URL = import.meta.env.VITE_IMG_URL || "http://localhost:5000";

  const [preview, setPreview] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        order: initialData.order || 1,
        isActive: initialData.isActive,
      });

      if (initialData.image) {
        setPreview(`${API_URL}${initialData.image}`);
      }
    }
  }, [initialData, API_URL]);

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
      [name]:
        name === "order"
          ? Number(value)
          : value,
    }));
  };

  const imageHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    /*if (!image && !initialData?.image) {
      Swal.fire({
        icon: "warning",
        title: "Lifestyle image is required",
      });

      return;
    }*/

    const formData = new FormData();

    formData.append(
      "title",
      form.title.trim()
    );

    formData.append(
      "description",
      form.description.trim()
    );

    formData.append(
      "order",
      String(form.order)
    );

    formData.append(
      "isActive",
      String(form.isActive)
    );

    if (image) {
      formData.append("image", image);
    }

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-6"
    >
      {/* Title */}
      <div>
        <label className="block mb-2 font-medium">
          Lifestyle Title *
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={changeHandler}
          maxLength={100}
          required
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">
          Description *
        </label>

        <textarea
          name="description"
          rows={5}
          value={form.description}
          onChange={changeHandler}
          maxLength={500}
          required
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Order */}
      <div>
        <label className="block mb-2 font-medium">
          Display Order
        </label>

        <input
          type="number"
          min={1}
          max={100}
          name="order"
          value={form.order}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block mb-2 font-medium">
          Status
        </label>

        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              isActive: !prev.isActive,
            }))
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
            form.isActive
              ? "bg-green-600"
              : "bg-gray-400"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              form.isActive
                ? "translate-x-6"
                : "translate-x-1"
            }`}
          />
        </button>

        <span className="ml-3 font-medium">
          {form.isActive
            ? "Active"
            : "Inactive"}
        </span>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-2 font-medium">
          Lifestyle Image 
        </label>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={imageHandler}
          className="w-full"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div>
          <label className="block mb-2 font-medium">
            Image Preview
          </label>

          <img
            src={preview}
            alt="Preview"
            className="w-96 h-60 rounded-lg border object-cover"
          />
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : submitText}
      </button>
    </form>
  );
}