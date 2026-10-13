import Link from "next/link";
import { Suspense } from "react";
import { CalendarDays, Eye, PawPrint } from "lucide-react";
import CancelRequest from "@/component/CancelRequest";
import Image from "next/image";
import Loading from "@/component/loading";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const instant = false;

export default function MyRequestsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MyRequestsContent />
    </Suspense>
  );
}

const MyRequestsContent = async () => {
  let RequestedPets = [];

    const session = await auth.api.getSession({
      headers: await headers(),
    });
  const userId = session?.user.id ;
  if (!userId) {
    return <p>Please log in to view your requests.</p>;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests/${userId}`,
      { cache: "no-store" },
    );
    console.log(res);

    if (!res.ok) {
      throw new Error("Failed to fetch requests");
    }

    RequestedPets = await res.json();
    console.log(RequestedPets);

    if (!Array.isArray(RequestedPets)) {
      RequestedPets = [];
    }
  } catch (error) {
    console.error("My Requests Error:", error);
  }
   
return (
  <section className="relative min-h-screen overflow-hidden rounded-3xl bg-orange-50/70 p-4 sm:p-6 lg:p-8">
    {/* Decorative background */}
    <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-200/40 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />

    <div className="relative mx-auto max-w-6xl">
      {/* Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-6 text-white shadow-xl shadow-orange-200/60 sm:p-8">
        <div className="absolute -right-5 -top-8 rotate-12 opacity-15">
          <PawPrint size={170} />
        </div>

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              <PawPrint size={14} />
              PetHaven Dashboard
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              My Adoption Requests
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-orange-50 sm:text-base">
              Keep track of your adoption journey and find your future
              furry friend.
            </p>
          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-2xl border border-white/30 bg-white/15 shadow-lg backdrop-blur-sm sm:self-center">
            <PawPrint size={42} className="animate-pulse" />
          </div>
        </div>

        <div className="relative mt-6 flex items-center gap-3 border-t border-white/25 pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <CalendarDays size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold">Your adoption journey</p>
            <p className="text-xs text-orange-100">
              {RequestedPets.length}{" "}
              {RequestedPets.length === 1 ? "request" : "requests"} submitted
            </p>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {RequestedPets.length === 0 ? (
        <div className="rounded-3xl border border-orange-100 bg-white px-5 py-14 text-center shadow-sm sm:py-20">
          <div className="mx-auto flex h-20 w-20 animate-bounce items-center justify-center rounded-3xl bg-orange-100 text-orange-500">
            <PawPrint size={38} />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            No Requests Yet
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            Your adoption journey starts here. Explore our lovely pets
            and find a new best friend.
          </p>

          <Link
            href="/all-pets"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <PawPrint size={18} />
            Explore Pets
          </Link>
        </div>
      ) : (
        /* Request cards */
        <div className="grid gap-6 md:grid-cols-2">
          {RequestedPets.map((request, index) => (
            <article
              key={request._id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group animate-[fadeInUp_0.5s_ease-out_both] overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/70"
            >
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
                {/* Pet image */}
                <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-2xl bg-orange-50 sm:h-36 sm:w-36">
                  <Image
                    src={request.petImage || "/pet-placeholder.png"}
                    alt={request.petName || "Pet"}
                    fill
                    sizes="(max-width: 640px) 100vw, 144px"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />

                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-orange-600 shadow-sm backdrop-blur">
                    PetHaven
                  </span>
                </div>

                {/* Pet information */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h2 className="text-xl font-extrabold capitalize text-gray-800 transition-colors group-hover:text-orange-600">
                      {request.petName || "Unnamed Pet"}
                    </h2>

                    <span
                      className={'rounded-full px-3 py-1 text-xs font-bold '}
                    >
                      {"Pending"}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <CalendarDays size={17} />
                      </span>

                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Request Date
                        </p>
                        <p className="mt-1 font-semibold text-gray-700">
                          {request.requestDate || request.createdAt
                            ? new Date(
                                request.requestDate || request.createdAt
                              ).toLocaleDateString()
                            : "Not available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <CalendarDays size={17} />
                      </span>

                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Pickup Date
                        </p>
                        <p className="mt-1 font-semibold text-gray-700">
                          {request.pickupDate || "Not set"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card actions */}
              <div className="flex flex-wrap items-center gap-3 border-t border-orange-50 bg-orange-50/50 p-4">
                <Link
                  href={`/pet-details/${request.petId}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-orange-600 hover:shadow-md sm:flex-none"
                >
                  <Eye size={17} />
                  View Pet
                </Link>

                <CancelRequest
                  requestId={request._id}
                  petName={request.petName}
                  status={request.status}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>

  </section>
);
  
};
