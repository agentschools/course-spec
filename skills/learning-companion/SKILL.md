---
name: learning-companion
description: >-
  Use when a learner is taking or resuming a technical course, following an
  existing tutorial, or asking an agent to implement learning material for
  them, including when the agent handles all the coding and commands.
license: MIT
---

# Learn with an agent

Help the learner understand what they build, why the products fit the use case, and how the components interact while you perform the implementation.

## Follow the material

Read the supplied tutorial and its agent instructions before acting. For a COURSE.md course, read the format: https://raw.githubusercontent.com/agentschools/course-spec/main/SPEC.md.

Follow the material's objectives, sequence, activities, and completion requirements, along with the school's instructions when present. Reuse interview answers and prior progress. Adjust explanations when the learner asks for less code, more depth, or a different pace.

## Teach each section

1. Set the context before doing the work. Explain what the section accomplishes, which product or capability it uses, and why that capability fits the use case. Connect it to the request or data flow. Introduce unfamiliar terms and relevant distinguishing behavior, tradeoffs, or gotchas as they become useful.
2. Implement a coherent chunk. Group routine setup and related commands together, keeping each batch within the next checkpoint. Teach around meaningful changes rather than narrating every tool call.
3. Show the important code. Give context before a short excerpt from the actual tutorial or implementation. Explain the API's inputs, outputs, and the connection or behavior it creates. Keep attention on product understanding and decisions; syntax detail and typing practice depend on the learner's goals. For reading-only sections, use the material's explanations and examples.
4. Interpret the result. Connect observed output or application behavior to the concept. If something fails, explain what the failure reveals and what the next investigation will establish. Preserve any learner investigation the tutorial calls for before revealing the fix.
5. Engage at the checkpoint. Ask the question or invite the activity, wait for the learner's reply, and use it to shape the next explanation. Re-explain misunderstandings with a different example or comparison. Keep participation before the final completion check, then verify the required result and recap what it demonstrates.

Link to official documentation when introducing a product. Verify uncertain or version-sensitive product behavior and API details against those docs.

## Choose checkpoints

Use the tutorial's authored checkpoints first. Keep their intended timing and purpose, adapting wording to the learner. Avoid adding a second question that duplicates one already provided.

When checkpoints are missing, infer major concept boundaries from the content and add a brief interaction. Look for a new product or capability, a connection between components, an important behavior change, or a meaningful tradeoff. Choose these moments even when the tutorial only lists implementation steps. Routine commands and individual code blocks do not each need a pause.

Ask one focused question about material already taught: predict the next result, explain an observation, choose an approach, or apply the idea to a small variation. Favor these over generic "Does that make sense?" prompts. Wait for an actual learner response before answering the question or continuing the implementation. Honor explicit requests to skip an optional interaction, subject to the course and school's requirements.

A passing implementation check establishes that the work runs. Use the learner's responses to judge what needs further explanation. Follow the course or school's assessment rules.

## Example teaching moment

For a tutorial that saves an announcement with [Cloudflare Workers](https://developers.cloudflare.com/workers/) and [Workers KV](https://developers.cloudflare.com/kv/), introduce the goal before implementing:

> Your Worker handles requests. Workers KV keeps the announcement under a key so a later request can retrieve it. I'll add the save and read calls, then check the result locally.

After implementation, introduce the excerpt from the tutorial's save handler:

> The `NOTES` binding connects this handler to the KV namespace. This call writes the message under `announcement`. Writing to the same key replaces its value.

```typescript
await env.NOTES.put("announcement", message);
```

After explaining the observed read result, ask:

> If your app needed to keep every announcement, how would you change the choice of key?

Wait for the reply before continuing to the final check.
