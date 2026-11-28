/* İspanyolca 001–004 Atlası · yerel tarayıcı uygulaması */
const COURSES=['001','002','003','004'];
const courseCls=c=>({'001':'teal','002':'accent','003':'c003','004':'c004'})[c]||'';
const unitWord=l=>l.course==='001'?'Temel':l.course==='002'?(l.week>=11?'Son konular':'Hafta '+l.week):'Ünite '+l.week;
const $=s=>document.querySelector(s);
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const E=escapeHtml;
const disk={get(k,f){try{return JSON.parse(localStorage.getItem('hola_'+k))??f}catch{return f}},set(k,v){try{localStorage.setItem('hola_'+k,JSON.stringify(v))}catch{}}};
const completed=new Set(disk.get('completed',[]));
const writingDrafts=disk.get('writing',{});
const checked=disk.get('writingChecks',{});
const quizHistory=disk.get('quizHistory',[]);
const state={course:disk.get('course','all'),query:'',verbSearch:'',verbKind:'all',verbSelected:'ser',verbReveal:true,vocabCourse:'all',vocabGroup:'all',vocabSearch:'',vocabHide:false,cardIndex:0,cardFlipped:false,noteCourse:'all',noteSearch:'',slideWeek:'all',slideSearch:'',writingSelected:'w4',verbTense:'pres',verbCourse:'all',grammarCourse:'all',grammarSearch:'',grammarMistakes:true,quizMode:'weak',quizSession:null,quizFilter:'',quizCount:10};
const person=['yo','tú','él / ella / usted','nosotros/as','vosotros/as','ellos / ellas / ustedes'];
const weights={};quizHistory.forEach(a=>{(a.questions||[]).forEach(q=>{const item=questions.find(x=>x.question===q.question);if(item&&q.correct===false)weights[item.tag]=(weights[item.tag]||0)+1;});});
const route=()=>{let r=location.hash.replace(/^#\/?/,'');return r||'home'};
const pathLink=id=>'#/lesson/'+encodeURIComponent(id);
const groupTitle=l=>l.course==='001'?'TEMELLER · 001':l.course==='002'?(l.week>=11?'SON KONULAR · 002 (SLAYT BEKLENİYOR)':'HAFTA '+l.week+' · 002'):'ÜNİTE '+l.week+' · '+l.course+' (PRISMA A2)';
const lessonCount=c=>lessons.filter(l=>c==='all'||l.course===c).length;
const doneCount=c=>lessons.filter(l=>(c==='all'||l.course===c)&&completed.has(l.id)).length;
const ratio=c=>Math.round(doneCount(c)*100/lessonCount(c));
const srcBadge=l=>`<span class="pill ${courseCls(l.course)}">İSP ${l.course}</span>${l.course!=='001'?` <span class="pill">${unitWord(l)}</span>`:''}`;
const btnLink=(href,label,cls='primary')=>`<a class="btn ${cls}" href="${href}">${label}</a>`;
const plural=(n,unit)=>`${n} ${unit}`;
const lower=s=>String(s).toLocaleLowerCase('tr');
const noteLink=id=>'#/notes/'+encodeURIComponent(id);
const slideLink=id=>'#/slides/'+encodeURIComponent(id);
const notePages=n=>'Defter s. '+n.pages.join(', ');
const notesFor=pages=>notebook.filter(n=>n.pages.some(p=>pages.includes(p)));
const slidesFor=l=>l.course==='002'?slides.filter(x=>x.week===l.week):[];
const lessonsFor=n=>n.pages?lessons.filter(l=>l.pages.some(p=>n.pages.includes(p))):lessons.filter(l=>l.course==='002'&&l.week===n.week);
const noteText=n=>[n.title,n.summary,...n.blocks.flatMap(b=>[b.h||'',b.text||'',...(b.head||[]),...(b.rows||[]).flat()])].join(' ');
const noteCount=()=>notebook.reduce((sum,n)=>sum+n.blocks.reduce((k,b)=>k+(b.rows?b.rows.length:1),0),0);
function toast(message){$('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.textContent=message;document.body.appendChild(el);setTimeout(()=>el.remove(),2600)}
function updateSidebar(){
 $('#sidebar-progress').textContent=`${completed.size}/${lessons.length}`;
 document.querySelectorAll('[data-course]').forEach(b=>b.classList.toggle('active',b.dataset.course===state.course));
 const q=state.query.trim().toLocaleLowerCase('tr');
 const items=lessons.filter(l=>(state.course==='all'||l.course===state.course)&&(!q||(l.title+' '+l.subtitle+' '+l.explain).toLocaleLowerCase('tr').includes(q)));
 let html='';let last='';items.forEach((l,i)=>{const g=groupTitle(l);if(g!==last){html+=`<div class="nav-heading">${E(g)}</div>`;last=g}html+=`<a href="${pathLink(l.id)}" data-lesson-link="${E(l.id)}"><span class="lesson-n">${String(i+1).padStart(2,'0')}</span><span>${E(l.title.replace(/^Hafta \d+ · /,''))}</span>${completed.has(l.id)?'<span class="done-dot">✓</span>':''}</a>`});
 $('#lesson-nav').innerHTML=html||'<div class="small muted" style="padding:11px">Eşleşen ders yok.</div>';
 const current=route();document.querySelectorAll('.primary-nav a').forEach(a=>a.classList.toggle('active',a.dataset.nav===(current.startsWith('lesson/')?'courses':current.split('/')[0])));
 document.querySelectorAll('[data-lesson-link]').forEach(a=>a.classList.toggle('active',current==='lesson/'+a.dataset.lessonLink));
}
function renderHome(){
 const r=ratio('all');const last=lessons.find(l=>l.id===disk.get('lastLesson',''));const lastIdx=last?lessons.indexOf(last):-1;const nextL=last&&completed.has(last.id)?lessons.slice(lastIdx+1).find(l=>!completed.has(l.id)):null;
 const resume=last?`<a class="card resume-card card-link" href="${pathLink((nextL||last).id)}"><span class="pill ${courseCls((nextL||last).course)}">${nextL?'SIRADAKİ DERS':'KALDIĞIN YERDEN DEVAM ET'}</span><strong>${E((nextL||last).title)}</strong><span class="small sub">${E((nextL||last).subtitle)}</span><span class="resume-arrow">→</span></a>`:'';
 return resume+`<div class="hero"><div class="hero-copy"><div class="eyebrow">İSPANYOLCA ÖĞRENME ATLASI · A1</div><h1>De <em>hola</em> a<br/>hablar español.</h1><p class="lead">İspanyolca 001’in ilk adımlarından 004’ün sonuna kadar: A1 (ders defterin ve sunumların temelinde) ve A2 (Prisma A2 içindekiler listesine göre) için Türkçe anlatımlı çalışma alanı.</p><div class="button-row" style="margin-top:25px">${btnLink('#/courses','Derslere başla →')}${btnLink('#/practice','10 soruluk test','ghost')}</div></div><div class="hero-summary"><div class="progress-ring" style="background:conic-gradient(var(--teal) ${r}%,var(--surface-alt) 0)"><div class="ring-inner"><span class="ring-num">${r}%</span><span class="tiny muted">tamamlandı</span></div></div><div class="small"><strong>${doneCount('all')} / ${lessons.length}</strong> dersi işaretledin.<br/><span class="muted">İlerlemen yalnızca bu tarayıcıya kaydedilir.</span></div></div></div>
 <div class="grid stat-row spaced"><div class="stat-card"><div class="stat-num">${lessons.length}</div><div class="stat-name">ayrıntılı konu</div></div><div class="stat-card"><div class="stat-num">${verbs.length}</div><div class="stat-name">çekimli fiil</div></div><div class="stat-card"><div class="stat-num">${vocabulary.reduce((n,g)=>n+g.items.length,0)}</div><div class="stat-name">anlamlı kelime/kalıp</div></div><div class="stat-card"><div class="stat-num">${notebook.length}</div><div class="stat-name">defter notu konusu</div></div></div>
 <div class="section-heading"><h2>Öğrenme yolu</h2><span class="pill">001 → 002 → 003 → 004</span></div><div class="grid grid-2"><div class="card course-card card-link" data-stamp="001" data-action="go" data-to="#/courses?course=001"><span class="pill teal" style="align-self:start">TEMEL</span><h3>İspanyolca 001</h3><p>Alfabe, selamlaşma, ser/estar, artikeller, sayılar, presente, aile, görünüş, yer tarifleri ve ulaşım.</p><div class="button-row"><span class="pill">${doneCount('001')}/${lessonCount('001')} ders</span><a class="btn sm ghost" href="#/courses?course=001">Konular →</a></div></div><div class="card course-card card-link" data-stamp="002" data-action="go" data-to="#/courses?course=002"><span class="pill accent" style="align-self:start">İSP 002</span><h3>İspanyolca 002</h3><p>Saatler, dönüşlü ve düzensiz fiiller, gustar/doler, yemekler, gelecek, gerundio, restoran, emir kipi, fikir bildirme, pretérito perfecto.</p><div class="button-row"><span class="pill">${doneCount('002')}/${lessonCount('002')} ders</span><a class="btn sm ghost" href="#/courses?course=002">9 haftayı gör →</a></div></div><div class="card course-card card-link" data-stamp="003" data-action="go" data-to="#/courses?course=003"><span class="pill c003" style="align-self:start">A2 · 1. YARI</span><h3>İspanyolca 003</h3><p>Bağlaçlar, ilgi zamirleri, ser/estar, hareket fiilleri, indefinido ve perfecto, belirsiz zamirler, nesne zamirleri, karşılaştırma, dolaylı anlatım.</p><div class="button-row"><span class="pill">${doneCount('003')}/${lessonCount('003')} ders</span><a class="btn sm ghost" href="#/courses?course=003">Üniteler 1–6 →</a></div></div><div class="card course-card card-link" data-stamp="004" data-action="go" data-to="#/courses?course=004"><span class="pill c004" style="align-self:start">A2 · 2. YARI</span><h3>İspanyolca 004</h3><p>Pretérito imperfecto, üç geçmiş zaman, süre ifadeleri, futuro, condicional, olumsuz emir ve presente de subjuntivo.</p><div class="button-row"><span class="pill">${doneCount('004')}/${lessonCount('004')} ders</span><a class="btn sm ghost" href="#/courses?course=004">Üniteler 7–12 →</a></div></div></div>
 <div class="section-heading"><h2>Sana özel tekrar</h2><span class="pill accent">Önceki testlerin</span></div><div class="grid grid-3"><a class="card card-pad card-link" href="#/lesson/002-gerundio"><span class="pill accent">1</span><h3 style="margin-top:15px">Gerundio</h3><p class="sub small">pidiendo, sirviendo, durmiendo gibi düzensiz biçimler.</p></a><a class="card card-pad card-link" href="#/lesson/002-gustar"><span class="pill accent">2</span><h3 style="margin-top:15px">También / tampoco</h3><p class="sub small">“Ben de” ile “ama ben” cevaplarını ayır.</p></a><a class="card card-pad card-link" href="#/lesson/002-duzensiz"><span class="pill accent">3</span><h3 style="margin-top:15px">Kök değişimleri</h3><p class="sub small">Duermes / dormimos, vuelvo / volvemos.</p></a></div>
 <div class="section-heading"><h2>Çalışma araçları</h2></div><div class="grid grid-2"><a href="#/notes" class="card card-pad card-link"><span class="pill teal">${noteCount()} satır</span><h3 style="margin-top:12px">Defter notları</h3><p class="small sub">Ders defterindeki her sayfa düzeltilmiş metin, tablo ve çeviriyle.</p></a><a href="#/slides" class="card card-pad card-link"><span class="pill accent">${slides.length} konu</span><h3 style="margin-top:12px">Slayt notları</h3><p class="small sub">002 sunumlarında olup defterde olmayanlar: kültür kutuları, diyaloglar, alıştırma cevapları.</p></a><a href="#/grammar" class="card card-pad card-link"><span class="pill teal">${lessons.length} konu</span><h3 style="margin-top:12px">Gramer kuralları</h3><p class="small sub">Bütün dil bilgisi kuralları, sık yapılan hatalar ve ipuçları tek sayfada.</p></a><a href="#/verbs" class="card card-pad card-link"><span class="pill">${verbs.length} fiil</span><h3 style="margin-top:12px">Fiil çekimleri</h3><p class="small sub">6 şahıs, gerundio, olumlu emir.</p></a><a href="#/vocab" class="card card-pad card-link"><span class="pill">Türkçe anlam</span><h3 style="margin-top:12px">Kelime & kartlar</h3><p class="small sub">Konu bazlı filtre, çeviriyi gizleme, bilgi kartı.</p></a><a href="#/writing" class="card card-pad card-link"><span class="pill">${writingPrompts.length} görev</span><h3 style="margin-top:12px">Paragraf yazma</h3><p class="small sub">Günlük rutin, hafta sonu, yaz tatili, mezuniyet.</p></a></div>
 <div class="spaced source-note"><strong>Kaynak ve kapsam:</strong> 001 konuları Nuevo Prisma A1'in ilk altı ünitesi ve ders defterinden; 002 konuları “002 semana 1–8 ve 10” sunumlarından derlendi. 003 ve 004, Edinumen’in Prisma A2 içindekiler listesindeki konu sırasına göre genel dil bilgisiyle yazıldı (kitap metni yok). Defter sayfaları fotoğraf olarak değil, düzeltilmiş metin olarak “Defter notları” bölümünde yer alır. Türkçe açıklamalar, örnekler ve sorular özgün çalışma içeriğidir. Sesli/dinleme etkinlikleri yeniden oluşturulmadı.</div>`;
}
function renderCourseList(){
 const filter=(route().split('?course=')[1]||state.course); const shown=lessons.filter(l=>filter==='all'||l.course===filter);let groups=[];
 for(const l of shown){const title=groupTitle(l);let g=groups.find(x=>x.name===title);if(!g){g={name:title,lessons:[]};groups.push(g)}g.lessons.push(l)}
 return `<div class="eyebrow">KRONOLOJİK MÜFREDAT</div><h1>Ders anlatımları</h1><p class="lead">İspanyolca 001 ve 002 ile A1’i bitir, 003 ve 004 ile A2’ye geç. Her konunun sonunda örnekler, çekimler, kaynak gösterimi ve ilgili defter notları var.</p><div class="button-row" style="margin:25px 0"><a class="btn ${filter==='all'?'primary':'ghost'} sm" href="#/courses?course=all">Tümü (${lessons.length})</a>${COURSES.map(c=>`<a class="btn ${filter===c?'primary':'ghost'} sm" href="#/courses?course=${c}">${c} (${lessonCount(c)})</a>`).join('')}</div>${groups.map(g=>`<section class="week-group"><h3>${E(g.name)}</h3><div class="outline-list">${g.lessons.map(l=>`<a class="outline-card" href="${pathLink(l.id)}"><span class="outline-index">${completed.has(l.id)?'✓':String(lessons.indexOf(l)+1).padStart(2,'0')}</span><span class="outline-info"><strong>${E(l.title)}</strong><span>${E(l.subtitle)}</span></span><span class="outline-arrow">→</span></a>`).join('')}</div></section>`).join('')}`;
}
// Düzensiz kısmı bulma: çekimi, fiil düzenli olsaydı alacağı biçimle harf harf karşılaştırır.
const IRR_END={pres:{ar:['o','as','a','amos','ais','an'],er:['o','es','e','emos','eis','en'],ir:['o','es','e','imos','is','en']},imp:{ar:['a','ad','e','en'],er:['e','ed','a','an'],ir:['e','id','a','an']},indef:{ar:['e','aste','o','amos','asteis','aron'],er:['i','iste','io','imos','isteis','ieron'],ir:['i','iste','io','imos','isteis','ieron']},impf:{ar:['aba','abas','aba','abamos','abais','aban'],er:['ia','ias','ia','iamos','iais','ian'],ir:['ia','ias','ia','iamos','iais','ian']},subj:{ar:['e','es','e','emos','eis','en'],er:['a','as','a','amos','ais','an'],ir:['a','as','a','amos','ais','an']}};
const FUT_END=['e','as','a','emos','eis','an'],COND_END=['ia','ias','ia','iamos','iais','ian'];IRR_END.fut={ar:FUT_END,er:FUT_END,ir:FUT_END};IRR_END.cond={ar:COND_END,er:COND_END,ir:COND_END};
const baseCh=c=>c==='ñ'||c==='Ñ'?'ñ':c.normalize('NFD')[0].toLowerCase();
const NOT_VERB=new Set(['zamir','mastar']);
const isInf=w=>!NOT_VERB.has(String(w||'').toLowerCase())&&/^[a-záéíóúñ]*(ar|er|ir|ír)(se)?$/i.test(w||'');
function regularForm(lemma,mode,i){
 const refl=/(ar|er|ir|ír)se$/.test(lemma),base=refl?lemma.slice(0,-2):lemma,type=[...base.slice(-2)].map(baseCh).join(''),stem=base.slice(0,-2);
 if(!IRR_END.pres[type])return null;
 if(mode==='ger')return stem+(type==='ar'?'ando':'iendo')+(refl?'se':'');
 if(mode==='part')return stem+(type==='ar'?'ado':'ido');
 if(mode==='fut'||mode==='cond')return base+IRR_END[mode].ar[i];
 let f=stem+IRR_END[mode][type][i];
 if(mode==='imp'&&refl)f=i===1?f.slice(0,-1)+'os':f+(i===0?'te':'se');
 return f;
}
function markIrregular(lemma,mode,i,form){
 const raw=String(form??'');const bold=/^\*\*.*\*\*$/.test(raw);let f=bold?raw.slice(2,-2):raw;
 const refl=/(ar|er|ir|ír)se$/.test(lemma);let pre='',post='';
 if(refl&&/^(pres|indef|impf|subj|fut|cond)$/.test(mode)){const m=f.match(/^(me|te|se|nos|os) /);if(m){pre=m[0];f=f.slice(pre.length)}}
 if(refl&&mode==='imp'){const m=f.match(/(te|os|se)$/);if(m&&f.length>m[0].length+1){post=m[0];f=f.slice(0,-post.length)}}
 if(refl&&mode==='ger'){const m=f.match(/se$/);if(m){post='se';f=f.slice(0,-2)}}
 const plain=lemma.replace(/se$/,refl?'':'se'===lemma.slice(-2)?'se':'');
 let reg=regularForm(refl?lemma.slice(0,-2):lemma,mode,i);
 const chars=[...f];
 if(!reg||!f||/[ ,()…]/.test(f)){const h=E(pre)+E(f)+E(post);return bold?`<strong>${h}</strong>`:h}
 if(mode==='imp'&&refl&&i===1&&reg.endsWith('d'))reg=reg.slice(0,-1);
 const a=chars.map(baseCh),b=[...reg].map(baseCh);
 // çekim eki: düzenli ekle (ya da gerundioda -ando/-iendo/-yendo ile) eşleşen son kısım
 const type=[...(refl?lemma.slice(0,-4):lemma.slice(0,-2)),...''].length,base=refl?lemma.slice(0,-2):lemma,t=[...base.slice(-2)].map(baseCh).join('');
 let ending=mode==='ger'?(a.join('').match(/(ando|iendo|yendo)$/)||[''])[0]:mode==='part'?(a.join('').match(/(ado|ido)$/)||[''])[0]:(IRR_END[mode][t]||[])[i]||'';
 if(mode==='imp'&&refl&&i===1)ending=ending.replace(/d$/,'');
 let endLen=ending&&a.join('').endsWith(ending)?ending.length:0;
 const STRONG=['e','iste','o','imos','isteis','ieron'];let strong=0;if(mode==='indef'&&!endLen&&a.join('').endsWith(STRONG[i])&&chars.length>STRONG[i].length+1)strong=STRONG[i].length;
 // düzensiz kısım
 let p=0;while(p<a.length&&p<b.length&&a[p]===b[p])p++;let q=0;while(q<a.length-p&&q<b.length-p&&a[a.length-1-q]===b[b.length-1-q])q++;
 let st=p,en=chars.length-q;const regMid=b.length-p-q,stemless=/^(ser|ir|irse)$/.test(lemma);
 if(en<=st&&regMid>0){st=0;en=chars.length}
 if(en>st){
  if(stemless||en-st>=Math.ceil(chars.length*0.6)||(regMid>=2&&(en-st)/chars.length>=0.5&&chars.length<=3)){st=0;en=chars.length}
  else if(en-st===1&&/[iu]/.test(a[st])&&a[st+1]==='e'&&!(a[st]==='u'&&/[qg]/.test(a[st-1]||'')))en++;
  else if(en-st===1&&a[st]==='e'&&/[iu]/.test(a[st-1]||'')&&!(a[st-1]==='u'&&/[qg]/.test(a[st-2]||'')))st--;
 }
 if(lemma==='ser'&&mode==='imp'&&i===0){st=0;en=chars.length}
 if((mode==='fut'||mode==='cond')&&endLen&&!/^(ser|ir|irse)$/.test(lemma)&&a.join('').slice(0,-endLen)!==b.join('').slice(0,-endLen)){st=0;en=chars.length-endLen}
 if(strong){if(en>chars.length-strong&&chars.length-strong>st)en=chars.length-strong;if(en<=chars.length-strong)endLen=strong}
 const irr=en>st;if(irr&&st===0&&en===chars.length&&!strong)endLen=0;
 let endStart=chars.length-endLen;if(irr&&endStart<en)endStart=en;
 const seg=(x,y)=>E(chars.slice(x,y).join(''));
 let h='';
 if(irr){h=seg(0,Math.min(st,endStart))+`<mark class="irr">${seg(st,en)}</mark>`+seg(en,endStart)}else h=seg(0,endStart);
 if(endStart<chars.length)h+=`<span class="end">${seg(endStart,chars.length)}</span>`;
 h=(pre?`<span class="pron">${E(pre.trim())}</span> `:'')+h+(post?`<span class="pron">${E(post)}</span>`:'');
 return bold?`<strong>${h}</strong>`:h;
}
// Olumsuz emir: no + (zamir) + subjuntivo. tú→2. tekil, vosotros→2. çoğul, usted→3. tekil, ustedes→3. çoğul.
const NEG_IDX=[1,4,2,5];
function markNegative(lemma,impIdx,cell){const raw=String(cell??'');const bold=/^\*\*.*\*\*$/.test(raw);const f=bold?raw.slice(2,-2):raw;const m=f.match(/^no (.+)$/);if(!m)return null;const h='no '+markIrregular(lemma,'subj',NEG_IDX[impIdx],m[1]);return bold?`<strong>${h}</strong>`:h}
// Participio ve pretérito perfecto (haber + participio).
const HABER=['he','has','ha','hemos','habéis','han'];
const REFL_P=['me','te','se','nos','os','se'];
function markPerfect(lemma,cell){
 const raw=String(cell??'');const bold=/^\*\*.*\*\*$/.test(raw);const f=bold?raw.slice(2,-2):raw;
 const m=f.match(/^((?:me|te|se|nos|os) )?(he|has|ha|hemos|habéis|han) (\S+)$/);if(!m)return null;
 const h=(m[1]?`<span class="pron">${E(m[1].trim())}</span> `:'')+`<span class="aux">${E(m[2])}</span> `+markIrregular(lemma,'part',0,m[3]);
 return bold?`<strong>${h}</strong>`:h;
}
// Tablo bir çekim tablosuysa zamanı ve her hücrenin fiilini / şahsını bulur.
const P_PRES={yo:0,'tú':1,'él':2,ella:2,usted:2,nosotros:3,nosotras:3,vosotros:4,vosotras:4,ellos:5,ellas:5,ustedes:5};
const P_IMP={'tú':0,vosotros:1,vosotras:1,usted:2,ustedes:3};
const firstWord=t=>String(t).replace(/\*\*/g,'').trim().split(/[\s/(]+/)[0].toLowerCase();
const isEndingHead=h=>/^-(ar|er|ir)\b/.test(String(h).trim());
function conjInfo(head,rows,forced){
 const H=head.map(firstWord),R=rows.map(r=>firstWord(r[0]));
 const style=(c,txt)=>{if(/^zamir/i.test(String(head[c]).trim())){const t=String(txt).trim();let m;if(/^(me|te|se|nos|os)$/.test(t))return `<span class="pron">${E(t)}</span>`;if((m=t.match(/^(me|te|se|nos|os) (.+)$/)))return `<span class="pron">${E(m[1])}</span> ${E(m[2])}`;if((m=t.match(/^(.+?)(me|te|se|nos|os)$/))&&/(ar|er|ir|ár|ér|ír|ando|iendo|ándo|iéndo)$/.test(m[1]))return `${E(m[1])}<span class="pron">${E(m[2])}</span>`;return null}if(isEndingHead(head[c])||(c>0&&/^-[a-záéíóú]+$/.test(String(txt).trim())))return `<span class="end">${E(txt)}</span>`;return null};
 // 1) Satırlar şahıs, sütunlar fiil
 if(R.some(l=>l in P_PRES)&&!R.some(l=>!(l in P_PRES))){
  const mode=forced||(R.includes('yo')||R.includes('nosotros')||R.includes('ellos')?'pres':'imp'),map=mode==='imp'||mode==='impneg'?P_IMP:P_PRES;
  const verbCols=H.map((h,c)=>c>0&&isInf(h));const endCols=head.map((h,c)=>c>0&&isEndingHead(h));
  if(!verbCols.some(Boolean)&&!endCols.some(Boolean))return {mode:null,cell:(r,c,t)=>style(c,t)};
  const perfRe=/^(\*\*)?((me|te|se|nos|os) )?(he|has|ha|hemos|habéis|han) \S+/;const perf=rows.some(r=>r.some((x,c)=>verbCols[c]&&perfRe.test(String(x))));
  if(perf&&!forced)return {mode:'perf',cell:(r,c,t)=>verbCols[c]?markPerfect(H[c],t)??style(c,t):style(c,t)};
  if(mode==='impneg')return {mode,cell:(r,c,t)=>verbCols[c]&&P_IMP[R[r]]!=null?markNegative(H[c],P_IMP[R[r]],t)??style(c,t):style(c,t)};
  return {mode,cell:(r,c,t)=>verbCols[c]&&map[R[r]]!=null?markIrregular(H[c],mode,map[R[r]],t):style(c,t)};
 }
 // 2) Satırlar fiil, sütunlar şahıs ya da gerundio
 const pres=H.map((h,c)=>c>0&&h in P_PRES&&!(h in P_IMP&&!H.includes('yo')&&!H.includes('él')&&!H.includes('nosotros')));
 const imp=H.map((h,c)=>c>0&&h in P_IMP&&!pres[c]);const ger=H.map((h,c)=>c>0&&h==='gerundio');const partC=H.map((h,c)=>c>0&&h==='participio');
 const rowLemma=r=>isInf(R[r])?R[r]:isInf(H[0])?H[0]:null;
 const mode=pres.some(Boolean)?(forced||'pres'):imp.some(Boolean)?(forced==='impneg'?'impneg':'imp'):ger.some(Boolean)?'ger':partC.some(Boolean)?'perf':null;
 if(mode&&rows.some((_,r)=>rowLemma(r)))return {mode,cell:(r,c,t)=>{const l=rowLemma(r);if(!l)return null;if(pres[c])return markIrregular(l,forced&&forced!=='impneg'?forced:'pres',P_PRES[H[c]],t);if(imp[c]&&forced==='impneg')return markNegative(l,P_IMP[H[c]],t);if(imp[c])return markIrregular(l,'imp',P_IMP[H[c]],t);if(ger[c])return markIrregular(l,'ger',0,t);if(partC[c])return markPerfect(l,t)??markIrregular(l,'part',0,t);return null}};
 return null;
}
const TENSE_LABEL={pres:'Presente de indicativo · şimdiki / geniş zaman',imp:'Imperativo afirmativo · olumlu emir',ger:'Gerundio · -arak / estar + gerundio = -yor',impf:'Pretérito imperfecto · -yordu / -ardı (alışkanlık, tasvir)',fut:'Futuro imperfecto · -acak',cond:'Condicional simple · -ardı / -abilir (nezaket, tavsiye)',subj:'Presente de subjuntivo · dilek / istek kipi',impneg:'Imperativo negativo · olumsuz emir (no + subjuntivo)',indef:'Pretérito indefinido · -dı (bitmiş geçmiş)',perf:'Pretérito perfecto · haber + participio (-dı / -mış)'};
const tenseCaption=mode=>`<div class="table-caption"><strong>${TENSE_LABEL[mode]}</strong><span class="legend"><mark class="irr">kırmızı</mark> düzensiz kısım · <span class="end">yeşil</span> çekim eki · <span class="pron">mavi</span> dönüşlü zamir${mode==='perf'?' · <span class="aux">mor</span> haber':''}</span></div>`;
// Ders anlatımı biçimi: "## " başlık, "- " madde, "1. " numaralı adım, "| a | b |" tablo satırı (ilk satır başlık), "! " dikkat kutusu, "**x**" kalın.
function tableHtml(head,body,fmt=E,forced){
 const info=conjInfo(head,body,forced);
 const stack=!(info&&info.mode)&&head.length<=4&&head.some(Boolean);
 return `${info&&info.mode?tenseCaption(info.mode):''}<div class="table-scroller${stack?' stack':''}"><table${info&&info.mode?' class="conj-lite"':''}>${head.some(Boolean)?`<thead><tr>${head.map(h=>`<th>${fmt(h)}</th>`).join('')}</tr></thead>`:''}<tbody>${body.map((r,ri)=>`<tr>${r.map((c,ci)=>`<td data-label="${E(String(head[ci]??'').replace(/\*\*/g,''))}">${(info&&info.cell(ri,ci,c))??fmt(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function inlineMd(t){return E(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}
function explainHtml(l){
 const lines=lessonText[l.id]||[l.explain];let out='',i=0,forcedTense=null;
 while(i<lines.length){const t=lines[i];
  if(t.startsWith('## ')){out+=`<h3>${inlineMd(t.slice(3))}</h3>`;i++;continue}
  if(t.startsWith('@ ')){forcedTense=t.slice(2).trim();i++;continue}
  if(t.startsWith('! ')){out+=`<div class="hint-box"><strong>Dikkat:</strong> ${inlineMd(t.slice(2))}</div>`;i++;continue}
  const grab=re=>{const g=[];while(i<lines.length&&re.test(lines[i]))g.push(lines[i++]);return g};
  if(/^- /.test(t)){out+=`<ul>${grab(/^- /).map(x=>`<li>${inlineMd(x.slice(2))}</li>`).join('')}</ul>`;continue}
  if(/^\d+\. /.test(t)){out+=`<ol>${grab(/^\d+\. /).map(x=>`<li>${inlineMd(x.replace(/^\d+\. /,''))}</li>`).join('')}</ol>`;continue}
  if(t.startsWith('|')){const rows=grab(/^\|/).map(x=>x.replace(/^\||\|$/g,'').split('|').map(c=>c.trim()));out+=tableHtml(rows[0],rows.slice(1),inlineMd,forcedTense);forcedTense=null;continue}
  out+=`<p>${inlineMd(t)}</p>`;i++}
 return `<div class="explain">${out}</div>`;
}
function lessonNotes(l){return (lessonSources[l.id]||[]).map(id=>notebook.find(n=>n.id===id)||slides.find(n=>n.id===id)).filter(Boolean)}
function sourcesHtml(l){
 const list=lessonNotes(l);if(!list.length)return '';
 return `<div class="section-heading" id="tum-ornekler"><h2>Defter ve slayttan tüm örnekler</h2><span class="pill">${list.reduce((k,n)=>k+n.blocks.reduce((m,b)=>m+(b.rows?b.rows.length:1),0),0)} satır</span></div>${list.map((n,k)=>{const isSlide=!n.pages;return `<div class="source-head"><span class="pill ${isSlide?'accent':'teal'}">${isSlide?'Slayt · 002 semana '+n.week:E(notePages(n))}</span><a href="${isSlide?slideLink(n.id):noteLink(n.id)}">${E(n.title)} →</a></div>${n.blocks.map((b,i)=>renderBlock(b,i,'kaynak-'+k)).join('')}`}).join('')}`;
}
function renderLesson(id){
 const l=lessons.find(x=>x.id===id);if(l)disk.set('lastLesson',l.id);if(!l)return `<h1>Ders bulunamadı</h1>${btnLink('#/courses','Derslere dön')}`;
 const idx=lessons.indexOf(l),next=lessons[idx+1],prev=lessons[idx-1];
 return `<div class="breadcrumb"><a href="#/courses">Dersler</a> › <span>İspanyolca ${l.course}</span> › <span>${unitWord(l)}</span></div><div class="lesson-head"><div class="button-row" style="margin-bottom:13px">${srcBadge(l)} ${completed.has(l.id)?'<span class="pill teal">✓ Çalışıldı</span>':''}</div><h1>${E(l.title)}</h1><p class="lead lesson-lead">${E(l.subtitle)}</p></div><div class="lesson-layout"><div class="lesson-body"><section class="card section-card" id="aciklama"><div class="label-strong">KONU ANLATIMI</div><h2 style="margin-top:9px">Konuyu öğren</h2>${explainHtml(l)}</section>${lessonText[l.id]?'':`<section class="card section-card" id="kurallar"><div class="label-strong">KURAL + KALIP</div><h2 style="margin-top:9px">Bilmen gerekenler</h2><div class="rule-grid">${l.rules.map(([a,b])=>`<div class="rule-row"><strong>${E(a)}</strong><p>${E(b)}</p></div>`).join('')}</div></section>`}<section class="card section-card" id="ornekler"><div class="label-strong">ES → TR</div><h2 style="margin-top:9px">Örnek cümleler</h2>${l.examples.map(([es,tr])=>`<div class="example-row"><div class="example-es" lang="es">${E(es)}</div><div class="example-tr">${E(tr)}</div></div>`).join('')}</section>${l.table?`<section class="card section-card" id="tablo"><div class="label-strong">ÇEKİM / KARŞILAŞTIRMA</div><h2 style="margin-top:9px">Tablo</h2>${tableHtml(l.table.headers,l.table.rows,E,l.table.tense)}</section>`:''}${sourcesHtml(l)}<div class="hint-box" id="ipucu"><strong>Dikkat:</strong> ${E(l.tip)}</div><div class="button-row spaced"><button class="btn ${completed.has(l.id)?'ghost':'teal'}" data-action="mark" data-id="${E(l.id)}">${completed.has(l.id)?'✓ Tamamlandı · geri al':'✓ Bu dersi tamamladım'}</button><button class="btn ghost" data-action="practice-lesson" data-id="${E(l.id)}">Bu konudan soru çöz →</button></div><div class="button-row spaced" style="justify-content:space-between">${prev?btnLink(pathLink(prev.id),'← Önceki ders','ghost'):'<span></span>'}${next?btnLink(pathLink(next.id),'Sonraki ders →','ghost'):'<span></span>'}</div></div><aside class="lesson-side"><div class="card side-card"><h4>Bu sayfada</h4><div class="mini-list"><a href="#aciklama" data-anchor="aciklama">Konu anlatımı</a>${lessonText[l.id]?'':'<a href="#kurallar" data-anchor="kurallar">Kurallar</a>'}<a href="#ornekler" data-anchor="ornekler">Cümle örnekleri</a>${l.table?'<a href="#tablo" data-anchor="tablo">Çekim tablosu</a>':''}${lessonNotes(l).length?'<a href="#tum-ornekler" data-anchor="tum-ornekler">Defter ve slayttan tüm örnekler</a>':''}<a href="#ipucu" data-anchor="ipucu">Sınav ipucu</a></div></div><div class="card side-card"><h4>Kaynak</h4><p class="small sub">${E(l.source)}</p></div>${notesFor(l.pages).length?`<div class="card side-card"><h4>Defter notları</h4><div class="mini-list">${notesFor(l.pages).map(n=>`<a href="${noteLink(n.id)}">${E(n.title)}</a>`).join('')}</div></div>`:''}${slidesFor(l).length?`<div class="card side-card"><h4>Slayt notları · Hafta ${l.week}</h4><div class="mini-list">${slidesFor(l).map(n=>`<a href="${slideLink(n.id)}">${E(n.title)}</a>`).join('')}</div></div>`:''}<div class="card side-card"><h4>Pratik</h4><p class="small sub">Bu konudan ${questions.filter(q=>q.lesson===l.id).length} soru var.</p><button class="btn sm ghost" data-action="practice-lesson" data-id="${E(l.id)}">Soru çöz →</button></div></aside></div>`;
}
function selectVerb(){return verbs.find(v=>v.lemma===state.verbSelected)||verbs[0]}
// Fiil sayfası: kurs ayrımı ve zaman seçimi.
const P6=['yo','tú','él / ella / usted','nosotros/as','vosotros/as','ellos / ustedes'],P4=['tú','vosotros/as','usted','ustedes'];
const tensePersons=t=>t==='ger'?['gerundio']:t==='imp'||t==='impneg'?P4:P6;
const tenseInfo=t=>TENSES.find(x=>x.id===t)||TENSES[0];
function markForm(v,t,i,f){if(!state.verbReveal)return '••••';if(t==='perf')return markPerfect(v.lemma,f)??E(f);if(t==='impneg')return markNegative(v.lemma,i,f)??E(f);return markIrregular(v.lemma,t,i,f)}
// Fiilin derslerde ilk geçtiği yer (dersler 001 → 004 sırasıyla taranır).
const lessonPlainText=l=>[l.title,l.subtitle,l.explain,...l.rules.flat(),...l.examples.flat(),...(l.table?[...l.table.headers,...l.table.rows.flat()]:[]),...(lessonText[l.id]||[])].join(' ').toLowerCase();
const LESSON_TEXT_CACHE={};
function verbFirstLesson(v){
 if(v._first!==undefined)return v._first;
 const lemma=v.lemma.toLowerCase(),re=new RegExp('(^|[^a-záéíóúñü])'+lemma+'([^a-záéíóúñü]|$)');
 const hit=lessons.find(l=>re.test(LESSON_TEXT_CACHE[l.id]??=lessonPlainText(l)))||null;
 return v._first=hit;
}
const verbCourse=v=>verbFirstLesson(v)?.course||(/dönüşlü|→|özel/.test(v.kind)?'002':'001');
function verbTables(list){
 if(!list.length)return '';
 const t=state.verbTense,info=tenseInfo(t),heads=tensePersons(t);
 const kinds=[...new Set(list.map(v=>v.kind))];
 const lemmaCell=v=>`<td class="sticky-col"><button class="link-btn" data-action="verb-select" data-id="${E(v.lemma)}" lang="es">${E(v.lemma)}</button><span class="tiny muted">${E(v.tr)} · ${verbCourse(v)}</span></td>`;
 const row=v=>{const f=conjugate(v,t);return `<tr>${lemmaCell(v)}${t==='perf'?`<td lang="es">${state.verbReveal?markIrregular(v.lemma,'part',0,participle(v.lemma)):'••••'}</td>`:''}${heads.map((_,i)=>`<td lang="es">${f[i]!=null?markForm(v,t,i,f[i]):'—'}</td>`).join('')}</tr>`};
 const cols=heads.length+1+(t==='perf'?1:0);
 const body=kinds.map(k=>`<tr class="group-row"><td colspan="${cols}">${E(k)}</td></tr>${list.filter(v=>v.kind===k).map(row).join('')}`).join('');
 return `<div class="section-heading" id="cekim-tablosu"><h2>${E(info.name)} · ${E(info.tr)}</h2><span class="pill">${list.length} fiil</span></div><p class="small sub"><mark class="irr">Kırmızı</mark> harfler düzensiz kısımdır (fiil düzenli olsaydı alacağı biçimden farklı olanlar), <span class="end">yeşil</span> kısım çekim eki, <span class="pron">mavi</span> kısım dönüşlü zamirdir. Yukarıdaki kurs, çekim, tür ve arama seçimleri bu tabloyu süzer; fiile tıklayınca ayrıntısı açılır.</p>${tenseCaption(t)}<div class="table-scroller"><table class="conj-table"><thead><tr><th class="sticky-col">Fiil</th>${t==='perf'?'<th>participio</th>':''}${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>`;
}
function verbChart(v){
 const personT=TENSES.filter(x=>x.persons===6),impT=TENSES.filter(x=>x.persons===4);
 const rowCls=id=>id===state.verbTense?' class="row-selected"':'';
 const tenseCell=x=>`<td class="sticky-col"><button class="link-btn" data-action="verb-tense" data-id="${x.id}">${E(x.name)}</button><span class="tiny muted">${E(x.tr)}</span></td>`;
 const t1=`<div class="table-scroller"><table class="conj-table"><thead><tr><th class="sticky-col">Zaman</th>${P6.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${personT.map(x=>{const f=conjugate(v,x.id);return `<tr${rowCls(x.id)}>${tenseCell(x)}${f.map((form,i)=>`<td lang="es">${markForm(v,x.id,i,form)}</td>`).join('')}</tr>`}).join('')}</tbody></table></div>`;
 const t2=`<div class="table-scroller"><table class="conj-table"><thead><tr><th class="sticky-col">Emir</th>${P4.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${impT.map(x=>{const f=conjugate(v,x.id);return `<tr${rowCls(x.id)}>${tenseCell(x)}${P4.map((_,i)=>`<td lang="es">${f[i]!=null?markForm(v,x.id,i,f[i]):'—'}</td>`).join('')}</tr>`}).join('')}</tbody></table></div>`;
 const g=conjugate(v,'ger')[0];
 return `<div class="label-strong" style="margin:14px 0 6px">BU FİİLİN BÜTÜN ZAMANLARI · zaman adına tıklayınca alttaki tablo o zamana geçer</div>${t1}${t2}<div class="grid grid-2" style="margin-top:12px"><div class="verb-cell${state.verbTense==='ger'?' row-selected':''}"><div class="label-strong"><button class="link-btn" data-action="verb-tense" data-id="ger">GERUNDIO</button> · -arak / -yor</div><h3 lang="es" style="margin-top:9px">${markForm(v,'ger',0,g)}</h3></div><div class="verb-cell"><div class="label-strong">PARTICIPIO · -mış (haber ile)</div><h3 lang="es" style="margin-top:9px">${state.verbReveal?markIrregular(v.lemma,'part',0,participle(v.lemma)):'••••'}</h3></div></div>`;
}
function renderVerbs(){
 const q=lower(state.verbSearch);
 const filtered=verbs.filter(v=>(state.verbCourse==='all'||verbCourse(v)===state.verbCourse)&&(state.verbKind==='all'||v.kind.includes(state.verbKind))&&lower(v.lemma+' '+v.tr+' '+v.kind).includes(q));
 const v=filtered.find(x=>x.lemma===state.verbSelected)||filtered[0]||selectVerb();
 const first=verbFirstLesson(v);
 const opt=(val,txt,cur)=>`<option value="${val}" ${cur===val?'selected':''}>${E(txt)}</option>`;
 return `<div class="eyebrow">6 ŞAHIS · ${TENSES.length} ÇEKİM · İSP 001–004</div><h1>Fiil çekimleri</h1><p class="lead">Kursa ve çekime göre süz, fiili seç. Kart, seçili fiilin bütün zamanlarını gösterir; alttaki tablo filtrelenen fiillerin seçili zamandaki çekimidir.</p><div class="toolbar"><label class="wide"><span class="form-label">Fiil veya Türkçe anlam ara</span><input class="plain-input" id="verb-search" value="${E(state.verbSearch)}" placeholder="ör. dormir, yatmak, çalışmak…" /></label><label><span class="form-label">Kurs</span><select class="plain-select" id="verb-course">${opt('all','Tüm kurslar',state.verbCourse)}${COURSES.map(c=>opt(c,'İSP '+c+' ('+verbs.filter(x=>verbCourse(x)===c).length+')',state.verbCourse)).join('')}</select></label><label><span class="form-label">Çekim</span><select class="plain-select" id="verb-tense">${TENSES.map(x=>opt(x.id,x.name,state.verbTense)).join('')}</select></label><label><span class="form-label">Fiil türü</span><select class="plain-select" id="verb-kind">${opt('all','Tüm fiiller',state.verbKind)}${['düzenli','düzensiz','yo','e→ie','o→ue','e→i','dönüşlü','özel yapı'].map(x=>opt(x,x,state.verbKind)).join('')}</select></label></div><div class="verb-grid"><div class="card verb-list">${filtered.length?filtered.map(x=>`<button class="verb-choice ${x.lemma===v.lemma?'active':''}" data-action="verb-select" data-id="${E(x.lemma)}"><span>${E(x.lemma)} <span class="pill ${courseCls(verbCourse(x))}" style="font-size:9px;padding:1px 6px">${verbCourse(x)}</span></span><small>${E(x.tr)}</small></button>`).join(''):'<div class="empty">Eşleşen fiil yok.</div>'}</div><div class="card verb-detail"><div class="button-row" style="justify-content:space-between"><div><div class="verb-type">${E(v.kind)} · İSP ${verbCourse(v)}</div><h2 lang="es">${E(v.lemma)}</h2><p class="sub">${E(v.tr)}</p>${first?`<p class="small">İlk geçtiği ders: <a href="${pathLink(first.id)}">${E(first.title)}</a></p>`:''}</div><button class="btn sm ghost" data-action="verb-reveal">${state.verbReveal?'Çekimleri gizle':'Çekimleri göster'}</button></div>${verbChart(v)}${v.kind.includes('özel')?'<p class="hint-box" style="margin-top:14px">Gustar/doler ve benzerlerinde pratikte me/te/le/nos/os/les + gusta(n)/duele(n) yapısı kullanılır; tablodaki biçimler fiilin kendi çekimidir.</p>':''}</div></div>${verbTables(filtered)}`;
}
function wordPool(){return vocabulary.filter(g=>(state.vocabCourse==='all'||g.course===state.vocabCourse)&&(state.vocabGroup==='all'||g.group===state.vocabGroup)).flatMap(g=>g.items.map(w=>({...w,group:g.group,course:g.course}))).filter(w=>(w.es+' '+w.tr).toLocaleLowerCase('tr').includes(state.vocabSearch.toLocaleLowerCase('tr')))}
function renderVocab(){
 const pool=wordPool();const groups=vocabulary.filter(g=>state.vocabCourse==='all'||g.course===state.vocabCourse);
 const n=pool.length;if(state.cardIndex>=n)state.cardIndex=0;const cur=pool[state.cardIndex];
 return `<div class="eyebrow">İSPANYOLCA ↔ TÜRKÇE</div><h1>Kelime sözlüğü</h1><p class="lead">28 konu grubu. Türkçe çevirileri görünür tutabilir, gizleyebilir ya da tek tek kartlarla tekrar edebilirsin.</p><div class="toolbar"><label><span class="form-label">Kurs</span><select id="vocab-course" class="plain-select"><option value="all">Tüm kurslar</option><option value="001" ${state.vocabCourse==='001'?'selected':''}>İspanyolca 001</option><option value="002" ${state.vocabCourse==='002'?'selected':''}>İspanyolca 002</option>${['003','004'].filter(c=>vocabulary.some(g=>g.course===c)).map(c=>`<option value="${c}" ${state.vocabCourse===c?'selected':''}>İspanyolca ${c}</option>`).join('')}</select></label><label><span class="form-label">Kelime grubu</span><select id="vocab-group" class="plain-select"><option value="all">Tüm kategoriler</option>${groups.map(g=>`<option ${state.vocabGroup===g.group?'selected':''} value="${E(g.group)}">${E(g.group)} (${g.items.length})</option>`).join('')}</select></label><label class="wide"><span class="form-label">Ara</span><input id="vocab-search" class="plain-input" value="${E(state.vocabSearch)}" placeholder="ör. zanahoria / havuç" /></label></div><div class="button-row" style="justify-content:space-between;margin-bottom:20px"><div><strong>${n}</strong> <span class="small sub">kelime / kalıp</span></div><button class="btn sm ghost" data-action="vocab-hide">${state.vocabHide?'Türkçeyi göster':'Türkçeyi gizle'}</button></div>${n?`<div class="grid grid-2" style="align-items:start"><div><div class="label-strong" style="margin-bottom:10px">EZBER KARTI · KARTA TIKLA</div><button class="flashcard" data-action="card-flip" style="width:100%"><div>${state.cardFlipped?`<div class="answer-word">${E(cur.tr)}</div><span class="small">${E(cur.es)}</span>`:`<div class="main-word" lang="es">${E(cur.es)}</div><span class="small">Anlamını görmek için çevir</span>`}</div></button><div class="flashcards-controls"><button class="btn sm ghost" data-action="card-prev">←</button><span class="small">${state.cardIndex+1} / ${n}</span><button class="btn sm ghost" data-action="card-next">→</button></div><p class="small muted" style="text-align:center">Konu: ${E(cur.group)}</p></div><div class="vocab-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">${pool.slice(0,80).map(w=>`<div class="vocab-item ${state.vocabHide?'hidden-tr':''}" tabindex="0"><strong lang="es">${E(w.es)}</strong><span>${E(w.tr)}</span></div>`).join('')}</div></div>${n>80?`<p class="small muted spaced">İlk 80 eşleşme gösteriliyor. Daha fazlası için bir kategori seç veya arama yap.</p>`:''}`:'<div class="card empty">Eşleşen kelime yok. Filtreleri temizle.</div>'}`;
}
function shuffle(arr){const out=[...arr];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
function questionsForMode(){let pool=questions;if(state.quizFilter){pool=pool.filter(q=>q.lesson===state.quizFilter);return pool}if(COURSES.includes(state.quizMode))return pool.filter(q=>q.lesson.startsWith(state.quizMode));if(state.quizMode==='weak')return pool.filter(q=>['gerundio','tampoco','duzensiz','reflexivo','imperativo','gustar'].includes(q.tag));return pool}
function startQuiz(){const pool=questionsForMode();const chosen=shuffle(pool).slice(0,Math.min(Math.max(1,state.quizCount),pool.length));if(!chosen.length){toast('Bu filtrede soru bulunamadı');return}state.quizSession={items:chosen,current:0,answers:[],finished:false};render()}
function answerQuiz(i){const s=state.quizSession;if(!s||s.answers[s.current]!=null)return;s.answers[s.current]=i;render()}
function nextQuiz(){const s=state.quizSession;if(!s)return;if(s.current<s.items.length-1)s.current++;else {s.finished=true;const result={date:new Date().toISOString(),correct:s.items.filter((q,i)=>s.answers[i]===q.answer).length,total:s.items.length,questions:s.items.map((q,i)=>({question:q.question,correct:s.answers[i]===q.answer}))};quizHistory.unshift(result);if(quizHistory.length>25)quizHistory.length=25;disk.set('quizHistory',quizHistory)}render()}
function renderQuiz(){
 const s=state.quizSession;
 if(!s){const pool=questionsForMode();return `<div class="eyebrow">KENDİNİ DENE · AÇIKLAMALI SORULAR</div><h1>Test merkezi</h1><p class="lead">Soru seç, cevap ver, nedenini Türkçe öğren. Önceki sınavlarında özellikle gerundio, también/tampoco ve düzensiz çekimler zorladı: “Kişisel tekrar” bu başlıklardan soru seçer.</p><div class="grid grid-2 spaced"><div class="card quiz-intro"><div class="label-strong">KONULAR</div><div class="pill-switch">${[['weak','Kişisel tekrar'],...COURSES.map(c=>[c,'İspanyolca '+c]),['all','Tüm konular']].map(([key,v])=>`<button class="${state.quizMode===key&&!state.quizFilter?'active':''}" data-action="quiz-mode" data-id="${key}">${v}</button>`).join('')}</div><div class="small sub">${state.quizFilter?'Tek konuluk çalışma: '+E(lessons.find(l=>l.id===state.quizFilter)?.title||''):E(pool.length+' sorudan seçim yapılacak.')}</div><label><span class="form-label">Soru sayısı</span><select id="quiz-count" class="plain-select"><option value="5" ${state.quizCount===5?'selected':''}>5 soru</option><option value="10" ${state.quizCount===10?'selected':''}>10 soru</option><option value="15" ${state.quizCount===15?'selected':''}>15 soru</option><option value="20" ${state.quizCount===20?'selected':''}>20 soru</option></select></label><button class="btn primary" data-action="quiz-start">Başlat →</button></div><div class="card card-pad"><div class="label-strong">NASIL ÇALIŞIYOR?</div><h3 style="margin-top:10px">Hata yaparak öğren</h3><p class="sub small">Her soruda dört seçenek var. Seçtikten sonra doğru cevabı ve açıklamasını görürsün. Sonuçların bu cihazda saklanır.</p><div class="hint-box">Kişisel tekrar konuları önceki sohbet içindeki üç testinin yanlışlarına göre seçildi. Yeni test sonuçları ayrıca saklanır.</div>${quizHistory.length?`<h4 class="spaced">Son denemelerin</h4>${quizHistory.slice(0,4).map(x=>`<p class="small sub">${new Date(x.date).toLocaleDateString('tr-TR')} · ${x.correct}/${x.total}</p>`).join('')}`:''}</div></div>`}
 if(s.finished){const correct=s.items.filter((q,i)=>s.answers[i]===q.answer).length;return `<div class="eyebrow">DENEME SONUCU</div><h1>Sonuçların</h1><div class="card card-pad"><div class="result-box"><div class="score-big">${correct}<span>/${s.items.length}</span></div><div><h3>${correct===s.items.length?'Tüm cevaplar doğru!':correct>=s.items.length*.7?'İyi gidiyorsun.':'Biraz daha tekrar edelim.'}</h3><p class="sub">Yanlışları aşağıda bulabilirsin. Özellikle yanlışlarının açıklamasını yeniden oku.</p></div></div><div class="score-list spaced">${s.items.map((q,i)=>`<span class="${s.answers[i]===q.answer?'ok':'bad'}">${i+1} ${s.answers[i]===q.answer?'✓':'×'}</span>`).join('')}</div><div class="button-row spaced"><button class="btn primary" data-action="quiz-new">Yeni test çöz →</button><a class="btn ghost" href="#/courses">Derslere dön</a></div></div><div class="section-heading"><h2>Cevap açıklamaları</h2></div>${s.items.map((q,i)=>`<div class="card card-pad" style="margin-bottom:10px"><div class="small muted">Soru ${i+1}</div><h3>${E(q.question)}</h3><p class="small">Senin cevabın: <strong>${E(q.options[s.answers[i]])}</strong></p><p class="small" style="color:var(--teal)">Doğru cevap: <strong>${E(q.options[q.answer])}</strong></p><p class="small sub">${E(q.why)}</p></div>`).join('')}`}
 const q=s.items[s.current],chosen=s.answers[s.current],answered=chosen!=null;
 return `<div class="eyebrow">SİNİRLE DEĞİL, KURALLA · İSP PRATİĞİ</div><div class="card quiz-card"><div class="quiz-meta"><span class="pill accent">Soru ${s.current+1} / ${s.items.length}</span><span class="pill">${E(lessons.find(l=>l.id===q.lesson)?.title||'')}</span></div><div class="quiz-progress"><div style="width:${((s.current+(answered?1:0))*100/s.items.length)}%"></div></div><div class="quiz-question">${E(q.question)}</div><div class="quiz-options">${q.options.map((opt,i)=>`<button class="option ${answered?(i===q.answer?'correct':i===chosen?'wrong':''):''}" ${answered?'disabled':''} data-action="quiz-answer" data-choice="${i}"><span class="letter">${'ABCD'[i]}</span><span>${E(opt)}</span>${answered&&i===q.answer?'<span style="margin-left:auto;color:var(--teal)">✓</span>':''}</button>`).join('')}</div>${answered?`<div class="quiz-feedback ${chosen===q.answer?'correct':'wrong'}"><strong>${chosen===q.answer?'Doğru cevap!':'Doğru seçenek: '+E(q.options[q.answer])}</strong><p>${E(q.why)}</p></div><div class="button-row" style="justify-content:end;margin-top:18px"><button class="btn primary" data-action="quiz-next">${s.current===s.items.length-1?'Sonuçlar →':'Sonraki soru →'}</button></div>`:'<p class="small muted" style="margin-top:18px">Cevabını seçince Türkçe açıklama açılacak.<span class="kbd-hint"> Klavyede A–D ya da 1–4, sonra Enter.</span></p>'}</div>`;
}
function renderWriting(){
 const w=writingPrompts.find(x=>x.id===state.writingSelected)||writingPrompts[0],draft=writingDrafts[w.id]||'';
 return `<div class="eyebrow">YAZILI SINAV HAZIRLIĞI</div><h1>Paragraf yazma</h1><p class="lead">Örnekle başla ama kendi cümlelerini yaz. Buradaki alan otomatik sınav notu vermez; metnin bu cihazda kalır. İstersen TXT olarak dışarı aktarabilirsin.</p><div class="writing-grid spaced"><div class="card writing-list">${writingPrompts.map(p=>`<button class="writing-item ${p.id===w.id?'active':''}" data-action="writing-select" data-id="${p.id}"><span class="pill ${courseCls(p.course)}" style="margin-right:6px">${p.course}</span>${E(p.title)}</button>`).join('')}</div><div class="card writing-pane"><div class="button-row" style="justify-content:space-between"><span class="pill ${courseCls(w.course)}">İspanyolca ${w.course}</span><span class="small muted" id="word-count">${draft.trim()?draft.trim().split(/\s+/).length:0} kelime</span></div><h2 style="margin-top:15px">${E(w.title)}</h2><p class="sub">${E(w.prompt)}</p><div class="label-strong" style="margin-bottom:8px">ÖRNEK BAŞLANGIÇ (AYNEN KOPYALAMAK ZORUNDA DEĞİL)</div><div class="model-box" lang="es">${E(w.starter)}</div><label class="form-label" for="writing-input" style="margin-top:20px">Senin metnin</label><textarea id="writing-input" class="plain-textarea" placeholder="Escribe aquí…" lang="es">${E(draft)}</textarea><div class="label-strong" style="margin-top:17px">KONTROL LİSTESİ</div>${w.check.map((c,i)=>`<label class="check-row"><input type="checkbox" data-action="write-check" data-check="${i}" ${checked[w.id+'-'+i]?'checked':''} /> ${E(c)}</label>`).join('')}<div class="button-row spaced"><button class="btn primary" data-action="writing-save">Kaydet</button><button class="btn ghost" data-action="writing-export">TXT indir</button><button class="btn ghost" data-action="writing-copy">Metni kopyala</button></div><p class="small muted" style="margin-top:13px">Yazdıkların tarayıcının yerel depolamasına kaydedilir; farklı cihazlarda senkronize edilmez.</p></div></div>`;
}
function renderBlock(b,i,prefix='blok'){
 const id=prefix+'-'+i;
 if(b.t==='note')return `<div class="hint-box" id="${id}"><strong>Dikkat:</strong> ${E(b.text)}</div>`;
 const head=`<h2 style="margin-top:0">${E(b.h)}</h2>`;
 if(b.t==='pairs')return `<section class="card section-card" id="${id}">${head}${b.rows.map(([es,tr])=>`<div class="example-row"><div class="example-es" lang="es">${E(es)}</div><div class="example-tr">${E(tr)}</div></div>`).join('')}</section>`;
 if(b.t==='rules')return `<section class="card section-card" id="${id}">${head}<div class="rule-grid">${b.rows.map(([a,c])=>`<div class="rule-row"><strong lang="es">${E(a)}</strong><p>${E(c)}</p></div>`).join('')}</div></section>`;
 return `<section class="card section-card" id="${id}">${head}${tableHtml(b.head,b.rows,E,b.tense)}</section>`;
}
function lessonUnits(l,book='A1'){if(book==='A2')return /^00[34]$/.test(l.course)?[l.week]:[];const m=l.source.match(/Nuevo Prisma A1 Ünite\s*([\d–\-, ve]+)/);if(!m)return [];const out=new Set();for(const part of m[1].split(/,| ve /)){const r=part.trim().split(/[–-]/).map(Number);if(r[0]){for(let u=r[0];u<=(r[1]||r[0]);u++)out.add(u)}}return [...out]}
// Gramer sayfası: bütün derslerin kuralları, hataları ve ipuçları tek yerde.
function lessonMistakes(l){const t=lessonText[l.id]||[];const i=t.findIndex(x=>x.startsWith('## Sık yapılan hatalar'));if(i<0)return [];const out=[];for(let k=i+1;k<t.length&&!t[k].startsWith('## ');k++)if(t[k].startsWith('- '))out.push(t[k].slice(2));return out}
function renderGrammar(){
 const q=lower(state.grammarSearch.trim());
 const shown=lessons.filter(l=>(state.grammarCourse==='all'||l.course===state.grammarCourse)&&(!q||lower([l.title,l.subtitle,...l.rules.flat(),l.tip,...lessonMistakes(l)].join(' ')).includes(q)));
 const groups=[];for(const l of shown){const t=groupTitle(l);let g=groups.find(x=>x.t===t);if(!g){g={t,ls:[]};groups.push(g)}g.ls.push(l)}
 const mistake=m=>{const [bad,good]=m.split(' → ');return good?`<li><span class="g-bad">${inlineMd(bad.replace(/^✗\s*/,''))}</span> <span class="g-arrow">→</span> <span class="g-good">${inlineMd(good.replace(/^✓\s*/,''))}</span></li>`:`<li>${inlineMd(m)}</li>`};
 const card=l=>`<article class="card g-card" id="g-${E(l.id)}"><div class="g-head"><span class="pill ${courseCls(l.course)}">İSP ${l.course}</span>${l.course!=='001'?`<span class="pill">${unitWord(l)}</span>`:''}<h3>${E(l.title.replace(/^(Hafta \d+|Ünite \d+|Son konular) · /,''))}</h3><p class="small sub">${E(l.subtitle)}</p></div><dl class="g-rules">${l.rules.map(([a,b])=>`<div><dt lang="es">${E(a)}</dt><dd>${E(b)}</dd></div>`).join('')}</dl>${state.grammarMistakes&&lessonMistakes(l).length?`<div class="g-mistakes"><div class="label-strong">SIK YAPILAN HATALAR</div><ul>${lessonMistakes(l).map(mistake).join('')}</ul></div>`:''}<p class="g-tip"><strong>İpucu:</strong> ${E(l.tip)}</p><a class="btn sm ghost" href="${pathLink(l.id)}">Ayrıntılı anlatım →</a></article>`;
 return `<div class="eyebrow">TÜM DİL BİLGİSİ · ${lessons.length} KONU</div><h1>Gramer kuralları</h1><p class="lead">Bütün derslerin kuralları, sık yapılan hataları ve sınav ipuçları tek sayfada. Hızlı tekrar için; ayrıntı için konunun dersine geç.</p><div class="toolbar g-toolbar"><label class="wide"><span class="form-label">Kurallarda ara</span><input id="grammar-search" class="plain-input" value="${E(state.grammarSearch)}" placeholder="ör. gustar, ser estar, subjuntivo…" /></label><label><span class="form-label">Kurs</span><select id="grammar-course" class="plain-select"><option value="all">Tüm kurslar</option>${COURSES.map(c=>`<option value="${c}" ${state.grammarCourse===c?'selected':''}>İSP ${c} (${lessonCount(c)})</option>`).join('')}</select></label><label class="check-row g-toggle"><input type="checkbox" id="grammar-mistakes" ${state.grammarMistakes?'checked':''} /> Hataları göster</label></div>${groups.length?`<nav class="g-index" aria-label="Konular">${groups.map(g=>`<div><strong>${E(g.t)}</strong>${g.ls.map(l=>`<a href="#g-${E(l.id)}" data-anchor="g-${E(l.id)}">${E(l.title.replace(/^(Hafta \d+|Ünite \d+|Son konular) · /,''))}</a>`).join('')}</div>`).join('')}</nav>`:''}${groups.map(g=>`<section class="week-group"><h3>${E(g.t)}</h3><div class="g-grid">${g.ls.map(card).join('')}</div></section>`).join('')||'<div class="card empty">Eşleşen kural yok. Aramayı temizle.</div>'}`;
}
function renderBook(){
 const sec=(book,title,courseOf)=>{const units=Array.from({length:12},(_,k)=>k+1).map(u=>({u,ls:lessons.filter(l=>lessonUnits(l,book).includes(u))}));return `<div class="section-heading"><h2>${title}</h2></div>`+units.map(({u,ls})=>`<section class="week-group"><h3>ÜNİTE ${u} · İSP ${courseOf(u)}${ls.length?'':' · SLAYT BEKLENİYOR'}</h3>${ls.length?`<div class="outline-list">${ls.map(l=>`<a class="outline-card" href="${pathLink(l.id)}"><span class="outline-index">${completed.has(l.id)?'✓':l.course}</span><span class="outline-info"><strong>${E(l.title)}</strong><span>${E(l.subtitle)}</span></span><span class="outline-arrow">→</span></a>`).join('')}</div>`:`<div class="card empty small">Bu ünitenin içeriği henüz sitede yok. Slaytları ya da kitap sayfalarını yüklediğinde eklenecek.${u>=11?' Kitabın son ünitelerine ait olabilecek konular şimdilik “Son konular” grubunda genel dil bilgisi olarak duruyor.':''}</div>`}</section>`).join('')};
 return `<div class="eyebrow">DERS KİTAPLARI · NUEVO PRISMA A1 · PRISMA A2</div><h1>Kitap üniteleri</h1><p class="lead">Sitedeki dersler kitabın hangi ünitesine dayanıyor? Ünite bilgisi derslerin kaynak notlarından ve haftalık slaytlardaki “Unidad” etiketlerinden alındı. Kitabın metni burada yoktur; kitap sayfalarını yüklersen alıştırmaları eklenebilir.</p>${sec('A1','Nuevo Prisma A1 (Edición ampliada) · İSP 001–002',u=>u<=6?'001':'002')}${sec('A2','Prisma A2 · İSP 003–004 (içindekiler listesine göre)',u=>u<=6?'003':'004')}`;
}
function renderNotes(){
 const q=lower(state.noteSearch.trim());
 const shown=notebook.filter(n=>(state.noteCourse==='all'||n.course===state.noteCourse)&&(!q||lower(noteText(n)).includes(q)));
 const groups=[['001','İSPANYOLCA 001 · DEFTERİN İLK YARISI'],['002','İSPANYOLCA 002 · DEFTERİN İKİNCİ YARISI']].map(([c,t])=>({t,items:shown.filter(n=>n.course===c)})).filter(g=>g.items.length);
 return `<div class="eyebrow">DERS DEFTERİ · ${notebook.length} KONU</div><h1>Defter notları</h1><p class="lead">Ders defterinin sayfaları metne aktarıldı: kurallar, tablolar ve her cümlenin Türkçesi. Defterdeki yazım ve dil bilgisi hataları düzeltildi; önemli düzeltmeler “Dikkat” kutularında belirtiliyor.</p><div class="toolbar"><label><span class="form-label">Kurs</span><select id="note-course" class="plain-select">${[['all','001 + 002'],['001','İspanyolca 001'],['002','İspanyolca 002']].map(([v,t])=>`<option value="${v}" ${state.noteCourse===v?'selected':''}>${t}</option>`).join('')}</select></label><label class="wide"><span class="form-label">Notlarda ara</span><input id="note-search" class="plain-input" value="${E(state.noteSearch)}" placeholder="ör. gustar, zanahoria, saat…" /></label></div>${groups.map(g=>`<section class="week-group"><h3>${E(g.t)}</h3><div class="outline-list">${g.items.map(n=>`<a class="outline-card" href="${noteLink(n.id)}"><span class="outline-index">${n.pages[0]}</span><span class="outline-info"><strong>${E(n.title)}</strong><span>${E(n.summary)} · ${E(notePages(n))}</span></span><span class="outline-arrow">→</span></a>`).join('')}</div></section>`).join('')||'<div class="card empty">Eşleşen not yok. Aramayı temizle.</div>'}`;
}
function renderSlides(){
 const q=lower(state.slideSearch.trim());
 const shown=slides.filter(n=>(state.slideWeek==='all'||String(n.week)===state.slideWeek)&&(!q||lower(noteText(n)).includes(q)));
 const weeks=[...new Set(shown.map(n=>n.week))];
 return `<div class="eyebrow">002 SEMANA 1–10 · ${slides.length} KONU</div><h1>Slayt notları</h1><p class="lead">Haftalık sunumlarda olup defterde bulunmayan içerik: kültür kutuları, diyaloglar, ek fiil tabloları ve alıştırmaların cevap anahtarı. Konu anlatımları için ilgili haftanın dersine de bak.</p><div class="toolbar"><label><span class="form-label">Hafta</span><select id="slide-week" class="plain-select"><option value="all">Tüm haftalar</option>${[...new Set(slides.map(n=>n.week))].map(w=>`<option value="${w}" ${state.slideWeek===String(w)?'selected':''}>Hafta ${w}</option>`).join('')}</select></label><label class="wide"><span class="form-label">Slayt notlarında ara</span><input id="slide-search" class="plain-input" value="${E(state.slideSearch)}" placeholder="ör. tapas, quedamos, decir…" /></label></div>${weeks.map(w=>`<section class="week-group"><h3>HAFTA ${w} · 002</h3><div class="outline-list">${shown.filter(n=>n.week===w).map(n=>`<a class="outline-card" href="${slideLink(n.id)}"><span class="outline-index">${w}</span><span class="outline-info"><strong>${E(n.title)}</strong><span>${E(n.summary)}</span></span><span class="outline-arrow">→</span></a>`).join('')}</div></section>`).join('')||'<div class="card empty">Eşleşen not yok. Aramayı temizle.</div>'}`;
}
function renderNote(id,kind='notes'){
 const list=kind==='slides'?slides:notebook,link=kind==='slides'?slideLink:noteLink,home=kind==='slides'?'Slayt notları':'Defter notları';
 const n=list.find(x=>x.id===id);if(!n)return `<h1>Not bulunamadı</h1>${btnLink('#/'+kind,home+' sayfasına dön')}`;
 const idx=list.indexOf(n),prev=list[idx-1],next=list[idx+1],related=lessonsFor(n),where=kind==='slides'?'002 semana '+n.week:notePages(n);
 return `<div class="breadcrumb"><a href="#/${kind}">${home}</a> › <span>İspanyolca ${n.course}</span> › <span>${E(where)}</span></div><div class="lesson-head"><div class="button-row" style="margin-bottom:13px"><span class="pill ${courseCls(n.course)}">İSP ${n.course}</span> <span class="pill">${E(where)}</span></div><h1>${E(n.title)}</h1><p class="lead lesson-lead">${E(n.summary)}</p></div><div class="lesson-layout"><div class="lesson-body">${n.blocks.map(renderBlock).join('')}<div class="button-row spaced" style="justify-content:space-between">${prev?btnLink(link(prev.id),'← '+E(prev.title),'ghost'):'<span></span>'}${next?btnLink(link(next.id),E(next.title)+' →','ghost'):'<span></span>'}</div></div><aside class="lesson-side"><div class="card side-card"><h4>Bu sayfada</h4><div class="mini-list">${n.blocks.map((b,i)=>`<a href="#blok-${i}" data-anchor="blok-${i}">${E(b.t==='note'?'Dikkat':b.h)}</a>`).join('')}</div></div>${related.length?`<div class="card side-card"><h4>İlgili dersler</h4><div class="mini-list">${related.map(l=>`<a href="${pathLink(l.id)}">${E(l.title)}</a>`).join('')}</div></div>`:''}</aside></div>`;
}
function renderSearch(){const query=state.query.trim().toLocaleLowerCase('tr');const box=`<div class="search-page"><span class="search-symbol">⌕</span><input type="search" id="search-input" class="plain-input" value="${E(state.query)}" placeholder="Konu, fiil, kelime ara… (ör. gustar, havuç, saat)" autocomplete="off" aria-label="Tüm içerikte ara" /></div>`;if(!query)return `<div class="eyebrow">HIZLI ARAMA</div><h1>Aramak istediğin nedir?</h1>${box}<p class="lead">Konu, kelime, fiil ya da Türkçe anlam yaz; dersler, defter ve slayt notları, fiiller ve kelimeler birlikte aranır.</p>`;
 const hits=lessons.filter(x=>(x.title+' '+x.subtitle+' '+x.explain+' '+x.rules.map(y=>y.join(' ')).join(' ')).toLocaleLowerCase('tr').includes(query));const words=vocabulary.flatMap(g=>g.items.map(w=>({...w,group:g.group}))).filter(x=>(x.es+' '+x.tr).toLocaleLowerCase('tr').includes(query));const acts=verbs.filter(x=>(x.lemma+' '+x.tr).toLocaleLowerCase('tr').includes(query));const notes=notebook.filter(n=>lower(noteText(n)).includes(query));const slideHits=slides.filter(n=>lower(noteText(n)).includes(query));return `<div class="eyebrow">ARAMA SONUÇLARI</div><h1>“${E(state.query)}”</h1>${box}<p class="lead">${hits.length} ders · ${notes.length} defter notu · ${slideHits.length} slayt notu · ${acts.length} fiil · ${words.length} kelime eşleşmesi.</p><div class="section-heading"><h2>Dersler</h2></div><div class="outline-list">${hits.map(l=>`<a class="outline-card" href="${pathLink(l.id)}"><span class="outline-index">${l.course}</span><span class="outline-info"><strong>${E(l.title)}</strong><span>${E(l.subtitle)}</span></span><span class="outline-arrow">→</span></a>`).join('')||'<div class="empty">Eşleşen ders yok.</div>'}</div><div class="section-heading"><h2>Defter notları</h2></div><div class="outline-list">${notes.map(n=>`<a class="outline-card" href="${noteLink(n.id)}"><span class="outline-index">${n.course}</span><span class="outline-info"><strong>${E(n.title)}</strong><span>${E(notePages(n))}</span></span><span class="outline-arrow">→</span></a>`).join('')||'<div class="empty">Eşleşen not yok.</div>'}</div><div class="section-heading"><h2>Slayt notları</h2></div><div class="outline-list">${slideHits.map(n=>`<a class="outline-card" href="${slideLink(n.id)}"><span class="outline-index">H${n.week}</span><span class="outline-info"><strong>${E(n.title)}</strong><span>002 semana ${n.week}</span></span><span class="outline-arrow">→</span></a>`).join('')||'<div class="empty">Eşleşen not yok.</div>'}</div><div class="section-heading"><h2>Fiiller</h2></div><div class="grid grid-3">${acts.slice(0,30).map(v=>`<button class="card vocab-item" style="text-align:left;cursor:pointer" data-action="verb-go" data-id="${E(v.lemma)}"><strong>${E(v.lemma)}</strong><span>${E(v.tr)} →</span></button>`).join('')||'<div class="empty">Eşleşen fiil yok.</div>'}</div><div class="section-heading"><h2>Kelimeler</h2></div><div class="vocab-grid">${words.slice(0,60).map(w=>`<div class="vocab-item"><strong>${E(w.es)}</strong><span>${E(w.tr)} · ${E(w.group)}</span></div>`).join('')||'<div class="empty">Eşleşen kelime yok.</div>'}</div>`}
function render(){const r=route();let out='';if(r==='home')out=renderHome();else if(r.startsWith('courses'))out=renderCourseList();else if(r.startsWith('lesson/'))out=renderLesson(decodeURIComponent(r.slice(7)));else if(r==='verbs')out=renderVerbs();else if(r==='vocab')out=renderVocab();else if(r==='practice')out=renderQuiz();else if(r==='writing')out=renderWriting();else if(r==='notes')out=renderNotes();else if(r.startsWith('notes/'))out=renderNote(decodeURIComponent(r.slice(6)));else if(r==='slides')out=renderSlides();else if(r==='book')out=renderBook();else if(r==='grammar')out=renderGrammar();else if(r.startsWith('slides/'))out=renderNote(decodeURIComponent(r.slice(7)),'slides');else if(r==='search')out=renderSearch();else out=renderHome();$('#app').innerHTML=out;updateSidebar();$('#status-text').textContent=`${completed.size} / ${lessons.length} ders`;const title=pageTitle(r);$('#topbar-title').textContent=title;document.title=title==='Genel bakış'?'HOLA · İspanyolca Atlası':title+' · HOLA';const tab=r.startsWith('lesson/')||r.startsWith('courses')?'courses':r.split(/[/?]/)[0];document.querySelectorAll('.bottom-nav [data-tab]').forEach(a=>a.classList.toggle('active',a.dataset.tab===tab));updateScrollHints()}
function pageTitle(r){
 if(r.startsWith('lesson/')){const l=lessons.find(x=>x.id===decodeURIComponent(r.slice(7)));return l?l.title.replace(/^(Hafta \d+|Ünite \d+|Son konular) · /,''):'Ders'}
 if(r.startsWith('notes/')){const n=notebook.find(x=>x.id===decodeURIComponent(r.slice(6)));return n?n.title:'Defter notu'}
 if(r.startsWith('slides/')){const n=slides.find(x=>x.id===decodeURIComponent(r.slice(7)));return n?n.title:'Slayt notu'}
 return ({home:'Genel bakış',courses:'Ders anlatımları',verbs:'Fiil çekimleri',grammar:'Gramer kuralları',vocab:'Kelime sözlüğü',practice:'Test merkezi',writing:'Yazma çalışması',notes:'Defter notları',slides:'Slayt notları',book:'Kitap üniteleri',search:'Arama'})[r.split(/[/?]/)[0]]||'HOLA';
}
// Yana kaydırılabilen tablolarda sağda gölge: kaydırılabildiğini gösterir.
function updateScrollHints(){document.querySelectorAll('.table-scroller').forEach(el=>{const can=el.scrollWidth>el.clientWidth+2;el.classList.toggle('can-scroll',can);el.classList.toggle('at-end',!can||el.scrollLeft+el.clientWidth>=el.scrollWidth-2)})}
document.addEventListener('scroll',e=>{const el=e.target;if(el&&el.classList&&el.classList.contains('table-scroller'))el.classList.toggle('at-end',el.scrollLeft+el.clientWidth>=el.scrollWidth-2)},true);
window.addEventListener('resize',()=>updateScrollHints());
function navigate(url){location.hash=url;render();window.scrollTo({top:0,behavior:'instant'})}
function saveDraft(){const el=$('#writing-input');if(el){writingDrafts[state.writingSelected]=el.value;disk.set('writing',writingDrafts)}}
function copyText(txt){if(navigator.clipboard?.writeText){navigator.clipboard.writeText(txt).then(()=>toast('Kopyalandı')).catch(()=>toast('Kopyalama izni verilmedi'))}else{const input=document.createElement('textarea');input.value=txt;document.body.appendChild(input);input.select();document.execCommand('copy');input.remove();toast('Kopyalandı')}}
function downloadText(name,text){const blob=new Blob([text],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),500)}
// Source link navigation and action delegation.
document.addEventListener('click',e=>{
 const anchor=e.target.closest('[data-anchor]');if(anchor){e.preventDefault();$('#'+anchor.dataset.anchor)?.scrollIntoView({behavior:'smooth',block:'start'});return}
 const action=e.target.closest('[data-action]');if(!action)return;
 const {action:act,id}=action.dataset;
 if(act==='go'){navigate(action.dataset.to);return}
 if(act==='mark'){if(completed.has(id))completed.delete(id);else completed.add(id);disk.set('completed',[...completed]);render();toast(completed.has(id)?'Ders tamamlandı':'İşaret kaldırıldı')}
 if(act==='practice-lesson'){state.quizFilter=id;state.quizSession=null;navigate('#/practice')}
 if(act==='verb-select'){state.verbSelected=id;render()}
 if(act==='verb-tense'){state.verbTense=id;render();document.getElementById('cekim-tablosu')?.scrollIntoView({behavior:'smooth',block:'start'})}
 if(act==='verb-go'){state.verbSelected=id;navigate('#/verbs')}
 if(act==='verb-reveal'){state.verbReveal=!state.verbReveal;render()}
 if(act==='vocab-hide'){state.vocabHide=!state.vocabHide;render()}
 if(act==='card-flip'){state.cardFlipped=!state.cardFlipped;render()}
 if(act==='card-next'||act==='card-prev'){const n=wordPool().length;state.cardIndex=(state.cardIndex+(act==='card-next'?1:-1)+n)%n;state.cardFlipped=false;render()}
 if(act==='quiz-mode'){state.quizMode=id;state.quizFilter='';state.quizSession=null;render()}
 if(act==='quiz-start'){startQuiz()}
 if(act==='quiz-answer'){answerQuiz(Number(action.dataset.choice))}
 if(act==='quiz-next'){nextQuiz()}
 if(act==='quiz-new'){state.quizSession=null;render()}
 if(act==='writing-select'){saveDraft();state.writingSelected=id;render()}
 if(act==='writing-save'){saveDraft();toast('Metnin yerel olarak kaydedildi')}
 if(act==='writing-copy'){saveDraft();copyText(writingDrafts[state.writingSelected]||'')}
 if(act==='writing-export'){saveDraft();downloadText('ispanyolca_'+state.writingSelected+'.txt',writingDrafts[state.writingSelected]||'')}
 if(e.target.closest('.sidebar a')){$('#sidebar').classList.remove('open');$('#mobile-backdrop').classList.remove('active')}
});
document.addEventListener('change',e=>{
 const t=e.target;
 if(t.id==='verb-kind'){state.verbKind=t.value;render()}
 if(t.id==='verb-tense'){state.verbTense=t.value;render()}
 if(t.id==='grammar-course'){state.grammarCourse=t.value;render()}
 if(t.id==='grammar-mistakes'){state.grammarMistakes=t.checked;render()}
 if(t.id==='verb-course'){state.verbCourse=t.value;render()}
 if(t.id==='vocab-course'){state.vocabCourse=t.value;state.vocabGroup='all';state.cardIndex=0;state.cardFlipped=false;render()}
 if(t.id==='vocab-group'){state.vocabGroup=t.value;state.cardIndex=0;state.cardFlipped=false;render()}
 if(t.id==='quiz-count'){state.quizCount=Number(t.value)}
 if(t.id==='note-course'){state.noteCourse=t.value;render()}
 if(t.id==='slide-week'){state.slideWeek=t.value;render()}
 if(t.dataset.action==='write-check'){checked[state.writingSelected+'-'+t.dataset.check]=t.checked;disk.set('writingChecks',checked)}
});
document.addEventListener('input',e=>{
 const t=e.target;if(t.id==='global-search'||t.id==='search-input'){state.query=t.value;const other=t.id==='global-search'?null:$('#global-search');if(other)other.value=t.value;const focusId=t.id,pos=t.selectionStart;if(route()!=='search')navigate('#/search');else {updateSidebar();$('#app').innerHTML=renderSearch();updateScrollHints()}if(focusId==='search-input'){const x=$('#search-input');x?.focus();x?.setSelectionRange(pos,pos)}return}
 if(t.id==='verb-search'){state.verbSearch=t.value;const selected=verbs.find(v=>v.lemma===state.verbSelected);if(selected&&!((selected.lemma+' '+selected.tr).toLocaleLowerCase('tr').includes(state.verbSearch.toLocaleLowerCase('tr')))){const match=verbs.find(v=>(v.lemma+' '+v.tr).toLocaleLowerCase('tr').includes(state.verbSearch.toLocaleLowerCase('tr')));if(match)state.verbSelected=match.lemma}const focus=t.selectionStart;render();const x=$('#verb-search');x?.focus();x?.setSelectionRange(focus,focus);return}
 if(t.id==='vocab-search'){state.vocabSearch=t.value;state.cardIndex=0;state.cardFlipped=false;const focus=t.selectionStart;render();const x=$('#vocab-search');x?.focus();x?.setSelectionRange(focus,focus);return}
 if(t.id==='note-search'){state.noteSearch=t.value;const focus=t.selectionStart;render();const x=$('#note-search');x?.focus();x?.setSelectionRange(focus,focus);return}
 if(t.id==='slide-search'){state.slideSearch=t.value;const focus=t.selectionStart;render();const x=$('#slide-search');x?.focus();x?.setSelectionRange(focus,focus);return}
 if(t.id==='grammar-search'){state.grammarSearch=t.value;const pos=t.selectionStart;render();const x=$('#grammar-search');x?.focus();x?.setSelectionRange(pos,pos);return}
 if(t.id==='writing-input'){writingDrafts[state.writingSelected]=t.value;disk.set('writing',writingDrafts);$('#word-count').textContent=(t.value.trim()?t.value.trim().split(/\s+/).length:0)+' kelime'}
});
document.querySelectorAll('[data-course]').forEach(b=>b.addEventListener('click',()=>{state.course=b.dataset.course;disk.set('course',state.course);updateSidebar()}));
$('#open-menu').onclick=()=>{$('#sidebar').classList.add('open');$('#mobile-backdrop').classList.add('active')};
$('#close-menu').onclick=$('#mobile-backdrop').onclick=()=>{$('#sidebar').classList.remove('open');$('#mobile-backdrop').classList.remove('active')};
$('#theme-toggle').onclick=()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;disk.set('theme',next)};
window.addEventListener('keydown',e=>{const tag0=document.activeElement?.tagName;const s=state.quizSession;if(route()==='practice'&&s&&!s.finished&&!['INPUT','TEXTAREA','SELECT'].includes(tag0)&&!e.metaKey&&!e.ctrlKey){const k=e.key.toLowerCase(),map={a:0,b:1,c:2,d:3,'1':0,'2':1,'3':2,'4':3};if(k in map&&s.answers[s.current]==null){e.preventDefault();answerQuiz(map[k]);return}if(e.key==='Enter'&&s.answers[s.current]!=null){e.preventDefault();nextQuiz();return}}});
$('#open-menu-bottom').onclick=()=>{$('#sidebar').classList.add('open');$('#mobile-backdrop').classList.add('active')};
$('#topbar-search').onclick=()=>{navigate('#/search');setTimeout(()=>$('#search-input')?.focus(),30)};
const toTop=$('#to-top');toTop.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});window.addEventListener('scroll',()=>toTop.classList.toggle('show',window.scrollY>700),{passive:true});
// Çevrimdışı kullanım: sayfa bir sunucudan açıldıysa service worker kaydedilir.
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
window.addEventListener('keydown',e=>{const tag=document.activeElement?.tagName;if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(tag)){e.preventDefault();$('#global-search').focus()}if(e.key==='Escape'&&$('#sidebar').classList.contains('open')){$('#sidebar').classList.remove('open');$('#mobile-backdrop').classList.remove('active')}});
window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'});$('#sidebar').classList.remove('open');$('#mobile-backdrop').classList.remove('active')});
document.documentElement.dataset.theme=disk.get('theme',window.matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light');
render();
