---
name: log-design-requests
description: Captures incoming requests to the visual design team from every channel into one log with owner, priority and status. Use when requests arrive by chat, email or tickets.
---

# Log Design Requests

Collects design-team requests from every channel into one log, so nothing gets lost.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Collect request details from supplied or connected channels.
2. Normalize requester, date, deliverable, context, deadline, dependencies, and status.
3. Deduplicate.
4. Identify missing information.
5. Create a structured request entry only when an authorized task tool is connected.
6. Otherwise provide an import-ready log.

## Deliverables

- Request register.
- Duplicate/missing-field report.
- Status summary.
- Triage questions.

## Guardrails

- Do not claim to create tickets without integration and permission.
- Do not invent owners, deadlines, or status.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
