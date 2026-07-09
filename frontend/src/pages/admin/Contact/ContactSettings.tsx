import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";

import {
  getContact,
  saveContact,
} from "../../../services/contactService";

import type { Contact } from "../../../types/contact";

export default function ContactSettings() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState<Contact>({
      companyName: "",
      address: "",
      phone1: "",
      phone2: "",
      email: "",
      whatsapp: "",
      googleMap: "",
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      officeHours: "",
      copyright: "",
      isActive: true,
    });

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {
      const response =
        await getContact();

      if (response.contact) {
        setForm(response.contact);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title:
          "Failed to load contact settings",
      });
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
    const { name, value } =
      e.target;

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
        await saveContact(form);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title:
            "Contact settings saved",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Save failed",
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
            Contact Settings
          </h1>

          <p className="text-gray-500">
            Manage website contact information
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="space-y-6"
        >
          {/* Company */}

          <div>
            <label className="block mb-2 font-medium">
              Company Name *
            </label>

            <input
              type="text"
              name="companyName"
              required
              value={form.companyName}
              onChange={changeHandler}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Address */}

          <div>
            <label className="block mb-2 font-medium">
              Address *
            </label>

            <textarea
              rows={3}
              name="address"
              required
              value={form.address}
              onChange={changeHandler}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Phone */}

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">
                Phone 1 *
              </label>

              <input
                type="text"
                name="phone1"
                required
                value={form.phone1}
                onChange={changeHandler}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone 2
              </label>

              <input
                type="text"
                name="phone2"
                value={form.phone2}
                onChange={changeHandler}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          {/* Email & WhatsApp */}

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">
                Email *
              </label>

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={changeHandler}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                WhatsApp
              </label>

              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={changeHandler}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          {/* Google Map */}

          <div>
            <label className="block mb-2 font-medium">
              Google Map URL
            </label>

            <input
              type="url"
              name="googleMap"
              value={form.googleMap}
              onChange={changeHandler}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Social Media */}

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="url"
              name="facebook"
              placeholder="Facebook URL"
              value={form.facebook}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />

            <input
              type="url"
              name="instagram"
              placeholder="Instagram URL"
              value={form.instagram}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />

            <input
              type="url"
              name="youtube"
              placeholder="YouTube URL"
              value={form.youtube}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />

            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={form.linkedin}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />
          </div>

          {/* Office Hours */}

          <div>
            <label className="block mb-2 font-medium">
              Office Hours
            </label>

            <input
              type="text"
              name="officeHours"
              value={form.officeHours}
              onChange={changeHandler}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Copyright */}

          <div>
            <label className="block mb-2 font-medium">
              Footer Copyright
            </label>

            <input
              type="text"
              name="copyright"
              value={form.copyright}
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
                  isActive:
                    e.target.value === "true",
                }))
              }
              className="border rounded-lg p-3"
            >
              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>
            </select>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg"
          >
            {saving
              ? "Saving..."
              : "Save Settings"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}