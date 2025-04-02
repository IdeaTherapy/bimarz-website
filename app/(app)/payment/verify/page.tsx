"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyZarinpalPayment } from "../../utils/zarinpal";
import { Suspense } from "react";
import { toast } from "sonner";

function PaymentVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const authority = searchParams.get("Authority");
        const status = searchParams.get("Status");

        if (!authority || status !== "OK") {
          toast.error("پرداخت با موفقیت انجام نشد.");
          setVerifying(false);
          setTimeout(() => {
            router.push("/");
          }, 2000);
          return;
        }

        // Get amount from localStorage or sessionStorage, otherwise use a default value
        // This should be replaced with your actual amount retrieval logic
        const amount = parseInt(
          localStorage.getItem("paymentAmount") || "1000"
        );

        const data = await verifyZarinpalPayment({
          authority,
          amount,
        });

        if (data?.code === 100 || data?.code === 101) {
          toast.success("پرداخت با موفقیت انجام شد. از حمایت شما متشکریم!");
          // You can add logic here to save the reference ID if needed
          // const refID = response.data.ref_id;
        } else {
          toast.error(
            `خطا در تایید پرداخت: ${data?.errors?.message || "خطای نامشخص"}`
          );
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("خطا در بررسی وضعیت پرداخت");
      } finally {
        setVerifying(false);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    };

    verifyPayment();
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      {verifying ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">در حال بررسی پرداخت...</h1>
          <p>لطفا صبر کنید، در حال بررسی وضعیت پرداخت شما هستیم.</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">انتقال به صفحه اصلی</h1>
          <p>در حال انتقال به صفحه اصلی...</p>
        </div>
      )}
    </div>
  );
}

export default function PaymentVerificationWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentVerification />
    </Suspense>
  );
}
