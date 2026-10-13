
import {
  Apple,
  HeartPulse,
  Scissors,
  Stethoscope,
} from "lucide-react";

const tips = [
  {
    icon: Apple,
    title: "Healthy Nutrition",
    description:
      "Provide balanced food and fresh water according to your pet's age and needs.",
  },
  {
    icon: HeartPulse,
    title: "Regular Exercise",
    description:
      "Daily walks and playtime help your pet stay active, healthy and happy.",
  },
  {
    icon: Stethoscope,
    title: "Regular Checkups",
    description:
      "Routine veterinary visits can help identify health problems early.",
  },
  {
    icon: Scissors,
    title: "Grooming",
    description:
      "Keep your pet clean and comfortable with regular grooming and hygiene.",
  },
];

const PetCareTips = () => {
  return (
    <section className="bg-orange-50/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Pet Care Guide
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Simple Tips for a Happier Pet
            </h2>

            <p className="mt-4 text-gray-600">
              Small daily habits can make a big difference in your pet's
              health and happiness.
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip) => {
            const Icon = tip.icon;

            return (
              <div
                key={tip.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-100 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 font-bold text-gray-950">
                  {tip.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {tip.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PetCareTips;

