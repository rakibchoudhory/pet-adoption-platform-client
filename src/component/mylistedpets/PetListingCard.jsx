import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  MapPin,
  Heart,
  PawPrint,
  CalendarDays,
  Rocket,
} from "lucide-react";
import EditModal from "./EditModal";
import DeleteDialog from "./DeleteDialog";
import { Button, Modal } from "@heroui/react";

const PetListingCard = ({ pet }) => {
  const {
    location,
    adoptionFee,
    age,
    breed,
    description,
    gender,
    image,
    name,
    species,
    _id,
  } = pet;

  return (
    <article className="group animate-[fadeInUp_0.5s_ease-out_both] overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/70">
      {/* Image */}
      <div className="relative h-50 overflow-hidden bg-orange-50">
        <Image
          src={image || "/pet-placeholder.png"}
          alt={name || "Pet"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        <span
          className={
            "absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur bg-purple-100/95 text-purple-700"
          }
        >
          {"Available"}
        </span>

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
          <PawPrint size={17} />
          {species || "Pet"}
        </span>
      </div>

      {/* Details */}
      <div className="p-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-extrabold capitalize text-gray-800 transition-colors group-hover:text-orange-600">
              {name || "Unnamed Pet"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {breed || species || "Breed not specified"}
            </p>
          </div>

          <div className="shrink-0 rounded-xl bg-orange-50 px-3 py-2 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Adoption Fee
            </p>
            <p className="mt-0.5 font-extrabold text-orange-600">
              {Number(adoptionFee) === 0
                ? "Free"
                : `$${Number(adoptionFee || 0).toLocaleString()}`}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className=" grid grid-cols-2 gap-3 border-t border-orange-50 pt-5">
          {/* View + Request */}

          <div className="col-span-2 flex w-full items-stretch gap-3">
            {/* View Button */}
            <Link
              href={`/pet-details/${_id}`}
              className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white  py-3 text-sm font-semibold text-black-600 shadow-sm transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 active:scale-[0.98]"
            >
              <Eye  size={17} />
              <span>View</span>
            </Link>

            {/* Request Modal */}
            <div className=" w-full flex-1">
              <Modal>
                <Button
                  variant="secondary"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white py-6  text-sm font-semibold text-black shadow-sm transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 active:scale-[0.98]"
                >
                  <Heart size={16} />
                  <span>Request</span>
                </Button>

                <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
                  {" "}
                  <Modal.Container>
                    {" "}
                    <Modal.Dialog className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl sm:max-w-[400px]">
                      {" "}
                      <Modal.CloseTrigger />{" "}
                      <Modal.Header className="flex flex-col items-center gap-3 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 px-6 py-8 text-center text-white">
                        <Modal.Icon className="flex size-14 items-center justify-center rounded-2xl bg-white/20 text-white">
                          <PawPrint className="size-7" />{" "}
                        </Modal.Icon>{" "}
                        <Modal.Heading className="text-2xl font-extrabold">
                          {" "}
                          Adoption Request{" "}
                        </Modal.Heading>{" "}
                        <p className="text-sm text-orange-50">
                          {" "}
                          Take the first step toward a loving home{" "}
                        </p>{" "}
                      </Modal.Header>{" "}
                      <Modal.Body className="space-y-4 p-6">
                        {" "}
                        <div className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
                          {" "}
                          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-orange-100">
                            {" "}
                            <Image
                              src={image || "/pet-placeholder.png"}
                              alt={name || "Pet"}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />{" "}
                          </div>{" "}
                          <div className="min-w-0">
                            {" "}
                            <h3 className="truncate text-lg font-extrabold text-gray-800">
                              {" "}
                              {name || "Unnamed Pet"}{" "}
                            </h3>{" "}
                            <p className="mt-1 text-sm text-gray-500">
                              {" "}
                              {breed || species || "Pet"}{" "}
                            </p>{" "}
                            <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                              {" "}
                              <MapPin
                                size={14}
                                className="text-orange-500"
                              />{" "}
                              {location || "Location not specified"}{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                        <p className="text-sm leading-6 text-gray-600">
                          {" "}
                          Are you ready to give{" "}
                          <span className="font-bold text-orange-600">
                            {" "}
                            {name || "this pet"}{" "}
                          </span>{" "}
                          a safe and loving home? Continue to start your
                          adoption journey.{" "}
                        </p>{" "}
                      </Modal.Body>{" "}
                      <Modal.Footer className="flex flex-col gap-3 border-t border-orange-100 p-6">
                        {" "}
                        <Button
                          className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600"
                          slot="close"
                        >
                          {" "}
                          Continue <Rocket size={17} />{" "}
                        </Button>{" "}
                      </Modal.Footer>{" "}
                    </Modal.Dialog>{" "}
                  </Modal.Container>{" "}
                </Modal.Backdrop>
              </Modal>
            </div>
          </div>

          {/* Edit + Delete */}
          <div className=" col-span-2 flex w-full justify-between  gap-3">
            <div className="w-full">
              <EditModal pet={pet} />
            </div>

            <div  className="w-full">
              <DeleteDialog pet={pet} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PetListingCard;
