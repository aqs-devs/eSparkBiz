---
name: accessibility
description: >
  Project-specific accessibility engineering rules for the Job Applicants
  React application. Use proactively whenever creating, modifying, reviewing,
  or testing user-facing UI, React components, forms, tables, navigation,
  dialogs, interactive controls, internationalization, or RTL layouts.
---

# Accessibility Engineering

## Purpose

Treat accessibility as an implementation requirement, not a final audit.

Apply these rules whenever UI code changes, even when the user does not
explicitly mention accessibility.

Do not claim that a component or feature is accessible merely because an
automated scanner passes. Accessibility requires both automated evidence and
manual verification of representative user workflows.

## Project Context

This project uses:

- React + TypeScript
- React Router
- Tailwind CSS
- shadcn/ui and Radix primitives
- TanStack Form
- TanStack Table
- react-i18next
- English (`en`) LTR
- Arabic (`ar`) RTL

Prefer existing project components and design-system primitives over creating
new accessibility behavior from scratch.

---

## 1. Semantic HTML

### Required

- Prefer native HTML elements over generic elements with ARIA roles.
- Use `<button>` for actions.
- Use `<a>` / React Router links for navigation.
- Use headings (`h1`–`h6`) to represent document structure.
- Use `<label>` for form controls.
- Use lists for list content.
- Use table semantics for tabular data.

### Do not

- Use `<div>` or `<span>` as an interactive control when a native element
  provides the required behavior.
- Add ARIA roles merely to make markup "look accessible".
- Recreate keyboard, focus, or selection behavior already provided by
  shadcn/Radix primitives.

### Rule

Native HTML semantics take precedence over ARIA.

---

## 2. Accessible Names

Every interactive control must have an accessible name.

Check:

- buttons
- links
- inputs
- selects
- checkboxes
- radio buttons
- dialogs
- icon-only controls

For icon-only controls:

- provide an appropriate accessible name;
- use visible text when available;
- use `aria-label` only when a visible accessible name is not present.

Do not

- add redundant `aria-label` values that conflict with visible text.
- rely on:
  - icons alone;
  - placeholder text as the only label;
  - nearby visual text without a programmatic association;
  - `title` as the normal labelling mechanism.

New accessible names and descriptions are user-visible UI content and must use the project's i18n system.

---

## 3. Keyboard Accessibility

Every interactive workflow must be usable with a keyboard.

Verify:

- Tab reaches all intended interactive elements.
- Shift+Tab moves backwards logically.
- Enter activates links/buttons where appropriate.
- Space activates buttons/checkable controls where appropriate.
- Escape closes dismissible dialogs/popovers where appropriate.
- Focus does not become trapped unexpectedly.
- Focus does not disappear after opening or closing overlays.
- Focus order follows the logical reading and interaction order.

Do not solve keyboard behavior by adding custom event handlers when the
underlying native or Radix/shadcn primitive already provides it.

---

## 4. Focus

All functionality must be operable with a keyboard.

- Prefer native interactive elements.
- Do not use positive `tabindex` values.
- Use `tabindex="-1"` only for programmatic focus targets.
- Preserve logical source order.
- Keep focus indicators visible.
- Do not remove existing focus styles without an equivalent replacement.
- Keyboard interaction must provide the same functionality as pointer interaction.

For temporary interfaces such as dialogs, menus, and popovers:

- focus must enter the interface appropriately;
- keyboard users must be able to operate it;
- users must be able to close or leave it;
- focus must not become unintentionally trapped;
- focus should return to the invoking control when the interface closes.

Prefer existing shadcn/ui and Radix primitives instead of implementing focus management manually.

Focus must remain visible and meaningful.

When implementing overlays, dialogs, menus, popovers, comboboxes, or similar
components:

1. Identify the element that opened the UI.
2. Ensure focus moves into the interactive surface when required.
3. Ensure keyboard users can operate and dismiss it.
4. Restore focus to the triggering element when the interaction ends,
   unless there is a documented reason not to.

Do not remove visible focus indicators without replacing them with an
equivalent or stronger indicator.

---

## 5. Forms

For every form control:

- provide a programmatically associated label;
- expose required/optional status appropriately;
- expose validation errors to assistive technology;
- associate error/help text with the relevant control;
- preserve the user's entered value when validation fails;
- do not rely on colour alone to communicate errors;
- ensure the error message explains how to recover.

For dynamic validation:

- verify that the error is announced or otherwise discoverable;
- do not depend solely on visual placement or colour.

Use the project's existing TanStack Form and field components rather than
creating parallel form abstractions unless necessary.

Every form control must have an accessible name.

Prefer:

```tsx
<label htmlFor="email">Email</label>
<Input id="email" type="email" />
```

---

## 6. Tables and Data

For TanStack Table and other data-heavy UI:

- preserve meaningful table semantics;
- ensure column headers are identifiable;
- ensure sorting controls have an accessible name and state;
- ensure filter controls are keyboard accessible;
- expose sort/filter state to assistive technology where needed;
- do not communicate important state solely through colour or icons;
- ensure pagination controls have clear accessible names.

For icon-only previous/next controls, the accessible name must describe the
action, not merely the icon.

---

## 7. Dialogs, Menus, Popovers, and Overlays

Prefer shadcn/Radix primitives because they provide established interaction
patterns.

Verify:

- correct accessible role/name;
- keyboard operation;
- focus management;
- Escape behavior where appropriate;
- sensible focus restoration;
- no inaccessible background interaction while modal content is active.

Do not manually recreate modal or menu behavior unless the existing primitive
cannot satisfy the requirement.

---

## 8. Internationalization

All user-visible strings must go through `react-i18next`.

This includes:

