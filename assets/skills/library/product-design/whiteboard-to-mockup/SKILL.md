---
name: whiteboard-to-mockup
description: Turns sketches, whiteboard photos, flowcharts and notes into a structured journey map, screen inventory and first-draft screen specifications ready for Figma. Use after a workshop or whiteboard session.
---

# Whiteboard to Mockup

Turns sketches and whiteboard photos into a journey map and screen specs ready for Figma.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and ask only for details that change the result.

## Workflow

1. **Inspect sources.** Review uploaded images, sketches, flowcharts, annotations, and notes. Transcribe only legible content and mark uncertain text.
2. **Extract flow.** Identify actors, entry points, steps, decisions, branches, loops, system responses, and end states.
3. **Expose ambiguity.** List unclear arrows, missing transitions, undefined terms, and contradictory annotations. Do not silently resolve them.
4. **Create journey.** Organize stages, user goals, actions, system responses, pain points, and opportunities where supported.
5. **Define screens.** Derive candidate screens, dialogs, panels, and states. Mark inferred screens as proposals.
6. **Apply design system.** Use supplied design-system documentation and tokens. If absent, stay neutral and request it before prescribing components.
7. **Specify screens.** For each screen define purpose, hierarchy, content, components, interactions, states, accessibility, and responsive behaviour.
8. **Prepare handoff.** Produce Figma-ready page/frame/component plan and naming suggestions. Use Figma tools only if available and authorized.
9. **Review coverage.** Check branches, decisions, errors, empty, loading, and completion states; list gaps.

## Deliverables

- Source transcription and uncertainty log
- Flow structure
- Journey map
- Screen inventory
- Screen specifications
- Design-system mapping
- Figma-ready handoff brief
- Open questions

## Guardrails

- Do not invent illegible text or uncertain flow connections.
- Distinguish original sketch content from design interpretation.
- Do not claim to create/edit Figma files without successful tool use.
- Do not invent design-system components or tokens.
- A first draft is not a validated final design.

## Response format

1. **Scope and objective** — what this covers.
2. **Sources and assumptions** — what was actually available and what is missing.
3. **Analysis** — the deliverables above.
4. **Recommendations** — actions, each with its rationale.
5. **Open questions and limitations** — what is unresolved and what needs human validation.

Modes: **quick scan** (key findings, risks, next actions) · **full review** (complete analysis and evidence register) · **design handoff** (specs, decisions, open questions) · **workshop** (prompts, options, decisions needed).

Before responding, run `references/output-checklist.md`.
