import { groq } from 'next-sanity'

export const heroQuery = groq`
  *[_type == "hero"][0] {
    headline,
    subline,
    cta,
    image
  }
`

export const productsQuery = groq`
  *[_type == "product"] | order(_createdAt asc) {
    _id,
    name,
    slug,
    category,
    origin,
    process,
    roastLevel,
    price,
    description,
    image
  }
`

export const originStoryQuery = groq`
  *[_type == "originStory"][0] {
    title,
    body,
    image
  }
`

export const manifestoQuery = groq`
  *[_type == "manifesto"][0] {
    lines[]
  }
`

export const teamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    image
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    ogImage,
    nav,
    footer
  }
`
