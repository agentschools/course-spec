# Course spec

A course-authoring agent skill and school-agnostic format for writing portable course material that AI agents teach. A course is a folder of plain Markdown files, or a single Markdown file, hosted wherever you like. Anyone can write one, and any school can teach it. You don't need an account or permission.

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

Then ask your agent to help you write a course. The skill includes its format reference and examples, so an installed copy works without fetching instructions from `main`.

Schools can check a pinned copy into `.agents/skills/create-course/`: `SKILL.md`, `SPEC.md`, `LICENSE`, and `src/` (including tests). Record the upstream commit, update those files together, and review the diff. The TypeScript rules can be imported directly from the skill's `src/index.ts` by a bundler that supports TypeScript. Zod 4 is required at runtime; Vitest and YAML run the tests. No npm dependency on this repo is needed. Existing package exports remain available for consumers migrating to the skill.

## Who uses it

[Cloudflare Dev School](https://cfdev.school) uses this format for its built-in courses ([source](https://github.com/agentschools/cfdev.school/tree/main/courses)), and its students can take any course written in it.

## Learn more

- [SPEC.md](SPEC.md): the format
- [SKILL.md](SKILL.md): an [Agent Skill](https://agentskills.io) for writing a course with your agent
- [AGENTS.md](AGENTS.md): how this repo is set up, for contributors and their agents

## License

[MIT](LICENSE)
