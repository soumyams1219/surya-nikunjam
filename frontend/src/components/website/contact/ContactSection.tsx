import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";

import { getContact } from "../../../services/contactService";
import type { Contact } from "../../../types/contact";

export default function ContactSection() {
  const [contact, setContact] =
    useState<Contact | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {
      setLoading(true);

      const response = await getContact();

      if (response.success) {
        setContact(
          response.contact ||
            response.data
        );
      }
    } catch (error) {
      console.error(
        "Failed to load contact settings",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-500">
            Loading contact information...
          </p>
        </div>
      </section>
    );
  }

  if (!contact) {
    return (
      <section className="pt-32 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center bg-white shadow rounded-xl p-10">
          <h2 className="text-xl text-gray-500">
            Contact Information not available.
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-green-600 uppercase tracking-widest font-semibold">
            Contact Us
          </span>

          <h2 className="text-4xl font-bold mt-3 text-gray-900">
            We'd Love To Hear From You
          </h2>

          <div className="w-24 h-1 bg-green-600 rounded-full mx-auto mt-5" />

          <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto mt-6">
            Have questions about Surya
            Nikunjam? Contact us or schedule
            a site visit today.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Details */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="space-y-8">

              {/* Address */}

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">

                  <MapPin className="text-green-600" />

                </div>

                <div>

                  <h3 className="font-semibold text-xl mb-2">
                    Address
                  </h3>

                  <p className="text-gray-600 whitespace-pre-line">
                    {contact.address}
                  </p>

                </div>

              </div>

              {/* Phone */}

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">

                  <Phone className="text-green-600" />

                </div>

                <div>

                  <h3 className="font-semibold text-xl mb-2">
                    Phone
                  </h3>

                  <a
                    href={`tel:${contact.phone1}`}
                    className="text-gray-600 hover:text-green-600"
                  >
                    {contact.phone1}
                  </a>

                </div>

              </div>

              {/* Email */}

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">

                  <Mail className="text-green-600" />

                </div>

                <div>

                  <h3 className="font-semibold text-xl mb-2">
                    Email
                  </h3>

                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-600 hover:text-green-600"
                  >
                    {contact.email}
                  </a>

                </div>

              </div>

              {/* Office Hours */}

              {contact.officeHours && (
                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">

                    <Clock className="text-green-600" />

                  </div>

                  <div>

                    <h3 className="font-semibold text-xl mb-2">
                      Office Hours
                    </h3>

                    <p className="text-gray-600 whitespace-pre-line">
                      {contact.officeHours}
                    </p>

                  </div>

                </div>
              )}

            </div>

            {/* CTA */}

            <Link
              to="/site-visit"
              className="inline-flex items-center gap-2 mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Book Site Visit

              <ArrowRight size={18} />

            </Link>

          </div>

          {/* Google Map */}

          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">

            {contact.googleMap ? (
              <iframe
                src={contact.googleMap}
                title="Google Map"
                className="w-full h-[550px]"
                loading="lazy"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-[550px] text-gray-500">
                Google Map not available.
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}