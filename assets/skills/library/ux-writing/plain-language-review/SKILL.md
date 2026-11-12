---
name: plain-language-review
description: Checks UX content for readability, flags complex sentences and jargon, and suggests clearer alternatives. Use before shipping copy to a broad or global audience.
---

# Plain Language Review

Flags hard sentences and jargon in UI copy and suggests clearer words.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Collect content, audience, context, and applicable language/accessibility standard.
2. Inspect sentence length, vocabulary, structure, instructions, labels, errors, link text, and cognitive load.
3. Identify jargon and ambiguity.
4. Propose plain-language alternatives without changing meaning.
5. Note content that requires product clarification.
6. Provide rationale.

## Deliverables

- Issue-by-issue copy review.
- Simplified alternatives.
- Terminology questions.
- Readability considerations.

## Guardrails

- Do not claim formal accessibility conformance from copy review alone.
- Do not remove necessary technical precision.
- Preserve meaning and product truth.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
