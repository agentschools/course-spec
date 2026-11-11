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

Use the `learning-companion` skill when taking a course or following an existing tutorial with your agent. Install skills with the command above and select `learning-companion`, then give your agent the course or tutorial URL and ask it to guide you through it.

Your agent performs the implementation while explaining product choices, showing short API excerpts, and pausing for learner participation. It follows the tutorial's checkpoints and adds them at major concept boundaries when the material leaves them out.

## Who uses it

[Cloudflare Dev School](https://cfdev.school) uses this format for its built-in courses ([source](https://github.com/agentschools/cfdev.school/tree/main/courses)), and its students can take any course written in it.

## Learn more

- [SPEC.md](SPEC.md): the format
- [skills/create-course](skills/create-course/SKILL.md): an [Agent Skill](https://agentskills.io) for writing a course with your agent
- [skills/learning-companion](skills/learning-companion/SKILL.md): an Agent Skill for learning from an existing course or tutorial while your agent implements it
- [AGENTS.md](AGENTS.md): how this repo is set up, for contributors and their agents

## License

[MIT](LICENSE)
