# Enoch Docs

This repository is the source for the **Enoch documentation website** at <https://solo-09d10f60.mintlify.app/>. It is a Mintlify site written in MDX for people who want to understand, review, run, or deploy Enoch.

Enoch is an agentic research control plane. It queues research ideas, checks whether local AI workers are safe to use, supervises long-running runs, preserves evidence, and packages AI-generated research artifacts with explicit provenance.

## What this repo is

- **Documentation website source** for Enoch operators, contributors, and reviewers.
- **Mintlify configuration and MDX pages** in `docs.json`, `*.mdx`, and supporting assets.
- **Source-grounded guidance** for learning the system, running a local smoke test, deploying the control plane and worker, and reviewing generated-artifact provenance.

## What this repo is not

- Not the Enoch application code. Use [`alias8818/enoch-agentic-research-system`](https://github.com/alias8818/enoch-agentic-research-system) for the FastAPI control plane, dashboard, deployment scripts, and tests.
- Not the generated research corpus. Use [`alias8818/enoch-ai-research-corpus`](https://github.com/alias8818/enoch-ai-research-corpus) for generated artifacts, evidence bundles, claim ledgers, manifests, packaging/provenance reports, and strict claim/evidence audit reports.
- Not a place for live secrets, private runtime state, production configs, or unreleased run data.

## Start here

| Goal | Read this |
| --- | --- |
| Understand what Enoch is | <https://solo-09d10f60.mintlify.app/introduction> |
| Run a local smoke test | <https://solo-09d10f60.mintlify.app/quickstart> |
| Deploy the control plane and worker | <https://solo-09d10f60.mintlify.app/deployment> |
| Configure required tokens and paths | <https://solo-09d10f60.mintlify.app/configuration/overview> |
| Learn the dispatch flow | <https://solo-09d10f60.mintlify.app/guides/dispatch-flow> |
| Review paper/provenance boundaries | <https://solo-09d10f60.mintlify.app/reference/authorship-provenance> |
| Troubleshoot common failures | <https://solo-09d10f60.mintlify.app/reference/troubleshooting> |

If you are evaluating whether Enoch is worth deploying, read in this order:

1. [Introduction](https://solo-09d10f60.mintlify.app/introduction) — what problem the system solves.
2. [Quickstart](https://solo-09d10f60.mintlify.app/quickstart) — a one-machine local smoke test.
3. [Deployment](https://solo-09d10f60.mintlify.app/deployment) — the conservative two-machine deployment path.
4. [Authorship and provenance](https://solo-09d10f60.mintlify.app/reference/authorship-provenance) — how to interpret generated research artifacts.

## Related Enoch surfaces

- **Hosted docs website:** <https://solo-09d10f60.mintlify.app/>
- **Docs source:** <https://github.com/alias8818/enoch-docs>
- **System repository:** <https://github.com/alias8818/enoch-agentic-research-system>
- **Research corpus:** <https://github.com/alias8818/enoch-ai-research-corpus>
- **Launch site:** <https://alias8818.github.io/enoch-agentic-research-system/>
- **Profile / project index:** <https://alias8818.github.io/>

## Preview and validate locally

Use an LTS Node.js version supported by the Mintlify CLI. Then preview the docs locally from this repository:

```bash
npx mint dev
```

Run the repository validation script before committing docs changes:

```bash
node scripts/validate-docs.mjs
```

The validator checks that `docs.json` navigation points to existing MDX pages, that image references resolve, and that obsolete placeholder assets are not referenced.

## Content rules

- Keep docs tied to behavior evidenced in the system repo, corpus repo, release notes, or committed screenshots.
- Do not invent product screenshots, deployment claims, or research validation claims.
- Never commit live tokens, private hostnames, local configs, production logs, or private run data.
- Preserve the core caveat: generated reports are AI-generated research artifacts for inspection, replication, and critique. They are not peer-reviewed or human-authored papers.
