import { z } from "zod";
import { courseNameSchema } from "./schemas";

// Experimental optional body data. Frontmatter and ordinary Markdown are unchanged.
const text = (max: number) => z.string().min(1).max(max).refine((value) => value.trim().length > 0, "Must not be blank");

export const popQuizChoiceSchema = z.strictObject({
  id: courseNameSchema,
  label: text(512),
  feedback: text(2048),
});

export const popQuizSchema = z.strictObject({
  id: courseNameSchema,
  question: text(1024),
  choices: z.array(popQuizChoiceSchema).min(2).max(8),
  answer: courseNameSchema,
  mode: z.enum(["practice", "progression"]).default("practice"),
}).superRefine((quiz, ctx) => {
  const ids = new Set<string>();
  const labels = new Set<string>();
  quiz.choices.forEach((choice, index) => {
    if (ids.has(choice.id)) ctx.addIssue({ code: "custom", path: ["choices", index, "id"], message: "Choice IDs must be unique" });
    ids.add(choice.id);
    const label = choice.label.trim().toLowerCase();
    if (labels.has(label)) ctx.addIssue({ code: "custom", path: ["choices", index, "label"], message: "Choice labels must be distinct" });
    labels.add(label);
  });
  if (!ids.has(quiz.answer)) ctx.addIssue({ code: "custom", path: ["answer"], message: "Answer must identify one choice" });
});

/** Validate the entire collection for one exercise, not the whole course. */
export const exercisePopQuizzesSchema = z.array(popQuizSchema).superRefine((quizzes, ctx) => {
  const ids = new Set<string>();
  quizzes.forEach((quiz, index) => {
    if (ids.has(quiz.id)) ctx.addIssue({ code: "custom", path: [index, "id"], message: "Quiz IDs must be unique within an exercise" });
    ids.add(quiz.id);
  });
});

export type PopQuiz = z.infer<typeof popQuizSchema>;
export type PopQuizChoice = z.infer<typeof popQuizChoiceSchema>;

/** Pure feedback only. No progress, persistence, rendering, or tool side effects. */
export function evaluatePopQuiz(input: unknown, selectedChoiceId: unknown) {
  const quiz = popQuizSchema.parse(input);
  const id = courseNameSchema.parse(selectedChoiceId);
  const choice = quiz.choices.find((choice) => choice.id === id);
  if (!choice) throw new Error("Selected choice does not belong to this quiz");
  return { quizId: quiz.id, choiceId: choice.id, correct: choice.id === quiz.answer, feedback: choice.feedback, mode: quiz.mode };
}
