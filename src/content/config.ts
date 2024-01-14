import { z, defineCollection } from 'astro:content';

// define my type declarations for my content here.
// I think I'll break up my content into the different sections that I'm going to be writing about.
const devBlogCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        date: z.string(),
        tags: z.array(z.string()),
        description: z.string().max(160),
        isDraft: z.boolean(),
        tldr: z.string(),
        seoKeywords: z.array(z.string()),
        image: z.object({
            href: z.string(),
            alt: z.string()
        }).optional()
    }),
})

export const collections = {
    'blogs': devBlogCollection
}