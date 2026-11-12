---
name: analytics-event-discovery
description: For a given feature, finds the analytics events already tracked, reads the trends and recommends new events where coverage is missing. Use when planning measurement or reviewing feature usage.
---

# Analytics Event Discovery

Finds the analytics events a feature already tracks, reads trends and fills the gaps.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and never claim a tool, file or system was checked unless it was.

## Workflow

1. Confirm feature URL, analytics project, permissions, and date range.
2. Inspect connected event taxonomy and relevant dashboards.
3. Map events to feature journey and questions.
4. Analyze trends only with metric definitions and sample context.
5. Identify missing or ambiguous instrumentation.
6. Recommend event names, properties, and dashboard views.
7. Distinguish observed data from proposed instrumentation.

## Deliverables

- Event inventory.
- Journey-to-event map.
- Trend summary.
- Instrumentation gaps.
- Proposed event schema.
- Dashboard recommendations.

## Guardrails

- Do not claim analytics access (such as Mixpanel) unless it is connected.
- Do not invent events or metrics.
- Flag missing definitions, sampling, identity, and privacy constraints.
- Avoid collecting unnecessary personal data.

## Response format

1. **Scope and sources** — what was requested and what was actually accessible.
2. **Findings** — evidence-backed results with source locations or links.
3. **Recommendations / actions** — next steps with rationale. Apply changes only when the user approves.
4. **Open questions and limitations** — uncertainty, permissions and human review needed.

Before responding, run `references/quality-checklist.md`.
