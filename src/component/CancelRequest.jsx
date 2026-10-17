
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import {
  Ban,
  AlertTriangle,
  Loader2,
  CalendarX,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const CancelRequest = ({ petName, requestId, status }) => {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState("");

  const isFinalStatus = ["Approved", "Rejected"].includes(status);

  const handleCancelRequest = async () => {
    if (isCancelling || isFinalStatus) return;

    setIsCancelling(true);
    setError("");

    try {

      const {data:tokenData} = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests/${requestId}`,{
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenData?.token}`,
    }}
      );

      if (!res.ok) {
        throw new Error("Failed to cancel request. Please try again.");
      }

      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="danger"
        isDisabled={isFinalStatus}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-5.5 font-semibold text-orange-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Ban size={16} />
        Cancel Request
      </Button>

      {!isFinalStatus && (
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="w-full max-w-[420px] overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl">
              <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500" />

              <AlertDialog.CloseTrigger />

              <AlertDialog.Header>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-8 ring-orange-50/50">
                  <CalendarX size={26} />
                </div>

                <AlertDialog.Heading>
                  Cancel Adoption Request?
                </AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                <p className="text-sm leading-6 text-gray-600">
                  Are you sure you want to cancel your adoption request for{" "}
                  <strong className="font-bold text-gray-900">
                    {petName}
                  </strong>
                  ?
                </p>

                <div className="mt-4 flex gap-3 rounded-xl border border-orange-100 bg-orange-50 p-3">
                  <AlertTriangle
                    size={20}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />

                  <p className="text-xs leading-5 text-orange-800">
                    You may need to submit a new request if you change your
                    mind later.
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
                  isDisabled={isCancelling}
                  className="rounded-xl"
                >
                  Keep Request
                </Button>

                <Button
                  onClick={handleCancelRequest}
                  isDisabled={isCancelling}
                  variant="danger"
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 font-semibold text-white transition hover:bg-orange-600"
                >
                  {isCancelling ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <Ban size={16} />
                      Yes, Cancel
                    </>
                  )}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      )}
    </AlertDialog>
  );
};

export default CancelRequest;