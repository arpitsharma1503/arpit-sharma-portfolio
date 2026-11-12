---
name: swap-archived-components
description: Replaces components from an archived library with their current-library versions, matching names exactly and preserving content and overrides. Use when migrating a file to a new library or theme.
---

# Swap Archived Components

Moves a file from an archived library to the current one, keeping content and overrides.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Identify archived and current libraries.
2. Compare exact component names, variants, properties, and dependencies.
3. Create a mapping.
4. Flag unmatched or changed components.
5. Assess content and override preservation.
6. Propose batch plan.
7. Execute swaps only with explicit authorization and available Figma integration.
8. Verify results.

## Deliverables

- Component mapping.
- Exact-match report.
- Unmatched list.
- Migration plan.
- Verification report.

## Guardrails

- Do not substitute approximate matches silently.
- Do not claim override preservation without verification.
- Do not perform bulk swaps without approval.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
