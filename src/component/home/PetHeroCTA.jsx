
import Link from "next/link";
import { ArrowRight, Heart, PawPrint } from "lucide-react";

const PetHeroCTA = () => {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-orange-500 px-6 py-14 text-center shadow-2xl sm:px-10 lg:px-16">

        {/* Decorative Circles */}
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

        <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/10" />

        {/* Content */}
        <div className="relative mx-auto max-w-3xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
            <Heart size={28} fill="currentColor" />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Be the Reason a Pet Smiles Today
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
            Whether you are looking for a new companion or want to help a
            pet find a loving family, your journey starts here.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/all-pets"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-orange-500 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <PawPrint size={18} />
              Find a Pet
            </Link>

            <Link
              href="/dashboard/add-pet"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              Add Your Pet
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PetHeroCTA;

