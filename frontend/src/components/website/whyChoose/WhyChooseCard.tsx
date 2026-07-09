import type { WhyChoose } from "../../../types/whyChoose";

interface WhyChooseCardProps {
  item: WhyChoose;
}

export default function WhyChooseCard({
  item,
}: WhyChooseCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center border border-gray-100 hover:-translate-y-2">

      {/* Icon */}

      <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">

        {item.icon ? (
          <img
            src={`${import.meta.env.VITE_API_URL}${item.icon}`}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl">🏡</span>
        )}

      </div>

      {/* Title */}

      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {item.title}
      </h3>

      {/* Description */}

      <p className="text-gray-600 leading-7">
        {item.description}
      </p>

    </div>
  );
}