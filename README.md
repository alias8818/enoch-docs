# Enoch Docs

**Source for the public Enoch documentation site:** <https://solo-09d10f60.mintlify.app/>

Enoch is an agentic research control plane. It queues research ideas, checks whether local AI workers are safe to use, supervises long-running runs, preserves evidence, and packages AI-generated research artifacts with explicit provenance.

## Current public facts

| Surface | Current fact |
| --- | ---: |
| Runtime version | `1.41.94` |
| Public corpus | `393` artifacts |
| Packaging/provenance gate | `393/393` pass |
| Strict claim/evidence audit | `393/393` pass |
| Promising signals | `6,381` rows |

## What this repo is

- **Mintlify documentation source** for Enoch operators, contributors, and reviewers.
- **Source-grounded guidance** for understanding, running, deploying, and reviewing Enoch.
- **Public-safe screenshots and diagrams** that describe roles and product behavior without exposing private infrastructure.

## What this repo is not

- Not the Enoch application code. Use [`alias8818/enoch-agentic-research-system`](https://github.com/alias8818/enoch-agentic-research-system).
- Not the generated research corpus. Use [`alias8818/enoch-ai-research-corpus`](https://github.com/alias8818/enoch-ai-research-corpus).
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

## Related Enoch surfaces

- System repository: <https://github.com/alias8818/enoch-agentic-research-system>
- Research corpus: <https://github.com/alias8818/enoch-ai-research-corpus>
- Promising signals: <https://github.com/alias8818/enoch-promising-signals>
- Hugging Face dataset: <https://huggingface.co/datasets/aliasocracy/enoch-ai-research-corpus>
- Launch site: <https://alias8818.github.io/enoch-agentic-research-system/>

## Preview and validate locally

```bash
npx mint dev
node scripts/validate-docs.mjs
```

The validator checks navigation, MDX pages, image references, obsolete placeholder assets, and current-runtime topology links.

## Content rules

- Keep docs tied to behavior evidenced in the system repo, corpus repo, release notes, or committed screenshots.
- Do not invent product screenshots, deployment claims, or research validation claims.
- Never commit live tokens, private hostnames, local configs, production logs, or private run data.
- Preserve the core caveat: generated reports are AI-generated research artifacts for inspection, replication, and critique. They are not peer-reviewed or human-authored papers.
