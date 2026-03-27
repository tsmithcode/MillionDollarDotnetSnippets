# Frontend Foundation

This document defines the Phase 1 discipline layer for the MDS web product.

## Architecture anchors

- Next.js App Router is the frontend runtime and rendering surface.
- Framer Motion is the only approved motion orchestration layer.
- Three.js enters through controlled stage components only, not ad hoc scene sprawl.
- Shared primitives should absorb layout and interaction drift before page-level complexity grows.

## Accessibility and performance non-negotiables

- reduced-motion support is mandatory
- keyboard access is mandatory
- no critical meaning may exist only in motion or 3D
- 3D scenes must be additive, not blocking
- build and browser proof are release gates

## Current primitives

- `components/ui/` for durable, reusable product primitives
- `components/motion/` for approved motion wrappers
- `components/three/` for controlled scene entrypoints

## Phase 1 success definition

- shared primitives exist for common surfaces
- motion is centrally configured
- 3D has one controlled entrypoint with a clear narrative job
- CI builds the web app and runs browser proof
