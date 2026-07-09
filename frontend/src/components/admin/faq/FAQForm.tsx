import { useEffect, useState } from "react";
import type { FAQ } from "../../../types/faq";

interface FAQFormProps {
  initialData?: FAQ;
  loading: boolean;
  submitText?: string;
  onSubmit: (data: FAQ) => Promise<void>;
}

export default function FAQForm({
  initialData,
  loading,
  submitText = "Save FAQ",
  onSubmit,
}: FAQFormProps) {
  const [form, setForm] = useState<FAQ>({
    question: "",
    answer: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        question: initialData.question || "",
        answer: initialData.answer || "",
        order: initialData.order || 1,
        isActive: initialData.isActive,
      });
    }
  }, [initialData]);

  const changeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "order"
          ? Number(value)
          : value,
    }));
  };

  const submitHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await onSubmit({
      ...form,
      question: form.question.trim(),
      answer: form.answer.trim(),
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-6"
    >
      {/* Question */}

      <div>
        <label className="block mb-2 font-medium">
          Question *
        </label>

        <input
          type="text"
          name="question"
          required
          value={form.question}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          placeholder="Enter question"
        />
      </div>

      {/* Answer */}

      <div>
        <label className="block mb-2 font-medium">
          Answer *
        </label>

        <textarea
          name="answer"
          required
          rows={6}
          maxLength={1000}
          value={form.answer}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          placeholder="Enter answer"
        />
      </div>

      {/* Order & Status */}

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-medium">
            Display Order
          </label>

          <input
            type="number"
            min={1}
            max={100}
            name="order"
            value={form.order}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            value={String(form.isActive)}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                isActive:
                  e.target.value === "true",
              }))
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="true">
              Active
            </option>

            <option value="false">
              Inactive
            </option>
          </select>
        </div>

      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : submitText}
      </button>
    </form>
  );
}