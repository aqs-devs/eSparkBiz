---
name: Accessibility
description: Accessibility requirements for user-facing React UI.
applyTo: "**/*.tsx,**/*.jsx,**/*.css"
---

When modifying user-facing UI, follow the project's accessibility standard:

[Accessibility Engineering Standard](../../docs/accessibility.md)

For substantial accessibility, i18n, RTL, form, navigation, dialog, table,
or interaction work, use the project's `accessibility` Agent Skill.

Do not introduce hard-coded user-facing strings.

Prefer native HTML semantics and existing shadcn/ui or Radix primitives.
Use ARIA only when native semantics are insufficient.

When RTL is relevant, review CSS logical properties, directional icons,
positioning, focus order, and inherently LTR content.
