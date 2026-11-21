// Builds the static site into dist/ for GitHub Pages.
// content.js, notebook.js, slides.js and lessons-detail.js are ES modules (the tests import them); the browser
// gets them as one classic script (data.js) so the site also works from file://.
import {readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'dist');
const asClassicScript = file => {
  const src = readFileSync(path.join(root, file), 'utf8').replace(/^export /gm, '');
  if (/^\s*(import|export)\b/m.test(src)) throw new Error(`${file}: unsupported import/export left after build`);
  return src;
};

rmSync(out, {recursive: true, force: true});
mkdirSync(out);
writeFileSync(path.join(out, 'data.js'), `"use strict";\n${asClassicScript('content.js')}\n${asClassicScript('notebook.js')}\n${asClassicScript('slides.js')}\n${asClassicScript('lessons-detail.js')}`);
for (const file of ['app.js', 'styles.css', 'favicon.svg', 'apple-touch-icon.png']) copyFileSync(path.join(root, file), path.join(out, file));
// Cache busting: GitHub Pages lets browsers cache files for 10 minutes, so a visitor could get a new
// index.html/app.js with an old data.js. Each asset URL in index.html gets a ?v=<content hash>.
const version = file => createHash('sha256').update(readFileSync(path.join(out, file))).digest('hex').slice(0, 10);
let html = readFileSync(path.join(root, 'index.html'), 'utf8');
for (const file of ['data.js', 'app.js', 'styles.css', 'favicon.svg', 'apple-touch-icon.png']) {
  const ref = `"./${file}"`;
  if (!html.includes(ref)) throw new Error(`index.html does not reference ${file}`);
  html = html.split(ref).join(`"./${file}?v=${version(file)}"`);
}
writeFileSync(path.join(out, 'index.html'), html);
console.log(`Built ${path.relative(root, out)}/`);
