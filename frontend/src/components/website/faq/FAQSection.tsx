import { useEffect, useState } from "react";

import FAQItem from "./FAQItem";

import { getFAQs } from "../../../services/faqService";

import type { FAQ } from "../../../types/faq";

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  // Currently opened FAQ
  const [openIndex, setOpenIndex] = useState<number | null>(
    0
  );

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);

      const response = await getFAQs();

      if (response.success) {
        const faqList = (
          response.faqs ||
          response.faq ||
          response.data ||
          []
        )
          .filter(
            (item: FAQ) => item.isActive
          )
          .sort(
            (a: FAQ, b: FAQ) =>
              a.order - b.order
          );

        setFaqs(faqList);

        if (faqList.length === 0) {
          setOpenIndex(null);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load FAQs",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-500">
            Loading FAQs...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 py-20 bg-gray-50">

      <div className="max-w-5xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-green-600 font-semibold uppercase tracking-widest">
            Frequently Asked Questions
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Everything You Need to Know
          </h2>

          <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full" />

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 leading-8">
            Find answers to the most commonly
            asked questions about Surya
            Nikunjam, our villas, amenities,
            booking process, and community
            lifestyle.
          </p>

        </div>

        {/* Empty State */}

        {faqs.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-xl text-gray-500">
              No FAQs available.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {faqs.map((faq, index) => (
              <FAQItem
                key={faq._id}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(
                    openIndex === index
                      ? null
                      : index
                  )
                }
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
}