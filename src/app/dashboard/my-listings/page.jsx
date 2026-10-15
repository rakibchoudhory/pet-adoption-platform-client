import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { PawPrint, Heart, CheckCircle2, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import PetListingCard from "@/component/mylistedpets/PetListingCard";
import Loading from "@/component/loading";

export default function MyListingsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MyListingsContent />
    </Suspense>
  );
}

async function MyListingsContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="m-4 rounded-2xl border border-orange-100 bg-white p-10 text-center shadow-sm">
        <PawPrint className="mx-auto h-12 w-12 text-orange-500" />
        <h2 className="mt-4 text-xl font-bold text-gray-800">
          Please log in first
        </h2>
        <Link
          href="/login"
          className="mt-5 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Login Now
        </Link>
      </div>
    );
  }

  let listingPets = [];
  let hasError = false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/user/${session?.user?.id}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch pet listings");
    }

    const data = await res.json();
    listingPets = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("My Listings Error:", error);
    hasError = true;
  }
   const availableCount = listingPets.filter(
    (pet) => !pet.status || pet.status === "Available"
  ).length;

  const adoptedCount = listingPets.filter(
    (pet) => pet.status === "Adopted"
  ).length;

  return (
    <section className="relative min-h-screen overflow-hidden rounded-3xl bg-orange-50/70 p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-6 text-white shadow-xl shadow-orange-200/60 sm:p-9">
          <div className="absolute -right-5 -top-7 rotate-12 opacity-15">
            <PawPrint size={190} />
          </div>

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                <Heart size={14} />
                PetHaven Dashboard
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                My Listings
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-orange-50 sm:text-base">
                Manage your pet listings and help every furry friend find a
                loving home.
              </p>
            </div>

            <Link
              href="/dashboard/add-pet"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 font-bold text-orange-600 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-50 sm:self-center"
            >
              <Plus size={19} />
              Add New Pet
            </Link>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-4">
          <div className="group rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Listings
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-800">
                  {listingPets.length}
                </h2>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:rotate-6">
                <PawPrint size={27} />
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400">All pets added by you</p>
          </div>

          <div className="group rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Available</p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-800">
                  {availableCount}
                </h2>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition group-hover:rotate-6">
                <CheckCircle2 size={27} />
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              Waiting for a loving home
            </p>
          </div>

          <div className="group rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Adopted</p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-800">
                  {adoptedCount}
                </h2>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition group-hover:rotate-6">
                <Heart size={27} />
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400">Pets who found a home</p>
          </div>
        </div>

        {/* Listings heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800 sm:text-2xl">
              Your Pets
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your pet information and listings.
            </p>
          </div>

          <span className="rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-orange-600">
            {listingPets.length} {listingPets.length === 1 ? "Pet" : "Pets"}
          </span>
        </div>

        {/* Error state */}
        {hasError ? (
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
            <p className="font-semibold text-red-600">
              Could not load your listings.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Please check your connection and try again.
            </p>
          </div>
        ) : listingPets.length === 0 ? (
          /* Empty state */
          <div className="rounded-3xl border border-orange-100 bg-white px-5 py-14 text-center shadow-sm sm:py-20">
            <div className="mx-auto flex h-20 w-20 animate-bounce items-center justify-center rounded-3xl bg-orange-100 text-orange-500">
              <PawPrint size={38} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-800">
              No Pets Listed Yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              Your listings will appear here. Add your first pet and help them
              find their forever home.
            </p>

            <Link
              href="/dashboard/add-pet"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Plus size={18} />
              Add Your First Pet
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listingPets.map((pet) => (
              <PetListingCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
