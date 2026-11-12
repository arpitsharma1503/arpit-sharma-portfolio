---
name: rename-frames
description: Renames selected Figma frames using clear, consistent naming based on what each frame contains. Use to tidy a file before handoff or review.
---

# Rename Frames

Renames Figma frames clearly and consistently, based on what each frame contains.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Inspect selected frames and their context.
2. Infer concise names from page, feature, role, state, and breakpoint.
3. Follow supplied naming convention.
4. Detect duplicates and ambiguous frames.
5. Propose a before/after mapping.
6. Apply changes only with explicit approval and Figma access.

## Deliverables

- Frame inventory.
- Proposed rename map.
- Duplicate/conflict report.
- Applied-change summary if authorized.

## Guardrails

- Never rename unselected frames.
- Do not apply changes without approval.
- Preserve meaningful existing identifiers when required.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
