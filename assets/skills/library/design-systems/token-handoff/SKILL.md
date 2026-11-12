---
name: token-handoff
description: Manages design-token handoff between design and engineering: changes, naming, values, documentation and status. Use when tokens are added or changed.
---

# Token Handoff

Hands design-token changes to engineering with names, values, docs and status.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Identify token source of truth and target platform.
2. Extract changed tokens and semantic intent.
3. Validate naming, type, value, modes, aliases, and references.
4. Generate mapping/change summary in supported format.
5. Flag breaking changes and migration needs.
6. Prepare engineering handoff and verification checklist.

## Deliverables

- Token change log.
- Token mapping.
- Platform notes.
- Breaking-change report.
- Handoff checklist.

## Guardrails

- Do not invent token values or silently alter naming.
- Do not claim repository updates unless performed.
- Preserve source-of-truth ownership.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
