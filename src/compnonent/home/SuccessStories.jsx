import Image from "next/image";
import { Quote, Star } from "lucide-react";

const stories = [
  {
    name: "Sarah & Bruno",
    role: "Happy Adoptive Family",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    story:
      "Bruno became part of our family in just a few weeks. He brought so much happiness and energy into our home.",
  },
  {
    name: "James & Luna",
    role: "Happy Pet Parent",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    story:
      "The adoption process was simple and smooth. Luna is now our little sunshine and we cannot imagine life without her.",
  },
  {
    name: "Emma & Milo",
    role: "Happy Pet Parent",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    story:
      "Milo found us at exactly the right time. We are incredibly grateful for the opportunity to give him a loving home.",
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Happy Families
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Success Stories
          </h2>

          <p className="mt-4 text-gray-600">
            Every adoption creates a beautiful story. Here are some of the
            families who found their perfect companions.
          </p>
        </div>

        {/* Stories */}
        <div className="grid gap-6 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.name}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-100 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">

                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-orange-50">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-gray-950">
                    {story.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {story.role}
                  </p>
                </div>

              </div>

              {/* Rating */}
              <div className="mt-5 flex gap-1 text-orange-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mt-5">
                <Quote
                  size={38}
                  className="absolute -top-2 right-0 text-orange-50"
                />

                <p className="relative text-sm leading-7 text-gray-600">
                  “{story.story}”
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;

