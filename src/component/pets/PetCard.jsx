
import Link from "next/link";
import {
  MapPin,
  Heart,
  ArrowUpRight,
  CalendarDays,
  VenusAndMars,
  Syringe,
  ShieldCheck,
  PawPrint,
} from "lucide-react";

export default function PetCard({ pet }) {
  const petId = pet._id || pet.id;

  const image =
    pet.image || pet.imageUrl || "/images/pet-placeholder.png";

  const fee = Number(pet.adoptionFee ?? pet.adoptionFees ?? 0);

  const ageLabel =
    pet.age === undefined || pet.age === null || pet.age === ""
      ? "Age unknown"
      : `${pet.age} ${Number(pet.age) === 1 ? "year" : "years"} old`;

  const isVaccinated = String(
    pet.vaccinationStatus || ""
  ).toLowerCase().includes("vaccinated");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.25)]">
      {/* Pet image */}
      <div className="relative overflow-hidden bg-orange-50">
        <Link
          href={petId ? `/all-pets/${petId}` : "/all-pets"}
          aria-label={`View ${pet.name || "pet"} details`}
          className="block"
        >
          <img
            src={image}
            alt={pet.name || "Pet available for adoption"}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src =
                "https://placehold.co/600x400/faf1e8/f97316?text=Pet+Photo";
            }}
            className="h-60 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        {/* Image overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        {/* Species badge */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/95 px-3.5 py-1.5 text-xs font-bold capitalize text-gray-800 shadow-sm backdrop-blur">
          <PawPrint size={14} className="text-orange-500" />
          {pet.species || "Pet"}
        </span>

        {/* Adoption fee */}
        <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-orange-900/10">
          {fee === 0
            ? "Free Adoption"
            : `$${fee.toLocaleString()}`}
        </span>

        {/* Pet name on image bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-medium tracking-wide text-white/80">
            Meet your new companion
          </p>

          <h3 className="mt-1 text-2xl font-extrabold text-white drop-shadow-sm">
            {pet.name || "Unnamed Pet"}
          </h3>
        </div>
      </div>

      {/* Pet information */}
      <div className="flex flex-1 flex-col p-2 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-500">
              {pet.breed || pet.species || "Mixed breed"}
            </p>

            <p className=" line-clamp-2 min-h-10 text-sm leading-5 text-gray-600">
              {pet.description ||
                "A lovely companion waiting for a caring and loving home."}
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
            <Heart size={20} />
          </div>
        </div>

        {/* Quick details */}
        <div className=" grid grid-cols-2 gap-3">
          <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-gray-50  transition-colors group-hover:bg-orange-50/60">
            <CalendarDays
              size={17}
              className="shrink-0 text-orange-500"
            />

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">
                Age
              </p>

              <p className="truncate text-xs font-semibold text-gray-700">
                {ageLabel}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-gray-50 p-3 transition-colors group-hover:bg-orange-50/60">
            <VenusAndMars
              size={17}
              className="shrink-0 text-orange-500"
            />

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">
                Gender
              </p>

              <p className="truncate text-xs font-semibold capitalize text-gray-700">
                {pet.gender || "Unknown"}
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={17} className="shrink-0 text-orange-500" />

          <span className="truncate">
            {pet.location || "Location not specified"}
          </span>
        </div>

        {/* Health badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {pet.healthStatus && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
              <ShieldCheck size={14} className="text-orange-500" />
              {pet.healthStatus}
            </span>
          )}

          {pet.vaccinationStatus && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                isVaccinated
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-orange-100 bg-orange-50 text-orange-700"
              }`}
            >
              <Syringe size={14} />
              {pet.vaccinationStatus}
            </span>
          )}
        </div>

        {/* Bottom action */}
        <div className="mt-auto ">
          <div className="mb-4 border-t border-gray-100" />

          <div className="grid grid-cols-1 gap-3">
            <Link
              href={
                petId ? `/pet-details/${petId}` : "/all-pets"
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-sm shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-200"
            >
              View Pet Details
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}