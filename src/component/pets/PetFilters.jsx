
import { Search, SlidersHorizontal } from "lucide-react";

const speciesOptions = [
  "All",
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Other",
];

export default function PetFilters({
  search,
  setSearch,
  species,
  setSpecies,
  totalPets,
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Find Your Companion
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Explore Available Pets
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {totalPets} {totalPets === 1 ? "pet" : "pets"} found
          </p>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, breed, or location..."
            aria-label="Search pets"
            className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-gray-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={species}
            onChange={(event) => setSpecies(event.target.value)}
            aria-label="Filter by species"
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          >
            {speciesOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "All Species" : option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}