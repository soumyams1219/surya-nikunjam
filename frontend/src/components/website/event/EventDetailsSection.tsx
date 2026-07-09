import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";

import { getEventById } from "../../../services/eventService";
import type { Event } from "../../../types/event";

export default function EventDetailsSection() {
  const { id } = useParams();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      setLoading(true);

      const response = await getEventById(eventId);

      if (response.success) {
        setEvent(response.event || response.data);
      }
    } catch (error) {
      console.error("Failed to load event", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="pt-32 py-20 text-center">
        <p className="text-lg text-gray-500">
          Loading event...
        </p>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="pt-32 py-20 text-center">
        <h2 className="text-3xl font-bold">
          Event Not Found
        </h2>

        <Link
          to="/events"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Back to Events
        </Link>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-6xl mx-auto px-4">

        {/* Back Button */}

        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Image */}

        <img
          src={`${API_URL}${event.image}`}
          alt={event.title}
          className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
        />

        {/* Content */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-8 mb-8 text-gray-600">

            <div className="flex items-center gap-2">
              <Calendar
                size={20}
                className="text-green-600"
              />

              <span>
                {new Date(
                  event.eventDate
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin
                  size={20}
                  className="text-green-600"
                />

                <span>{event.location}</span>
              </div>
            )}

          </div>

          <div className="prose max-w-none text-gray-700 leading-8 whitespace-pre-line">
            {event.description}
          </div>

        </div>

      </div>

    </section>
  );
}