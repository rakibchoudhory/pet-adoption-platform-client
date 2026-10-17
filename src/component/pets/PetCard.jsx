"use client";

import Link from "next/link";
import { MapPin, Heart, PawPrint, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function PetCard({ pet }) {
  // console.log("pet" , pet);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const {
    data: session,
    isPending: isSessionPending,
    error: sessionError,
  } = authClient.useSession();

  const user = session?.user;
  // console.log(user, "user");

  const petId = pet._id || pet.id;
  const image = pet.image || pet.imageUrl || "/images/pet-placeholder.png";

  const fee = Number(pet.adoptionFee ?? pet.adoptionFees ?? 0);

  const wishlistData = {
    userId: user?.id,
    petId,
    name: pet.name,
    image,
    location: pet.location,
    adoptionFee: fee,
  };
  useEffect(() => {
    if (isSessionPending || !user?.id || !petId) return;

    const loadWishlist = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

        if (!apiUrl) {
          throw new Error("Server URL is missing");
        }
           const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${apiUrl}/wishlist?userId=${encodeURIComponent(user.id)}`,{
            headers: {
              authorization: `Bearer ${tokenData.token}`
            }
          },
        );

        if (!res.ok) {
          throw new Error("Failed to load wishlist");
        }

        const wishlist = await res.json();

        const exists = wishlist.some(
          (item) => String(item.petId) === String(petId),
        );

        setIsWishlisted(exists);
      } catch (error) {
        console.error("Wishlist loading failed:", error);
      }
    };

    loadWishlist();
  }, [user?.id, isSessionPending, petId]);
  const handleWishlist = async () => {
    if (isWishlistLoading) return;
    if (!petId) {
      toast.error("Pet ID not found");
      return;
    }
    if (isSessionPending) return;

    if (!user?.id) {
      toast.error("Please log in to use wishlist");
      return;
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!apiUrl) {
        toast.error("Server URL is missing");
        return;
      }
      setIsWishlistLoading(true);
      if (isWishlisted) {
        // Heart লাল আছে → DELETE

        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${apiUrl}/wishlist/${encodeURIComponent(petId)}?userId=${encodeURIComponent(user.id)}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to remove from wishlist");
        }

        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        // Heart খালি → POST
             const {data:tokenData} = await authClient.token(); 
        const res = await fetch(`${apiUrl}/wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(wishlistData),
        });

        if (!res.ok) {
          throw new Error("Failed to add to wishlist");
        }

        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Wishlist update failed");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.25)]">
      {/* Pet Image */}
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

        {/* Image Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        {/* Wishlist Button */}
        <button
          type="button"
          disabled={isWishlistLoading || isSessionPending}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          onClick={handleWishlist}
          className={`absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/95 shadow-md transition duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60 ${
            isWishlisted ? "text-red-500" : "text-gray-500 hover:text-red-500"
          }`}
        >
          {isWishlistLoading ? (
            <span className="size-5 animate-spin rounded-full border-2 border-gray-300 border-t-orange-500" />
          ) : (
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          )}
        </button>

        {/* Species Badge */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/95 px-3.5 py-1.5 text-xs font-bold capitalize text-gray-800 shadow-sm backdrop-blur">
          <PawPrint size={14} className="text-orange-500" />
          {pet.species || "Pet"}
        </span>

        {/* Pet Name */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-medium tracking-wide text-white/80">
            Meet your new companion
          </p>

          <h3 className="mt-1 text-2xl font-extrabold text-white drop-shadow-sm">
            {pet.name || "Unnamed Pet"}
          </h3>
        </div>
      </div>

      {/* Pet Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Location */}
          <div className="flex min-w-0 flex-1 items-center gap-1.5 text-sm text-gray-600">
            <MapPin size={17} className="shrink-0 text-orange-500" />

            <span className="truncate">
              {pet.location || "Location not specified"}
            </span>
          </div>

          {/* Adoption Fee */}
          <span className="shrink-0 rounded-full bg-orange-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-orange-900/10">
            {fee === 0 ? "Free Adoption" : `$${fee.toLocaleString()}`}
          </span>
        </div>

        {/* View Details Button */}
        <div className="mt-auto pt-5">
          <Link
            href={petId ? `/pet-details/${petId}` : "/all-pets"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-sm shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-200"
          >
            View Pet Details
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
