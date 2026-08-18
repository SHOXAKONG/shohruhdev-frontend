import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const tone = z.enum(["violet", "coral", "mint", "sky", "amber", "aqua"]);

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    /** Short summary used on cards and in <meta name="description">. */
    description: z.string(),
    /** Longer standfirst shown under the article headline. */
    dek: z.string().optional(),
    pubDate: z.coerce.date(),
    /** Small label on the tag chip, e.g. "MCP", "Postgres". */
    tag: z.string(),
    /** Filter bucket on /blog — one of blogCategories in src/data/site.ts. */
    category: z.enum(["Data", "Backend", "Postgres", "Go", "Java"]),
    /** Gradient + chip palette, see .tone-* in global.css. */
    tone,
    readingTime: z.number(),
    featured: z.boolean().default(false),
    /** Big italic line on the featured card's gradient panel. */
    featuredLine: z.string().optional(),
    /** Mono caption laid over the article hero banner. */
    heroCaption: z.string().optional(),
  }),
});

export const collections = { blog };
