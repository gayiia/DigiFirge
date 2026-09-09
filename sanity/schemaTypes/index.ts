import { type SchemaTypeDefinition } from "sanity";

import seo from "./objects/seo";
import cta from "./objects/cta";
import faqItem from "./objects/faqItem";
import processStep from "./objects/processStep";
import metric from "./objects/metric";
import { socialLink, navLink } from "./objects/navigation";

import siteSettings from "./documents/siteSettings";
import homepage from "./documents/homepage";
import pillar from "./documents/pillar";
import service from "./documents/service";
import project from "./documents/project";
import post from "./documents/post";
import { teamMember, testimonial, pricingPackage } from "./documents/misc";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seo,
    cta,
    faqItem,
    processStep,
    metric,
    socialLink,
    navLink,
    // Singletons
    siteSettings,
    homepage,
    // Collections
    pillar,
    service,
    project,
    post,
    teamMember,
    testimonial,
    pricingPackage,
  ],
};
