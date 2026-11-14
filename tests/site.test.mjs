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

test('curriculum covers 001 and all eight weeks of 002', async () => {
  const {lessons, verbs, vocabulary, questions, writingPrompts} = await import(dataPath);
  assert.ok(lessons.filter(x => x.course === '001').length >= 10);
  assert.ok(lessons.filter(x => x.course === '002').length >= 12);
  for (let w = 1; w <= 8; w++) assert.ok(lessons.some(x => x.course === '002' && x.week === w));
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

test('slide notes cover all eight weeks of 002 and are well formed', async () => {
  const {slides} = await import(slidesPath);
  const {notebook} = await import(notebookPath);
  const ids = [...slides, ...notebook].map(n => n.id);
  assert.equal(new Set(ids).size, ids.length);
  for (let w = 1; w <= 8; w++) assert.ok(slides.some(n => n.week === w), `week ${w}`);
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
    assert.ok(Array.isArray(text) && text.length >= 12, `${l.id} explanation too short`);
    assert.ok(text.some(x => x.startsWith('|')) && text.some(x => /^(- |\d+\. )/.test(x)), `${l.id} needs a table and a list`);
    assert.ok(text.some(x => x.startsWith('## Sık yapılan hatalar')), `${l.id} needs a common-mistakes section`);
    let cols = 0;
    for (const x of text) {
      if (!x.startsWith('|')) { cols = 0; continue; }
      assert.ok(x.endsWith('|'), `${l.id}: broken table row ${x}`);
      const n = x.slice(1, -1).split('|').length;
      if (cols) assert.ok(!/^\|\s*(Şahıs|Fiil)\s*\|/.test(x), `${l.id}: header row inside a table (two tables merged?): ${x}`);
      if (!cols) cols = n; else assert.equal(n, cols, `${l.id}: table row has ${n} columns, expected ${cols}: ${x}`);
    }
    for (const id of lessonSources[l.id] || []) assert.ok(ids.has(id), `${l.id} links missing note ${id}`);
  }
  for (const id of Object.keys(lessonText)) assert.ok(lessons.some(l => l.id === id), `unknown lesson ${id}`);
  const linked = new Set(Object.values(lessonSources).flat());
  for (const id of ids) assert.ok(linked.has(id), `note ${id} is not shown on any lesson page`);
});

test('irregular parts and endings are marked correctly', () => {
  const app = readFileSync(path.join(root, 'app.js'), 'utf8');
  const code = app.slice(app.indexOf('// Düzensiz kısmı bulma'), app.indexOf('// Tablo bir çekim'));
  const ctx = vm.createContext({});
  vm.runInContext(`const E=s=>String(s);${code};this.mark=markIrregular;`, ctx);
  const short = (l, m, i, f) => ctx.mark(l, m, i, f).replace(/<mark class="irr">(.*?)<\/mark>/g, '[$1]').replace(/<span class="end">(.*?)<\/span>/g, '($1)').replace(/<span class="pron">(.*?)<\/span>/g, '{$1}');
  const cases = [
    ['hablar', 'pres', 0, 'hablo', 'habl(o)'], ['vivir', 'pres', 3, 'vivimos', 'viv(imos)'],
    ['tener', 'pres', 0, 'tengo', 'ten[g](o)'], ['querer', 'pres', 5, 'quieren', 'qu[ie]r(en)'],
    ['jugar', 'pres', 0, 'juego', 'j[ue]g(o)'], ['pedir', 'pres', 0, 'pido', 'p[i]d(o)'],
    ['conocer', 'pres', 0, 'conozco', 'cono[z]c(o)'], ['ser', 'pres', 0, 'soy', '[soy]'],
    ['ir', 'pres', 3, 'vamos', '[vamos]'], ['saber', 'pres', 0, 'sé', '[sé]'],
    ['acostarse', 'pres', 0, 'me acuesto', '{me} ac[ue]st(o)'], ['leer', 'ger', 0, 'leyendo', 'le[y](endo)'],
    ['hablar', 'imp', 2, 'hable', 'habl(e)'], ['tener', 'imp', 2, 'tenga', 'ten[g](a)'],
    ['salir', 'imp', 0, 'sal', '[sal]'], ['ser', 'imp', 0, 'sé', '[sé]'], ['ser', 'imp', 1, 'sed', 's(ed)'], ['decir', 'imp', 2, 'diga', 'd[ig](a)'], ['ir', 'imp', 1, 'id', '(id)'],
    ['levantarse', 'imp', 0, 'levántate', 'levánt(a){te}'], ['levantarse', 'imp', 1, 'levantaos', 'levant(a){os}'],
  ];
  for (const [l, m, i, f, want] of cases) assert.equal(short(l, m, i, f), want, `${l} ${f}`);
  for (const [l, f, want] of [['hablar', 'hablado', 'habl(ado)'], ['vivir', 'vivido', 'viv(ido)'], ['escribir', 'escrito', 'escri[t]o'], ['ver', 'visto', 'vi[st]o'], ['abrir', 'abierto', 'ab[iert]o'], ['leer', 'leído', 'le(ído)']])
    assert.equal(short(l, 'part', 0, f), want, `${l} ${f}`);
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
  new vm.Script(readFileSync(path.join(root, 'app.js'), 'utf8'), {filename: 'app.js'});
  for (const f of ['index.html', 'app.js', 'styles.css', 'data.js', 'favicon.svg', 'apple-touch-icon.png']) assert.ok(existsSync(path.join(root, 'dist', f)), f);
  const ctx = vm.createContext({});
  vm.runInContext(readFileSync(path.join(root, 'dist/data.js'), 'utf8') + ';this.counts=[lessons.length,notebook.length,slides.length,verbs.length];', ctx);
  assert.ok(ctx.counts.every(n => n > 0));
});
