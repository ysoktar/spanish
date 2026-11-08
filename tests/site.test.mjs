import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const dataPath = path.join(root, 'content.js');
const notebookPath = path.join(root, 'notebook.js');
const slidesPath = path.join(root, 'slides.js');

function checkBlocks(entry) {
  assert.ok(entry.title && entry.summary && entry.blocks.length, entry.id);
  for (const b of entry.blocks) {
    if (b.t === 'note') { assert.ok(b.text, entry.id); continue; }
    assert.ok(['pairs', 'rules', 'table'].includes(b.t) && b.h && b.rows.length, `${entry.id}: ${b.h}`);
    const width = b.t === 'table' ? b.head.length : 2;
    for (const r of b.rows) assert.equal(r.length, width, `${entry.id}: ${b.h}: ${r.join(' | ')}`);
  }
}
const htmlPath = path.join(root, 'index.html');

test('site source files exist and no notebook photos are shipped', () => {
  for (const f of [htmlPath, dataPath, notebookPath, slidesPath, path.join(root, 'app.js'), path.join(root, 'styles.css')]) assert.ok(existsSync(f), f);
  assert.ok(!existsSync(path.join(root, 'assets/photos')));
  for (const f of ['index.html', 'app.js', 'styles.css']) assert.ok(!/assets\/photos|\.jpg\b/.test(readFileSync(path.join(root, f), 'utf8')), f);
});

test('curriculum covers 001 and all seven weeks of 002', async () => {
  const {lessons, verbs, vocabulary, questions, writingPrompts} = await import(dataPath);
  assert.ok(lessons.filter(x => x.course === '001').length >= 10);
  assert.ok(lessons.filter(x => x.course === '002').length >= 12);
  for (let w = 1; w <= 7; w++) assert.ok(lessons.some(x => x.course === '002' && x.week === w));
  assert.ok(lessons.every(x => x.id && x.title && x.explain && x.examples?.length >= 2 && x.source && Array.isArray(x.pages)));
  assert.equal(new Set(lessons.map(x => x.id)).size, lessons.length);
  assert.ok(verbs.length >= 45);
  assert.ok(vocabulary.length >= 15);
  assert.ok(questions.length >= 45);
  assert.ok(writingPrompts.length >= 4);
  for (const q of questions) {
    assert.ok(lessons.some(l => l.id === q.lesson));
    assert.equal(q.options.length, 4);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
    assert.ok(q.why);
  }
});

test('notebook transcription covers the notebook pages and is well formed', async () => {
  const {notebook} = await import(notebookPath);
  const {lessons} = await import(dataPath);
  assert.equal(new Set(notebook.map(n => n.id)).size, notebook.length);
  const pages = new Set(notebook.flatMap(n => n.pages));
  // Page 1 is the textbook cover and page 43 holds only a heading.
  for (let p = 2; p <= 54; p++) if (p !== 43) assert.ok(pages.has(p), `page ${p} not transcribed`);
  for (const n of notebook) {
    assert.ok(['001', '002'].includes(n.course), n.id);
    checkBlocks(n);
  }
  for (const l of lessons) for (const p of l.pages) assert.ok(pages.has(p) || p === 43, `${l.id} cites page ${p}`);
});

test('slide notes cover all seven weeks of 002 and are well formed', async () => {
  const {slides} = await import(slidesPath);
  const {notebook} = await import(notebookPath);
  const ids = [...slides, ...notebook].map(n => n.id);
  assert.equal(new Set(ids).size, ids.length);
  for (let w = 1; w <= 7; w++) assert.ok(slides.some(n => n.week === w), `week ${w}`);
  for (const n of slides) { assert.equal(n.course, '002'); checkBlocks(n); }
});

test('every lesson has a detailed explanation and valid linked notes', async () => {
  const {lessons} = await import(dataPath);
  const {lessonText, lessonSources} = await import(path.join(root, 'lessons-detail.js'));
  const {notebook} = await import(notebookPath);
  const {slides} = await import(slidesPath);
  const ids = new Set([...notebook, ...slides].map(n => n.id));
  for (const l of lessons) {
    const text = lessonText[l.id];
    assert.ok(Array.isArray(text) && text.join(' ').length > 1200, `${l.id} explanation too short`);
    for (const id of lessonSources[l.id] || []) assert.ok(ids.has(id), `${l.id} links missing note ${id}`);
  }
  for (const id of Object.keys(lessonText)) assert.ok(lessons.some(l => l.id === id), `unknown lesson ${id}`);
  const linked = new Set(Object.values(lessonSources).flat());
  for (const id of ids) assert.ok(linked.has(id), `note ${id} is not shown on any lesson page`);
});

test('interface has navigation, quiz, conjugations and notebook notes', () => {
  const html = readFileSync(htmlPath, 'utf8');
  for (const label of ['İspanyolca 001', 'İspanyolca 002', 'Fiil çekimleri', 'Kelime', 'Test', 'Defter notları', 'Slayt notları', 'Yazma']) assert.ok(html.includes(label), label);
  assert.ok(html.includes('id="app"'));
  assert.ok(html.includes('src="./data.js"'));
  assert.ok(!html.includes('http://') && !html.includes('https://'));
});

test('build produces a dist/ that loads in a browser-like context', () => {
  execFileSync(process.execPath, [path.join(root, 'scripts/build.mjs')], {cwd: root});
  for (const f of ['index.html', 'app.js', 'styles.css', 'data.js']) assert.ok(existsSync(path.join(root, 'dist', f)), f);
  const ctx = vm.createContext({});
  vm.runInContext(readFileSync(path.join(root, 'dist/data.js'), 'utf8') + ';this.counts=[lessons.length,notebook.length,slides.length,verbs.length];', ctx);
  assert.ok(ctx.counts.every(n => n > 0));
});
