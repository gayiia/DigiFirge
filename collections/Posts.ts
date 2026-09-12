import type { CollectionConfig } from "payload";
import { lexicalEditor, UploadFeature } from "@payloadcms/richtext-lexical";
import { slugField } from "../fields/slug";
import { seoField } from "../fields/seo";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: { useAsTitle: "title", defaultColumns: ["title", "category", "publishedAt"] },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    { name: "excerpt", type: "textarea" },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "body",
      type: "richText",
      // Embedded inline images inside blog body — replaces Sanity's
      // mixed-array body (block + image).
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          UploadFeature({ collections: { media: { fields: [] } } }),
        ],
      }),
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "pillars",
      admin: { description: "Blog categories map to the 4 service pillars." },
    },
    { name: "author", type: "relationship", relationTo: "team-members" },
    { name: "publishedAt", type: "date" },
    { name: "updatedAt", type: "date" },
    seoField(),
  ],
};
