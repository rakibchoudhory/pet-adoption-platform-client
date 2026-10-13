
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdoptionForm from "@/component/pets/AdoptionForm";

export const instant = false;

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pet details");
  }

  const pet = await res.json();

  // Get logged-in user
  let user = null;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    user = session?.user ?? null;
  } catch (error) {
    console.error("Session error:", error);
  }

  const {
    location,
    adoptionFee,
    age,
    breed,
    description,
    gender,
    healthStatus,
    image,
    name,
    ownerEmail,
    species,
    vaccinationStatus,
    _id,
  } = pet;

  return (
    <div className="mx-auto w-11/12 px-4 py-10">
      <div className="mb-8">
        <p className="font-semibold uppercase tracking-widest text-orange-500">
          Meet Your New Friend
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
          Pet Details
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Pet Details */}
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src={image}
              alt={name}
              className="h-80 w-full object-cover md:h-[450px]"
            />

            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-orange-500">
                    {species}
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-gray-900">
                    {name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {breed}
                  </p>
                </div>

                <p className="rounded-xl bg-orange-50 px-4 py-3 text-xl font-bold text-orange-600">
                  ${Number(adoptionFee || 0).toFixed(2)}
                </p>
              </div>

              <div className="my-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {age} years
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {gender}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {location}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Health Status</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {healthStatus}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Vaccination</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {vaccinationStatus}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  About {name}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {description}
                </p>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <p className="text-sm text-gray-500">
                  Listed by
                </p>
                <p className="mt-1 font-medium text-gray-800">
                  {ownerEmail || "Pet Owner"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Adoption Form */}
        <div>
          <AdoptionForm
            petId={String(_id)}
            petImage ={image}
            petName={name}
            userName={user?.name || ""}
            userEmail={user?.email || ""}
            userId={user?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;