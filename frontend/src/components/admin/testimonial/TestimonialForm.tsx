import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import type { Testimonial } from "../../../types/testimonial";

interface TestimonialFormProps {
  initialData?: Testimonial;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitText?: string;
}

export default function TestimonialForm({
  initialData,
  onSubmit,
  loading,
  submitText = "Save Testimonial",
}: TestimonialFormProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  const [preview, setPreview] = useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    message: "",
    rating: 5,
    featured: false,
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        designation:
          initialData.designation || "",
        message:
          initialData.message || "",
        rating:
          initialData.rating || 5,
        featured:
          initialData.featured ?? false,
        order:
          initialData.order || 1,
        isActive:
          initialData.isActive ?? true,
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
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "rating" ||
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

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!image && !initialData?.image) {
      Swal.fire({
        icon: "warning",
        title:
          "Please upload a resident photo",
      });

      return;
    }

    const formData = new FormData();

    formData.append(
      "name",
      form.name.trim()
    );

    formData.append(
      "designation",
      form.designation.trim()
    );

    formData.append(
      "message",
      form.message.trim()
    );

    formData.append(
      "rating",
      String(form.rating)
    );

    formData.append(
      "featured",
      String(form.featured)
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
      formData.append(
        "image",
        image
      );
    }

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-6"
    >
      {/* Name */}

      <div>
        <label className="block mb-2 font-medium">
          Resident Name *
        </label>

        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Designation */}

      <div>
        <label className="block mb-2 font-medium">
          Designation *
        </label>

        <input
          type="text"
          name="designation"
          required
          value={form.designation}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          placeholder="Resident / Villa Owner"
        />
      </div>

      {/* Message */}

      <div>
        <label className="block mb-2 font-medium">
          Testimonial *
        </label>

        <textarea
          name="message"
          rows={5}
          required
          maxLength={1000}
          value={form.message}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Rating */}

      <div>
        <label className="block mb-2 font-medium">
          Rating
        </label>

        <select
          name="rating"
          value={form.rating}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        >
          <option value={5}>
            ⭐⭐⭐⭐⭐ (5)
          </option>

          <option value={4}>
            ⭐⭐⭐⭐ (4)
          </option>

          <option value={3}>
            ⭐⭐⭐ (3)
          </option>

          <option value={2}>
            ⭐⭐ (2)
          </option>

          <option value={1}>
            ⭐ (1)
          </option>
        </select>
      </div>

      {/* Featured / Order / Status */}

      <div className="grid md:grid-cols-3 gap-5">

        <div>
          <label className="block mb-2 font-medium">
            Featured
          </label>

          <select
            value={String(form.featured)}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                featured:
                  e.target.value ===
                  "true",
              }))
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="false">
              No
            </option>

            <option value="true">
              Yes
            </option>
          </select>
        </div>

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
                  e.target.value ===
                  "true",
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

      {/* Image */}

      <div>
        <label className="block mb-2 font-medium">
          Resident Photo
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
            Photo Preview
          </label>

          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 rounded-lg border object-cover"
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