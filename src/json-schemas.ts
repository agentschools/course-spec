import { z } from "zod";
import { courseFrontmatterSchema, exerciseFrontmatterSchema } from "./schemas";
import { popQuizSchema, exercisePopQuizzesSchema } from "./components";

// Input mode preserves optional fields with defaults. JSON Schema does not apply defaults.
const definitions = {
  "course-frontmatter": courseFrontmatterSchema,
  "exercise-frontmatter": exerciseFrontmatterSchema,
  "pop-quiz": popQuizSchema,
  "exercise-pop-quizzes": exercisePopQuizzesSchema,
};
export function generatedJsonSchemas() {
  return Object.fromEntries(Object.entries(definitions).map(([name, schema]) => [
    `${name}.schema.json`,
    { ...z.toJSONSchema(schema, { target: "draft-2020-12", io: "input" }),
      $comment: "Generated from Zod. Do not edit. See SPEC.md for supplemental cross-field and document constraints. Defaults are annotations, not mutations." },
  ]));
}
