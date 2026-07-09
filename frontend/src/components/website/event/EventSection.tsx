import { useEffect, useState } from "react";

import EventCard from "./EventCard";

import { getEvents } from "../../../services/eventService";

import type { Event } from "../../../types/event";

export default function EventSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);

      const response = await getEvents();

      if (response.success) {
        const eventList = (
          response.events ||
          response.event ||
          response.data ||
          []
        )
          .filter(
            (item: Event) => item.isActive
          )
          .sort(
            (a: Event, b: Event) =>
              a.order - b.order
          );

        setEvents(eventList);
      }
    } catch (error) {
      console.error(
        "Failed to load events",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="pt-32 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-500">
            Loading events...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-green-600 font-semibold uppercase tracking-widest">
            Community Events
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Stay Connected with Our Events
          </h2>

          <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 leading-8">
            Join community gatherings, wellness
            sessions, cultural celebrations, and
            recreational activities designed to
            create meaningful experiences for every
            resident.
          </p>

        </div>

        {/* Empty State */}

        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-xl text-gray-500">
              No events available.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
}