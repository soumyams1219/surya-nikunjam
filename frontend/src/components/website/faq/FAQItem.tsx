import { ChevronDown } from "lucide-react";

import type { FAQ } from "../../../types/faq";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({
  faq,
  isOpen,
  onToggle,
}: FAQItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">

      {/* Question */}

      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
      >
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 pr-6">
          {faq.question}
        </h3>

        <ChevronDown
          size={24}
          className={`text-green-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Answer */}

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr]"
            : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-gray-600 leading-8 whitespace-pre-line">
            {faq.answer}
          </div>
        </div>
      </div>

    </div>
  );
}