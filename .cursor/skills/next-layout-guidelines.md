# Skill: Next.js Layout & Styling Guidelines

## Objective
Establish scalable layout and styling patterns suitable for long-term evolution and team growth.

## Context
Applies to:
- App Router layouts
- Shared UI primitives
- Design-system-like components

## Principles
- Composition over inheritance
- Explicit layout responsibilities
- Predictable styling rules

## Do
- Use layout.tsx for structure only
- Keep pages thin
- Encapsulate styles per component
- Use spacing tokens
- Normalize typography early

## Avoid
- Business logic in layouts
- Page-level CSS chaos
- Overloaded components
- Implicit styling dependencies

## Validation Checklist
- Layouts are structural only
- Pages read like orchestration
- Styles are localized
- Components are reusable

## Output Expectation
- Clear mental model
- Easier refactors
- Reduced styling bugs
