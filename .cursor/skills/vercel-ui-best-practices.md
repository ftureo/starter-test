# Skill: Vercel UI & Frontend Best Practices

## Objective
Align UI implementation with Vercel-recommended frontend patterns for performance, maintainability, and user experience.

## Context
Applies to:
- Public-facing pages
- Performance-sensitive views
- Shared layout components

## Principles
- Performance is a UX feature
- Simplicity beats cleverness
- Server-first, client when needed

## Do
- Prefer Server Components by default
- Keep layouts shallow
- Use semantic HTML
- Optimize images and fonts
- Avoid unnecessary client hydration

## Avoid
- Global CSS hacks
- Deep component trees
- Client-side logic in layouts
- Overusing state libraries

## Validation Checklist
- Minimal client JS
- Clear server/client boundaries
- Fast first render
- Predictable component structure

## Output Expectation
- Reduced JS payload
- Clear rendering model
- Easy-to-reason UI flow
