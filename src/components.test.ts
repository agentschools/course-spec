import { describe, expect, it } from "vitest";
import { evaluatePopQuiz, exercisePopQuizzesSchema, popQuizSchema } from "./components";

const quiz = {
  id: "stop-mixing",
  question: "When should you stop mixing?",
  choices: [
    { id: "smooth", label: "When perfectly smooth", feedback: "A few lumps are fine; do not overmix." },
    { id: "no-flour", label: "When no dry flour remains", feedback: "Correct. Check the bowl bottom too." },
    { id: "timer", label: "After five minutes", feedback: "Use texture, not a fixed timer." },
  ],
  answer: "no-flour",
};

describe("optional pop quiz data", () => {
  it("defaults to practice and evaluates by stable ID, not position", () => {
    expect(popQuizSchema.parse(quiz).mode).toBe("practice");
    const reordered = { ...quiz, choices: [...quiz.choices].reverse() };
    expect(evaluatePopQuiz(reordered, "no-flour")).toEqual({ quizId: "stop-mixing", choiceId: "no-flour", correct: true, feedback: quiz.choices[1].feedback, mode: "practice" });
    expect(evaluatePopQuiz(quiz, "smooth").correct).toBe(false);
    expect(evaluatePopQuiz({ ...quiz, mode: "progression" }, "no-flour").mode).toBe("progression");
  });

  it.each([
    { ...quiz, question: "  " }, { ...quiz, question: "q".repeat(1025) },
    { ...quiz, id: "Bad ID" }, { ...quiz, id: "x".repeat(65) },
    { ...quiz, choices: quiz.choices.slice(0, 1) },
    { ...quiz, choices: Array.from({ length: 9 }, (_, i) => ({ id: `choice-${i}`, label: `Choice ${i}`, feedback: "Feedback" })) },
    { ...quiz, choices: [quiz.choices[0], quiz.choices[0]] },
    { ...quiz, choices: [quiz.choices[0], { ...quiz.choices[1], label: " WHEN PERFECTLY SMOOTH " }] },
    { ...quiz, choices: [{ ...quiz.choices[0], feedback: "\n" }, quiz.choices[1]] },
    { ...quiz, choices: [{ ...quiz.choices[0], label: " " }, quiz.choices[1]] },
    { ...quiz, choices: [{ ...quiz.choices[0], label: "x".repeat(513) }, quiz.choices[1]] },
    { ...quiz, choices: [{ ...quiz.choices[0], feedback: "x".repeat(2049) }, quiz.choices[1]] },
    { ...quiz, choices: [{ ...quiz.choices[0], correct: false }, quiz.choices[1]] },
    { ...quiz, answer: "missing" }, { ...quiz, answer: ["no-flour", "smooth"] },
    { ...quiz, answer: undefined }, { ...quiz, mode: "graded" }, { ...quiz, mode: false },
    { ...quiz, mode: "false" }, { ...quiz, onSubmit: "run()" },
    { ...quiz, question: { type: "variable", path: ["secret"] } },
  ])("rejects malformed or ambiguous data %#", (invalid) => {
    expect(popQuizSchema.safeParse(invalid).success).toBe(false);
  });

  it("accepts the documented text length boundaries", () => {
    expect(popQuizSchema.safeParse({ ...quiz, question: "q".repeat(1024), choices: [{ ...quiz.choices[0], label: "l".repeat(512), feedback: "f".repeat(2048) }, quiz.choices[1]] }).success).toBe(true);
  });

  it("rejects invalid answer submissions rather than coercing or choosing an option", () => {
    for (const answer of ["missing", 1, ["no-flour"], null, undefined]) {
      expect(() => evaluatePopQuiz(quiz, answer)).toThrow();
    }
  });

  it("scopes duplicate quiz IDs to one exercise", () => {
    expect(exercisePopQuizzesSchema.safeParse([quiz, quiz]).success).toBe(false);
    expect(exercisePopQuizzesSchema.parse([quiz])).toHaveLength(1);
    expect(exercisePopQuizzesSchema.parse([])).toEqual([]);
  });

  it("preserves authored text as data, with no HTML evaluation or progress claim", () => {
    const result = evaluatePopQuiz({ ...quiz, choices: [{ ...quiz.choices[0], feedback: "<script>alert(1)</script>" }, quiz.choices[1]] }, "smooth");
    expect(result.feedback).toBe("<script>alert(1)</script>");
    expect(result).not.toHaveProperty("completeExercise");
  });
});
