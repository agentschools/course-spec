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
  license: z.string().min(1).optional(),
  compatibility: z.string().min(1).max(500).optional().meta({
    description: "Prerequisites: accounts, tools, or courses the student needs first.",
  }),
  metadata: z.record(z.string(), z.string()).optional().meta({
    description: "Anything else, as strings. The spec defines `author` and `url`.",
  }),
});

/** Exercise file frontmatter. Everything is optional, the body is the exercise. */
export const exerciseFrontmatterSchema = z.strictObject({
  description: z.string().min(1).optional(),
  "agent-instructions": z.string().min(1).optional(),
});

/** Stable ID for a pop quiz or one of its choices. Same rules as `name`. */
const idSchema = z.string().min(1).max(64).regex(namePattern);

/** Attributes of a `{% pop-quiz %}` Markdoc tag in an exercise body. */
export const popQuizSchema = z
  .strictObject({
    id: idSchema,
    question: z.string().min(1),
    choices: z
      .array(z.strictObject({ id: idSchema, label: z.string().min(1), feedback: z.string().min(1) }))
      .min(2),
    answer: idSchema,
    mode: z.enum(["practice", "required"]).default("practice"),
  })
  .superRefine((quiz, ctx) => {
    const ids = quiz.choices.map((choice) => choice.id);
    if (new Set(ids).size !== ids.length) ctx.addIssue({ code: "custom", path: ["choices"], message: "Choice IDs must be unique" });
    if (!ids.includes(quiz.answer)) ctx.addIssue({ code: "custom", path: ["answer"], message: "Answer must be a choice ID" });
  });

export type CourseFrontmatter = z.infer<typeof courseFrontmatterSchema>;
export type ExerciseFrontmatter = z.infer<typeof exerciseFrontmatterSchema>;
export type PopQuiz = z.infer<typeof popQuizSchema>;
