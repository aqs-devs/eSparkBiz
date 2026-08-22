# Forms

Forms must expose the purpose, state, instructions, and errors of their
controls to both users and assistive technology.

Prefer native HTML form semantics and the project's existing form primitives.

## Labels

Every form control must have an accessible name.

Prefer a visible `<label>` associated with the control.

Use:

- `<label htmlFor="...">` + matching `id`;
- a component primitive that correctly creates the label/control
  association;
- `aria-labelledby` when the accessible name is provided by another
  appropriate element.

Use `aria-label` only when a suitable visible label cannot be used.

Do not rely on:

- placeholder text as the only label;
- nearby visual text without a programmatic association;
- icons alone;
- `title` as the normal labelling mechanism.

## Instructions and descriptions

When a control needs additional instructions, associate the description with the
control.

Examples:

- expected format;
- allowed values;
- password requirements;
- units;
- constraints that are not obvious from the label.

Do not put essential instructions only in placeholder text.

Descriptions should remain available when the control receives focus.

## Required fields

Required state must be communicated in a programmatically determinable way.

Prefer the native `required` attribute when it accurately represents the
requirement.

If the component system requires ARIA instead, use `aria-required`.

Also provide a visible indication of required fields when the form design
expects users to identify them visually.

Do not communicate required state through colour alone.

## Input purpose

Use the most appropriate native input type.

Examples:

```tsx
<Input type="email" />
<Input type="tel" />
<Input type="date" />
