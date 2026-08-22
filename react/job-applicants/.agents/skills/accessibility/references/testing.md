# Accessibility Testing

Accessibility testing uses multiple forms of evidence.

Automated checks do not replace manual testing.

## Automated

Run the project's available accessibility checks when relevant.

Check for issues such as:

- missing accessible names;
- invalid ARIA;
- incorrect roles;
- missing form labels;
- duplicate IDs;
- contrast problems;
- invalid document structure.

A clean automated result does not prove that the UI is accessible.

## Keyboard

For affected workflows:

1. Start without using the mouse.
2. Navigate with `Tab` and `Shift+Tab`.
3. Operate interactive controls using the expected keyboard interaction.
4. Verify visible focus.
5. Test dialogs, menus, popovers, and other temporary UI.
6. Verify focus moves predictably.
7. Verify focus is restored appropriately after temporary UI closes.

Test workflows, not merely isolated components.

## Screen reader

Use a screen reader for representative workflows when changes affect:

- navigation;
- forms;
- dialogs;
- dynamic content;
- custom widgets;
- accessible names or descriptions;
- status or error announcements.

Verify that users can determine:

- what each control does;
- where they are;
- what changed;
- what errors occurred;
- how to recover.

Do not claim screen-reader compatibility without testing it.

## Responsive and zoom

When relevant, test:

- narrow viewport widths;
- browser zoom;
- increased text size.

Check for:

- clipped content;
- overlapping content;
- inaccessible scrolling;
- disappearing controls.

## RTL

For RTL-sensitive changes, test the Arabic locale.

Verify:

- document direction;
- text alignment;
- logical spacing;
- directional icons;
- keyboard/focus order;
- forms;
- tables;
- overlays.

## Reporting

Distinguish between:

- automated checks;
- keyboard testing;
- screen-reader testing;
- manual visual inspection.

Report only what was actually verified.

Do not claim "fully accessible" or "WCAG compliant" based solely on automated testing.
