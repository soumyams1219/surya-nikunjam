import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 bg-green-700 text-white">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold">
          Ready to Visit Surya Nikunjam?
        </h2>

        <p className="mt-5 text-lg text-green-100">
          Experience peaceful community
          living firsthand by scheduling
          your site visit today.
        </p>

        <Link
          to="/site-visit"
          className="inline-block mt-8 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Book Site Visit
        </Link>

      </div>

    </section>
  );
}