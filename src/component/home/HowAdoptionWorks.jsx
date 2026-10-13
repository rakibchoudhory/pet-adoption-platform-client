
import {
  Search,
  ClipboardEdit,
  MessageCircleHeart,
  HouseHeart,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a Pet",
    description:
      "Browse available pets and find a companion that matches your lifestyle.",
  },
  {
    number: "02",
    icon: ClipboardEdit,
    title: "Send a Request",
    description:
      "Submit a simple adoption request with your preferred pickup date.",
  },
  {
    number: "03",
    icon: MessageCircleHeart,
    title: "Meet & Connect",
    description:
      "Connect with the pet owner and discuss the adoption details.",
  },
  {
    number: "04",
    icon: HouseHeart,
    title: "Welcome Home",
    description:
      "Complete the process and welcome your new best friend home.",
  },
];

const HowAdoptionWorks = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Simple Process
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            How Adoption Works
          </h2>

          <p className="mt-4 text-gray-600">
            Finding your new companion is easier than you think. Follow
            these simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-100 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-100">
                    <Icon size={23} />
                  </div>

                  <span className="text-3xl font-black text-orange-50">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 font-bold text-gray-950">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowAdoptionWorks;

