# The course format

A course is a short series of exercises that a student's AI coding agent teaches them, one conversation at a time. It's plain Markdown, hosted wherever you like. Students start it by giving their agent its URL, for example "take the course at https://github.com/you/durable-objects-course".

This document is for course authors and for schools: the apps that track students' progress through courses. Schools can add their own rules on top, like a default interview or an API for reporting progress, but a course that follows this format should work in any of them.

## Where to host it

- A public git repo, for any course: `COURSE.md` at the root, and one Markdown file per exercise in `exercises/`. Students' agents clone it.
- A single Markdown file at any https URL, for a smaller course: a `COURSE.md` whose `##` sections are its exercises.

Private repos, and courses in a subdirectory of a repo, aren't supported yet.

## COURSE.md

```markdown title="COURSE.md"
---
name: durable-objects
description: "Build stateful apps on Cloudflare with Durable Objects, for developers who've deployed a Worker."
metadata:
  author: Your name
  url: https://github.com/you/durable-objects-course
---

# Durable Objects

What the course covers and who it's for, in a paragraph or two.
```

- `name`: lowercase letters, numbers, and single hyphens, at most 64 characters.
- `description`: what the course teaches and who it's for, at most 1,024 characters.
- `metadata`: optional string keys and values. Two are defined:
  - `author`: who wrote the course, shown to students.
  - `url`: the course's canonical URL. Schools key students' progress by the course's URL, so set this if the course might move or get linked to in more than one way. Otherwise it's the URL the student gave their agent.
- `license` and `compatibility` (prerequisites: accounts, tools, or other courses, at most 500 characters): optional, as in an Agent Skill's `SKILL.md`.
- No other keys. Schools may reject unknown ones, so a typo fails loudly instead of being ignored.
- Then a `# Title` and an introduction: what the course is about, who it's for, and what the student will end up with. Don't repeat the list of exercises; schools usually show it next to the introduction.

## Exercises

In a repo, each exercise is a file in `exercises/`:

```text
durable-objects-course/
├── COURSE.md
└── exercises/
    ├── 00-interview.md      optional
    ├── 01-first-object.md
    └── 02-websockets.md
```

- Order: natural filename order, so `2-alarms.md` comes before `10-cleanup.md`.
- Slug: the filename without `.md` or its number prefix, so `01-first-object.md` is `first-object`. Renumbering files to insert an exercise doesn't change slugs, so students keep their progress. Slugs follow the same rules as `name`.
- Title: the file's first `#` heading.
- Frontmatter is optional: a one-line `description`, and `agent-instructions`, which only the student's agent reads. No other keys.

```markdown title="exercises/01-first-object.md"
---
description: "Build a counter that keeps its state between Worker requests."
agent-instructions: |
  Help the student add a counter Durable Object to their Worker and
  deploy it. Before marking this exercise complete, fetch the deployed
  URL twice yourself and check the count went up.
---

# Create a counter

What the student will build and why, written for the student.
```

The body is for the student and their agent alike. Schools may show it to students on the web as a preview, so keep anything only the agent needs in `agent-instructions`.

In a single file, each `##` section of `COURSE.md` is an exercise, in order. Its title is the heading's text and its slug is the heading's GitHub-style anchor, so `## Create a counter` is `create-a-counter`. There's no frontmatter per exercise, so address any notes for the agent in the section itself.

```markdown title="COURSE.md"
---
name: kv-in-ten-minutes
description: "Store and read data with Workers KV, for developers who've deployed a Worker."
---

# KV in ten minutes

An introduction.

## Create a namespace

...

## Read it back

...
```

### Write clear titles and descriptions

- Keep exercise titles short and descriptive. Use an imperative verb-object phrase, such as "Create a counter" or "Deploy a Worker", to say what the student will accomplish. Keep the interview title as "Interview".
- When an exercise has a `description`, aim for one clear sentence summarizing the student's action or outcome at a high level. Add context beyond the title instead of repeating it, and avoid comma-separated task lists. Put individual steps in the body.

### Write the body as a tutorial

Make the body a complete tutorial with a default example: every step as its own section (`##` in an exercise file, `###` in a single-file course), with its commands and code. A student can follow it on the web, and every student's agent builds the same thing from it. Keep `agent-instructions` to short cues on top: the choices to ask the student for, where to ask for a prediction, the check, and what to shorten for students who already know a part. The agent swaps in the student's names and pitches each step to them.

If the student builds on the same thing across exercises, like an app or a test page, keep its shape stable, so each exercise's change stays small.

## Optional declarative components (proposal)

