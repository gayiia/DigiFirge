import type { StructureResolver } from "sanity/structure";

const SINGLETON_TYPES = new Set(["siteSettings", "homepage"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("DigiForge Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.divider(),
      S.listItem().title("Pillars").schemaType("pillar").child(S.documentTypeList("pillar").title("Pillars")),
      S.listItem().title("Services").schemaType("service").child(S.documentTypeList("service").title("Services")),
      S.listItem().title("Projects / Case Studies").schemaType("project").child(S.documentTypeList("project").title("Projects")),
      S.listItem().title("Blog / Insights").schemaType("post").child(S.documentTypeList("post").title("Posts")),
      S.divider(),
      S.listItem().title("Team Members").schemaType("teamMember").child(S.documentTypeList("teamMember").title("Team Members")),
      S.listItem().title("Testimonials").schemaType("testimonial").child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem().title("Pricing Packages").schemaType("pricingPackage").child(S.documentTypeList("pricingPackage").title("Pricing Packages")),
      // Anything not explicitly listed above still shows up automatically,
      // minus the singletons (which must only be edited via the items above).
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.has(listItem.getId() as string)
      ).filter(
        (listItem) => !["pillar", "service", "project", "post", "teamMember", "testimonial", "pricingPackage"].includes(listItem.getId() as string)
      ),
    ]);
