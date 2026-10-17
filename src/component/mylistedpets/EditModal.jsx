
"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { toast } from "react-toastify";
import {
  PawPrint,
  Save,
  LoaderCircle,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const EditModal = ({ pet }) => {
  const router = useRouter();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(pet.image || "");

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100";

  const labelClass =
    "mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500";

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (isUpdating) return;

    const formData = new FormData(e.currentTarget);
    const updatedPet = Object.fromEntries(formData.entries());

    updatedPet.adoptionFee = Number(updatedPet.adoptionFee);
    updatedPet.age = Number(updatedPet.age);

    try {
      setIsUpdating(true);

      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      if (!apiUrl) {
        throw new Error("Server URL is missing.");
      }

      const {data:tokenData} = await authClient.token(); 

      const res = await fetch(
        `${apiUrl}/pets/update-pet/${pet._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
             authorization: `Bearer ${tokenData.token}`
          },
          body: JSON.stringify(updatedPet),
        }
      );

      const responseText = await res.text();
      let data = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { message: responseText };
      }

      if (!res.ok) {
        throw new Error(
          data.message || `Update failed (${res.status})`
        );
      }

      // Show success message
      toast.success(data.message || "Pet updated successfully!");

      // Close the modal
      setIsOpen(false);

      // Refresh Next.js route data
      router.refresh();
    } catch (error) {
      console.error("Update pet error:", error);
      toast.error(error.message || "Unable to update pet.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <Button
        variant="secondary"
        onPress={() => setIsOpen(true)}
        className="inline-flex w-full min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white py-6 text-sm font-semibold text-black shadow-sm transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 active:scale-[0.98]"
      >
        Edit
      </Button>

      <Modal.Backdrop className="bg-gray-950/50 p-3 backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="max-h-[92dvh] w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl sm:max-w-[680px]">
            <Modal.CloseTrigger />

            <Modal.Header className="border-b border-orange-100 bg-white px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <PawPrint size={23} />
                </div>

                <div>
                  <Modal.Heading className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
                    Edit Pet Details
                  </Modal.Heading>

                  <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                    Keep your pet's information up to date.
                  </p>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="overflow-y-auto p-0">
              <form
                id={`edit-pet-${pet._id}`}
                onSubmit={handleUpdate}
                className="space-y-5 p-5 sm:p-7"
              >
                {/* Pet Preview */}
                <div className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-orange-50/60 p-3">
                  <div className="flex size-[76px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-orange-100 bg-white">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={pet.name || "Pet preview"}
                        className="size-full object-cover"
                      />
                    ) : (
                      <ImageIcon
                        size={27}
                        className="text-orange-300"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-orange-600">
                      CURRENT LISTING
                    </p>

                    <h3 className="mt-1 truncate font-bold text-gray-900">
                      {pet.name || "Unnamed Pet"}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 truncate text-xs text-gray-500">
                      <MapPin size={13} className="shrink-0" />
                      {pet.location || "Location not specified"}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-orange-600 ring-1 ring-orange-100">
                    Edit
                  </span>
                </div>

                {/* Pet Fields */}
                <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Pet Name *
                    </label>
                    <input
                      name="name"
                      defaultValue={pet.name}
                      required
                      className={inputClass}
                      placeholder="e.g. Max"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Species *
                    </label>
                    <select
                      name="species"
                      defaultValue={pet.species}
                      required
                      className={inputClass}
                    >
                      {["Dog", "Cat", "Bird", "Rabbit", "Other"].map(
                        (item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Breed</label>
                    <input
                      name="breed"
                      defaultValue={pet.breed}
                      className={inputClass}
                      placeholder="e.g. Golden Retriever"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Age (years) *
                    </label>
                    <input
                      name="age"
                      type="number"
                      min="0"
                      defaultValue={pet.age}
                      required
                      className={inputClass}
                      placeholder="Enter age"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Gender *</label>
                    <select
                      name="gender"
                      defaultValue={pet.gender}
                      required
                      className={inputClass}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Location *
                    </label>
                    <input
                      name="location"
                      defaultValue={pet.location}
                      required
                      className={inputClass}
                      placeholder="City or area"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Adoption Fee ($) *
                    </label>
                    <input
                      name="adoptionFee"
                      type="number"
                      min="0"
                      defaultValue={pet.adoptionFee}
                      required
                      className={inputClass}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Health Status *
                    </label>
                    <input
                      name="healthStatus"
                      defaultValue={pet.healthStatus}
                      required
                      className={inputClass}
                      placeholder="e.g. Healthy"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Pet Image URL *
                    </label>
                    <input
                      name="image"
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                      className={inputClass}
                      placeholder="https://example.com/pet.jpg"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Vaccination Status *
                    </label>
                    <select
                      name="vaccinationStatus"
                      defaultValue={pet.vaccinationStatus}
                      required
                      className={inputClass}
                    >
                      <option value="Vaccinated">
                        Vaccinated
                      </option>
                      <option value="Not Vaccinated">
                        Not Vaccinated
                      </option>
                      <option value="Partially Vaccinated">
                        Partially Vaccinated
                      </option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Description *
                    </label>
                    <textarea
                      name="description"
                      defaultValue={pet.description}
                      required
                      rows={3}
                      className={`${inputClass} resize-y`}
                      placeholder="Tell adopters about this pet..."
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-400">
                  * Required fields
                </p>
              </form>
            </Modal.Body>

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
              <Button
                type="button"
                variant="secondary"
                onPress={() => setIsOpen(false)}
                isDisabled={isUpdating}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form={`edit-pet-${pet._id}`}
                isDisabled={isUpdating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-100 transition hover:bg-orange-600 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
              >
                {isUpdating ? (
                  <>
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditModal;