import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { getContact } from "../../../services/contactService";
import type { Contact } from "../../../types/contact";

export default function Footer() {
  const [contact, setContact] =
    useState<Contact | null>(null);

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {
      const response = await getContact();

      if (response.success) {
        setContact(
          response.contact ||
            response.data
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Villas", path: "/villas" },
    { name: "Amenities", path: "/amenities" },
    { name: "Gallery", path: "/gallery" },
    { name: "Events", path: "/events" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* Top */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}

          <div>

            <Link
              to="/"
              className="flex items-center gap-3 mb-5"
            >
              <img
                src="/logo.png"
                alt="Surya Nikunjam"
                className="h-14"
              />

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Surya Nikunjam
                </h2>

                <p className="text-sm text-gray-400">
                  Community Living
                </p>

              </div>

            </Link>

            <p className="leading-7 text-gray-400">
              Experience peaceful community
              living with premium villas,
              modern amenities and a vibrant
              neighbourhood at West Kodikulam,
              near Thodupuzha.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {quickLinks.map((link) => (
                <li key={link.path}>

                  <Link
                    to={link.path}
                    className="hover:text-green-400 transition"
                  >
                    {link.name}
                  </Link>

                </li>
              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              {contact?.address && (
                <div className="flex gap-3">

                  <MapPin
                    className="text-green-500 mt-1"
                    size={20}
                  />

                  <span className="leading-6">
                    {contact.address}
                  </span>

                </div>
              )}

              {contact?.phone1 && (
                <div className="flex gap-3">

                  <Phone
                    className="text-green-500"
                    size={20}
                  />

                  <a
                    href={`tel:${contact.phone1}`}
                    className="hover:text-green-400"
                  >
                    {contact.phone1}
                  </a>

                </div>
              )}

              {contact?.email && (
                <div className="flex gap-3">

                  <Mail
                    className="text-green-500"
                    size={20}
                  />

                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-green-400"
                  >
                    {contact.email}
                  </a>

                </div>
              )}

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <a
  href={contact?.facebook || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="w-11 h-11 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition"
>
  <FaFacebookF size={18} />
</a>

<a
  href={contact?.instagram || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="w-11 h-11 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition"
>
  <FaInstagram size={18} />
</a>

<a
  href={contact?.youtube || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="w-11 h-11 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition"
>
  <FaYoutube size={18} />
</a>

            </div>

            <Link
              to="/site-visit"
              className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Book Site Visit
            </Link>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Surya
            Nikunjam. All Rights Reserved.
          </p>
          
          <p className="text-sm text-gray-500">
            Designed with ❤️ for Community Living
          </p>
              <p className="text-sm text-gray-500">Developed by Zecser Business LLP</p>
        </div>

      </div>

    </footer>
  );
}