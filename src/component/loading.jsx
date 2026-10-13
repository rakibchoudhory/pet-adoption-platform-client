
import { PawPrint, Heart } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4">

      {/* Animated background circles */}
      <div className="absolute left-10 top-16 h-32 w-32 animate-pulse rounded-full bg-orange-200/30 blur-2xl" />

      <div className="absolute bottom-16 right-10 h-40 w-40 animate-pulse rounded-full bg-amber-200/40 blur-3xl [animation-delay:700ms]" />

      {/* Main loader */}
      <div className="relative flex flex-col items-center">

        {/* Paw animation */}
        <div className="relative mb-1 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl shadow-orange-200/70 animate-bounce [animation-duration:1.8s]">

          <PawPrint
            size={48}
            strokeWidth={1.8}
            className="text-white"
          />

          {/* Floating heart */}
          <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-400 shadow-md">
            <Heart
              size={18}
              fill="white"
              className="text-white"
            />
          </div>
        </div>

        {/* Brand */}
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Pet<span className="text-orange-500">Haven</span>
        </h2>

        <p className="mt-3 text-center text-sm font-medium text-gray-500 sm:text-base">
          Finding happiness, one paw at a time.
        </p>

        {/* Loading dots */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-500 [animation-delay:0ms]" />

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-400 [animation-delay:150ms]" />

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-amber-400 [animation-delay:300ms]" />
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Loading your experience
        </p>

        {/* Progress indicator */}
        <div className="mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-orange-100">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-orange-400 to-amber-400" />
        </div>
      </div>
    </div>
  );
}

