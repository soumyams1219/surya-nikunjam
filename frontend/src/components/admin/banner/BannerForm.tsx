import { useEffect, useState } from "react";
import type { Banner } from "../../../types/banner";
import Swal from "sweetalert2";

interface BannerFormProps {
  initialData?: Banner;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitText?: string;
}

export default function BannerForm({
  initialData,
  onSubmit,
  loading,
  submitText = "Save Banner",
}: BannerFormProps) {
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    order: 1,
    isActive: true,
  });

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        description: initialData.description || "",
        buttonText: initialData.buttonText || "",
        buttonLink: initialData.buttonLink || "",
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
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "order" ? Number(value) : value,
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
    title: "Banner image is required",
  });
  return;
}
    const formData = new FormData();

    formData.append("title", form.title.trim());
formData.append("subtitle", form.subtitle.trim());
formData.append("description", form.description.trim());
formData.append("buttonText", form.buttonText.trim());
formData.append("buttonLink", form.buttonLink.trim());
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
          Title *
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          required
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block mb-2 font-medium">
          Subtitle
        </label>

        <input
          type="text"
          name="subtitle"
          value={form.subtitle}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          name="description"
          rows={4}
          maxLength={500}
          value={form.description}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Button Fields */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-medium">
            Button Text
          </label>

          <input
            type="text"
            name="buttonText"
            value={form.buttonText}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Button Link
          </label>

          <input
            type="url"
            name="buttonLink"
            value={form.buttonLink}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
          />
        </div>
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

  <button
    type="button"
    onClick={() =>
      setForm((prev) => ({
        ...prev,
        isActive: !prev.isActive,
      }))
    }
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      form.isActive ? "bg-green-600" : "bg-gray-400"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        form.isActive ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>

  <span className="ml-3 font-medium">
    {form.isActive ? "Active" : "Inactive"}
  </span>
</div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-2 font-medium">
          Banner Image
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
      Current Banner Image
    </label>

    <img
      src={preview}
      alt="Banner Preview"
      className="w-96 h-56 rounded-lg border object-cover"
    />
  </div>
)}

      {/* Submit */}
      <button
    type="submit"
    disabled={loading}
    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg"
>
    {loading ? (
        <>
            Saving...
        </>
    ) : (
        submitText
    )}
</button>
    </form>
  );
}