
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, PawPrint } from "lucide-react";

const BannarSection = () => {
  return (
    <section className="relative overflow-hidden bg-orange-50">
      {/* Decorative Background */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">

        {/* Left Content */}
        <div className="relative z-10">

          {/* Small Badge */}
          <div className="mb-5 inline-flex animate-[fadeIn_0.8s_ease-out] items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
            <PawPrint className="h-4 w-4" />
            Find Your New Best Friend
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl animate-[fadeInUp_0.8s_ease-out] text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Give a Loving Pet
            <span className="block text-orange-500">
              a Forever Home
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl animate-[fadeInUp_1s_ease-out] text-base leading-7 text-gray-600 sm:text-lg">
            Every pet deserves a loving family. Discover adorable pets
            waiting for a second chance and give them the happy home
            they deserve.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 animate-[fadeInUp_1.2s_ease-out] sm:flex-row">

            <Link
              href="/all-pets"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
            >
              <Heart className="h-5 w-5 transition group-hover:scale-110" />

              Adopt Now

              <ArrowRight className="h-5 w-5 transition duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/all-pets"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:text-orange-500"
            >
              Explore Pets
            </Link>

          </div>

          {/* Small Stats */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-orange-200 pt-6">

            <div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-500">Pets Adopted</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">1,200+</p>
              <p className="text-sm text-gray-500">Happy Families</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-500">Love & Care</p>
            </div>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">

          {/* Floating Heart */}
          <div className="absolute left-0 top-10 z-20 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-white text-red-500 shadow-lg">
            <Heart className="h-6 w-6 fill-current" />
          </div>

          {/* Image Container */}
          <div className="relative animate-[float_5s_ease-in-out_infinite]">

            <div className="absolute inset-4 rounded-[3rem] bg-orange-300/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1552053831-71594a27632d"
                alt="Happy dog waiting for adoption"
                width={700}
                height={700}
                priority
                className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[500px]"
              />
            </div>

          </div>

          {/* Floating Info Card */}
          <div className="absolute bottom-5 right-2 z-20 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:bottom-8 sm:right-5">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100">
                <PawPrint className="h-5 w-5 text-orange-500" />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Waiting for you
                </p>

                <p className="text-xs text-gray-500">
                  Find your perfect companion
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Shape */}
      <div className="absolute bottom-0 left-0 h-8 w-full rounded-t-[50%] bg-white" />
    </section>
  );
};

export default BannarSection;

