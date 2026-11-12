# Evidence and confidence reference

## Evidence classes

| Class | Meaning | Example |
|---|---|---|
| Direct qualitative | A participant/customer explicitly described an experience | Interview note or verbatim support message |
| Observed behaviour | Behaviour observed in a usability session or recorded workflow | User cannot locate a control during a test |
| Quantitative product data | Instrumented behaviour with metric definition and context | Completion rate over a defined period |
| Operational signal | Support volume, escalation, sales feedback, operational notes | Repeated ticket category |
| Stakeholder assertion | A stakeholder's belief or reported understanding | PM says customers are confused |
| Product requirement | A stated product or business requirement | PRD requirement or acceptance criterion |

These classes are not interchangeable. Stakeholder assertions and product requirements do not independently prove user behaviour.

## Confidence rubric

- High: multiple independent, relevant sources converge; or robust quantitative evidence is clearly defined and contextualized.
- Medium: one credible source or several incomplete signals support the finding.
- Low: indirect, ambiguous, sparse, old, or conflicting evidence.

Confidence describes support for the finding, not the importance of the problem.

## Citation format

Use source IDs plus precise locators:
- `[S1, p. 4]`
- `[S2, section "Onboarding"]`
- `[S3, ticket #1234]`
- `[S4, interview dated 2026-05-10]`

If a locator is unavailable, cite the source name and say that the precise location was not available.

## Common evidence traps

- Treating a feature request as proof of the underlying need.
- Treating frequency in a small or biased sample as population prevalence.
- Treating correlation as causation.
- Comparing metrics with different definitions or time windows.
- Treating silence in a source as evidence that a problem does not exist.
- Counting duplicated content as independent corroboration.
- Turning a stakeholder opinion into a user quote.
