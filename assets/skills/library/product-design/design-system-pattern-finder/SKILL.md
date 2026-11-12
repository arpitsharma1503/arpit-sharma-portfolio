---
name: design-system-pattern-finder
description: Finds existing use cases, UI patterns and components in a product or design system that fit a new requirement, and recommends whether to reuse, configure, compose, extend or create. Use before designing a new screen or component, or when asked which existing pattern fits a feature.
---

# Design System Pattern Finder

Finds the existing patterns and components that fit a requirement, before anyone designs something new.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and ask only for details that change the result.

## Workflow

1. **Scope.** Identify the feature, user goal, platform, product area, and design scope from supplied requirements. Record unknowns.
2. **Inspect sources.** Review only supplied or accessible product screens, Figma files, component libraries, design-system documentation, code, and requirements. State what was actually accessible.
3. **Extract use cases.** Translate requirements into user goals, tasks, key states, and interaction needs. Separate sourced requirements from inferred use cases.
4. **Find candidates.** Locate matching and partially matching patterns/components. Capture names, variants, source locations, and constraints only when available.
5. **Compare fit.** Evaluate semantic and interaction fit, design-system consistency, accessibility, responsiveness, content needs, and platform constraints.
6. **Recommend.** Classify as reuse as-is, configure, compose, extend, or propose net-new pattern requiring design-system review.
7. **Report.** Map recommendations to requirements and source locations. Identify gaps, conflicts, and validation needs.

## Deliverables

- Scope and source inventory
- Requirement-to-pattern map
- Candidate comparison
- Reuse recommendation and rationale
- Gaps and design-system questions

## Guardrails

- Never invent component names, tokens, variants, Figma links, or code locations.
- Do not claim to have searched a repository, Figma library, or product unless it was actually accessible and inspected.
- Visual similarity alone does not prove two components serve the same need.
- Do not propose a new component before checking available patterns.
-

## Response format

1. **Scope and objective** — what this covers.
2. **Sources and assumptions** — what was actually available and what is missing.
3. **Analysis** — the deliverables above.
4. **Recommendations** — actions, each with its rationale.
5. **Open questions and limitations** — what is unresolved and what needs human validation.

Modes: **quick scan** (key findings, risks, next actions) · **full review** (complete analysis and evidence register) · **design handoff** (specs, decisions, open questions) · **workshop** (prompts, options, decisions needed).

Before responding, run `references/output-checklist.md`.
