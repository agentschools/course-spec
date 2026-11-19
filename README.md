# Course spec

A school-agnostic format for writing portable course material that AI agents teach. A course is a folder of plain Markdown files, or a single Markdown file, hosted wherever you like. Anyone can write one, and any school can teach it. You don't need an account or permission.

Students take a course with their own AI coding agent: the agent reads the course, teaches each exercise in conversation, and checks the student's work before moving on.

The format is inspired by the [Agent Skills specification](https://agentskills.io/specification). A course's `COURSE.md` uses the same frontmatter fields as a skill's `SKILL.md`.

## Write a course

Paste this prompt into your AI coding agent:

```text
I want to author a new course.

Look at https://github.com/agentschools/course-spec and help me get started.
```

Your agent will ask about the topic and audience, propose an outline, then write the course with you.

To install the `create-course` skill in your agent instead, run:

```sh
npx skills add agentschools/course-spec
```

Then ask your agent to help you write a course.

## Take a course

The `learning-companion` skill assists agents in teaching learners while the learner is taking a course. The agent follows course steps while explaining product choices, highlighting relevant code snippets, and pausing for learner participation.

To install the `learning-companion` skill, learners should run:

```sh
npx skills add agentschools/course-spec
```

## Who uses it

[Cloudflare Dev School](https://cfdev.school) uses this format for its built-in courses ([source](https://github.com/agentschools/cfdev.school/tree/main/courses)), and its students can take any course written in it.

## Learn more

- [SPEC.md](SPEC.md): the format
- [skills/create-course](skills/create-course/SKILL.md): an [Agent Skill](https://agentskills.io) for writing a course with your agent
- [skills/learning-companion](skills/learning-companion/SKILL.md): an Agent Skill for learning from an existing course or tutorial while your agent implements it
- [AGENTS.md](AGENTS.md): how this repo is set up, for contributors and their agents

## Exploration on this branch

Exercises can include optional Markdoc components, starting with single-answer pop quizzes. Ordinary `.md` remains valid. See [how pop quizzes work](SPEC.md#optional-declarative-components) and [an example](examples/pop-quiz.md). The spec defines quiz data and behavior; schools provide the runtime.

## Schema-first validation

Zod schemas provide executable validation and inferred TypeScript types. The generated [JSON Schemas](schemas/) support other languages and tools, with supplemental cross-field and document constraints described in SPEC.md. They validate decoded input, not Markdown. JSON Schema defaults are annotations, not automatic mutations.

Run `npm run schemas:generate` after changing Zod definitions. `npm run schemas:check` and `script/test` reject drift. The generator and JSON Schema test validator are development dependencies only.

## License

[MIT](LICENSE)
