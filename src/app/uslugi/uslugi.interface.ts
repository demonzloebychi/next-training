// export type GetUslugiResponse = GetUslugiResponse[]

export interface GetUslugiResponse {
  id: number
  date: string
  date_gmt: string
  guid: Guid
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: Title
  content: Content
  excerpt: Excerpt
  featured_media: number
  parent: number
  menu_order: number
  template: string
  format: string
  categories: any[]
  class_list: string[]
  acf: any[]
  yoast_head: string
  yoast_head_json: YoastHeadJson
  _links: Links
}

export interface Guid {
  rendered: string
}

export interface Title {
  rendered: string
}

export interface Content {
  rendered: string
  protected: boolean
}

export interface Excerpt {
  rendered: string
  protected: boolean
}

export interface YoastHeadJson {
  title: string
  description: string
  robots: Robots
  canonical: string
  og_locale: string
  og_type: string
  og_title: string
  og_description: string
  og_url: string
  og_site_name: string
  article_modified_time?: string
  twitter_card: string
  schema: Schema
}

export interface Robots {
  index: string
  follow: string
  "max-snippet": string
  "max-image-preview": string
  "max-video-preview": string
}

export interface Schema {
  "@context": string
  "@graph": Graph[]
}

export interface Graph {
  "@type": string
  "@id": string
  url?: string
  name?: string
  isPartOf?: IsPartOf
  datePublished?: string
  dateModified?: string
  description?: string
  breadcrumb?: Breadcrumb
  inLanguage?: string
  potentialAction?: PotentialAction[]
  itemListElement?: ItemListElement[]
}

export interface IsPartOf {
  "@id": string
}

export interface Breadcrumb {
  "@id": string
}

export interface PotentialAction {
  "@type": string
  target: any
  "query-input"?: QueryInput
}

export interface QueryInput {
  "@type": string
  valueRequired: boolean
  valueName: string
}

export interface ItemListElement {
  "@type": string
  position: number
  name: string
  item?: string
}

export interface Links {
  self: Self[]
  collection: Collection[]
  about: About[]
  up: Up[]
  "wp:attachment": WpAttachment[]
  "wp:term": WpTerm[]
  curies: Cury[]
}

export interface Self {
  href: string
  targetHints: TargetHints
}

export interface TargetHints {
  allow: string[]
}

export interface Collection {
  href: string
}

export interface About {
  href: string
}

export interface Up {
  embeddable: boolean
  href: string
}

export interface WpAttachment {
  href: string
}

export interface WpTerm {
  taxonomy: string
  embeddable: boolean
  href: string
}

export interface Cury {
  name: string
  href: string
  templated: boolean
}
