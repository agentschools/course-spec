---
name: create-lesson
description: >-
  Creates and revises individual lessons in the COURSE.md format.
  Uses the course's audience, prerequisites, learning objectives, and
  prior lessons to write focused explanations, activities, and completion
  checks. Use when writing or improving a lesson, including individual
  exercises being authored through create-course.
---

# Create a lesson

Help the author create or revise one lesson: a single teaching exercise in the COURSE.md format.

Read the format first: https://raw.githubusercontent.com/agentschools/course-spec/main/SPEC.md.

When working through `create-course`, use the approved audience, prerequisites, lesson objective, prior coverage, intended outcome, and output format. Reuse those decisions rather than asking the author to repeat them.

When working on a lesson independently, read the existing COURSE.md and relevant exercises or sections for context. Ask the author only for information you still need.

## Workflow

1. Confirm the outcome. Identify what the student should understand or accomplish by the end, and what prerequisites or earlier lessons have already taught. Keep the lesson focused on one cohesive topic. If it needs to cover separate topics, propose a split to the author before changing the approved outline.
2. Draft the lesson. Open with the context, what the student will do, and why it matters. Explain new concepts before using them, then guide the activity. Apply the writing guidelines below.
3. Add student participation. Choose suitable moments for the student to make a choice, predict a result, explain their reasoning, or try a variation. Tell the teaching agent to wait for the student's reply at those moments. Put any try-it steps before the completion check.
4. Define completion. When applicable, specify a concrete action the student can perform and the result they should expect. When present, state plainly in the agent instructions that the agent must verify that result before marking the exercise complete.
5. Review the draft. Check that the explanation and activity support the outcome, assume only established knowledge, and fit the course sequence. Review the draft with the author before moving to another lesson.

## Writing guidelines

- Lesson content should be broken into short sections and should only focus on one cohesive theme/topic. Lessons should be split into multiple if they cover separate topics. We should prefer smaller lessons than larger ones when the choice is ambiguous.
- Avoid long walls of text. Use headers, bullets, etc to keep things readable. Use a table instead of a bullet point list if the bullet point list is for the form `- <short description/label>: <Content>`
- Teaching points should align back to relevant products or technology and focus on distinguishing features, gotchas, how they're being used, tradeoffs, etc.
- Include links to products and technologies when they are referenced the first time
- Repeating key points in relevant sections is okay.
- Context should be provided for a code snippet before it is shown. Any additional details can be added after the code snippet if relevant.
- The first paragraph should provide relevant context to the user and clarify what they're going to do in the lesson
- Should use second person voice. For example, we should use "you're going to..." instead of "we're going to...".

## Nice to haves (optional, not required)

- lesson titles should focus on the use case/what will be accomplished instead of product specifics
- visual aids like architecture diagrams
