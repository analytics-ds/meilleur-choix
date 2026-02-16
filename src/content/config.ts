import { defineCollection, z } from 'astro:content';

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const blogSchema = z.object({
  title: z.string().max(60),
  description: z.string().max(160),
  date: z.coerce.date(),
  author: z.string(),
  category: z.string(),
  tags: z.array(z.string()).min(3).max(6),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  faq: z.array(faqSchema).min(3),
  updatedDate: z.coerce.date().optional(),
});

const blog = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const blogEn = defineCollection({
  type: 'content',
  schema: blogSchema,
});

export const collections = {
  blog,
  'blog-en': blogEn,
};
