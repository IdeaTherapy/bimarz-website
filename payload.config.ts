import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Tags } from "@/collections/Tags";
import { en } from "@payloadcms/translations/languages/en";
import { fa } from "@payloadcms/translations/languages/fa";
import { Posts } from "@/collections/Posts";
import { Supporters } from "@/collections/Supporters";
import { Payments } from "@/collections/Payments";
export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),
  localization: {
    locales: [
      {
        code: "en",
        label: "English",
      },
      {
        code: "fa",
        label: "Persian",
        rtl: true,
      },
    ],
    defaultLocale: "fa",
  },
  i18n: {
    fallbackLanguage: "fa",
    supportedLanguages: { en, fa },
    translations: {
      en: en,
      fa: fa,
    },
  },
  // Define and configure your collections in this array
  collections: [Users, Media, Tags, Posts, Supporters, Payments],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
