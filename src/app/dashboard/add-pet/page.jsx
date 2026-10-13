"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PawPrint,
  Dog,
  Image as ImageIcon,
  MapPin,
  HeartPulse,
  Syringe,
  UserRound,
  FileText,
  DollarSign,
  CalendarDays,
  VenusAndMars,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Loading from "@/component/loading";

export default function AddPetPage() {
  return (
    <Suspense fallback={<Loading/>}>
      <AddPetPageContent />
    </Suspense>
  );
}

const initialFormData = {
  name: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  image: "",
  healthStatus: "Healthy",
  vaccinationStatus: "Vaccinated",
  location: "",
  adoptionFee: "0",
  description: "",
};

const AddPetPageContent = () => {
  const router = useRouter();

  const {
    data: session,
    isPending: isSessionPending,
    error: sessionError,
  } = authClient.useSession();

  const user = session?.user;

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSessionPending) {
      toast.error("Please wait while we verify your session.");
      return;
    }

    if (sessionError) {
      toast.error("Unable to verify your session. Please try again.");
      return;
    }

    if (!user?.email) {
      toast.error("Please log in before adding a pet.");
      router.push("/login");
      return;
    }

    const requiredFields = [
      ["name", "Pet name"],
      ["species", "Species"],
      ["breed", "Breed"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["image", "Image URL"],
      ["healthStatus", "Health status"],
      ["vaccinationStatus", "Vaccination status"],
      ["location", "Location"],
      ["adoptionFee", "Adoption fee"],
      ["description", "Description"],
    ];

    for (const [field, label] of requiredFields) {
      if (!String(formData[field]).trim()) {
        toast.error(`${label} is required.`);
        return;
      }
    }

    const age = Number(formData.age);
    const adoptionFee = Number(formData.adoptionFee);

    if (!Number.isFinite(age) || age < 0 || age > 100) {
      toast.error("Please enter a valid pet age.");
      return;
    }

    if (!Number.isFinite(adoptionFee) || adoptionFee < 0) {
      toast.error("Adoption fee cannot be negative.");
      return;
    }

    try {
      new URL(formData.image);
    } catch {
      toast.error("Please enter a valid image URL.");
      return;
    }

    const petData = {
      name: formData.name.trim(),
      species: formData.species,
      breed: formData.breed.trim(),
      age,
      gender: formData.gender,
      image: formData.image.trim(),
      healthStatus: formData.healthStatus,
      vaccinationStatus: formData.vaccinationStatus,
      location: formData.location.trim(),
      adoptionFee,
      description: formData.description.trim(),
      ownerEmail: user.email,
      ownerId : user.id,
    };

    try {
      setIsSubmitting(true);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to add pet. Please try again.",
        );
      }

      toast.success("Pet added successfully!");

      setFormData(initialFormData);

      router.push("/dashboard/my-listings");
      router.refresh();
    } catch (error) {
      console.error("Add pet error:", error);

      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };



  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  if (isSessionPending) {
    return (
      <Loading/>
    );
  }

  if (sessionError) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="font-semibold text-red-600">
          Unable to verify your session.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Please reload the page and try again.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
          <PawPrint size={30} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Login Required
        </h1>

        <p className="mt-2 text-gray-500">
          Please log in to add a pet to PetHaven.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-orange-50/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-500"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <PawPrint size={27} />
            </div>

            <div>
              <p className="text-sm font-semibold text-orange-500">
                Help a pet find a home
              </p>

              <h1 className="text-2xl font-extrabold text-gray-950 sm:text-3xl">
                Add a New Pet
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Share a few details about the pet and help them find a caring
            family. Please provide accurate information.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl shadow-orange-100/40"
        >
          {/* Form Heading */}
          <div className="border-b border-gray-100 bg-white px-5 py-5 sm:px-8">
            <h2 className="text-lg font-bold text-gray-900">Pet Information</h2>

            <p className="mt-1 text-sm text-gray-500">
              Fields marked with * are required.
            </p>
          </div>

          <div className="space-y-8 p-5 sm:p-8">
            {/* Basic Information */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <Dog className="text-orange-500" size={21} />
                <h3 className="font-bold text-gray-900">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Pet Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Pet Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Max"
                    maxLength={100}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Species */}
                <div>
                  <label htmlFor="species" className={labelClass}>
                    Species *
                  </label>

                  <select
                    id="species"
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Fish">Fish</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Breed */}
                <div>
                  <label htmlFor="breed" className={labelClass}>
                    Breed *
                  </label>

                  <input
                    id="breed"
                    name="breed"
                    type="text"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="e.g. Golden Retriever"
                    maxLength={100}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={16} className="text-orange-500" />
                      Age (years) *
                    </span>
                  </label>

                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <VenusAndMars size={17} className="text-orange-500" />
                      Gender *
                    </span>
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={17} className="text-orange-500" />
                      Location *
                    </span>
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Dhaka, Bangladesh"
                    maxLength={200}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="border-t border-gray-100 pt-7">
              <div className="mb-5 flex items-center gap-2">
                <ImageIcon className="text-orange-500" size={21} />
                <h3 className="font-bold text-gray-900">Pet Image</h3>
              </div>

              <label htmlFor="image" className={labelClass}>
                Image URL *
              </label>

              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://i.ibb.co/..."
                maxLength={2000}
                required
                className={inputClass}
              />

              <p className="mt-2 text-xs leading-5 text-gray-400">
                Upload the image to ImgBB or Postimages, then paste the direct
                image URL here.
              </p>

              {formData.image && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-orange-100 bg-orange-50 p-3">
                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Image URL Preview
                  </p>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.image}
                    alt="Pet preview"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                    className="max-h-64 w-full rounded-xl object-contain"
                  />
                </div>
              )}
            </div>

            {/* Health Information */}
            <div className="border-t border-gray-100 pt-7">
              <div className="mb-5 flex items-center gap-2">
                <HeartPulse className="text-orange-500" size={21} />
                <h3 className="font-bold text-gray-900">Health Information</h3>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Health Status */}
                <div>
                  <label htmlFor="healthStatus" className={labelClass}>
                    Health Status *
                  </label>

                  <select
                    id="healthStatus"
                    name="healthStatus"
                    value={formData.healthStatus}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="Healthy">Healthy</option>
                    <option value="Under Treatment">Under Treatment</option>
                    <option value="Special Care Required">
                      Special Care Required
                    </option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                {/* Vaccination Status */}
                <div>
                  <label htmlFor="vaccinationStatus" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <Syringe size={17} className="text-orange-500" />
                      Vaccination Status *
                    </span>
                  </label>

                  <select
                    id="vaccinationStatus"
                    name="vaccinationStatus"
                    value={formData.vaccinationStatus}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="Vaccinated">Vaccinated</option>
                    <option value="Partially Vaccinated">
                      Partially Vaccinated
                    </option>
                    <option value="Not Vaccinated">Not Vaccinated</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Adoption Details */}
            <div className="border-t border-gray-100 pt-7">
              <div className="mb-5 flex items-center gap-2">
                <DollarSign className="text-orange-500" size={21} />
                <h3 className="font-bold text-gray-900">Adoption Details</h3>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Adoption Fee */}
                <div>
                  <label htmlFor="adoptionFee" className={labelClass}>
                    Adoption Fee (USD) *
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-400">
                      $
                    </span>

                    <input
                      id="adoptionFee"
                      name="adoptionFee"
                      type="number"
                      value={formData.adoptionFee}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="1"
                      required
                      className={`${inputClass} pl-9`}
                    />
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Enter 0 if adoption is free.
                  </p>
                </div>

                {/* Owner Email */}
                <div>
                  <label htmlFor="ownerEmail" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <UserRound size={17} className="text-orange-500" />
                      Owner Email
                    </span>
                  </label>

                  <input
                    id="ownerEmail"
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className={`${inputClass} cursor-not-allowed bg-gray-100 text-gray-500`}
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Automatically filled from your account.
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-7">
              <div className="mb-5 flex items-center gap-2">
                <FileText className="text-orange-500" size={21} />
                <h3 className="font-bold text-gray-900">About This Pet</h3>
              </div>

              <label htmlFor="description" className={labelClass}>
                Description *
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the pet's personality, habits, needs, and ideal home..."
                rows={5}
                maxLength={3000}
                required
                className={`${inputClass} resize-y`}
              />

              <p className="mt-2 text-right text-xs text-gray-400">
                {formData.description.length}/3000 characters
              </p>
            </div>
          </div>

          {/* Submit Area */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <Link
              href="/dashboard/my-listings"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Adding Pet...
                </>
              ) : (
                <>
                  <CheckCircle2 size={19} />
                  Add Pet
                </>
              )}
            </button>
          </div>
        </form>

        {/* Bottom Note */}
        <p className="mt-5 text-center text-xs leading-5 text-gray-400">
          Please ensure all pet information is accurate before publishing your
          listing.
        </p>
      </div>
    </section>
  );
};


