---
name: accessibility
description: >
  Accessibility engineering rules for the Job Applicants React application.
  Use when creating, modifying, reviewing, or testing user-facing UI, including forms, tables, navigation, dialogs, interactive controls, internationalization, and RTL layouts.
---

# Accessibility

Treat accessibility as an implementation requirement.

## Workflow

When changing user-facing UI:

1. Inspect existing semantics and project primitives.
2. Use native HTML before ARIA.
3. Preserve keyboard and focus behaviour.
4. Ensure controls have accessible names.
5. Expose form states, descriptions, and errors.
6. Check colour, contrast, and motion requirements.
7. Preserve table semantics.
8. Check RTL behaviour when relevant.
9. Run relevant automated and manual checks.

Read the relevant reference before implementing or reviewing:

- [Semantic HTML](references/semantic-html.md)
- [Keyboard and focus](references/keyboard-and-focus.md)
- [Forms](references/forms.md)
- [ARIA](references/aria.md)
- [Colour, contrast, and motion](references/color-and-contrast.md)
- [Tables](references/tables.md)
- [RTL](references/rtl.md)
- [Testing](references/testing.md)

Read [docs/accessibility.md](../../../docs/accessibility.md) when the project-level accessibility policy or acceptance criteria are relevant.

Prefer existing shadcn/ui and Radix primitives before implementing  accessibility behaviour manually.
