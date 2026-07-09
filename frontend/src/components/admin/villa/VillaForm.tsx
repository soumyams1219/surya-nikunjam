import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Villa } from "../../../types/villa";

interface VillaFormProps {
  initialData?: Villa;
  loading: boolean;
  submitText?: string;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function VillaForm({
  initialData,
  loading,
  submitText = "Save Villa",
  onSubmit,
}: VillaFormProps) {
  const [preview, setPreview] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    plotSize: "",
    builtUpArea: "",
    bedrooms: 2,
    bathrooms: 2,
    description: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        plotSize: initialData.plotSize || "",
        builtUpArea: initialData.builtUpArea || "",
        bedrooms: initialData.bedrooms || 2,
        bathrooms: initialData.bathrooms || 2,
        description: initialData.description || "",
        order: initialData.order || 1,
        isActive: initialData.isActive,
      });

      setPreview(
        initialData.image
          ? `http://localhost:5000${initialData.image}`
          : ""
      );
    }
  }, [initialData]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const changeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "bedrooms" ||
        name === "bathrooms" ||
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
        title: "Villa image is required",
      });

      return;
    }

    const formData = new FormData();

    formData.append("title", form.title.trim());
    formData.append("plotSize", form.plotSize.trim());
    formData.append("builtUpArea", form.builtUpArea.trim());
    formData.append("bedrooms", String(form.bedrooms));
    formData.append("bathrooms", String(form.bathrooms));
    formData.append("description", form.description.trim());
    formData.append("order", String(form.order));
    formData.append("isActive", String(form.isActive));

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
          Villa Title *
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

      {/* Plot + Area */}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-medium">
            Plot Size
          </label>

          <input
            type="text"
            name="plotSize"
            value={form.plotSize}
            onChange={changeHandler}
            placeholder="5 Cents"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Built-up Area
          </label>

          <input
            type="text"
            name="builtUpArea"
            value={form.builtUpArea}
            onChange={changeHandler}
            placeholder="1800 Sq.ft"
            className="w-full border rounded-lg p-3"
          />
        </div>
      </div>

      {/* Bedrooms + Bathrooms */}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-medium">
            Bedrooms
          </label>

          <input
            type="number"
            min={1}
            max={10}
            name="bedrooms"
            value={form.bedrooms}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Bathrooms
          </label>

          <input
            type="number"
            min={1}
            max={10}
            name="bathrooms"
            value={form.bathrooms}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
          />
        </div>
      </div>

      {/* Description */}

      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows={5}
          maxLength={1000}
          name="description"
          value={form.description}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Order + Status */}

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
                isActive: e.target.value === "true",
              }))
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="true">Active</option>

            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      {/* Image */}

      <div>
        <label className="block mb-2 font-medium">
          Villa Image
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
            alt="Villa Preview"
            className="w-96 h-56 object-cover rounded-lg border"
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