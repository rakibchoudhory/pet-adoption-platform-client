
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Heart, MapPin, PawPrint, ArrowUpRight, Loader2 } from "lucide-react";
export default function WishlistPage() {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  const user = session?.user;

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSessionPending) return;

    if (!user?.id) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    const loadWishlist = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

        const res = await fetch(
          `${apiUrl}/wishlist?userId=${encodeURIComponent(user.id)}`
        );

        if (!res.ok) {
          throw new Error("Failed to load wishlist");
        }

        const data = await res.json();
        setWishlist(data);
      } catch (error) {
        console.error("Wishlist error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [user?.id, isSessionPending]);

  if (isSessionPending || loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <Heart className="mx-auto mb-4 text-orange-500" size={42} />
        <h1 className="text-2xl font-bold">Please log in</h1>
        <p className="mt-2 text-gray-500">
          Log in to see your saved pets.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
<main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-white">
  {/* Decorative Background */}
  <div className="pointer-events-none absolute -top-24 right-0 size-80 rounded-full bg-orange-200/20 blur-3xl" />
  <div className="pointer-events-none absolute left-0 top-[420px] size-64 rounded-full bg-rose-100/30 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
    {/* Page Header */}
    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600 shadow-sm">
          <Heart size={15} fill="currentColor" />
          Your Favorites
        </span>

        <h1 className="mt-5 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          My <span className="text-orange-500">Wishlist</span>
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
          Your favorite companions, all in one place. Keep the pets
          you love close to your heart.
        </p>
      </div>

      <Link
        href="/all-pets"
        className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/30"
      >
        <PawPrint size={18} />
        Explore Pets
      </Link>
    </div>

    {/* Wishlist Count */}
    <div className="mb-7 flex items-center justify-between border-b border-gray-100 pb-4">
      <div>
        <h2 className="text-lg font-bold text-gray-800">
          Saved Companions
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Pets you have added to your wishlist
        </p>
      </div>

      <span className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-extrabold text-orange-600">
        {wishlist.length} {wishlist.length === 1 ? "Pet" : "Pets"}
      </span>
    </div>

    {/* Empty State */}
    {wishlist.length === 0 ? (
      <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white px-6 py-16 text-center shadow-sm sm:py-20">
        <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-orange-100/70 blur-2xl" />

        <div className="relative mx-auto flex size-20 items-center justify-center rounded-3xl bg-orange-50 text-orange-500 ring-1 ring-orange-100">
          <Heart size={36} strokeWidth={1.7} />
        </div>

        <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
          Your wishlist is waiting for love!
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          You haven&apos;t saved any pets yet. Explore our adorable
          companions and find a new friend to love.
        </p>

        <Link
          href="/all-pets"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
        >
          <PawPrint size={19} />
          Find Your Companion
        </Link>
      </div>
    ) : (
      /* Pet Cards */
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {wishlist.map((pet, index) => (
          <article
            key={pet._id}
            style={{ animationDelay: `${index * 80}ms` }}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-[0_24px_55px_-20px_rgba(249,115,22,0.25)] motion-safe:animate-[fadeInUp_0.5s_ease-out_both]"
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-orange-50">
              <Link
                href={`/all-pets/${pet.petId}`}
                aria-label={`View ${pet.name || "pet"} details`}
                className="block"
              >
                <img
                  src={pet.image || "/images/pet-placeholder.png"}
                  alt={pet.name || "Saved pet"}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      "https://placehold.co/600x400/faf1e8/f97316?text=Pet+Photo";
                  }}
                  className="h-60 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </Link>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-xs font-bold capitalize text-gray-800 shadow-sm backdrop-blur">
                <PawPrint size={14} className="text-orange-500" />
                Saved Pet
              </span>

              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="text-xs font-medium text-white/80">
                  Your future companion
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-white drop-shadow-md">
                  {pet.name || "Unnamed Pet"}
                </h3>
              </div>
            </div>

            {/* Pet Details */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={17} className="shrink-0 text-orange-500" />
                <span className="truncate">
                  {pet.location || "Location not provided"}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Adoption Fee
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-orange-600">
                    {Number(pet.adoptionFee || 0) === 0
                      ? "Free"
                      : `৳${Number(pet.adoptionFee).toLocaleString()}`}
                  </p>
                </div>

                <Link
                  href={`/pet-details/${pet.petId}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-600 transition-all duration-300 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-orange-100"
                >
                  View Details
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    )}
  </div>
</main>


  );
}

