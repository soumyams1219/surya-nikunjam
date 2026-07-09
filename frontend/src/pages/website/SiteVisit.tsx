import { useState } from "react";
import Swal from "sweetalert2";

import { createSiteVisit } from "../../services/siteVisitService";

export default function SiteVisit() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    visitDate: "",
    visitTime: "",
    message: "",
  });

  const changeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await createSiteVisit(form);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Site Visit Booked",
          text: "Our team will contact you shortly.",
        });

        setForm({
          name: "",
          phone: "",
          email: "",
          visitDate: "",
          visitTime: "",
          message: "",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
  <section className="pt-32 pb-20 bg-gradient-to-b from-green-50 via-white to-white">

    <div className="max-w-7xl mx-auto px-6">

      {/* Hero */}

      <div className="text-center mb-16">

        <span className="uppercase tracking-[4px] text-green-600 font-semibold">
          Schedule Your Visit
        </span>

        <h1 className="text-5xl font-bold text-gray-900 mt-4">
          Experience Surya Nikunjam
        </h1>

        <div className="w-24 h-1 bg-green-600 rounded-full mx-auto mt-6"></div>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 leading-8">
          Visit Surya Nikunjam and explore beautifully designed villas,
          landscaped gardens, premium amenities and peaceful community
          living. Our team will guide you through every detail.
        </p>

      </div>

      <div className="grid lg:grid-cols-5 gap-10">

        {/* LEFT */}

        <div className="lg:col-span-2">

          <div className="bg-white rounded-3xl shadow-xl p-8 h-full">

            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Why Visit Surya Nikunjam?
            </h2>

            <div className="space-y-8">

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                  🏡
                </div>

                <div>

                  <h4 className="font-semibold text-lg">
                    Premium Villas
                  </h4>

                  <p className="text-gray-600 mt-1">
                    Walk through our thoughtfully designed villas and
                    experience spacious layouts.
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                  🌳
                </div>

                <div>

                  <h4 className="font-semibold text-lg">
                    Beautiful Surroundings
                  </h4>

                  <p className="text-gray-600 mt-1">
                    Explore landscaped gardens, walking paths and
                    peaceful community spaces.
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                  🤝
                </div>

                <div>

                  <h4 className="font-semibold text-lg">
                    Meet Our Experts
                  </h4>

                  <p className="text-gray-600 mt-1">
                    Learn about villa options, pricing, amenities and
                    booking process directly from our team.
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                  🕒
                </div>

                <div>

                  <h4 className="font-semibold text-lg">
                    Flexible Scheduling
                  </h4>

                  <p className="text-gray-600 mt-1">
                    Choose a convenient date and time that works best
                    for your family.
                  </p>

                </div>

              </div>

            </div>

            <div className="border-t mt-10 pt-8">

              <h3 className="font-bold text-lg mb-4">
                Need Assistance?
              </h3>

              <div className="space-y-3 text-gray-600">

                <p>📞 +91 98765 43210</p>

                <p>✉ info@suryanikunjam.com</p>

                <p>
                  📍 West Kodikulam,
                  Thodupuzha, Kerala
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        {/* RIGHT */}

<div className="lg:col-span-3">
  <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">

    <h2 className="text-3xl font-bold text-gray-900">
      Book Your Site Visit
    </h2>

    <p className="text-gray-600 mt-2 mb-8">
      Fill in your details below and our team will
      contact you shortly to confirm your preferred
      visit date and time.
    </p>

    <form
      onSubmit={submitHandler}
      className="space-y-6"
    >

      {/* Name */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Full Name *
        </label>

        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={changeHandler}
          placeholder="Enter your full name"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-green-600 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Phone */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Phone Number *
        </label>

        <input
          type="tel"
          name="phone"
          required
          maxLength={10}
          pattern="[0-9]{10}"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value.replace(/\D/g, ""),
            })
          }
          placeholder="9876543210"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-green-600 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Email */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Email Address *
        </label>

        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={changeHandler}
          placeholder="example@gmail.com"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-green-600 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Date & Time */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Preferred Visit Date *
          </label>

          <input
            type="date"
            name="visitDate"
            required
            min={new Date().toISOString().split("T")[0]}
            value={form.visitDate}
            onChange={changeHandler}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-green-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Preferred Time *
          </label>

          <input
            type="time"
            name="visitTime"
            required
            value={form.visitTime}
            onChange={changeHandler}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-green-600 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

      </div>

      {/* Message */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Additional Message
        </label>

        <textarea
          rows={5}
          name="message"
          value={form.message}
          onChange={changeHandler}
          placeholder="Any specific questions or requests..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none transition focus:border-green-600 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">

            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>

            Scheduling Your Visit...

          </span>
        ) : (
          "Book My Site Visit"
        )}
      </button>

      {/* Privacy */}

      <div className="rounded-xl bg-green-50 border border-green-100 p-4">

        <p className="text-sm text-center text-gray-600">
          🔒 Your information is secure and will only
          be used to schedule your site visit.
        </p>

      </div>

    </form>

  </div>
</div>
        </div>

      </div>

    

  </section>
  );
}