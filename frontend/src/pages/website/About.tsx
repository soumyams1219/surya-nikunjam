import { useEffect, useState } from "react";
import { getAbout } from "../../services/websiteAboutService";

export default function About() {
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const res = await getAbout();
      if (res.success) {
        setAbout(res.about);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!about) {
  return (
    <section className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700">
          About Surya Nikunjam
        </h2>

        <p className="mt-4 text-gray-500">
          About information will be available soon.
        </p>
      </div>
    </section>
  );
}

  const API_URL =
    import.meta.env.VITE_IMG_URL || "http://localhost:5000";

  return (
    <>
      {/* HEADER */}
      <section className="bg-green-700 pt-32 py-20 text-center text-white">
        <h1 className="text-5xl font-bold">
          About Surya Nikunjam
        </h1>
        <p className="mt-4 text-green-100 max-w-3xl mx-auto">
          Discover the story behind our community living project
        </p>
      </section>

      {/* ABOUT CONTENT ONLY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src={`${API_URL}${about.aboutImage}`}
              alt="About"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              {about.aboutTitle}
            </h2>

            <p className="text-gray-600 leading-8 whitespace-pre-line">
              {about.aboutDescription}
            </p>
          </div>

        </div>
      </section>
    </>
  );
}