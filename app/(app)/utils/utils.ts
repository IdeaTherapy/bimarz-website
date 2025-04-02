"use server";

import { createPayment, getOrCreateSupporter, updatePaymentById } from "./db";
import { makeZarinpalPayment } from "./zarinpal";

export const initiatePayment = async ({
  amount,
  firstName,
  lastName,
  phoneNumber,
}: {
  amount: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) => {
  const supporter = await getOrCreateSupporter({
    firstName,
    lastName,
    phoneNumber,
  });
  const payment = await createPayment({
    amount,
    supporterId: supporter.id,
  });
  const zarinpalResponse = await makeZarinpalPayment({
    amount: payment.amount,
  });
  if (zarinpalResponse) {
    await updatePaymentById({
      id: payment.id,
      data: {
        authority: zarinpalResponse.authority,
      },
    });
    const url = `https://www.zarinpal.com/pg/StartPay/${zarinpalResponse.authority}`;
    return url;
  }
  return null;
};
