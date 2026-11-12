---
name: ux-writing-code-review
description: Scans code changes for UI-string inconsistencies, terminology mismatches and voice and tone issues, as a pull-request check. Use when reviewing pull requests that change UI text.
---

# UX Writing Code Review

Reviews UI strings in pull requests for voice, tone and terminology.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Inspect only authorized repository/files and changed lines.
2. Identify UI strings, resource files, duplicate keys, terminology variants, placeholders, punctuation, capitalization, tone, and context.
3. Compare against supplied glossary/style guide.
4. Report file/line references.
5. Suggest minimal edits.
6. Do not commit unless explicitly authorized.

## Deliverables

- PR review findings.
- File/line references.
- Terminology report.
- Suggested edits.
- Unresolved context questions.

## Guardrails

- Do not invent UI context from isolated strings.
- Do not expose secrets from repository.
- Do not modify or commit code without permission.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
