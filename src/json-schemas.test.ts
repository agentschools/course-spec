import { describe, expect, it } from "vitest";
import { z } from "zod";
import { courseFrontmatterSchema, exerciseFrontmatterSchema, popQuizSchema } from "./schemas";

// The JSON Schemas in schemas/ are generated from the Zod schemas, for
// consumers that don't use TypeScript. Run `npx vitest run -u` to regenerate.
const schemas = {
  "course-frontmatter": courseFrontmatterSchema,
  "exercise-frontmatter": exerciseFrontmatterSchema,
  "pop-quiz": popQuizSchema,
};

describe("JSON Schemas", () => {
  it.each(Object.entries(schemas))("schemas/%s.schema.json matches the Zod schema", async (name, schema) => {
    const json = JSON.stringify(z.toJSONSchema(schema, { io: "input" }), null, 2) + "\n";
    await expect(json).toMatchFileSnapshot(`../schemas/${name}.schema.json`);
  });
});
