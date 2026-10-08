import {
  Heart,
  Home,
  ShieldCheck,
  HandHeart,
} from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Give Love a Home",
    description:
      "Give a loving pet the safe and caring home they deserve.",
  },
  {
    icon: Home,
    title: "Save a Life",
    description:
      "Adoption gives pets a second chance and helps reduce homelessness.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Adoption",
    description:
      "Connect with responsible pet owners and make adoption safer.",
  },
  {
    icon: HandHeart,
    title: "Make a Difference",
    description:
      "Your decision can create a happier future for both you and your pet.",
  },
];

const WhyAdoptSection = () => {
  return (
    <section className="bg-orange-50/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Why Adoption Matters
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Why Adopt a Pet?
          </h2>

          <p className="mt-4 text-gray-600">
            Adoption is more than bringing a pet home. It is about giving
            love, creating a bond and changing a life.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-100 hover:shadow-xl"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={26} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-950">
                  {reason.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyAdoptSection;

