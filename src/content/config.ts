import { defineCollection, z } from "astro:content";

const insightSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  pubDate: z.date(),
  description: z.string(),
  author: z.string(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  tags: z.array(z.string()),
})

export const collections = {
  "insights": defineCollection({
    type: "content",
    schema: insightSchema,
  }),
};

export type Insight = z.infer<typeof insightSchema>;
