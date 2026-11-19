import { readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020";
import { describe, expect, it } from "vitest";
import { generatedJsonSchemas } from "./json-schemas";
import { popQuizSchema } from "./components";

const schemas = generatedJsonSchemas();
const ajv = new Ajv2020({ strict: false });
const validate = ajv.compile(schemas["pop-quiz.schema.json"]);
const quiz = { id: "test", question: "Which?", choices: [{ id: "one", label: "One", feedback: "Yes" }, { id: "two", label: "Two", feedback: "Try again" }], answer: "one" };
describe("generated input schemas", () => {
  it("matches committed schemas and compiles every portable schema", () => {
    expect(Object.keys(schemas).sort()).toEqual([
      "course-frontmatter.schema.json", "exercise-frontmatter.schema.json", "pop-quiz.schema.json",
    ]);
    for (const [name, schema] of Object.entries(schemas)) {
      expect(JSON.parse(readFileSync(new URL(`../schemas/${name}`, import.meta.url), "utf8"))).toEqual(schema);
      expect(() => ajv.compile(schema)).not.toThrow();
    }
  });
  it("preserves optional practice default without mutating input", () => {
    expect(validate(quiz)).toBe(true);
    expect(quiz).not.toHaveProperty("mode");
    expect(popQuizSchema.parse(quiz).mode).toBe("practice");
    expect(validate({ ...quiz, mode: "required" })).toBe(true);
  });
  it.each([
    { ...quiz, mode: "progression" }, { ...quiz, question: " \n\t" },
    { ...quiz, question: "x".repeat(1025) }, { ...quiz, unknown: true },
    { ...quiz, choices: quiz.choices.slice(0, 1) }, { ...quiz, answer: ["one"] },
    { ...quiz, choices: [{ ...quiz.choices[0], label: " " }, quiz.choices[1]] },
  ])("rejects representable invalid data %#", data => {
    expect(validate(data)).toBe(false);
    expect(popQuizSchema.safeParse(data).success).toBe(false);
  });
  it("makes the supplemental cross-field validation gap explicit", () => {
    for (const data of [
      { ...quiz, answer: "missing" },
      { ...quiz, choices: [quiz.choices[0], { ...quiz.choices[1], id: "one" }] },
      { ...quiz, choices: [quiz.choices[0], { ...quiz.choices[1], label: " ONE " }] },
    ]) {
      expect(validate(data)).toBe(true);
      expect(popQuizSchema.safeParse(data).success).toBe(false);
    }
  });
  it("keeps both frontmatter schemas strict", () => {
    const course = ajv.compile(schemas["course-frontmatter.schema.json"]);
    const exercise = ajv.compile(schemas["exercise-frontmatter.schema.json"]);
    expect(course({ name: "cake", description: "Bake a cake" })).toBe(true);
    expect(course({ name: "cake" })).toBe(false);
    expect(course({ name: "cake", description: "Bake", extra: true })).toBe(false);
    expect(exercise({})).toBe(true);
    expect(exercise({ extra: true })).toBe(false);
  });
});
