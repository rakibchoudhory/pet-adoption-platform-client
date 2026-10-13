
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

const DeleteDialog = ({ pet }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${pet._id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Failed to delete pet. Please try again.");
      }
      router.refresh();
      // Handle empty response safely
      const text = await res.text();
      const deletedData = text ? JSON.parse(text) : null;
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="danger"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white py-6  text-sm font-semibold text-orange-700 shadow-sm transition-all duration-200 hover:border-orange-400 hover:text-white hover:bg-red-500  active:scale-[0.98]"
      >
        <Trash2 size={16} />
        Delete Pet
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="w-full max-w-[420px] overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl">
            <AlertDialog.CloseTrigger />

            <div className="h-2 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600" />

            <AlertDialog.Header>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-8 ring-red-50/50">
                <Trash2 size={26} />
              </div>

              <AlertDialog.Heading>
                Delete this pet?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-sm leading-6 text-gray-600">
                Are you sure you want to permanently delete{" "}
                <strong className="font-bold text-gray-900">
                  {pet.name}
                </strong>
                ? This action cannot be undone.
              </p>

              <div className="mt-4 flex gap-3 rounded-xl border border-orange-100 bg-orange-50 p-3">
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0 text-orange-500"
                />
                <p className="text-xs leading-5 text-orange-800">
                  The pet listing will be removed from your listings.
                  Make sure you have selected the correct pet.
                </p>
              </div>

              {error && (
                <p role="alert" className="mt-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
                isDisabled={isDeleting}
                className="rounded-xl"
              >
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                isDisabled={isDeleting}
                variant="danger"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 font-semibold text-white transition hover:bg-red-700"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Pet
                  </>
                )}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteDialog;