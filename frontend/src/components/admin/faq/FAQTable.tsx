import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { FAQ } from "../../../types/faq";

interface FAQTableProps {
  faqs: FAQ[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function FAQTable({
  faqs,
  onDelete,
  onToggle,
}: FAQTableProps) {
  if (faqs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No FAQs found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Question
            </th>

            <th className="px-4 py-3 text-left">
              Answer
            </th>

            <th className="px-4 py-3 text-center">
              Order
            </th>

            <th className="px-4 py-3 text-center">
              Status
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {faqs.map((faq) => (
            <tr
              key={faq._id}
              className="border-t hover:bg-gray-50"
            >
              {/* Question */}
              <td className="px-4 py-3 font-medium max-w-sm">
                <p className="truncate">
                  {faq.question}
                </p>
              </td>

              {/* Answer */}
              <td className="px-4 py-3 max-w-lg">
                <p className="truncate text-gray-600">
                  {faq.answer}
                </p>
              </td>

              {/* Order */}
              <td className="px-4 py-3 text-center">
                {faq.order}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() =>
                    onToggle(faq._id!)
                  }
                  className={`px-4 py-1 rounded-full text-white text-sm transition ${
                    faq.isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {faq.isActive
                    ? "Active"
                    : "Inactive"}
                </button>
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <Link
                    to={`/admin/faqs/edit/${faq._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(faq._id!)
                    }
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}