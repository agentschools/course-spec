import { readFileSync } from "node:fs";
import Markdoc from "@markdoc/markdoc";
import { describe, expect, it } from "vitest";
import { exercisePopQuizzesSchema, popQuizSchema } from "./components";

// Markdoc can expose tag-shaped children inside fences. Adapters must skip them.
function tagsOutsideCode(node: ReturnType<typeof Markdoc.parse>): ReturnType<typeof Markdoc.parse>[] {
  if (node.type === "fence" || node.type === "code") return [];
  return [...(node.type === "tag" ? [node] : []), ...node.children.flatMap(tagsOutsideCode)];
}

const example = readFileSync(new URL("../examples/pop-quiz.md", import.meta.url), "utf8");

describe("Markdoc proposal example", () => {
  it("parses literal attributes and keeps the same question and ordered choices in the fallback", () => {
    const ast = Markdoc.parse(example);
    const nodes = [...ast.walk()];
    expect(nodes.flatMap((node) => node.errors)).toEqual([]);
    const tags = nodes.filter((node) => node.type === "tag" && node.tag === "pop-quiz");
    expect(tags).toHaveLength(1);
    const quizzes = exercisePopQuizzesSchema.parse(tags.map((node) => node.attributes));
    const fallback = tags[0].children.flatMap((node) => [...node.walk()]).filter((node) => node.type === "text").map((node) => node.attributes.content).join("\n");
    expect(fallback).toContain(quizzes[0].question);
    const list = tags[0].children.find((node) => node.type === "list")!;
    const labels = list.children.map((item) => [...item.walk()].filter((node) => node.type === "text").map((node) => node.attributes.content).join(""));
    expect(labels).toEqual(quizzes[0].choices.map((choice) => choice.label));
  });

  it("does not treat a fenced tag example as a quiz", () => {
    const ast = Markdoc.parse("```markdown\n" + example + "\n```\n");
    expect(tagsOutsideCode(ast)).toEqual([]);
  });

  it("rejects an unresolved variable rather than evaluating it", () => {
    const ast = Markdoc.parse(example.replace('question="When should you stop mixing?"', "question=$question"));
    const tag = [...ast.walk()].find((node) => node.type === "tag")!;
    expect(popQuizSchema.safeParse(tag.attributes).success).toBe(false);
  });

  it("exposes duplicate attributes as warnings that adapters must reject", () => {
    const ast = Markdoc.parse('{% pop-quiz id="first" id="second" /%}');
    expect([...ast.walk()].flatMap((node) => node.errors).some((error) => error.id === "duplicate-attribute")).toBe(true);
  });

  it("reports syntax errors that adopting parsers must reject", () => {
    const ast = Markdoc.parse("{% pop-quiz choices=[ %}\n");
    expect([...ast.walk()].flatMap((node) => node.errors).length).toBeGreaterThan(0);
  });
});