- visible labels
- buttons
- headings
- descriptions
- validation errors
- empty states
- loading states
- status messages
- tooltips
- accessible names
- accessible descriptions

Do not leave newly introduced user-visible English strings hard-coded in JSX,
TSX, or UI configuration.

Translation keys should describe meaning rather than visual placement.

Prefer:

`t('actions.cancel')`

over:

`t('bottomRightButtonText')`

Keep translations semantically equivalent across locales.

---

## 9. RTL

Arabic (`ar`) is an RTL locale.

When `dir="rtl"` is active:

- layout must remain structurally correct;
- text alignment must follow the reading direction unless the content has
  a specific reason to remain LTR;
- spacing and positioning should use CSS logical properties where applicable;
- directional icons must represent the correct direction;
- navigation controls must not retain LTR-only meaning;
- popovers/dropdowns must anchor correctly;
- tables and filters must remain usable;
- focus order must remain logical.

Prefer logical Tailwind properties:

- `ms-*` / `me-*` instead of `ml-*` / `mr-*`
- `ps-*` / `pe-*` instead of `pl-*` / `pr-*`
- `text-start` / `text-end` instead of `text-left` / `text-right`
- `start-*` / `end-*` instead of `left-*` / `right-*`

Do not mechanically replace every physical property. Some values are
intentionally physical (for example, a visual asset whose orientation must
not mirror). Determine whether the property represents logical reading/layout
direction or an intentionally physical position.

### Directional icons

Icons representing concepts such as:

- back / forward
- previous / next
- indent / outdent
- text direction

must be reviewed under both LTR and RTL.

Do not assume that a left-pointing icon always means "back".

### Bidirectional data

Some values should remain LTR even inside an RTL interface, for example:

- phone numbers
- email addresses
- URLs
- code
- technical identifiers
- certain numeric values

Use an appropriate `dir` override where necessary rather than forcing all
content into RTL.

---

## 10. Colour and Contrast

Do not use colour as the only means of communicating:

- errors
- success
- selection
- status
- required state
- focus

Maintain sufficient contrast for text and important UI components.

Prefer existing project/design-system colour tokens instead of introducing
ad-hoc colours.

When changing themes, verify both light and dark modes.

---

## 11. Motion

Respect `prefers-reduced-motion`.

Do not introduce animation that is required to understand or operate the UI.

When an existing component/library handles reduced motion, preserve that
behavior.

---

## 12. Images and Icons

For informative images:

- provide meaningful alternative text.

For decorative images:

- ensure they are ignored by assistive technology when appropriate.

For icon-only controls:

- the control needs an accessible name.

For decorative icons adjacent to visible text:

- do not create redundant screen-reader output.

SVGs must not accidentally expose meaningless internal text or labels.

---

## 13. Loading, Empty, Error, and Status States

Every async UI state must remain understandable without relying solely on
visual changes.

Check:

- loading state
- empty state
- error state
- success state
- saving/submitting state
- pagination state
- filter state

Important status changes should be exposed appropriately to assistive
technology without creating excessive announcements.

Do not add live regions indiscriminately.

---

## 14. Accessibility Review Workflow

When modifying UI, follow this order.

### Step 1 — Inspect

Before changing code:

- identify the affected component;
- inspect existing shared UI primitives;
- identify existing accessibility behavior;
- identify existing translation and RTL behavior;
- identify related tests.

Do not replace existing accessibility behavior without understanding it.

### Step 2 — Implement

Use:

1. native HTML semantics;
2. existing shadcn/Radix primitives;
3. existing project abstractions;
4. ARIA only where native semantics are insufficient.

### Step 3 — Automated verification

Run the project's existing typecheck, lint, test, and accessibility checks
when available.

Automated accessibility checks are evidence, not proof of accessibility.

### Step 4 — Manual verification

For representative affected workflows, verify:

- keyboard-only operation;
- visible focus;
- logical focus order;
- screen-reader names and states where relevant;
- error recovery;
- zoom/reflow where relevant;
- light/dark themes when affected;
- English LTR;
- Arabic RTL when direction-sensitive UI is affected.

### Step 5 — Review the diff

Before considering the task complete:

- check for newly hard-coded UI strings;
- check for unnecessary ARIA;
- check for physical left/right CSS in RTL-sensitive code;
- check icon direction;
- check accessible names;
- check focus behavior;
- check that unrelated code was not modified.

---

## 15. Evidence and Claims

Use precise language.

Allowed:

- "axe reports no violations for this page."
- "Keyboard navigation was manually tested for the applicant form."
- "The Arabic locale correctly sets `dir="rtl"`."

Avoid:

- "The application is fully accessible."
- "WCAG compliant" based solely on automated testing.
- "Screen-reader accessible" without actual screen-reader verification.

If a requirement could not be manually verified, state that explicitly.

---

## 16. Definition of Done

A UI change is not complete until:

- [ ] semantic HTML is appropriate;
- [ ] every interactive control has an accessible name;
- [ ] keyboard operation works;
- [ ] visible focus is preserved;
- [ ] forms expose labels, errors, and recovery information;
- [ ] important state is not communicated by colour alone;
- [ ] user-visible strings are translated;
- [ ] RTL behavior is correct when relevant;
- [ ] directional icons were reviewed when relevant;
- [ ] automated checks were run when available;
- [ ] representative manual checks were performed when relevant;
- [ ] no unnecessary ARIA was introduced;
- [ ] no unrelated accessibility regressions were introduced.

---

## References

Use authoritative sources when a rule is unclear:

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA 1.2: https://www.w3.org/TR/wai-aria-1.2/
- WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/

For framework-specific behavior, prefer the official documentation for the
framework or component library being used.
