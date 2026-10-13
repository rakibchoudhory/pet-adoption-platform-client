
import { Heart, PawPrint } from "lucide-react";

export default function AllPetsHero() {
  return (
    <section className="relative overflow-hidden bg-orange-50">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600">
            <PawPrint size={17} />
            Find Your New Best Friend
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Give a Pet a Home,
            <span className="block text-orange-500">
              Get Love Forever.
            </span>
          </h1>

          <p className="mt-5 max-w-xl leading-7 text-gray-600">
            Meet adorable pets waiting for a loving family.
            Explore their stories and find the companion
            who is right for you.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Heart size={18} className="text-orange-500" />
            Every pet deserves a safe and loving home.
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-orange-200/50 blur-xl" />

          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1000&q=85"
            alt="A happy dog waiting for a loving home"
            className="relative h-72 w-full rounded-3xl object-cover shadow-xl sm:h-96"
          />
        </div>
      </div>
    </section>
  );
}