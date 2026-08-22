# RTL

The application supports:

- English (`en`) — LTR
- Arabic (`ar`) — RTL

RTL is a writing direction, not an instruction to visually reverse the entire
interface.

## Layout

When `dir="rtl"` is active:

- preserve logical reading order;
- prefer CSS logical properties;
- verify text alignment;
- verify spacing and positioning;
- verify popover and dropdown anchoring.

Prefer:

- `ms-*` / `me-*`
- `ps-*` / `pe-*`
- `text-start` / `text-end`
- `start-*` / `end-*`

over physical equivalents where the property represents logical direction.

Do not mechanically replace physical properties when the position is
intentionally physical.

## Directional icons

Review icons representing:

- back / forward;
- previous / next;
- indent / outdent;
- text direction.

Do not assume that a left-pointing icon has the same meaning in RTL.

## Bidirectional content

Keep inherently LTR content readable, including:

- URLs;
- email addresses;
- phone numbers;
- code;
- technical identifiers.

Use an appropriate `dir` override when necessary.

## Direction

Set the document direction from the active locale.

Prefer the document's `dir` attribute over manually reversing individual
components.

## Logical properties

Prefer CSS logical properties for directional layout:

```css
margin-inline-start: 1rem;
padding-inline-end: 1rem;
inset-inline-start: 0;
text-align: start;
