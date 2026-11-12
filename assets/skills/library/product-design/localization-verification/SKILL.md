---
name: localization-verification
description: Reviews UI strings, screens and flows across languages and locales for terminology, meaning, layout and text expansion, and locale-specific formats. Use before releasing a product in a new language or region.
---

# Localization Verification

Checks strings and screens across languages for terminology, layout breaks and locale formats.

Work only from what the user supplies or what you can actually access. If inputs are missing, say what is missing, continue where it is responsible to, and ask only for details that change the result.

## Workflow

1. **Define locale scope.** Identify source language, target languages/locales, product surface, platform, scripts, and review type.
2. **Collect references.** Gather source strings, approved translations, glossary, style guide, screenshots, character limits, and locale requirements.
3. **Review terminology.** Check consistent product terms, labels, feature names, tone, formality, and glossary compliance.
4. **Review language.** Check meaning, grammar, clarity, cultural appropriateness, ambiguity, placeholders, pluralization, date/time/number/currency formats, and RTL needs where relevant.
5. **Review UI fit.** Using screenshots or component constraints, flag truncation, wrapping, overflow, clipping, alignment, and text expansion.
6. **Review locale behaviour.** Check formats, sorting, input masks, validation, keyboard/input methods, search, collation, accessible names, and fallback where specified.
7. **Classify issues.** Record locale, string/screen, issue, impact, evidence, severity rationale, and suggested correction or reviewer question.
8. **Validate.** Produce a fix list and identify items requiring native-speaker, legal, cultural, or in-context review.

## Deliverables

- Locale/source inventory
- Terminology report
- String-level review
- UI expansion/layout risks
- Locale behaviour checklist
- Issue log
- Native-speaker validation questions

## Guardrails

- Do not claim native-speaker validation unless performed by a qualified reviewer.
- Distinguish language from regional locale conventions.
- Preserve placeholders, variables, markup, and string IDs unless asked to edit.
- Do not infer cultural preferences from stereotypes.
- Visual findings require screenshots, rendered UI, or measured constraints.
- Flag ambiguous source copy before evaluating translation.

## Response format

1. **Scope and objective** — what this covers.
2. **Sources and assumptions** — what was actually available and what is missing.
3. **Analysis** — the deliverables above.
4. **Recommendations** — actions, each with its rationale.
5. **Open questions and limitations** — what is unresolved and what needs human validation.

Modes: **quick scan** (key findings, risks, next actions) · **full review** (complete analysis and evidence register) · **design handoff** (specs, decisions, open questions) · **workshop** (prompts, options, decisions needed).

Before responding, run `references/output-checklist.md`.
