
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import PetFilters from "@/component/pets/PetFilters";
import PetList from "@/component/pets/PetList";
import PetsLoading from "@/component/pets/PetsLoading";
import PetsEmptyState from "@/component/pets/PetsEmptyState";

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all pets
  const fetchPets = useCallback(async (signal) => {
    setIsLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      if (!apiUrl) {
        throw new Error(
          "API URL is missing. Check your .env.local file."
        );
      }

      const response = await fetch(`${apiUrl}/pets`, {
        method: "GET",
        signal,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load pets. Server returned ${response.status}.`
        );
      }

      const data = await response.json();
      const petList = Array.isArray(data) ? data : data.pets;

      if (!Array.isArray(petList)) {
        throw new Error("The server returned an invalid pet list.");
      }

      setPets(petList);
    } catch (err) {
      if (err.name === "AbortError") return;

      console.error("Fetch pets error:", err);
      setError(err.message || "Unable to load pets.");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  // Initial data loading
  useEffect(() => {
    const controller = new AbortController();

    fetchPets(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchPets]);

  // Search and filter pets
  const filteredPets = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return pets.filter((pet) => {
      const status = String(
        pet.status || "available"
      ).toLowerCase();

      const isAvailable =
        status === "available" && pet.isAdopted !== true;

      const matchesSpecies =
        species === "All" ||
        String(pet.species || "").toLowerCase() ===
          species.toLowerCase();

      const matchesSearch = [
        pet.name,
        pet.species,
        pet.breed,
        pet.location,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchText)
      );

      return isAvailable && matchesSpecies && matchesSearch;
    });
  }, [pets, search, species]);

  // Sort filtered pets
  const sortedPets = useMemo(() => {
    const sorted = [...filteredPets];

    switch (sortBy) {
      case "oldest":
        return sorted.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
        );

      case "name-asc":
        return sorted.sort((a, b) =>
          String(a.name || "").localeCompare(
            String(b.name || "")
          )
        );

      case "name-desc":
        return sorted.sort((a, b) =>
          String(b.name || "").localeCompare(
            String(a.name || "")
          )
        );

      case "fee-asc":
        return sorted.sort(
          (a, b) =>
            Number(a.adoptionFee || 0) -
            Number(b.adoptionFee || 0)
        );

      case "fee-desc":
        return sorted.sort(
          (a, b) =>
            Number(b.adoptionFee || 0) -
            Number(a.adoptionFee || 0)
        );

      case "newest":
      default:
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
    }
  }, [filteredPets, sortBy]);

  // Reset search and species filter
  const resetFilters = () => {
    setSearch("");
    setSpecies("All");
  };

  // Retry fetching pets
  const handleRetry = () => {
    fetchPets();
  };

  return (
    <main className="min-h-screen bg-white pb-16">
      <PetFilters
        search={search}
        setSearch={setSearch}
        species={species}
        setSpecies={setSpecies}
        totalPets={isLoading ? pets.length : filteredPets.length}
      />

      <section className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        {!isLoading && !error && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredPets.length}
              </span>{" "}
              pets
            </p>

            <div className="flex items-center gap-2">
              <label
                htmlFor="pet-sort"
                className="text-sm font-medium text-gray-600"
              >
                Sort by:
              </label>

              <select
                id="pet-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="max-w-[210px] rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
                <option value="fee-asc">Fee: Low to High</option>
                <option value="fee-desc">Fee: High to Low</option>
              </select>
            </div>
          </div>
        )}

        {isLoading ? (
          <PetsLoading />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-12 text-center">
            <AlertCircle
              size={40}
              className="mx-auto text-red-500"
            />

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              Unable to load pets
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm text-gray-600">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        ) : sortedPets.length > 0 ? (
          <PetList pets={sortedPets} />
        ) : (
          <PetsEmptyState onReset={resetFilters} />
        )}
      </section>
    </main>
  );
}

