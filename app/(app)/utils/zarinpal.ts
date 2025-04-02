"use server";

import { updatePaymentByAuthority } from "./db";

const MERCHANT_ID = "75535824-e681-4adb-98d2-31966111f963"; // Azta merchant
export const makeZarinpalPayment = async ({ amount }: { amount: number }) => {
  const response = await fetch(
    "https://api.zarinpal.com/pg/v4/payment/request.json",
    {
      method: "POST",
      body: JSON.stringify({
        merchant_id: MERCHANT_ID,
        callback_url: process.env.NEXT_PUBLIC_SERVER_URL
          ? `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/verify`
          : "http://localhost:3000/payment/verify",
        currency: "IRT",
        description: "bimarz donation",
        // amount: 1000,
        amount,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (response.status >= 300) {
    console.log("zarinpal response error", response);
    return null;
  }
  const responseData = await response.json();
  return responseData.data;
};

export const verifyZarinpalPayment = async ({
  authority,
  amount,
}: {
  authority: string;
  amount: number;
}) => {
  const response = await fetch(
    "https://api.zarinpal.com/pg/v4/payment/verify.json",
    {
      method: "POST",
      body: JSON.stringify({
        merchant_id: MERCHANT_ID,
        authority,
        amount,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const responseContent = await response.json();
  const data = responseContent.data;
  console.log("zarinpal response", data);
  if (data.code === 100 || data.code === 101) {
    await updatePaymentByAuthority({
      authority: authority,
      data: {
        status: "paid",
      },
    });
  }
  return data;
};
