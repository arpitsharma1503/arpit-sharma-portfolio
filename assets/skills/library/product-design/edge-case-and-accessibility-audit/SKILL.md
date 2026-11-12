---
name: edge-case-and-accessibility-audit
description: Audits designs, prototypes, requirements or builds for missing states, edge cases, error handling and accessibility gaps, and turns them into a remediation list and acceptance criteria. Use before or during development.
---

# Edge Case & Accessibility Audit

Finds missing states, edge cases, error handling and accessibility gaps before they ship.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and ask only for details that change the result.

## Workflow

1. **Define scope.** Identify screens, workflows, platform, roles, supported devices, design system, implementation stage, and applicable accessibility standard if specified.
2. **Inventory states.** Identify default, loading, empty, success, error, partial, disabled, permission, offline, timeout, and recovery states where relevant.
3. **Explore edge cases.** Consider boundary values, missing/invalid input, long content, duplicate actions, concurrency, interrupted workflows, stale data, permission changes, network failure, session expiry, and unexpected responses.
4. **Review resilience.** Check prevention, feedback, recovery, destructive-action safeguards, focus behaviour, keyboard access, and preservation of user-entered data.
5. **Audit accessibility.** Review semantics, keyboard navigation, focus order/visibility, labels, error identification, contrast evidence, resizing, zoom/reflow, target size, motion, status announcements, and assistive technology.
6. **Map requirements.** Link issues to requirements, acceptance criteria, screens, components, or implementation details where available.
7. **Classify findings.** Describe issue, scenario, impact, evidence, severity rationale, confidence, correction, and validation method.
8. **Report limits.** Separate inspection findings from issues requiring automated scans, assistive technology, device testing, or specialist review.

## Deliverables

- Audit scope and source register
- State coverage matrix
- Edge-case scenario matrix
- Error-state inventory
- Accessibility findings
- Remediation list
- Acceptance criteria and retest checklist

## Guardrails

- Do not claim WCAG conformance from visual-only review.
- Do not claim automated testing unless a tool was actually run.
- Do not invent application behaviour; label potential scenarios as such.
- Cite applicable standards/versions only when supplied or verified.
- Explain severity assumptions and confidence.
- Focus on realistic and consequential scenarios rather than treating every edge case equally.

## Response format

1. **Scope and objective** — what this covers.
2. **Sources and assumptions** — what was actually available and what is missing.
3. **Analysis** — the deliverables above.
4. **Recommendations** — actions, each with its rationale.
5. **Open questions and limitations** — what is unresolved and what needs human validation.

Modes: **quick scan** (key findings, risks, next actions) · **full review** (complete analysis and evidence register) · **design handoff** (specs, decisions, open questions) · **workshop** (prompts, options, decisions needed).

Before responding, run `references/output-checklist.md`.
