// Fiil çekim motoru: content.js'teki fiiller için bütün zamanları üretir.
// Presente, olumlu emir ve gerundio content.js'te elle yazılıdır; diğer zamanlar kurallarla
// ve aşağıdaki küçük düzensizlik tablolarıyla üretilir.

// Düzensiz participiolar (pretérito perfecto için). Düzenliler -ado / -ido ile kurulur.
export const irregularParticiples={hacer:'hecho',decir:'dicho',ver:'visto',escribir:'escrito',poner:'puesto',volver:'vuelto',abrir:'abierto',romper:'roto',morir:'muerto',descubrir:'descubierto',resolver:'resuelto',devolver:'devuelto',deshacer:'deshecho',satisfacer:'satisfecho'};

export const TENSES=[
 {id:'pres',name:'Presente de indicativo',tr:'şimdiki / geniş zaman',persons:6},
 {id:'perf',name:'Pretérito perfecto',tr:'haber + participio (-dı / -mış)',persons:6},
 {id:'indef',name:'Pretérito indefinido',tr:'-dı (bitmiş geçmiş)',persons:6},
 {id:'impf',name:'Pretérito imperfecto',tr:'-yordu / -ardı',persons:6},
 {id:'fut',name:'Futuro imperfecto',tr:'-acak',persons:6},
 {id:'cond',name:'Condicional simple',tr:'-ardı / -abilir',persons:6},
 {id:'subj',name:'Presente de subjuntivo',tr:'dilek / istek kipi',persons:6},
 {id:'imp',name:'Imperativo afirmativo',tr:'olumlu emir',persons:4},
 {id:'impneg',name:'Imperativo negativo',tr:'olumsuz emir',persons:4},
 {id:'ger',name:'Gerundio',tr:'-arak / estar + gerundio',persons:1}
];

const RP=['me','te','se','nos','os','se'];
const HABER_P=['he','has','ha','hemos','habéis','han'];
const strip=s=>s.normalize('NFD').replace(/[́]/g,'').normalize('NFC');
const reflOf=lemma=>/(ar|er|ir|ír)se$/.test(lemma);
const baseOf=lemma=>reflOf(lemma)?lemma.slice(0,-2):lemma;
const typeOf=base=>strip(base.slice(-2));
const stemOf=base=>base.slice(0,-2);
const withPron=(lemma,forms)=>reflOf(lemma)?forms.map((f,i)=>RP[i]+' '+f):forms;

// --- pretérito indefinido ---
const INDEF_FULL={
 ser:['fui','fuiste','fue','fuimos','fuisteis','fueron'],ir:['fui','fuiste','fue','fuimos','fuisteis','fueron'],
 dar:['di','diste','dio','dimos','disteis','dieron'],ver:['vi','viste','vio','vimos','visteis','vieron']
};
const STRONG={estar:'estuv',tener:'tuv',hacer:'hic',poner:'pus',venir:'vin',decir:'dij',traer:'traj',saber:'sup',querer:'quis',poder:'pud',andar:'anduv',haber:'hub'};
const STRONG_END=['e','iste','o','imos','isteis','ieron'];
function indefinido(v){
 const base=baseOf(v.lemma),t=typeOf(base),stem=stemOf(base);
 if(INDEF_FULL[base])return INDEF_FULL[base].slice();
 if(STRONG[base]){const s=STRONG[base];return STRONG_END.map((e,i)=>{if(base==='hacer'&&i===2)return 'hizo';if(/j$/.test(s)&&i===5)return s+'eron';return s+e})}
 let f;
 if(t==='ar')f=['é','aste','ó','amos','asteis','aron'].map(e=>stem+e);
 else if(/[aeoáéó]$/.test(strip(stem))&&t!=='ar'){ // leer, oír, creer: i → y
  const s=strip(stem);f=[s+'í',s+'íste',s+'yó',s+'ímos',s+'ísteis',s+'yeron'];
 } else f=['í','iste','ió','imos','isteis','ieron'].map(e=>stem+e);
 if(t==='ar'){ // yazım: -car/-gar/-zar yo
  if(/c$/.test(stem))f[0]=stem.slice(0,-1)+'qué';else if(/g$/.test(stem))f[0]=stem+'ué';else if(/z$/.test(stem))f[0]=stem.slice(0,-1)+'cé';
 }
 if(t==='ir'&&/(e→i|e→ie|o→ue)/.test(v.kind)){ // -ir kök değiştirenler: 3. şahıslarda e → i, o → u
  const ch=s=>s.replace(/([eo])([^aeiou]*)$/,(m,vw,rest)=>(vw==='e'?'i':'u')+rest);
  const s3=ch(stem);f[2]=s3+'ió';f[5]=s3+'ieron';
 }
 return f;
}

