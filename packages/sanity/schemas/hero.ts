import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subline', title: 'Subline', type: 'text', rows: 2 }),
    defineField({ name: 'cta', title: 'CTA Label', type: 'string' }),
    defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'headline' } },
})
