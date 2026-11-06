# AGENTS.md

This repo defines the COURSE.md format: a school-agnostic format for courses that students' AI agents teach. It's inspired by the Agent Skills spec (https://agentskills.io/specification), and `COURSE.md` uses the same frontmatter fields as `SKILL.md`.

## Layout

- `SPEC.md`: the format, for authors and schools. The source of truth for the prose rules.
- `SKILL.md`: an Agent Skill (follows the agentskills.io spec) with the procedure for an author's agent. It reads the adjacent `SPEC.md`, so a pinned install is self-contained. The repo root is the skill directory; `src/` includes the matching runtime rules and tests for schools.
- `src/rules.ts`: ordering, slug, title, and interview-first rules. `src/schemas.ts`: Zod schemas for `COURSE.md` and exercise frontmatter. `src/index.ts` re-exports both.
- `src/spec.test.ts`: checks `SPEC.md`'s stated rules and the frontmatter in its examples against the code, and the skill's frontmatter against the Agent Skills rules. When the format changes, update `SPEC.md` and the code in the same commit.

## School-agnostic

Nothing here may depend on a particular school. School-specific behavior (default interviews, quizzes, tracks, progress APIs, enrollment) belongs in each school's own docs, which can link here. Examples may link to a school's courses as real-world examples.

## Consumers

Schools vendor a pinned copy of `SKILL.md`, `SPEC.md`, `LICENSE`, and `src/` (including tests) into `.agents/skills/create-course/`, recording the upstream commit. Update all of them together. Schools import the TypeScript source directly with their bundler; `zod` is required at runtime, and `vitest` plus `yaml` run the tests. Cloudflare Dev School (https://github.com/agentschools/cfdev.school) is the first consumer.

The package exports remain for existing consumers migrating from the GitHub npm dependency. Keep them working while the skill becomes the primary distribution. The repo's own `package.json` and lockfile provide its development and CI tools.

## Scripts

- `script/test`: typecheck (`tsc --noEmit`), then `vitest run`. No linter is configured.
- `.github/workflows/ci.yml` runs `script/test` on pushes to `main` and on pull requests.

## Style

Sentence case for headings. No em dashes. Plain, short prose, matching `SPEC.md`.

## Keep this file current

Update this file whenever you add a file or directory, change the format, or change how schools consume this repo.
