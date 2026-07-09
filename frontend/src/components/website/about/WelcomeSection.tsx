interface WelcomeSectionProps {
  data: any;
}

export default function WelcomeSection({
  data,
}: WelcomeSectionProps) {
  if (!data) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          {data.welcomeTitle}
        </h2>

        <p className="text-gray-600 leading-8 text-lg whitespace-pre-line">
          {data.welcomeDescription}
        </p>

      </div>
    </section>
  );
}