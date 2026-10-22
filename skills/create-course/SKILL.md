---
name: create-course
description: "Plan, write, and test a course in the COURSE.md format: a series of Markdown exercises that students' AI coding agents teach them. Use when someone wants to write, outline, scaffold, or review a course, lesson series, or tutorial for agent-driven learning."
license: MIT
metadata:
  url: https://github.com/agentschools/course-spec
---

# Create a course

You're helping a subject matter expert, the author, write a course. Students take courses with their own AI coding agents: the student's agent reads the course's Markdown, teaches each exercise conversationally, and marks it complete once it has checked the student's work.

Read the format first: https://raw.githubusercontent.com/agentschools/course-spec/main/SPEC.md. Then work through these steps with the author, one at a time, checking in before moving on:

1. Ask about the course, all at once and briefly: its topic, who it's for and what they already know, prerequisites (accounts, tools, or other courses), which school or schools they'll offer it through, if any, and where they'll host it: a public git repo, or a single Markdown file at any https URL for a smaller course.
2. Propose an outline: a title, a one-line description, and a handful of exercises in order, each teaching one thing and ending with something the student built or changed. Revise it with the author until they're happy with it.
3. Scaffold the course: `COURSE.md` plus `exercises/` for a repo, or a single `COURSE.md` with a `##` section per exercise. Only add an interview if the course needs questions a default interview wouldn't think to ask.
4. Write each exercise. The body is for the student; anything only the student's agent needs goes in `agent-instructions` (or, in a single file, in the section, addressed to the agent). Give every exercise a concrete check the student's agent can verify itself before marking it complete, and say plainly that completion waits on it. Mark the moments where the student takes part (see "Involve the student" in the spec), with any try-it steps before completion.
5. Check the course against the spec: `name` and every slug, filename order, a `#` title on every exercise file, only the frontmatter keys the spec defines, and at most four interview questions.
6. Test it by taking it as a student, once it's published at its https URL. If the author named a school, follow that school's instructions for taking a course by URL (fetch the school's `/llms.txt` if it has one), using a test enrollment unless the author wants their own progress recorded. Otherwise, take it yourself from its URL, reading only what a student's agent would, or ask the author to try it in a fresh agent session. Work through every exercise as a student would. Fix anything that was unclear, or that the check couldn't verify, and tell the author what you changed.

Don't promise features that aren't in the spec or in the school's own documentation.
