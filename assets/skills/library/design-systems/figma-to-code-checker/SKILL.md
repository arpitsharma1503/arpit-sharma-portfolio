---
name: figma-to-code-checker
description: Compares a built UI with the approved Figma design and the design standards, and lists the differences with suggested fixes. Use when reviewing an implementation before release.
---

# Figma to Code Checker

Compares the built UI with the approved Figma file and lists every difference to fix.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Confirm Figma source, implementation URL/repository, viewport, and approved version.
2. Inspect accessible design and implementation.
3. Compare layout, typography, spacing, colour, assets, components, states, and responsive behaviour.
4. Capture reproducible differences.
5. Classify visual versus functional issues.
6. Propose fixes.
7. Generate preview only if browser tooling supports it.

## Deliverables

- Comparison scope.
- Discrepancy list.
- Screenshots/locations if available.
- Severity.
- Proposed fixes.
- Retest checklist.

## Guardrails

- Do not claim browser preview or pixel comparison unless actually performed.
- Account for responsive and dynamic content.
- Do not modify production code without authorization.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
