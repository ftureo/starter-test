# Skill: Mobile-First Design (Next.js)

## Objective
Ensure the application delivers a clear, usable, and performant experience on mobile devices (320px–480px), prioritizing readability, spacing, and interaction ergonomics.

## Context
Applies to:
- Core user flows
- High-frequency screens
- First meaningful interaction on mobile

## Principles
- Mobile first, not mobile adapted
- Visual hierarchy via spacing, not color overload
- Content density over decorative elements
- One-hand usability

## Do
- Design at 320px as the baseline
- Use `flex` / `grid` with intrinsic sizing
- Prefer `clamp()` for font sizes
- Keep line length between 45–75 chars
- Minimum tap target: 44px

## Avoid
- Desktop-first breakpoints
- Fixed heights on containers
- Overusing media queries
- Hidden horizontal scroll

## Validation Checklist
- No zoom needed to read
- No horizontal scrolling
- Buttons reachable with thumb
- Consistent spacing rhythm

## Output Expectation
- Components are readable at 320px
- Layout degrades gracefully
- No visual regression on desktop
