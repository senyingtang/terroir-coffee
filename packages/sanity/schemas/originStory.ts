import { defineField, defineType } from 'sanity'

export const originStory = defineType({
  name: 'originStory',
  title: 'Origin Story',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Number', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
      }],
    }),
  ],
})
