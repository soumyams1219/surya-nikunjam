import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import type { Event } from "../../../types/event";

interface EventFormProps {
  initialData?: Event;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitText?: string;
}

export default function EventForm({
  initialData,
  onSubmit,
  loading,
  submitText = "Save Event",
}: EventFormProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  const [preview, setPreview] = useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    eventDate: "",
    eventTime: "",
    location: "",
    featured: false,
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        shortDescription:
          initialData.shortDescription || "",
        description:
          initialData.description || "",
        eventDate: initialData.eventDate
          ? initialData.eventDate.substring(0, 10)
          : "",
        eventTime:
          initialData.eventTime || "",
        location:
          initialData.location || "",
        featured:
          initialData.featured ?? false,
        order: initialData.order || 1,
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
        title: "Please upload an event image",
      });

      return;
    }

    const formData = new FormData();

    formData.append(
      "title",
      form.title.trim()
    );

    formData.append(
      "shortDescription",
      form.shortDescription.trim()
    );

    formData.append(
      "description",
      form.description.trim()
    );

    formData.append(
      "eventDate",
      form.eventDate
    );

    formData.append(
      "eventTime",
      form.eventTime
    );

    formData.append(
      "location",
      form.location.trim()
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
          Event Title *
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

      {/* Short Description */}

      <div>
        <label className="block mb-2 font-medium">
          Short Description *
        </label>

        <textarea
          name="shortDescription"
          rows={3}
          required
          maxLength={200}
          value={form.shortDescription}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Description */}

      <div>
        <label className="block mb-2 font-medium">
          Full Description *
        </label>

        <textarea
          name="description"
          rows={6}
          required
          value={form.description}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Date & Time */}

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-medium">
            Event Date *
          </label>

          <input
            type="date"
            name="eventDate"
            required
            value={form.eventDate}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Event Time *
          </label>

          <input
            type="time"
            name="eventTime"
            required
            value={form.eventTime}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
          />
        </div>

      </div>

      {/* Location */}

      <div>
        <label className="block mb-2 font-medium">
          Location *
        </label>

        <input
          type="text"
          name="location"
          required
          value={form.location}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
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
                  e.target.value === "true",
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

      {/* Image */}

      <div>
        <label className="block mb-2 font-medium">
          Event Image
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