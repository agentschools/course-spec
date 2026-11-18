import { z } from "zod";

/**
 * Frontmatter of `COURSE.md` and exercise files, as SPEC.md describes them.
 * `COURSE.md` loosely follows the Agent Skills spec
 * (https://agentskills.io/specification): same field set as `SKILL.md`.
 * Both are strict, so a misspelled key fails instead of being silently dropped.
 */

/** Same rules as an Agent Skills `name`: lowercase letters, numbers, and single hyphens. */
const namePattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const courseNameSchema = z.string().min(1).max(64).regex(namePattern).meta({
  description: "Stable course name. Lowercase letters, numbers, and single hyphens.",
  example: "durable-objects",
});

export const exerciseSlugSchema = z.string().min(1).max(64).regex(namePattern).meta({
  description:
    'Stable exercise slug: the exercise\'s filename without ".md" or a leading number prefix ("01-first-object.md" is "first-object"), or a single-file course\'s `##` heading anchor.',
  example: "first-object",
});

export const courseFrontmatterSchema = z.strictObject({
  name: courseNameSchema,
  description: z.string().min(1).max(1024).meta({
    description: "What the course teaches and who it's for.",
  }),
  license: z.string().min(1).optional().describe("Course license, as in an Agent Skill."),
  compatibility: z.string().min(1).max(500).optional().meta({
    description: "Prerequisites: accounts, tools, or courses the student needs first.",
  }),
  metadata: z.record(z.string(), z.string()).optional().meta({
    description: "String metadata. author credits the author; url is the canonical course URL used to key progress, otherwise the learner-provided URL.",
  }),
});

/** Exercise file frontmatter. Everything is optional, the body is the exercise. */
export const exerciseFrontmatterSchema = z.strictObject({
  description: z.string().min(1).optional().describe("One-line summary of the exercise outcome."),
  "agent-instructions": z.string().min(1).optional().describe("Agent-only teaching cues and completion checks; the body is shared with learners."),
});

export type CourseFrontmatter = z.infer<typeof courseFrontmatterSchema>;
export type ExerciseFrontmatter = z.infer<typeof exerciseFrontmatterSchema>;
