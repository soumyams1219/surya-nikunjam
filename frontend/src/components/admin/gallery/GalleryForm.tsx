import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import type { Gallery } from "../../../types/gallery";

interface GalleryFormProps {
  initialData?: Gallery;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitText?: string;
}

export default function GalleryForm({
  initialData,
  onSubmit,
  loading,
  submitText = "Save Gallery",
}: GalleryFormProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  const [preview, setPreview] = useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        category: initialData.category || "",
        order: initialData.order || 1,
        isActive: initialData.isActive,
      });

      setPreview(
        initialData.image
          ? `${API_URL}${initialData.image}`
          : ""
      );
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
      HTMLInputElement | HTMLSelectElement
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

    if (!image && !initialData?.image) {
      Swal.fire({
        icon: "warning",
        title: "Please select an image.",
      });

      return;
    }

    const formData = new FormData();

    formData.append(
      "title",
      form.title.trim()
    );

    formData.append(
      "category",
      form.category.trim()
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
          Gallery Title *
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

      {/* Category */}

      <div>
        <label className="block mb-2 font-medium">
          Category 
        </label>

        <input
          type="text"
          name="category"
          placeholder="Example: Villas"
          value={form.category}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Order & Status */}

      <div className="grid md:grid-cols-2 gap-5">

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
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            value={String(form.isActive)}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                isActive:
                  e.target.value === "true",
              }))
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="true">
              Active
            </option>

            <option value="false">
              Inactive
            </option>
          </select>
        </div>

      </div>

      {/* Upload */}

      <div>
        <label className="block mb-2 font-medium">
          Gallery Image
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
            Image Preview
          </label>

          <img
            src={preview}
            alt="Gallery Preview"
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