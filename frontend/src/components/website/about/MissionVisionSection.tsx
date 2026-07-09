interface MissionVisionSectionProps {
  data: any;
}

export default function MissionVisionSection({
  data,
}: MissionVisionSectionProps) {
  if (!data) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

        {/* Mission */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">

          <h3 className="text-2xl font-bold text-green-600 mb-4">
            {data.missionTitle}
          </h3>

          <p className="text-gray-600 leading-7 whitespace-pre-line">
            {data.missionDescription}
          </p>

        </div>

        {/* Vision */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">

          <h3 className="text-2xl font-bold text-green-600 mb-4">
            {data.visionTitle}
          </h3>

          <p className="text-gray-600 leading-7 whitespace-pre-line">
            {data.visionDescription}
          </p>

        </div>

      </div>
    </section>
  );
}