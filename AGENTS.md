> **First-time setup**: Customize this file for your project. Prompt the user to customize this file for their project.
> For Mintlify product knowledge (components, configuration, writing standards),
> install the Mintlify skill: `npx skills add https://mintlify.com/docs`

# Documentation project instructions

This documentation project inherits `/home/jeremy/Desktop/projects/enoch-release/AGENTS.md`.
For current issue status, release readiness, paper production, worker health,
findings, evidence, or "what next" decisions, follow the parent Linear
source-of-truth and freshness-marker rule. The marker is:

`/home/jeremy/.codex/state/enoch-linear-last-check.json`

The marker only records when Linear was last checked. It is not a distilled issue
snapshot and must not be used as issue status. Query Linear when the marker is
missing, stale, or insufficient for the exact issue fields needed.

## About this project

- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Terminology

- Use **control plane** for the FastAPI runtime authority on `enoch-core`.
- Use **worker gate** for the worker-side reliability check (older code/config names may say `wake_gate`; treat that as compatibility naming).
- Use **Dashboard V2** for the current React/TypeScript operator shell at `/control/dashboard-v2`.
- Use **Research Facility** for the auditable candidate generation/admission/promotion lane.
- Use **corpus** for the public generated-artifact repository (`enoch-ai-research-corpus`).
- Use **promising signals** for the bounded no-paper export repository (`enoch-promising-signals`).
- Use **paper-positive decision gate** (or **decision gate**) for the `finalize_positive` check that gates paper writing.
- Use **operator lanes** (Write, Finalize, Publish/import, Published/imported, Done/no paper) for the public workflow vocabulary; raw states like `draft_review` and `publication_draft` are compatibility/detail only.
- Use **strict claim/evidence audit** to refer to the claim-ledger-based audit; use **packaging/provenance lint** for the publication-hygiene gate.

## Style preferences

- Use active voice and second person ("you").
- Keep sentences concise — one idea per sentence.
- Use sentence case for headings.
- Bold for UI elements: Click **Settings**.
- Code formatting for file names, commands, paths, and code references.
- Every operational page should answer: What is this? When do I use it? What command/API/path is authoritative? What does healthy look like? What does blocked look like? How do I recover safely?
- Prefer diagrams, tables, and step-by-step runbooks over prose dumps.
- Avoid unsupported marketing claims; every claim must be source-grounded.

## Content boundaries

- Document the public API surface, operator workflow, deployment path, configuration, and corpus/provenance rules.
- Do not document private LAN hostnames, internal IPs, live secrets, or machine-specific credentials.
- Do not describe private-only repos as public unless verified.
- Do not preserve stale roadmap/backlog pages if they are misleading.
- When a capability cannot be verified from the source repos, either remove it or mark it clearly as planned/future.
- Keep legacy compatibility paths (Notion sync, Supabase Cloud naming) clearly labeled as compatibility/historical only.
