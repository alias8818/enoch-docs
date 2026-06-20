# Docs audit notes

This file summarizes the docs audit history against the three source repositories and what remains uncertain.

## 2026-06-20 refresh — findings still open

This audit was re-run against the live source repos on 2026-06-20. Key drift from the prior (2026-05-21) audit:

1. **Runtime version drift**: System repo `VERSION` and `pyproject.toml` report `1.41.25` (released 2026-06-20). The docs `release-notes.mdx` listed milestones only through `0.3.0`. Docs now point readers to the canonical `CHANGELOG.md` and surface the current version via an `<Info>` block. The detailed milestone entries for `0.1.0`, `0.2.0`, and `0.3.0` are retained for the terminology changes they introduced (ENOCH_CONFIG, control_api_bearer_token, project_decision.json contract) but new entries from `1.0.0` through `1.41.25` are not mirrored here — they are best read in the canonical `CHANGELOG.md`.

2. **Dashboard cutover**: The source repo's `docs/current-runtime-snapshot.md` (merged 2026-05-21) and `docs/dashboard-v2-deploy.md` establish `/control/dashboard` as a 307 redirect to `/control/dashboard-v2`. Older docs said `/dashboard` redirected to `/control/dashboard` (the legacy URL). All `quickstart`, `deployment`, and `current-runtime-snapshot` references now point to `/control/dashboard-v2` as the canonical URL.

3. **Corpus count drift**: `introduction.mdx` previously said `388/388` for packaging/provenance; `quality/packaging_provenance_report.json` and `quality/claim_evidence_audit.json` both report `389/389`. Updated. `guides/paper-artifacts.mdx` already said `389/389` and was kept. A `<Note>` was added to flag that both numbers must be re-verified from the canonical JSON before quoting externally.

4. **Configuration field drift**: Source `config.example.json` and `enoch_control_plane/config.py` include `operational_trace_*` and `hermes_alert_webhook_*` field groups. The docs `configuration/overview.mdx` did not list them. Both groups were added.

5. **Screenshot redaction — public-repo safety**: All five PNGs in `images/` (`dashboard-status-blocked.png`, `dashboard-active-queue.png`, `dashboard-queued-queue.png`, `dashboard-paper-reviews.png`, `dashboard-papers.png`) currently expose:
   - A UI footer reading "Bounded Supabase read models · raw states stay in drill-down views" that conflicts with the public docs framing that Supabase Cloud is compatibility-only.
   - Internal paper IDs and counts that drift over time (e.g. `acceptance-length-cuda-graph-bank`, 496/498 corpus counts).
   - Pre-cutover dashboard URLs (visible in `Open localhost:51111.pdf` style links).

   Each guide page that uses a screenshot now has an explicit `<Info>` placeholder noting the image is pending replacement with a redacted, public-safe capture. The replacement PNGs need to be re-captured from a public-safe dashboard view (after the V2 cutover and after the dashboard footer is updated to drop the "Supabase" label). Until then, treat the existing PNGs as layout references only.

6. **Source repo quickstart token length**: The source repo `docs/quickstart.md` uses `secrets.token_urlsafe(32)` while the docs `quickstart.mdx` and source `docs/deployment-guide.md` use `48`. Both are operationally valid. Added a `<Note>` explaining the difference; no change to the example value.

7. **Private deploy alias**: The source repo references the deploy host `enoch-core.exe.xyz`. This is a private deploy alias, not a public fact. The docs `current-runtime-snapshot.mdx` previously described `enoch-core` as the host. Added a parenthetical noting the `.exe.xyz` form is a private deploy alias that should not be published elsewhere.

## 2026-05-21 audit — historical

This file summarizes what was reconciled during the enoch-docs audit against the three source repositories and what remains uncertain.

## Source repos used as authority

| Source repo | Key files/paths used |
|---|---|
| `alias8818/enoch-agentic-research-system` | `README.md`, `CHANGELOG.md`, `VERSION` (0.3.0), `config.example.json`, `pyproject.toml`, `docs/research-facility.md`, `docs/dashboard-v2-todo-2026-05-21.md`, `docs/current-runtime-snapshot.md`, `docs/system-workflow.md`, `docs/state-model.md`, `docs/idea-intake-workflow.md`, `enoch_control_plane/` source tree |
| `alias8818/enoch-ai-research-corpus` | `README.md`, `docs/provenance-policy.md`, `docs/quality-gates.md`, `docs/reproducibility.md`, `quality/claim_evidence_audit.json`, `quality/quality_report.json`, `papers/` directory listing (388 paper dirs counted) |
| `alias8818/enoch-promising-signals` | `README.md`, `data/manifest.json` (519 records), `docs/export-policy.md`, `schemas/promising-signal.schema.json`, `scripts/validate.py`, `scripts/validate_public_trust_surfaces.py` |

