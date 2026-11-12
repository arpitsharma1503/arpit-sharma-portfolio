---
name: visual-review
description: Finds broken components, missing tokens, overridden text styles and spacing issues in designs or builds, then suggests or applies approved fixes. Use during a design QA or visual review pass.
---

# Visual Review

Finds broken components, missing tokens, style overrides and spacing issues, then suggests fixes.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Inspect target Figma frames or implementation.
2. Compare against current system.
3. Detect missing/broken instances, detached components, token gaps, text-style overrides, spacing inconsistencies, and layout anomalies.
4. Group findings.
5. Recommend fixes.
6. Apply only approved changes.
7. Recheck.

## Deliverables

- Visual review report.
- Issue locations.
- Recommended fixes.
- Approved change log.
- Retest checklist.

## Guardrails

- Do not claim exhaustive detection.
- Do not overwrite intentional exceptions without checking.
- Do not apply changes without approval.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
