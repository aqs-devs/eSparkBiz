# Keyboard and Focus

Make all functionality operable with a keyboard.

Prefer native interactive elements because browsers already provide their
expected keyboard behaviour.

## Rules

- Use native `<button>`, `<a>`, `<input>`, `<select>`, and `<textarea>`
  whenever applicable.
- Do not use positive `tabindex` values.
- Do not add `tabindex="0"` to elements that should have been native controls.
- Use `tabindex="-1"` only when an element needs to receive programmatic focus
  without entering the normal Tab sequence.
- Preserve the document's logical source order.
- Do not use CSS ordering or positive `tabindex` values to create a different
  keyboard order from the visual/document order.
- Every keyboard-focusable element must have a visible focus indicator.
- Do not remove `:focus` or `:focus-visible` styling without providing an
  equivalent visible focus state.
- Keyboard operation must provide the same functional result as pointer
  interaction.

## Custom interactive components

Before implementing keyboard behaviour manually, check whether an existing
shadcn/ui or Radix primitive provides the required behaviour.

For custom widgets:

1. Define the interaction model.
2. Define which element owns focus.
3. Define how users enter the widget.
4. Define how users move within it.
5. Define how users leave it.
6. Define where focus goes after an action changes or closes the UI.

Do not make a non-interactive element keyboard-focusable merely to imitate a
button or link.

## Focus management

Move focus programmatically only when the user's context changes and the
destination is predictable.

Typical cases include:

- opening a dialog;
- closing a dialog;
- moving into a newly opened composite widget;
- displaying content that requires immediate user interaction;
- returning to the control that opened a temporary UI.

When a temporary UI closes, return focus to the invoking control unless the
user's action logically moves them to another location.

Do not move focus unnecessarily during ordinary rendering or state updates.

## Dialogs and overlays

For dialogs, popovers, menus, and other temporary interfaces:

- focus must enter the interactive content appropriately;
- users must be able to operate the interface using the keyboard;
- users must be able to leave or close the interface;
- focus must not become trapped unintentionally;
- focus should return to the invoking control when the temporary UI closes.

Prefer the project's existing Radix/shadcn primitives rather than implementing
focus trapping or restoration manually.

## Focus styling

Preserve a visible focus indicator.

Prefer the project's existing focus-visible styles, for example:

```tsx
className="focus-visible:outline-none focus-visible:ring-2"
