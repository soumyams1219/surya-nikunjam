import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  link: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  link,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6">
      <div className="flex items-center justify-between">

        {/* Left */}

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

        </div>

        {/* Icon */}

        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}
        >
          <Icon
            size={30}
            className="text-white"
          />
        </div>

      </div>

      <div className="mt-6">
        <Link
          to={link}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}