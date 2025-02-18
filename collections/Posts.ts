import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "featuredImage",
      label: "Featured Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: "tags",
      label: "Tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
  ],
};
