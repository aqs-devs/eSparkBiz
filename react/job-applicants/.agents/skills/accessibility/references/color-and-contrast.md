# Color, Contrast, and Motion

Do not make information, state, or interaction dependent on colour alone.

## Text contrast

For WCAG AA:

- normal text: minimum 4.5:1 contrast;
- large text: minimum 3:1 contrast.

Do not assume that a colour that looks readable on one display is accessible.

Check the actual foreground/background combination used by the component.

## Non-text contrast

Important visual UI components and graphical information should have sufficient
contrast against adjacent colours.

This includes relevant:

- input borders;
- button boundaries;
- focus indicators;
- selected controls;
- icons that communicate meaning;
- graphical objects required to understand information.

Do not assume that text contrast automatically makes the surrounding UI
component accessible.

## Do not use colour alone

Never communicate a meaningful distinction using colour as the only signal.

Examples requiring another signal:

- validation state;
- success/error;
- selected/unselected state;
- required/optional state;
- status;
- sorting direction;
- active navigation item.

Prefer combining colour with one or more of:

- text;
- iconography;
- shape;
- border;
- pattern;
- position;
- accessible state.

Example:

```tsx
<CircleCheck aria-hidden="true" />
<span>Application approved</span>
