---
name: design-system-guidelines
description: Checks that a proposed UI uses the design system's established layouts, patterns and component conventions. Use when design or engineering wants a consistency check before build or review.
---

# Design System Guidelines

Checks a proposed UI follows the design system's layouts, patterns and conventions.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Identify target design system/version and supplied sources.
2. Inspect proposed UI or specification.
3. Map elements to documented components, tokens, layouts, and patterns.
4. Check variants, states, responsive behaviour, and accessibility guidance.
5. Identify deviations and justified exceptions.
6. Recommend compliant alternatives with references.

## Deliverables

- Guideline compliance matrix.
- Component/token mapping.
- Deviations.
- Recommended fixes.
- Unresolved questions.

## Guardrails

- Do not invent tokens or component APIs.
- Do not claim compliance without the relevant system documentation and inspected design.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
