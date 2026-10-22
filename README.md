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

## Learn more

- [SPEC.md](SPEC.md): the format
- [skills/create-course](skills/create-course/SKILL.md): an [Agent Skill](https://agentskills.io) for writing a course with your agent
- [AGENTS.md](AGENTS.md): how this repo is set up, for contributors and their agents

## License

[MIT](LICENSE)
