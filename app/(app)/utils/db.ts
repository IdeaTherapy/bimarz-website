"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export const getOrCreateSupporter = async ({
  firstName,
  lastName,
  phoneNumber,
}: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) => {
  const payload = await getPayload({
    config: config,
  });
  const supporter = await payload.find({
    collection: "supporters",
    where: { phone: { equals: phoneNumber } },
  });
  if (supporter.docs.length > 0) return supporter.docs[0];
  return await createSupporter({ firstName, lastName, phoneNumber });
};

const createSupporter = async ({
  firstName,
  lastName,
  phoneNumber,
}: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) => {
  const payload = await getPayload({
    config: config,
  });
  const supporter = await payload.create({
    collection: "supporters",
    data: {
      firstName,
      lastName,
      phone: phoneNumber,
    },
  });
  return supporter;
};

export const createPayment = async ({
  amount,
  supporterId,
}: {
  amount: number;
  supporterId: string;
}) => {
  const payload = await getPayload({
    config: config,
  });
  const payment = await payload.create({
    collection: "payments",
    data: {
      amount,
      supporter: supporterId,
      status: "pending",
      authority: "",
    },
  });
  return payment;
};

export const updatePaymentById = async ({
  id,
  data,
}: {
  id: string;
  data: {
    authority: string;
  };
}) => {
  const payload = await getPayload({
    config: config,
  });
  const payment = await payload.update({
    collection: "payments",
    id,
    data,
  });
  return payment;
};

export const updatePaymentByAuthority = async ({
  authority,
  data,
}: {
  authority: string;
  data: {
    status: "pending" | "paid" | "failed";
  };
}) => {
  const payload = await getPayload({
    config: config,
  });
  const payment = await payload.update({
    collection: "payments",
    where: { authority: { equals: authority } },
    data,
  });
  return payment;
};
