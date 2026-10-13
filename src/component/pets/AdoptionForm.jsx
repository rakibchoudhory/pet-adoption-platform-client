
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AdoptionForm = ({
  petId,
  petName,
  userName,
  userEmail,
  userId,
  petImage,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (isSubmitting) return;

    if (!userEmail) {
      toast.error("Please login before adopting a pet.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData(e.currentTarget);
      const adoption = Object.fromEntries(formData.entries());
        adoption.petImage = petImage;
        adoption.userId = userId;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests`,  
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adoption),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to submit adoption request."
        );
      }

      toast.success("Adoption request submitted successfully!");

       form.reset();

      router.push("/dashboard/my-requests");
      router.refresh();
    } catch (error) {
      console.error("Adoption request error:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
        Make It Official
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">
        Adopt This Pet
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        Fill out the form to send your adoption request.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <input type="hidden" name="petId" value={petId} />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Pet Name
          </label>

          <input
            type="text"
            name="petName"
            value={petName}
            readOnly
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your Name
          </label>

          <input
            type="text"
            name="userName"
            value={userName}
            readOnly
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your Email
          </label>

          <input
            type="email"
            name="userEmail"
            value={userEmail}
            readOnly
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Pickup Date
          </label>

          <input
            type="date"
            name="pickupDate"
            min={new Date().toLocaleDateString("en-CA")}
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Message
          </label>

          <textarea
            name="message"
            rows={4}
            placeholder="Tell us why you want to adopt this pet..."
            required
            className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !userEmail}
          className="w-full rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Adopt Now"}
        </button>

        {!userEmail && (
          <p className="text-sm text-red-500">
            Please login to submit an adoption request.
          </p>
        )}
      </form>
    </div>
  );
};

export default AdoptionForm;