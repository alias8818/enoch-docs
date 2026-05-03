#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];
const mdxFiles = walk(root).filter((file) => file.endsWith('.mdx'));
const mdxSet = new Set(mdxFiles.map((file) => stripExt(path.relative(root, file))));
const imageExt = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === '.omx' || entry.name === 'node_modules') return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
function stripExt(file) { return file.replace(/\.mdx$/, ''); }
function existsLocal(target) {
  const clean = target.split('#')[0].split('?')[0];
  if (!clean) return true;
  const normalized = clean.replace(/^\//, '');
  if (mdxSet.has(normalized)) return true;
  if (fs.existsSync(path.join(root, normalized))) return true;
  if (fs.existsSync(path.join(root, `${normalized}.mdx`))) return true;
  return false;
}
function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---', 4);
  if (end === -1) return null;
  const raw = text.slice(4, end).trim();
  const out = {};
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return out;
}
function checkFenceBalance(text, rel) {
  const fences = [...text.matchAll(/^```/gm)].length;
  if (fences % 2 !== 0) errors.push(`${rel}: unbalanced fenced code blocks (${fences} fence markers)`);
}
function checkLinks(text, rel, filePath) {
  const patterns = [
    /\[[^\]]+\]\(([^)]+)\)/g,
    /href=["']([^"']+)["']/g,
    /src=["']([^"']+)["']/g,
  ];
  for (const re of patterns) {
    for (const match of text.matchAll(re)) {
      const href = match[1].trim();
      if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('#')) continue;
      if (href.startsWith('javascript:')) errors.push(`${rel}: unsafe javascript link ${href}`);
      const baseDir = path.dirname(path.relative(root, filePath));
      const resolved = href.startsWith('/') ? href.slice(1) : path.join(baseDir, href);
      if (!existsLocal(resolved)) errors.push(`${rel}: broken local link ${href}`);
    }
  }
}

for (const file of mdxFiles) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, 'utf8');
  const fm = parseFrontmatter(text);
  if (!fm) errors.push(`${rel}: missing YAML frontmatter`);
  else {
    for (const key of ['title', 'description']) {
      if (!fm[key] || fm[key].trim().length < 8) errors.push(`${rel}: missing or too-short frontmatter ${key}`);
    }
  }
  checkFenceBalance(text, rel);
  checkLinks(text, rel, file);
  if (/(?:src=|href=|\]\()"?\/?images\/sample-feature-(?:dark|light)\.png/.test(text)) warnings.push(`${rel}: references placeholder sample feature image`);
}

const docs = JSON.parse(fs.readFileSync(path.join(root, 'docs.json'), 'utf8'));
const navPages = [];
function collectPages(node) {
  if (Array.isArray(node)) return node.forEach(collectPages);
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node.pages)) navPages.push(...node.pages);
  for (const value of Object.values(node)) collectPages(value);
}
collectPages(docs.navigation);
for (const page of navPages) {
  if (!mdxSet.has(page)) errors.push(`docs.json: navigation page ${page} has no matching MDX file`);
}
for (const page of mdxSet) {
  if (page === 'index') continue;
  if (!navPages.includes(page)) warnings.push(`${page}.mdx: exists but is not present in docs.json navigation`);
}
const imageRoot = path.join(root, 'images');
if (fs.existsSync(imageRoot)) {
for (const image of walk(imageRoot).filter((file) => imageExt.has(path.extname(file).toLowerCase()))) {
  const rel = path.relative(root, image);
  const used = mdxFiles.some((file) => fs.readFileSync(file, 'utf8').includes(rel) || fs.readFileSync(file, 'utf8').includes(`/${rel}`));
  if (!used) warnings.push(`${rel}: image exists but is not referenced by any MDX page`);
}
}

if (warnings.length) {
  console.error('Warnings:');
  for (const warning of warnings) console.error(`- ${warning}`);
}
if (errors.length) {
  console.error('Errors:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Validated ${mdxFiles.length} MDX files and ${navPages.length} docs.json navigation entries.`);