This section is exploratory. Ordinary `.md` remains the course format; no `.mdx` migration, JavaScript imports, new frontmatter keys, or interactive renderer is required. A course can include an optional, authored knowledge check using a literal [Markdoc tag](https://markdoc.dev/docs/syntax). This does not replace a school's quizzes or progress policy. Interviews still are not quizzed.

### A pop quiz

The first proposed component is a block-level `pop-quiz` tag in an exercise body, or inside a single-file course's exercise section. See the complete [example](examples/pop-quiz.md). The tag has a normal Markdown body containing the same question and ordered choices, followed by an invitation to answer in chat. A capable renderer can replace this fallback with a single-selection control. A plain Markdown viewer may display the entire opening tag, including its answer key and feedback, before the question. The fallback remains readable without executing anything, but is an open-book reference, not an unspoiled quiz. Only an adopting renderer or chat agent can present the question without that source metadata.

Attributes are literal data only:

- `id`: required stable quiz ID, with the same lowercase letters, numbers, single-hyphen and 64-character limit as a course name. Unique within an exercise, not globally.
- `question`: required nonblank plain text, at most 1,024 characters.
- `choices`: required array of 2–8 objects. Each contains only a stable `id`, a nonblank `label` (at most 512 characters), and nonblank `feedback` (at most 2,048 characters). Choice IDs follow the same naming rule and must be unique within the quiz. Labels must be distinct after trimming surrounding whitespace and ignoring case.
- `answer`: required string containing exactly one existing choice ID. It is not an array or an index. There are no per-choice correctness booleans.
- `mode`: `practice` (the default) or `progression`. No other values or attributes.

The normal Markdown fallback must repeat the same question and choice labels in the same order. It must not state which choice is correct before the learner answers. Keep authored feedback in the data, not in an immediately displayed answer list. This is not secure assessment data: anyone can read the answer key in the source. Use it for learning, not high-stakes grading.

Renumbering exercises or reordering choices must not change their IDs. Scope persisted answers by canonical course URL, exercise slug and quiz ID, and record the selected choice ID, never its display number. If a question or choice changes meaning, use new IDs or invalidate affected saved answers. Persistence and content revision policy belong to the school; this spec does not introduce a progress API or repository writes.

### Practice and progression

For `practice`, the learner may answer, retry or skip. It must not gate the exercise. For `progression`, a correct submitted answer is an authored knowledge checkpoint before the agent considers moving on. It is never sufficient evidence that an exercise's practical check or physical action happened. The existing checks in `agent-instructions` still apply; the school retains its completion policy.

Selecting an option is not submission. After the learner explicitly submits one choice, return that choice's feedback and whether it is correct. Let the learner change the selection and submit again. Do not automatically complete the exercise, run a tool, or advance to the next lesson on selection or on a correct answer. The learner's subsequent request to continue is separate from evaluating the quiz.

A renderer should use keyboard-operable radio controls with associated labels, a separate submit action, and textual feedback that can be announced to assistive technology. Do not rely on color to communicate correctness. Visual layout, retry presentation and school-specific navigation are not prescribed here.

### Chat-only fallback

An agent without a quiz UI presents the question and choices as ordinary text, asks for one answer, and waits. Map the learner's current display number or unambiguous text to its stable ID; ask for clarification if ambiguous. Evaluate the selected ID and give its feedback, then allow another attempt. Do not choose on the learner's behalf or disclose the correct answer in the chat presentation before an attempt; the public source and plain Markdown view still expose it. In progression mode, handle the same checkpoint in chat rather than deadlocking on an unavailable widget. If the data is invalid or unavailable, explain the problem instead of silently marking it passed; the school or author must resolve it or explicitly use its own completion policy.

### Parsing and validation boundary

The exported `popQuizSchema` validates decoded attributes; `exercisePopQuizzesSchema` also rejects repeated quiz IDs in one exercise. `evaluatePopQuiz` is a pure feedback helper: it validates data and the submitted ID and has no progress, rendering or persistence side effects. These exports do not parse Markdown or implement a quiz UI.

An adopting school must parse the Markdoc syntax, reject parser errors and duplicate attributes, and pass only literal attributes to the schema. Do not resolve variables, functions, expressions, includes or arbitrary component names. Reject nested quizzes, self-closing quizzes without a fallback, and nested custom tags or executable directives in the fallback; ordinary Markdown headings, paragraphs and lists are allowed. Tags inside fenced code examples must remain inert: Markdoc may expose them as AST children, so adapters must explicitly exclude code and fence subtrees. Some malformed delimiters are left as raw text rather than parser errors; adapters must diagnose apparent unparsed pop-quiz declarations too. Validate all quiz IDs in the current exercise together, and reject quizzes in the interview. Unknown components should retain readable fallback content rather than execute code.

Escape question, choice and feedback strings as text. Do not interpret them as trusted HTML, Markdown links, scripts or callbacks. Also sanitize the entire Markdown fallback, not just attributes: reject raw HTML, executable directives and unsafe URL schemes such as `javascript:`. Do not render authored HTML directly. The component does not authorize network requests, telemetry, tool calls or transmission of learner answers. Existing learner consent and school policy still apply.

The Markdoc parser is a development-only dependency here to test the example syntax. No production Markdoc dependency is added to the main exports. Renderer integration, full-document AST validation and school progress integration remain work for adopting schools, not implemented by this proposal.

## The interview

Every course starts with an interview, so the student's agent can pitch the course at the right level. To write your own, add an exercise with the slug `interview` (`00-interview.md`, or a `## Interview` section). It always comes first, whatever its filename.

- Ask at most four short, independent questions, to keep the interview brief.
- Write them as plain prose, like a list, saying where an answer is free text or can be several choices. There's no question format: the student's agent decides how to ask them, so don't prescribe a harness or question UI, and it shouldn't invent choices for open questions.
- Ask about the course's subject, not the student's general background. Schools usually ask that once, in their own interview, and share the answers with every course.
- Interviews aren't quizzed.

Leave it out and the school adds a default interview, usually one where the agent writes a few questions from your course's content.

## Personalize every exercise

The interview is only worth asking if its answers change the course. Plan for that from the start:

- Use every answer somewhere in the course, or don't ask the question.
- If students will want different amounts of detail, ask how deep they want to go: for example the big picture with no code, how it works with the key settings, or hands-on with all the code. Ask about depth, not job titles: few students describe themselves with the terms your company uses. Example roles can be hints.
- Repeat a one-line cue for each level in every exercise. A later exercise may be taught in a fresh session whose agent never read the interview's instructions.
- Let the student change their answer anytime, for example by saying "less code" or "go deeper".

## Make every exercise checkable

An exercise is complete when the student's agent says so, so give the agent something concrete to check first: fetch a deployed URL and compare the response, run a command and read its output, or look at a file the student changed. Say what the check is in `agent-instructions`, and say plainly that completion waits on it. Some schools also have the agent quiz the student after each exercise, written from the exercise itself.

## Involve the student

The student's agent does the work: it runs the commands, writes the code, and deploys. Left to itself, it will do the whole exercise in one go while the student watches, and the student finishes knowing that it works but not why. So point out the moments where the student should take part. Pick what fits each exercise; none of these are required:

- Let the student make the choices: a name, the text a page shows, what to store.
- Before a command runs, ask the student to predict what it will do.
- Have the agent show the key change (a config line, a handler) and wait for the student's OK before it ships.
- Ask a "what would change if…" question that applies the idea to a new case.
- Give the student something to try once it works: change it and redeploy, or store a few values of their own.
- Let the student see the problem before the fix, and let them investigate it: have them run the traffic or click the buttons and guess what's wrong, instead of finding an answer the agent set up for them.

Tell the agent to wait for the student's reply at each of these moments, and put try-it steps before the check that completes the exercise. Agents mark an exercise complete and move on, so anything written after that gets skipped.

Be honest where a demo cuts corners (for example, a button that stands in for a signed-in user), and make sure the course's code doesn't contradict what the course teaches.

## Cleanup

At the end of a course, offer to clean up local and deployed resources created during it. Explain any ongoing costs and ask what the student wants to keep. Get approval before deleting anything, preserve pre-existing or shared resources, and keep local source code by default. Cleanup is optional and doesn't block course completion.

## Examples

[Cloudflare Dev School](https://github.com/agentschools/cfdev.school/tree/main/courses)'s built-in courses use this format:

- [Agent setup's COURSE.md](https://github.com/agentschools/cfdev.school/blob/main/courses/agent-setup/COURSE.md) and [its interview](https://github.com/agentschools/cfdev.school/blob/main/courses/agent-setup/exercises/00-interview.md)
- [The Workers course's COURSE.md](https://github.com/agentschools/cfdev.school/blob/main/courses/fundamentals/workers/COURSE.md) and ["Deploy a Worker"](https://github.com/agentschools/cfdev.school/blob/main/courses/fundamentals/workers/exercises/01-deploy-a-worker.md), which checks the deployed URL before completing
