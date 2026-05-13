import { defineField, defineType } from 'sanity'

export const manifesto = defineType({
  name: 'manifesto',
  title: 'Manifesto',
  type: 'document',
  fields: [
    defineField({
      name: 'lines',
      title: 'Lines',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Each line appears as a large italic statement.',
    }),
  ],
  preview: { select: { title: 'lines.0' } },
})
