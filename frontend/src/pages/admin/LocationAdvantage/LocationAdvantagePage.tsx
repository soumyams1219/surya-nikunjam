import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";

import {
  getLocationAdvantage,
  saveLocationAdvantage,
} from "../../../services/locationAdvantageService";

export default function LocationAdvantagePage() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    title: "",

    description: "",

    nearby: "",

    isActive: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response =
        await getLocationAdvantage();

      if (
        response.success &&
        response.locationAdvantage
      ) {
        const data =
          response.locationAdvantage;

        setForm({
          title: data.title,

          description:
            data.description,

          nearby:
            data.nearby.join("\n"),

          isActive:
            data.isActive,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

      [name]: value,
    }));
  };

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response =
        await saveLocationAdvantage({
          title: form.title,

          description:
            form.description,

          nearby: form.nearby
            .split("\n")
            .map((item) =>
              item.trim()
            )
            .filter(Boolean),

          isActive:
            form.isActive,
        });

      if (response.success) {
        Swal.fire({
          icon: "success",

          title:
            "Location Advantage Updated",

          timer: 1500,

          showConfirmButton:
            false,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",

        title:
          error?.response?.data
            ?.message ||
          "Failed to save",
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
            Location Advantages
          </h1>

          <p className="text-gray-500 mt-2">
            Manage the Location
            Advantages section.
          </p>

        </div>

        <form
          onSubmit={submitHandler}
          className="space-y-6"
        >

          {/* Title */}

          <div>

            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={
                changeHandler
              }
              className="w-full border rounded-lg p-3"
              required
            />

          </div>

          {/* Description */}

          <div>

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={
                form.description
              }
              onChange={
                changeHandler
              }
              className="w-full border rounded-lg p-3"
              required
            />

          </div>

          {/* Nearby */}

          <div>

            <label className="block mb-2 font-medium">
              Nearby Places
            </label>

            <textarea
              rows={8}
              name="nearby"
              value={form.nearby}
              onChange={
                changeHandler
              }
              className="w-full border rounded-lg p-3"
              placeholder={`Schools
Colleges
Hospitals
Shopping Centres
Banks
Places of Worship
Restaurants
Public Transportation`}
            />

            <p className="text-sm text-gray-500 mt-2">
              Enter one nearby
              location per line.
            </p>

          </div>

          {/* Status */}

          <div>

            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              value={String(
                form.isActive
              )}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,

                  isActive:
                    e.target
                      .value ===
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

          {/* Button */}

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>
      </div>
    </AdminLayout>
  );
}