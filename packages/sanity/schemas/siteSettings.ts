import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  fields: [
    defineField({ name: 'title', title: 'Site Title', type: 'string' }),
    defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
    defineField({
      name: 'nav',
      title: 'Navigation Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'href', title: 'Path', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Tagline',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
