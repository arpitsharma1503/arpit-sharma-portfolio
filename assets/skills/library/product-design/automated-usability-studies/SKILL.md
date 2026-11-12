---
name: automated-usability-studies
description: Stress-tests a workflow or prototype against requirements and usability heuristics by walking through tasks from defined user perspectives. Use for an early, simulated usability audit before real testing. Not a substitute for research with real participants.
---

# Automated Usability Studies

Walks through tasks against heuristics and requirements to catch issues early. A simulated audit, not user research.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and ask only for details that change the result.

## Workflow

1. **Define scope.** Identify product, workflow, target task, platform, prototype fidelity, requirements, and evaluation boundaries.
2. **Define perspectives.** Use roles and characteristics explicitly supplied by the user or source material. If absent, create clearly labelled task perspectives, not fabricated demographic personas.
3. **Build scenarios.** For each task, specify trigger, goal, starting state, expected outcome, and known constraints.
4. **Walk through.** Step through each described interaction. Record assumptions whenever interface or behaviour is unspecified.
5. **Evaluate heuristics.** Assess system status, real-world match, user control, consistency, error prevention, recognition, efficiency, minimalist design, recovery, help, and accessibility.
6. **Check coverage.** Map workflow steps and states to requirements and acceptance criteria. Flag missing, ambiguous, or contradictory behaviour.
7. **Rate findings.** Describe issue, affected task, user impact, severity rationale, confidence, and next action.
8. **Report limits.** Distinguish simulated walkthrough observations from findings observed with real participants. Recommend real testing when warranted.

## Deliverables

- Task scenarios
- Step-by-step walkthrough
- Heuristic findings
- Requirement coverage and gaps
- Severity-ranked issues with rationale
- Validation plan

## Guardrails

- Never claim simulated personas are real participants or call this a user study.
- Do not invent click paths or interface states; label unknowns.
- Do not fabricate task times, completion rates, error rates, quotes, or sample sizes.
- Severity ratings need rationale and confidence.
- Accessibility review is preliminary unless specialist testing was actually performed.

## Response format

1. **Scope and objective** — what this covers.
2. **Sources and assumptions** — what was actually available and what is missing.
3. **Analysis** — the deliverables above.
4. **Recommendations** — actions, each with its rationale.
5. **Open questions and limitations** — what is unresolved and what needs human validation.

Modes: **quick scan** (key findings, risks, next actions) · **full review** (complete analysis and evidence register) · **design handoff** (specs, decisions, open questions) · **workshop** (prompts, options, decisions needed).

Before responding, run `references/output-checklist.md`.
