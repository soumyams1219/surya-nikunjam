import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { About } from "../../../types/about";

interface AboutFormProps {
  initialData?: About;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
}

export default function AboutForm({
  initialData,
  onSubmit,
  loading,
}: AboutFormProps) {
  const API_URL =
  import.meta.env.VITE_IMG_URL ||
  "http://localhost:5000";

const [welcomePreview, setWelcomePreview] =
  useState("");

const [aboutPreview, setAboutPreview] =
  useState("");

const [welcomeImage, setWelcomeImage] =
  useState<File | null>(null);

const [aboutImage, setAboutImage] =
  useState<File | null>(null);

const [form, setForm] = useState({

  // Welcome

  welcomeTitle: "",

  welcomeSubtitle: "",

  welcomeDescription: "",

  // About

  aboutTitle: "",

  aboutDescription: "",

  // Vision

  visionTitle: "Our Vision",

  visionDescription: "",

  // Mission

  missionTitle: "Our Mission",

  missionDescription: "",

  // Button

  buttonText: "Know More",

  buttonLink: "/about",

  isActive: true,

});
  useEffect(() => {

  if (!initialData) return;

  setForm({

    welcomeTitle:
      initialData.welcomeTitle || "",

    welcomeSubtitle:
      initialData.welcomeSubtitle || "",

    welcomeDescription:
      initialData.welcomeDescription || "",

    aboutTitle:
      initialData.aboutTitle || "",

    aboutDescription:
      initialData.aboutDescription || "",

    visionTitle:
      initialData.visionTitle || "Our Vision",

    visionDescription:
      initialData.visionDescription || "",

    missionTitle:
      initialData.missionTitle || "Our Mission",

    missionDescription:
      initialData.missionDescription || "",

    buttonText:
      initialData.buttonText || "Know More",

    buttonLink:
      initialData.buttonLink || "/about",

    isActive:
  initialData.isActive ?? true,

  });

  if (initialData.welcomeImage) {
    setWelcomePreview(
      `${API_URL}${initialData.welcomeImage}`
    );
  }

  if (initialData.aboutImage) {
    setAboutPreview(
      `${API_URL}${initialData.aboutImage}`
    );
  }

}, [initialData]);

 useEffect(() => {

  return () => {

    if (
      welcomePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        welcomePreview
      );
    }

    if (
      aboutPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        aboutPreview
      );
    }

  };

}, [
  welcomePreview,
  aboutPreview,
]);

  const changeHandler = (
  e: React.ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement
  >
) => {

  const {
    name,
    value,
  } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

};
const welcomeImageHandler = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  if (!e.target.files?.length)
    return;

  const file =
    e.target.files[0];

  setWelcomeImage(file);

  setWelcomePreview(
    URL.createObjectURL(file)
  );

};
  const aboutImageHandler = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  if (!e.target.files?.length)
    return;

  const file =
    e.target.files[0];

  setAboutImage(file);

  setAboutPreview(
    URL.createObjectURL(file)
  );

};
  const submitHandler = async (
  e: React.FormEvent
) => {

  e.preventDefault();
  if (!form.welcomeTitle.trim()) {

  Swal.fire({
    icon: "warning",
    title: "Welcome Title is required",
  });

  return;
}

if (!form.aboutTitle.trim()) {

  Swal.fire({
    icon: "warning",
    title: "About Title is required",
  });

  return;
}
if (!form.visionTitle.trim()) {

  Swal.fire({
    icon: "warning",
    title: "Vision Title is required",
  });

  return;
}

if (!form.missionTitle.trim()) {

  Swal.fire({
    icon: "warning",
    title: "Mission Title is required",
  });

  return;
}
if (
  !welcomeImage &&
  !initialData?.welcomeImage
) {

  Swal.fire({
    icon: "warning",
    title: "Welcome Image is required",
  });

  return;
}

if (
  !aboutImage &&
  !initialData?.aboutImage
) {

  Swal.fire({
    icon: "warning",
    title: "About Image is required",
  });

  return;
}

  const formData =
    new FormData();

  formData.append(
    "welcomeTitle",
    form.welcomeTitle.trim()
  );

  formData.append(
    "welcomeSubtitle",
    form.welcomeSubtitle.trim()
  );

  formData.append(
    "welcomeDescription",
    form.welcomeDescription.trim()
  );

  formData.append(
    "aboutTitle",
    form.aboutTitle.trim()
  );

  formData.append(
    "aboutDescription",
    form.aboutDescription.trim()
  );

  formData.append(
    "visionTitle",
    form.visionTitle.trim()
  );

  formData.append(
    "visionDescription",
    form.visionDescription.trim()
  );

  formData.append(
    "missionTitle",
    form.missionTitle.trim()
  );

  formData.append(
    "missionDescription",
    form.missionDescription.trim()
  );

  formData.append(
    "buttonText",
    form.buttonText.trim()
  );

  formData.append(
    "buttonLink",
    form.buttonLink.trim()
  );

  formData.append(
    "isActive",
    String(form.isActive)
  );

  if (welcomeImage) {
    formData.append(
      "welcomeImage",
      welcomeImage
    );
  }

  if (aboutImage) {
    formData.append(
      "aboutImage",
      aboutImage
    );
  }

  await onSubmit(formData);

};
  return (
    <form
    onSubmit={submitHandler}
    className="space-y-8"
  >
   {/* ================= Welcome Section ================= */}

<div className="bg-white rounded-xl shadow-lg p-6 space-y-5">

  <h2 className="text-2xl font-bold border-b pb-3">
    Welcome Section
  </h2>

  {/* Welcome Title */}

  <div>

    <label className="block mb-2 font-medium">
      Welcome Title *
    </label>

    <input
      type="text"
      name="welcomeTitle"
      value={form.welcomeTitle}
      onChange={changeHandler}
      className="w-full border rounded-lg p-3"
      required
      placeholder="Welcome to Surya Nikunjam"
    />

  </div>

  {/* Welcome Subtitle */}

  <div>

    <label className="block mb-2 font-medium">
      Welcome Subtitle
    </label>

    <input
      type="text"
      name="welcomeSubtitle"
      value={form.welcomeSubtitle}
      onChange={changeHandler}
      className="w-full border rounded-lg p-3"
      placeholder="A Community Where Life Blossoms Together"
    />

  </div>

  {/* Welcome Description */}

  <div>

    <label className="block mb-2 font-medium">
      Welcome Description
    </label>

    <textarea
      rows={6}
      name="welcomeDescription"
      value={form.welcomeDescription}
      onChange={changeHandler}
      className="w-full border rounded-lg p-3"
    />

  </div>

  {/* Welcome Image */}

  <div>

    <label className="block mb-2 font-medium">
      Welcome Image
    </label>

    <input
      type="file"
      accept=".jpg,.jpeg,.png,.webp"
      onChange={welcomeImageHandler}
      className="w-full"
    />

  </div>

  {welcomePreview && (

    <div>

      <label className="block mb-2 font-medium">
        Welcome Image Preview
      </label>

      <img
        src={welcomePreview}
        alt="Welcome"
        className="w-full max-w-md h-60 object-cover rounded-lg border"
      />

    </div>

  )}

</div>
{/* ================= About Section ================= */}

<div className="bg-white rounded-xl shadow-lg p-6 space-y-5">

  <h2 className="text-2xl font-bold border-b pb-3">
    About Section
  </h2>

  {/* About Title */}

  <div>

    <label className="block mb-2 font-medium">
      About Title *
    </label>

    <input
      type="text"
      name="aboutTitle"
      value={form.aboutTitle}
      onChange={changeHandler}
      className="w-full border rounded-lg p-3"
      required
    />

  </div>

  {/* About Description */}

  <div>

    <label className="block mb-2 font-medium">
      About Description
    </label>

    <textarea
      rows={8}
      name="aboutDescription"
      value={form.aboutDescription}
      onChange={changeHandler}
      className="w-full border rounded-lg p-3"
    />

  </div>

  {/* About Image */}

  <div>

    <label className="block mb-2 font-medium">
      About Image
    </label>

    <input
      type="file"
      accept=".jpg,.jpeg,.png,.webp"
      onChange={aboutImageHandler}
      className="w-full"
    />

  </div>

  {aboutPreview && (

    <div>

      <label className="block mb-2 font-medium">
        About Image Preview
      </label>

      <img
        src={aboutPreview}
        alt="About"
        className="w-full max-w-md h-60 rounded-lg border object-cover"
      />

    </div>

  )}

</div>
{/* ================= Vision Section ================= */}

<div className="bg-white rounded-xl shadow-lg p-6 space-y-5">

  <h2 className="text-2xl font-bold border-b pb-3">
    Vision
  </h2>

  <div>

    <label className="block mb-2 font-medium">
      Vision Title
    </label>

    <input
      type="text"
      name="visionTitle"
      value={form.visionTitle}
      onChange={changeHandler}
      className="w-full border rounded-lg p-3"
      required
    />

  </div>

  <div>

    <label className="block mb-2 font-medium">
      Vision Description
    </label>

    <textarea
      rows={5}
      name="visionDescription"
      value={form.visionDescription}
      onChange={changeHandler}
      className="w-full border rounded-lg p-3"
    />

  </div>

</div>
{/* ================= Mission Section ================= */}

<div className="bg-white rounded-xl shadow-lg p-6 space-y-5">

  <h2 className="text-2xl font-bold border-b pb-3">
    Mission
  </h2>

  <div>

    <label className="block mb-2 font-medium">
      Mission Title
    </label>

    <input
      type="text"
      name="missionTitle"
      value={form.missionTitle}
      onChange={changeHandler}
      className="w-full border rounded-lg p-3"
      required
    />

  </div>

  <div>

    <label className="block mb-2 font-medium">
      Mission Description
    </label>

    <textarea
      rows={5}
      name="missionDescription"
      value={form.missionDescription}
      onChange={changeHandler}
      className="w-full border rounded-lg p-3"
    />

  </div>

</div>{/* ================= Button Section ================= */}

<div className="bg-white rounded-xl shadow-lg p-6 space-y-5">

  <h2 className="text-2xl font-bold border-b pb-3">
    Button Settings
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

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
        type="text"
        name="buttonLink"
        value={form.buttonLink}
        onChange={changeHandler}
        className="w-full border rounded-lg p-3"
        placeholder="/about"
      />

    </div>

  </div>

</div>
{/* ================= Status ================= */}

<div className="bg-white rounded-xl shadow-lg p-6">

  <label className="block mb-4 text-lg font-semibold">
    Status
  </label>

  <div className="flex items-center gap-4">

    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          isActive: !prev.isActive,
        }))
      }
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        form.isActive
          ? "bg-green-600"
          : "bg-gray-400"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          form.isActive
            ? "translate-x-6"
            : "translate-x-1"
        }`}
      />
    </button>

    <span className="font-medium">
      {form.isActive
        ? "Active"
        : "Inactive"}
    </span>

  </div>

</div>
<div className="flex justify-end">

  <button
    type="submit"
    disabled={loading}
    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg"
  >
    {loading
      ? "Saving..."
      : "Save About"}
  </button>

</div>
</form>
  );
}