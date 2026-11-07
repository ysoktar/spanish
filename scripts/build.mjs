// Builds the static site into dist/ for GitHub Pages.
// content.js, notebook.js and slides.js are ES modules (the tests import them); the browser
// gets them as one classic script (data.js) so the site also works from file://.
import {readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync} from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'dist');
const asClassicScript = file => {
  const src = readFileSync(path.join(root, file), 'utf8').replace(/^export /gm, '');
  if (/^\s*(import|export)\b/m.test(src)) throw new Error(`${file}: unsupported import/export left after build`);
  return src;
};

rmSync(out, {recursive: true, force: true});
mkdirSync(out);
writeFileSync(path.join(out, 'data.js'), `"use strict";\n${asClassicScript('content.js')}\n${asClassicScript('notebook.js')}\n${asClassicScript('slides.js')}`);
for (const file of ['index.html', 'app.js', 'styles.css']) copyFileSync(path.join(root, file), path.join(out, file));
console.log(`Built ${path.relative(root, out)}/`);
