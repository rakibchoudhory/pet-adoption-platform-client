
import { LoaderCircle, PawPrint } from "lucide-react";

export default function PetsLoading() {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center gap-4 py-16"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
        <PawPrint size={30} className="text-orange-500" />
        <LoaderCircle
          size={66}
          className="absolute animate-spin text-orange-300"
          strokeWidth={1.5}
        />
      </div>

      <p className="font-semibold text-gray-700">
        Finding your new best friend...
      </p>

      <p className="text-sm text-gray-500">
        Please wait while we load the pets.
      </p>
    </div>
  );
}