import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import {
  hero,
  product,
  originStory,
  manifesto,
  teamMember,
  siteSettings,
} from '@terroir/sanity'

export default defineConfig({
  name: 'terroir-coffee',
  title: 'Terroir Coffee Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool()],
  schema: {
    types: [hero, product, originStory, manifesto, teamMember, siteSettings],
  },
})
