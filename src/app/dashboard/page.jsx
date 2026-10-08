
import Link from "next/link";
import {
  ClipboardList,
  PlusCircle,
  PawPrint,
  ArrowRight,
} from "lucide-react";

const dashboardCards = [
  {
    title: "My Requests",
    description:
      "View and manage all the pet adoption requests you have submitted.",
    href: "/dashboard/my-requests",
    icon: ClipboardList,
  },
  {
    title: "Add Pet",
    description:
      "Add a new pet to your listing and help them find a loving home.",
    href: "/dashboard/add-pet",
    icon: PlusCircle,
  },
  {
    title: "My Listings",
    description:
      "Manage your pets, view adoption requests and update your listings.",
    href: "/dashboard/my-listings",
    icon: PawPrint,
  },
];

const DashboardPage = () => {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
          PetHaven Dashboard
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          Welcome to your Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Manage your adoption requests, add new pets and keep track of
          your pet listings from one place.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <Icon
                  size={27}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <h2 className="text-xl font-bold text-gray-950">
                {card.title}
              </h2>

              <p className="mt-2 min-h-14 text-sm leading-6 text-gray-500">
                {card.description}
              </p>

              {/* Open Button */}
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-orange-500">
                Open

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-orange-500 p-6 text-white shadow-2xl sm:p-8">

        {/* Decorative Circle */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Every pet deserves a loving home 🐾
          </h2>

          <p className="mt-3 text-sm leading-6 text-orange-50 sm:text-base">
            Manage your pets and adoption requests easily through your
            dashboard and help more pets find their forever families.
          </p>

          <Link
            href="/all-pets"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-orange-500 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Explore Pets
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;

