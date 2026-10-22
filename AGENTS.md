# AGENTS.md

This repo defines the COURSE.md format: a school-agnostic format for courses that students' AI agents teach. It's inspired by the Agent Skills spec (https://agentskills.io/specification), and `COURSE.md` uses the same frontmatter fields as `SKILL.md`.

## Layout

- `SPEC.md`: the format, for authors and schools. The source of truth for the prose rules.
- `skills/create-course/SKILL.md`: an Agent Skill (follows the agentskills.io spec) with the procedure for an author's agent. It links to `SPEC.md` by its raw GitHub URL instead of repeating it, so the skill directory can be installed on its own. `README.md`'s copy-paste prompt points at the same skill by raw URL.
- `src/rules.ts`: ordering, slug, title, and interview-first rules. `src/schemas.ts`: Zod schemas for `COURSE.md` and exercise frontmatter. `src/index.ts` re-exports both.
- `src/spec.test.ts`: checks `SPEC.md`'s stated rules and the frontmatter in its examples against the code, and the skill's frontmatter against the Agent Skills rules. When the format changes, update `SPEC.md` and the code in the same commit.

## School-agnostic

Nothing here may depend on a particular school. School-specific behavior (default interviews, quizzes, tracks, progress APIs, enrollment) belongs in each school's own docs, which can link here. Examples may link to a school's courses as real-world examples.

## Consumers

Schools install this as a git dependency, not from npm (nothing is published):

```json
"@agentschools/course-spec": "github:agentschools/course-spec#<commit sha>"
```

`exports` points at TypeScript source (`src/index.ts`) and `SPEC.md`, so consumers need a bundler or test runner that compiles TypeScript from `node_modules` (Vitest 4 does, tested with a packed install; Astro's build hasn't been tested yet). `zod` is a peer dependency. Cloudflare Dev School (https://github.com/agentschools/cloudflare-dev-school) is the first consumer.

## Scripts

- `script/test`: typecheck (`tsc --noEmit`), then `vitest run`. No linter is configured.

## Style

Sentence case for headings. No em dashes. Plain, short prose, matching `SPEC.md`.

## Keep this file current

Update this file whenever you add a file or directory, change the format, or change how schools consume this repo.
