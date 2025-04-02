import type { CollectionConfig } from "payload";

export const Supporters: CollectionConfig = {
  slug: "supporters",
  admin: {
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "fullName",
      type: "text",
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          () => {
            return undefined;
          },
        ],
        afterRead: [
          ({ data }) => {
            if (data?.firstName && data?.lastName) {
              return `${data.firstName} ${data.lastName}`;
            }
            return "";
          },
        ],
      },
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
  ],
};
