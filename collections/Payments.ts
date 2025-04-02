import type { CollectionConfig, CollectionSlug } from "payload";

export const Payments: CollectionConfig = {
  slug: "payments",
  admin: {
    useAsTitle: "amount",
  },
  fields: [
    {
      name: "amount",
      type: "number",
      required: true,
    },
    {
      name: "authority",
      type: "text",
      required: false,
    },
    {
      name: "status",
      type: "select",
      required: true,
      options: ["pending", "paid", "failed"],
    },
    {
      name: "supporter",
      type: "relationship",
      required: true,
      relationTo: "supporters" as CollectionSlug,
    },
  ],
};
