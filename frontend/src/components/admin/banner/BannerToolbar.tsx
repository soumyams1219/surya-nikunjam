import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function BannerToolbar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

      <input
        type="text"
        placeholder="Search banner..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full md:w-80"
      />

      <Link
        to="/admin/banner/add"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
      >
        <Plus size={18} />

        Add Banner
      </Link>

    </div>
  );
}