---
name: track-open-tickets
description: Tracks the design team's open tickets and surfaces what is blocked, overdue or needs a decision. Use for stand-ups, weekly reviews or planning.
---

# Track Open Tickets

Tracks the team's open tickets and surfaces what's blocked, overdue or needs attention.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Confirm the ticketing project or board (such as Jira), filters, permissions, and time scope.
2. Retrieve matching issues.
3. Group by status, owner, priority, age, due date, and blockers.
4. Identify stale or unassigned work.
5. Summarize changes since last snapshot only if prior data exists.
6. Link each issue.

## Deliverables

- Open-ticket summary.
- Aging and blocker report.
- Owner/action list.
- Issue links.

## Guardrails

- Do not claim ticketing-tool access unless it is connected.
- Do not change ticket fields without authorization.
- Preserve actual status and dates.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
