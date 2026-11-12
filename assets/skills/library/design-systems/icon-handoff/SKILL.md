---
name: icon-handoff
description: Runs icon handoff end to end, from export and specs to tracking until engineering confirms it shipped. Use when new or updated icons are ready.
---

# Icon Handoff

Runs icon handoff end to end and tracks it until engineering confirms.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Inventory requested icons and source files.
2. Verify naming, sizes, formats, stroke/fill rules, variants, and usage context against supplied guidelines.
3. Prepare export package and implementation notes.
4. Create handoff tasks/status fields.
5. Track engineering confirmation if connected.
6. Report blockers and completion evidence.

## Deliverables

- Icon inventory.
- Export/handoff checklist.
- Implementation notes.
- Status tracker.
- Outstanding items.

## Guardrails

- Do not invent icon assets or mark engineering work complete without confirmation.
- Preserve licensing and asset provenance.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
