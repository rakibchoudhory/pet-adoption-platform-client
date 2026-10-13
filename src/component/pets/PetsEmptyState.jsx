
import { PawPrint, RotateCcw } from "lucide-react";

export default function PetsEmptyState({ onReset }) {
  return (
    <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/50 px-5 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
        <PawPrint size={30} className="text-orange-500" />
      </div>

      <h3 className="mt-5 text-xl font-bold text-gray-900">
        No pets found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
        We couldn&apos;t find any pets matching your search.
        Try another name, location, or species.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        <RotateCcw size={17} />
        Reset Filters
      </button>
    </div>
  );
}