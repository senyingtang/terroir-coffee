import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Single Origin', 'Blend', 'Decaf', 'Seasonal'] },
    }),
    defineField({ name: 'origin', title: 'Origin Country', type: 'string' }),
    defineField({ name: 'farm', title: 'Farm / Producer', type: 'string' }),
    defineField({ name: 'altitude', title: 'Altitude (masl)', type: 'number' }),
    defineField({
      name: 'process',
      title: 'Process',
      type: 'string',
      options: { list: ['Washed', 'Natural', 'Honey', 'Anaerobic', 'Double Anaerobic', 'Carbonic Maceration'] },
    }),
    defineField({
      name: 'roastLevel',
      title: 'Roast Level',
      type: 'string',
      options: { list: ['Light', 'Light-Medium', 'Medium-Light', 'Medium', 'Medium-Dark'] },
    }),
    defineField({ name: 'tastingNotes', title: 'Tasting Notes', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'price', title: 'Price (NTD)', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'origin', media: 'image' },
  },
})
