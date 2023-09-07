import type { User as AltogicUser } from "altogic";

export interface User extends AltogicUser {
  credits: number;
}

export interface Product {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: "usd" | string;
  custom_unit_amount: null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: {
    description: string;
    info: string;
  };
  nickname: string;
  product: string;
  recurring: string | null;
  tax_behavior: string;
  tiers_mode: string | null;
  transform_quantity: string | null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface Project {
  _id: string;
  content: string;
  name: string;
  deletedAt: string;
  result: string;
  rating: number;
  role: string;
  ratingText: string;
  user: string | User;
  createdAt: string;
  status: "draft" | "live";
  updatedAt: string;
  click: number;
  domains: Domain[];
  integrations: Integration[];
}

export interface Domain {
  _id: string;
  updatedAt: string;
  createdAt: string;
  _parent: string;
  isPrimary: boolean;
  clickCount: number;
  status: DomainVerificationStatusProps;
  domain: string;
}

export interface Integration {
  _id: string;
  updatedAt: string;
  createdAt: string;
  _parent: string;
  name: string;
  token: string;
  type: IntegrationType;
  status: IntegrationStatus;
}

export type IntegrationStatus = "active" | "inactive";
export type IntegrationType = "maps" | "analytics";

export interface Invoice {
  id: string;
  object: string;
  account_country: string;
  account_name: string;
  account_tax_ids: null | [];
  created: number;
  currency: string;
  livemode: boolean;
  paid: boolean;
  status: string;
  total: number;
  lines: {
    object: "list";
    data: {
      price: {
        id: "price_1NfeLpFctreK8fHPFa5RIeKt";
        object: "price";
        active: true;
        billing_scheme: "per_unit";
        created: number;
        currency: "usd" | string;
        livemode: false;
        lookup_key: null;
        metadata: {
          description: string;
          info: string;
        };
        nickname: "100";
      };
      quantity: 1;
    }[];
  };
  hosted_invoice_url: string;
  invoice_pdf: string;
}

export type DomainVerificationStatusProps =
  | "Valid Configuration"
  | "Invalid Configuration"
  | "Pending Verification"
  | "Domain Not Found"
  | "Unknown Error";

export interface DomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  verified: boolean;
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export interface DomainInfo {
  configured: boolean;
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  verified: boolean;
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export interface JSONResponse {
  header: Header;
  hero: Hero;
  features: Features;
  individualFeatures: IndividualFeatures;
  testimonials: Testimonials;
  blog: Blog;
  faq: FAQ;
  team: Team;
  newsletter: Newsletter;
  contactForm: ContactForm;
  map: Map;
  footer: Footer;
}

export interface Blog {
  post_1: Post;
  post_2: Post;
  post_3: Post;
}

export interface Post {
  title: string;
  shortDescription: string;
}

export interface ContactForm {
  nameField: string;
  emailField: string;
  messageField: string;
}

export interface FAQ {
  question_1: Question;
  question_2: Question;
  question_3: Question;
}

export interface Question {
  question: string;
  answer: string;
}

export interface Features {
  feature_1: FeaturesFeature;
  feature_2: FeaturesFeature;
  feature_3: FeaturesFeature;
}

export interface FeaturesFeature {
  title: string;
  icon: string;
  description: string;
}

export interface Footer {
  socialMediaLinks: string[];
}

export interface Header {
  logo: string;
  navigationMenuItems: string[];
}

export interface Hero {
  title: string;
  description: string;
  jumbotron: string;
  cta: string;
}

export interface IndividualFeatures {
  feature_1: IndividualFeaturesFeature;
  feature_2: IndividualFeaturesFeature;
  feature_3: IndividualFeaturesFeature;
}

export interface IndividualFeaturesFeature {
  title: string;
  description: string;
  cta: string;
  backgroundImageDescription: string;
}

export interface Map {
  locationDescription: string;
  googleMapsAPIKey: string;
}

export interface Newsletter {
  title: string;
  cta: string;
}

export interface Team {
  member_1: Member;
  member_2: Member;
  member_3: Member;
}

export interface Member {
  name: string;
  role: string;
  socialMediaLinks: string[];
}

export interface Testimonials {
  testimonial_1: Testimonial;
  testimonial_2: Testimonial;
}

export interface Testimonial {
  name: string;
  role: string;
  feedback: string;
}
