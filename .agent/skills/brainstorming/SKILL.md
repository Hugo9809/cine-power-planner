---
name: brainstorming
description: "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation."
---

# Brainstorming Ideas Into Designs

## Overview

Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design in small sections, checking after each section whether it looks right so far.

## The Process

### 1. Understanding the Idea
- **Context First:** Check the codebase state (files, docs, recent changes).
- **One Question Rule:** Ask ONLY one question at a time.
- **Goals:** Clarify purpose, constraints, and success criteria.

### 2. Exploring Approaches
- Propose 2-3 different approaches with trade-offs.
- Present options conversationally.
- Recommend one options and explain why.

### 3. Presenting the Design
- Once aligned, present the design.
- **Chunking:** Break it into sections (Architecture, Components, Data Flow).
- **Validation:** Ask after each section: "Does this look right?"

## After the Design

### Documentation
- Write the validated design to `docs/dev/specs/YYYY-MM-DD-<topic>.md`.
- Commit the design document.

### Handoff
- Ask: "Ready for implementation?"
- If yes, use the `writing-implementation-plans` skill.

## Key Principles

- **One question at a time.**
- **YAGNI ruthlessly.** Remove unnecessary complexity.
- **Explore alternatives.** Don't jump to the first solution.
- **Incremental validation.**
