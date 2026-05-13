import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 99 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'image' } },
})