// --- pretérito imperfecto ---
const IMPF_FULL={ser:['era','eras','era','éramos','erais','eran'],ir:['iba','ibas','iba','íbamos','ibais','iban'],ver:['veía','veías','veía','veíamos','veíais','veían']};
function imperfecto(v){
 const base=baseOf(v.lemma),t=typeOf(base),stem=strip(stemOf(base));
 if(IMPF_FULL[base])return IMPF_FULL[base].slice();
 return (t==='ar'?['aba','abas','aba','ábamos','abais','aban']:['ía','ías','ía','íamos','íais','ían']).map(e=>stem+e);
}

// --- futuro ve condicional ---
const FUT_STEM={tener:'tendr',poner:'pondr',salir:'saldr',venir:'vendr',poder:'podr',saber:'sabr',querer:'querr',hacer:'har',decir:'dir',haber:'habr'};
const futStem=v=>{const base=baseOf(v.lemma);return FUT_STEM[base]||strip(base)};
const futuro=v=>['é','ás','á','emos','éis','án'].map(e=>futStem(v)+e);
const condicional=v=>['ía','ías','ía','íamos','íais','ían'].map(e=>futStem(v)+e);

// --- presente de subjuntivo ---
const SUBJ_FULL={ser:['sea','seas','sea','seamos','seáis','sean'],estar:['esté','estés','esté','estemos','estéis','estén'],ir:['vaya','vayas','vaya','vayamos','vayáis','vayan'],dar:['dé','des','dé','demos','deis','den'],saber:['sepa','sepas','sepa','sepamos','sepáis','sepan'],haber:['haya','hayas','haya','hayamos','hayáis','hayan']};
function subjuntivo(v){
 const base=baseOf(v.lemma),t=typeOf(base),stem=stemOf(base);
 if(SUBJ_FULL[base])return SUBJ_FULL[base].slice();
 const yo=v.present[0].replace(/^(me|te|se|nos|os) /,'');
 let s1=yo.replace(/o$/,'');
 const stemChange=/→/.test(v.kind)&&!/yo/.test(v.kind);
 let s2=s1; // nosotros / vosotros kökü
 if(stemChange){
  if(t==='ir'&&/(e→ie|o→ue)/.test(v.kind))s2=stem.replace(/([eo])([^aeiou]*)$/,(m,vw,rest)=>(vw==='e'?'i':'u')+rest);
  else if(t==='ir'&&/e→i/.test(v.kind))s2=s1;
  else s2=stem;
 } else if(strip(s1)===strip(stem))s2=stem;
 const fix=s=>t==='ar'?s.replace(/c$/,'qu').replace(/g$/,'gu').replace(/z$/,'c'):s.replace(/g$/,'j').replace(/^(.*)gu$/,'$1g');
 const E=t==='ar'?['e','es','e','emos','éis','en']:['a','as','a','amos','áis','an'];
 const f1=t==='ar'?fix(s1):s1,f2=t==='ar'?fix(s2):s2;
 return E.map((e,i)=>(i===3||i===4?f2:f1)+e);
}

// --- participio ve perfecto ---
export function participle(lemma){const base=baseOf(lemma);if(irregularParticiples[base])return irregularParticiples[base];const t=typeOf(base),stem=stemOf(base);return stem+(t==='ar'?'ado':/[aeo]$/.test(strip(stem))?'ído':'ido')}

// Bir fiilin istenen zamandaki biçimleri. Kişili zamanlar 6, emirler 4 (tú, vosotros, usted, ustedes), gerundio 1 biçim döner.
export function conjugate(v,tense){
 const refl=reflOf(v.lemma);
 switch(tense){
  case 'pres':return v.present.slice();
  case 'ger':return [v.gerund];
  case 'imp':return v.imperative.slice();
  case 'perf':return HABER_P.map((h,i)=>(refl?RP[i]+' ':'')+h+' '+participle(v.lemma));
  case 'indef':return withPron(v.lemma,indefinido(v));
  case 'impf':return withPron(v.lemma,imperfecto(v));
  case 'fut':return withPron(v.lemma,futuro(v));
  case 'cond':return withPron(v.lemma,condicional(v));
  case 'subj':return withPron(v.lemma,subjuntivo(v));
  case 'impneg':{const s=subjuntivo(v);return [1,4,2,5].map(i=>'no '+(refl?RP[i]+' ':'')+s[i])}
 }
 return [];
}
