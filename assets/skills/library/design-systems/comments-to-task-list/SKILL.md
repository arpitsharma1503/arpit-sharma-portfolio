---
name: comments-to-task-list
description: Turns Figma comments and sticky notes into a structured task list placed as a frame on the canvas. Use after a review round to make feedback actionable.
---

# Comments to Task List

Turns Figma comments and sticky notes into a clear task list on the canvas.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Identify target Figma file/page/frame and comment scope.
2. Retrieve comments and sticky notes if authorized.
3. Deduplicate and classify feedback.
4. Preserve author/context/date where permitted.
5. Convert actionable comments into tasks with source links, suggested owner only if stated, and status.
6. Create a canvas frame only with Figma integration and approval.

## Deliverables

- Comment inventory.
- Grouped task list.
- Unresolved/ambiguous feedback.
- Figma frame specification or created frame confirmation.

## Guardrails

- Do not treat every comment as an approved change.
- Do not infer owners or decisions.
- Do not claim canvas updates unless successfully performed.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
