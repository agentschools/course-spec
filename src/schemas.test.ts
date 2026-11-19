import { describe, expect, it } from "vitest";
import { courseFrontmatterSchema, exerciseFrontmatterSchema, popQuizSchema } from "./schemas";

describe("frontmatter schemas", () => {
  it("reject misspelled or unknown keys", () => {
    const course = { name: "workers", description: "Deploy a Worker." };
    expect(courseFrontmatterSchema.parse(course)).toEqual(course);
    expect(() => courseFrontmatterSchema.parse({ ...course, compatability: "A Cloudflare account." })).toThrow();
    expect(() => exerciseFrontmatterSchema.parse({ "agent-instruction": "Verify it." })).toThrow();
  });
});

describe("pop quiz schema", () => {
  const quiz = {
    id: "stop-mixing",
    question: "When should you stop mixing?",
    choices: [
      { id: "smooth", label: "When it's smooth", feedback: "Lumps are fine." },
      { id: "no-dry-flour", label: "When no dry flour remains", feedback: "Correct!" },
    ],
    answer: "no-dry-flour",
  };

  it("defaults to practice mode", () => {
    expect(popQuizSchema.parse(quiz).mode).toBe("practice");
    expect(popQuizSchema.parse({ ...quiz, mode: "required" }).mode).toBe("required");
  });

  it.each([
    { ...quiz, answer: "missing" },
    { ...quiz, choices: [quiz.choices[0], { ...quiz.choices[1], id: "smooth" }], answer: "smooth" },
    { ...quiz, choices: [quiz.choices[1]] },
    { ...quiz, mode: "graded" },
    { ...quiz, onSubmit: "run()" },
  ])("rejects invalid quizzes %#", (invalid) => {
    expect(popQuizSchema.safeParse(invalid).success).toBe(false);
  });
});
