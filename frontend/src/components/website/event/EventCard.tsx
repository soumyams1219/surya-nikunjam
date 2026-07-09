import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

import type { Event } from "../../../types/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({
  event,
}: EventCardProps) {
  const API_URL =
    import.meta.env.VITE_IMG_URL ||
    "http://localhost:5000";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">

      {/* Image */}

      <div className="overflow-hidden">

        <img
          src={`${API_URL}${event.image}`}
          alt={event.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />

      </div>

      {/* Content */}

      <div className="p-6">

        {/* Date */}

        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">

          <Calendar size={18} />

          <span>
            {new Date(event.eventDate).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )}
          </span>

        </div>

        {/* Title */}

        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {event.title}
        </h3>

        {/* Location */}

        {event.location && (
          <div className="flex items-center gap-2 text-gray-600 mb-4">

            <MapPin size={18} />

            <span>{event.location}</span>

          </div>
        )}

        {/* Description */}

        <p className="text-gray-600 leading-7 line-clamp-3">
          {event.description}
        </p>

        {/* Read More */}

        <Link
          to={`/events/${event._id}`}
          className="inline-flex items-center gap-2 mt-6 text-green-600 font-semibold hover:text-green-700 transition"
        >
          Read More

          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition"
          />
        </Link>

      </div>

    </div>
  );
}