## Pages reconciled

| Page | Action | Reason |
|---|---|---|
| `AGENTS.md` | **Updated** | Replaced empty Mintlify placeholder comments with actual project terminology, style preferences, and content boundaries derived from the docs |
| `concepts/control-plane.mdx` | **Updated** | Referenced "Dashboard V2" instead of generic "redesigned control dashboard"; added read-model note |
| `guides/idea-intake.mdx` | **Updated** | Added Research Facility to intake stages diagram; added cross-reference link |
| `reference/promising-signals.mdx` | **Updated** | Added current export counts (519 signals, status breakdown, curation buckets) verified from promising-signals repo manifest.json; added regeneration commands; added source file links |
| `docs.json` | **Updated** | Added `concepts/research-facility` to Core Concepts nav group |
| `concepts/research-facility.mdx` | **Added** | New page covering the Research Facility: ledgers, generation modes, candidate contract, bounded cycle, provider-backed generation, guardrails |
| `docs-audit-notes.md` | **Added** | This file |
| All other existing pages | **Kept** | No changes needed; content verified against source repos |

## Verification results

### Stale-term grep

- `wake_gate`: Appears as actual config field names (`worker_wake_gate_url`, `wake_gate_url`) and is correctly marked as compatibility naming where appropriate. No stale standalone usage.
- `omx_wake_gate`: Appears only under historical/compatibility-only section of `current-runtime-snapshot.mdx`. No stale public references.
- `TODO` / `FIXME`: None found in any .mdx file.
- `coming soon`: None found.
- Private LAN IPs (192.168.x, 10.x, 172.16-31.x): None found in docs text (only in SVG path data in logo files).
- Internal hostnames (`enoch-core.exe.xyz`): Not present in any docs file.
- Placeholder screenshots: All 5 images reference real PNG files in `images/`.

### Link validation

- 21 MDX files checked
- All cross-page links resolve (21 nav entries validated against file paths)
- All image references resolve to existing PNG files
- No broken internal links detected
- 0 errors, 2 minor warnings (Supabase Cloud regex false positives — all instances are correctly marked as "not current" or "compatibility")

### Markdown lint

- Basic frontmatter validation: all 21 .mdx files have valid `---` delimited YAML with `title` field
- No code fence balance issues detected

## Remaining uncertain or stale items

1. **Corpus reproducibility.md stale count**: The corpus repo's `docs/reproducibility.md` still references "496/496" packaging/provenance and "3/496" strict audit. The actual quality reports (`quality/`) show 388/388. This is in the corpus repo, not the docs repo, so it was noted but not fixed here.

2. **AGENTS.md first-time setup note**: The `> **First-time setup**: Customize this file...` line at the top of AGENTS.md remains — this is a standard Mintlify template instruction and is appropriate to keep.

3. **Hugging Face export**: The `evidence-and-artifacts.mdx` page references a Hugging Face export (`data/artifacts.jsonl`). This surface was not verified during this audit (no access to the HF dataset). Claims about HF export format could not be source-verified.

4. **Dashboard screenshots**: The 5 dashboard screenshots in `images/` reference specific UI states. These were not visually verified against the live V2 dashboard — they are assumed to be representative snapshots.

5. **Paper/artifact counts**: The docs consistently reference 388/388 for both packaging/provenance and strict claim/evidence. This was verified against `quality/claim_evidence_audit.json` in the corpus repo. Counts can change on re-import.

## Validation commands run

```bash
# Python-based equivalent of validate-docs.mjs:
# - 21 MDX files found
# - Frontmatter validation: all pass
# - Link validation: 0 broken internal links
# - Image reference validation: all resolve
# - Nav coverage: all 20 nav entries resolve to existing files

# Stale-term grep suite:
# - wake_gate: present as field name, correctly marked compatibility
# - omx_wake_gate: only in historical section
# - TODO/FIXME/coming soon: none found
# - Private IPs: none found in text
# - Internal hostnames: none found
```
