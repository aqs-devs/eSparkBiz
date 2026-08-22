# ARIA

Use ARIA only when native HTML cannot express the required semantic, state,
property, or relationship.

ARIA does not add behaviour. It communicates semantics to assistive technology.

## First rule

Before adding ARIA:

1. Check whether native HTML provides the required semantics.
2. Check whether the project's shadcn/ui or Radix primitive already provides
   the required ARIA behaviour.
3. Use native HTML or the existing primitive when possible.
4. Add ARIA only when it solves a specific accessibility requirement.

Do not add ARIA merely because a component "looks accessible".

## Native HTML first

Prefer:

```tsx
<button type="button">Delete</button>
