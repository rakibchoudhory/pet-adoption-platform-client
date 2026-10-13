
import PetCard from "../pets/PetCard";
import FeaturedPetsAnimation from "@/component/FeaturedPetsAnimation"


const FeaturedPetsPage = async () => {
  let pets = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    if (!apiUrl) {
      throw new Error("API URL is missing. Check your .env.local file.");
    }

    const response = await fetch(`${apiUrl}/pets`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to load pets: ${response.status}`);
    }

    const data = await response.json();

    pets = data
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 6);
  } catch (err) {
    console.error("Fetch pets error:", err);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-white py-5 sm:py-20">
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-orange-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeaturedPetsAnimation>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              FIND YOUR NEW BEST FRIEND
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Meet Our{" "}
              <span className="text-orange-500">Lovely Pets</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Every pet deserves a loving home. Find your perfect companion
              and make a little life a lot happier.
            </p>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-orange-500" />
          </div>
        </FeaturedPetsAnimation>

        {pets.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet, index) => (
              <FeaturedPetsAnimation key={pet._id} delay={index * 0.1}>
                <div className="h-full rounded-2xl transition-shadow duration-300 hover:shadow-xl hover:shadow-orange-100/70">
                  <PetCard pet={pet} />
                </div>
              </FeaturedPetsAnimation>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-orange-200 bg-white/80 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-gray-800">
              No pets available right now
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Please check back soon to meet our lovely pets.
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="/all-pets"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30"
          >
            Explore All Pets
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPetsPage;