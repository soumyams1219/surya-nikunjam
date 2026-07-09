import { Link } from "react-router-dom";

import {
  Home,
  PlusCircle,
  CalendarDays,
  MessageSquare,
  Building2,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Villa",
      description: "Create a new villa",
      icon: Home,
      link: "/admin/villas/add",
      color: "bg-blue-500",
    },
    {
      title: "Add Why Choose",
      description: "Add a new feature",
      icon: PlusCircle,
      link: "/admin/why-choose/add",
      color: "bg-green-500",
    },
    {
      title: "Site Visits",
      description: "View booking requests",
      icon: CalendarDays,
      link: "/admin/site-visits",
      color: "bg-yellow-500",
    },
    {
      title: "Testimonials",
      description: "Manage testimonials",
      icon: MessageSquare,
      link: "/admin/testimonials",
      color: "bg-purple-500",
    },
    {
      title: "About Section",
      description: "Update About page",
      icon: Building2,
      link: "/admin/about",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      {/* Heading */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <p className="text-gray-500 mt-1">
          Frequently used shortcuts
        </p>
      </div>

      {/* Cards */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="border rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${action.color}`}
              >
                <Icon
                  size={28}
                  className="text-white"
                />
              </div>

              <h3 className="text-lg font-semibold mt-4">
                {action.title}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                {action.description}
              </p>

              <div className="mt-4 text-blue-600 font-medium">
                Open →
              </div>
            </Link>
          );
        })}

      </div>

    </div>
  );
}