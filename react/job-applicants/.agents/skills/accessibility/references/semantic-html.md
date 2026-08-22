# Semantic HTML

Use native HTML elements according to their meaning and behaviour before
adding ARIA or custom interaction.

## Rules

- Use `<button>` for actions.
- Use React Router `<Link>` for navigation.
- Use `<a href="...">` for external or ordinary URL navigation.
- Use `<form>` for form submission.
- Use `<label>` for form controls.
- Use `<fieldset>` and `<legend>` for groups of related controls.
- Use `<input>`, `<select>`, and `<textarea>` for their corresponding inputs.
- Use `<table>` for tabular data.
- Use `<nav>` for navigation.
- Use `<main>` for the page's primary content.
- Use `<header>`, `<footer>`, and `<section>` according to their semantic
  purpose.
- Use headings (`h1`–`h6`) to express document hierarchy, not merely to obtain
  a visual font size.
- Use lists (`ul`, `ol`, `li`) for lists of related items.

## Actions vs navigation

Distinguish actions from navigation.

Use:

- `<button>` when activating the control performs an action.
- `<Link>` / `<a>` when activating the control navigates to another location.

Do not use a link with a fake or placeholder `href` to perform an action.

Do not use a generic element such as `<div>` or `<span>` with `onClick` when a
native button or link is appropriate.

## ARIA

Prefer native HTML semantics over equivalent ARIA roles.

Do not add ARIA that duplicates the native semantics of an element.

Use ARIA only when native HTML cannot express the required semantic, state, or
relationship, and follow the relevant ARIA pattern in `references/aria.md`.

Do not use `role="button"` as a substitute for a native `<button>` when a
native button can be used.

## Accessible names

Interactive controls must have an accessible name.

Prefer visible text associated with the native element.

For icon-only controls, provide an accessible name through the appropriate
accessible-name mechanism.

Do not rely on an icon's visual appearance to communicate the control's
purpose.

## Project-specific guidance

- Prefer the project's existing shadcn/ui and Radix primitives when they
  provide the required semantic and interaction behaviour.
- Do not replace a native semantic element with a generic wrapper merely to
  simplify styling.
- When using `asChild`, verify that the resulting DOM still contains the
  correct semantic element.
- When modifying an existing component, preserve correct semantics unless
  there is a concrete reason to change them.
- Use Tailwind for presentation; do not change an element's semantics merely
  to obtain a particular visual style.

## Examples

Valid:

```tsx
<Button type="button" onClick={handleDelete}>
  Delete
</Button>
