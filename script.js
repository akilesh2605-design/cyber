/* ===== shared script: nav, sky, reveals, transitions, music, letter, extra flourishes ===== */
const PALETTE=['#8fd3ff','#c9a8ff','#ffd18f','#ffb3d9','#eaf6ff'];
const ICONS=['🩵','✨','⭐','☁️'];
const P=[['start','Start'],['home','Home'],['memories','Memories'],['years','The Years'],['reunion','Reunion'],['efforts','What I Did'],['time','The Time'],['letter','The Truth']];
const MSG={start:'Opening a letter written in code',home:'Beginning the story',memories:'Opening an old memory',years:'Turning back the years',reunion:'Walking up to the door',efforts:'Counting quiet things I did',time:'Counting every quiet second',letter:'Sealing the last page'};
const cur=document.body.dataset.page,i=P.findIndex(p=>p[0]==cur);
const dots='<span class="pt-dots"><span>.</span><span>.</span><span>.</span></span>';
document.body.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute"><clipPath id="heartClip" clipPathUnits="objectBoundingBox"><path d="M0.5,0.95 C0.5,0.95 0.05,0.6 0.05,0.35 C0.05,0.15 0.2,0.02 0.37,0.02 C0.45,0.02 0.5,0.1 0.5,0.18 C0.5,0.1 0.55,0.02 0.63,0.02 C0.8,0.02 0.95,0.15 0.95,0.35 C0.95,0.6 0.5,0.95 0.5,0.95 Z"/></clipPath></svg><div id="pageTransition"><div class="pt-ring"></div><div class="pt-inner">${MSG[cur]||'Turning the page'}${dots}</div></div><div id="progress"></div><canvas id="sky"></canvas><div class="nebula neb1"></div><div class="nebula neb2"></div><div class="nebula neb3"></div><div class="moon"></div><div class="cloud c1"></div><div class="cloud c2"></div><div class="cloud c3"></div><header class="nav"><a class="logo" href="start.html" aria-label="Start">✦</a><button class="burger" aria-label="Menu">☰</button><nav>${P.map(p=>`<a href="${p[0]}.html"${p[0]==cur?' class="on"':''}>${p[1]}</a>`).join('')}</nav></header>`);
document.querySelector('.burger').onclick=()=>document.querySelector('nav').classList.toggle('open');
if(P[i+1])document.querySelector('main').insertAdjacentHTML('beforeend',`<a class="btn next" href="${P[i+1][0]}.html">Next chapter: ${P[i+1][1]} →</a>`);

/* calm, melodic chime for the transition (synthesised, not a recording — no licence needed) */
let actx;
function note(freq,start,dur,vol){
  const t0=actx.currentTime+start;
  const osc=actx.createOscillator();osc.type='sine';osc.frequency.setValueAtTime(freq,t0);
  const osc2=actx.createOscillator();osc2.type='sine';osc2.frequency.setValueAtTime(freq*2,t0);
  const g=actx.createGain();g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(vol,t0+.04);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
  const g2=actx.createGain();g2.gain.setValueAtTime(0,t0);g2.gain.linearRampToValueAtTime(vol*.22,t0+.04);g2.gain.exponentialRampToValueAtTime(.0001,t0+dur*.55);
  osc.connect(g).connect(actx.destination);osc2.connect(g2).connect(actx.destination);
  osc.start(t0);osc.stop(t0+dur+.05);osc2.start(t0);osc2.stop(t0+dur*.55+.05);
}
function melody(freqs,gap,dur,vol){try{
  actx=actx||new (window.AudioContext||window.webkitAudioContext)();
  if(actx.state==='suspended')actx.resume();
  freqs.forEach((f,k)=>note(f,k*gap,dur,vol));
}catch(e){}}
const OPEN_NOTES=[523.25,659.25,783.99,1046.5];   /* C5 E5 G5 C6, rising */
const CLOSE_NOTES=[1046.5,783.99,659.25,523.25];  /* C6 G5 E5 C5, falling */

/* cinematic reveal on arrival: the screen holds for a beat, then the iris opens */
const pt=document.getElementById('pageTransition');
setTimeout(()=>{melody(OPEN_NOTES,.32,1.15,.05);pt.classList.add('hide')},900);

/* scroll progress bar */
const bar=document.getElementById('progress');
addEventListener('scroll',()=>{const h=document.documentElement;const p=(h.scrollTop)/(h.scrollHeight-h.clientHeight||1);bar.style.width=(p*100)+'%'},{passive:true});

/* stars + colourful particles + shooting stars + falling rocks + gentle rain, with gentle parallax */
const cv=document.getElementById('sky'),x=cv.getContext('2d');let W,H,S=[],shoot=[],rocks=[],rain=[];
const REDUCE_MOTION=matchMedia('(prefers-reduced-motion: reduce)').matches;
let mx=0,my=0;addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2});
function rockShape(){const n=6+Math.floor(Math.random()*3),pts=[];for(let k=0;k<n;k++){const a=(k/n)*Math.PI*2,r=.6+Math.random()*.4;pts.push([Math.cos(a)*r,Math.sin(a)*r])}return pts}
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;
  S=Array.from({length:Math.min(matchMedia('(max-width: 768px)').matches?70:260,W/(matchMedia('(max-width: 768px)').matches?12:4))},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.4,p:Math.random()*6,v:Math.random()*.3+.05,d:Math.random()*.8+.2,c:PALETTE[Math.floor(Math.random()*PALETTE.length)]}));
  rocks=Array.from({length:Math.min(matchMedia('(max-width: 768px)').matches?4:16,W/(matchMedia('(max-width: 768px)').matches?240:70))},()=>({x:Math.random()*W,y:Math.random()*H,sz:5+Math.random()*7,rot:Math.random()*7,vr:(Math.random()-.5)*.03,vy:.4+Math.random()*.6,shape:rockShape()}));
  rain=Array.from({length:Math.min(matchMedia('(max-width: 768px)').matches?0:160,W/5)},()=>({x:Math.random()*W,y:Math.random()*H,len:10+Math.random()*14,v:4+Math.random()*4,a:.08+Math.random()*.14}))}
rs();addEventListener('resize',rs);
function maybeShoot(){if(Math.random()<.012&&shoot.length<2){const sy=Math.random()*H*.4,sx=Math.random()*W;shoot.push({x:sx,y:sy,vx:-6-Math.random()*4,vy:3+Math.random()*2,life:1})}}
let lastCanvasFrame=0;
(function f(t){if(t-lastCanvasFrame<33){if(!REDUCE_MOTION)requestAnimationFrame(f);return}lastCanvasFrame=t;x.clearRect(0,0,W,H);
  S.forEach((s,k)=>{const g=k%3==0;if(g){s.y-=s.v;if(s.y<0)s.y=H}
    x.globalAlpha=.35+.65*Math.abs(Math.sin(t/1200+s.p));
    x.fillStyle=g?s.c:'#fff';x.shadowBlur=g?11:0;x.shadowColor=s.c;
    x.beginPath();x.arc(s.x+mx*10*s.d,s.y+my*10*s.d,g?s.r*1.7:s.r,0,7);x.fill()});
  maybeShoot();
  x.globalAlpha=1;
  shoot.forEach(st=>{x.strokeStyle='rgba(255,255,255,'+st.life+')';x.lineWidth=2;x.beginPath();x.moveTo(st.x,st.y);x.lineTo(st.x-st.vx*6,st.y-st.vy*6);x.stroke();st.x+=st.vx;st.y+=st.vy;st.life-=.02});
  shoot=shoot.filter(st=>st.life>0);
  /* tumbling meteor rocks, drifting down through the scene */
  rocks.forEach(r=>{r.y+=r.vy;r.rot+=r.vr;if(r.y-r.sz>H){r.y=-r.sz;r.x=Math.random()*W}
    x.save();x.translate(r.x,r.y);x.rotate(r.rot);
    x.shadowBlur=6;x.shadowColor='rgba(143,211,255,.5)';
    x.beginPath();r.shape.forEach(([px,py],idx)=>{const X=px*r.sz,Y=py*r.sz;idx===0?x.moveTo(X,Y):x.lineTo(X,Y)});x.closePath();
    x.fillStyle='#8a7f78';x.fill();x.strokeStyle='rgba(143,211,255,.4)';x.lineWidth=.7;x.stroke();
    x.restore()});
  x.shadowBlur=0;
  /* soft rain */
  x.strokeStyle='rgba(200,225,255,.5)';x.lineWidth=1;
  rain.forEach(d=>{x.globalAlpha=d.a;x.beginPath();x.moveTo(d.x,d.y);x.lineTo(d.x-2,d.y+d.len);x.stroke();d.y+=d.v;d.x-=.4;if(d.y>H){d.y=-d.len;d.x=Math.random()*W}});
  x.globalAlpha=1;
  if(!REDUCE_MOTION)requestAnimationFrame(f)})(0);

/* ambient rising icons */
if(!REDUCE_MOTION)setInterval(()=>{const e=document.createElement('span');e.className='ambient';e.textContent=ICONS[Math.floor(Math.random()*ICONS.length)];
  e.style.left=Math.random()*94+'vw';e.style.fontSize=(14+Math.random()*14)+'px';e.style.setProperty('--sway',(Math.random()*80-40)+'px');
  const dur=10+Math.random()*8;e.style.animationDuration=dur+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),dur*1000)},4500);

/* cursor sparkle trail (desktop / fine pointer only) */
if(matchMedia('(pointer:fine)').matches){let last=0;
  addEventListener('mousemove',e=>{const now=Date.now();if(now-last<55)return;last=now;
    const s=document.createElement('span');s.className='spark';const sz=4+Math.random()*4;
    s.style.width=s.style.height=sz+'px';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';
    s.style.background=PALETTE[Math.floor(Math.random()*PALETTE.length)];
    s.style.setProperty('--sx',(Math.random()*16-8)+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),900)})}

/* opening lines appear one after another */

/* ===== start page intro: a colourful opening before the words begin ===== */
const CONFETTI_COLS=[...PALETTE,'#ff8fa3','#9bffb5','#fff59b'];
function confetti(cx,cy,n,spread){
  for(let k=0;k<n;k++){
    const e=document.createElement('span');e.className='confetti';
    const sz=6+Math.random()*8,round=Math.random()<.3;
    e.style.width=sz+'px';e.style.height=(round||Math.random()<.5?sz:sz*.45)+'px';
    e.style.borderRadius=round?'50%':'2px';
    const col=CONFETTI_COLS[Math.floor(Math.random()*CONFETTI_COLS.length)];
    e.style.background=col;e.style.color=col;
    e.style.left=cx+'px';e.style.top=cy+'px';
    const ang=Math.random()*Math.PI*2,dist=spread*(.35+Math.random()*.65);
    e.style.setProperty('--dx',Math.cos(ang)*dist+'px');
    e.style.setProperty('--dy',(Math.sin(ang)*dist*.8-spread*.15)+'px');
    e.style.setProperty('--fall',(140+Math.random()*220)+'px');
    e.style.setProperty('--rot',(Math.random()*900-450)+'deg');
    const dur=1.6+Math.random()*1.4;e.style.animationDuration=dur+'s';e.style.animationDelay=(Math.random()*.15)+'s';
    document.body.appendChild(e);setTimeout(()=>e.remove(),(dur+.5)*1000);
  }
}
let SEQ0=0;   /* seconds the opening lines wait before they begin */
if(cur==='start'){
  /* drifting colour glows behind the words (kept still if the person prefers reduced motion) */
  document.body.insertAdjacentHTML('afterbegin','<div class="hero-aurora"><i></i><i></i><i></i><i></i></div>');
}
if(cur==='start'&&!REDUCE_MOTION){
  SEQ0=13.6;
  const WORDS='for you, Charvi';
  let n=0;
  const wordsHTML=WORDS.split(' ').map(w=>'<span class="in-word">'+[...w].map(ch=>{
    const h=(n*31)%360,d=(8.7+n*.14).toFixed(2);n++;
    return `<i style="--c:hsl(${h},95%,76%);animation-delay:${d}s">${ch}</i>`}).join('')+'</span>').join('');
  document.body.insertAdjacentHTML('afterbegin',`<div id="intro">
    <div class="in-half l"></div><div class="in-half r"></div>
    <div class="in-stage">
      <div class="in-aurora"><i></i><i></i><i></i><i></i></div>
      <div class="in-rings"><b></b><b></b><b></b><b></b><b></b></div>
      <div class="in-core"></div>
      <div class="in-orbit">${Array.from({length:18},(_,k)=>`<i style="--a:${k*20}deg;--c:hsl(${k*20},95%,70%);animation-delay:${(3.2+k*.07).toFixed(2)}s"></i>`).join('')}</div>
      <svg class="in-heart" viewBox="0 0 100 90" aria-hidden="true"><defs><linearGradient id="inHeartG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8fc8"/><stop offset=".5" stop-color="#c9a8ff"/><stop offset="1" stop-color="#8fd3ff"/></linearGradient></defs><path d="M50 84 C50 84 6 54 6 28 C6 13 17 4 30 4 C40 4 47 10 50 18 C53 10 60 4 70 4 C83 4 94 13 94 28 C94 54 50 84 50 84Z" fill="url(#inHeartG)"/></svg>
      <div class="in-words">${wordsHTML}</div>
    </div>
    <div class="in-shock"></div>
  </div>`);
  const intro=document.getElementById('intro');
  const heartPos=()=>{const r=intro.querySelector('.in-heart').getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
  const timers=[];let finished=false;
  function finishIntro(early){
    if(finished)return;finished=true;timers.forEach(clearTimeout);
    intro.classList.add('open');
    confetti(innerWidth/2,innerHeight/2,80,Math.min(innerWidth,760));
    melody([659.25,783.99,987.77,1318.5],.2,1.2,.04);
    if(early){   /* skipped: pull the opening lines forward */
      const base=performance.now()/1000+.9;
      document.querySelectorAll('.seq').forEach((e,k)=>e.style.animationDelay=(base+k*1.3)+'s');
    }
    setTimeout(()=>intro.remove(),1900);
  }
  timers.push(setTimeout(()=>melody([523.25,659.25,783.99,1046.5],.25,1.4,.045),6900));
  timers.push(setTimeout(()=>{const[a,b]=heartPos();confetti(a,b,60,Math.min(innerWidth,540))},7300));
  timers.push(setTimeout(()=>{const[a,b]=heartPos();confetti(a,b,45,Math.min(innerWidth,620))},9800));
  timers.push(setTimeout(()=>{const[a,b]=heartPos();confetti(a,b,50,Math.min(innerWidth,680))},11400));
  timers.push(setTimeout(()=>finishIntro(false),12800));
}

document.querySelectorAll('.seq').forEach((e,k)=>e.style.animationDelay=(SEQ0+k*1.3)+'s');
/* scroll reveals */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));

/* button ripple */
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;
  const r=b.getBoundingClientRect(),rp=document.createElement('span');rp.className='ripple';
  const sz=Math.max(r.width,r.height)*1.4;rp.style.width=rp.style.height=sz+'px';
  rp.style.left=(e.clientX-r.left-sz/2)+'px';rp.style.top=(e.clientY-r.top-sz/2)+'px';
  b.appendChild(rp);setTimeout(()=>rp.remove(),650)});

/* memory cards: press to open, with a soft pop and a single gentle note */
document.querySelectorAll('.mem-card').forEach(c=>c.addEventListener('click',()=>{
  const opening=!c.classList.contains('open');
  c.classList.toggle('open');
  c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop');
  if(opening)try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();note(880,0,.9,.045)}catch(e){}
}));

/* page transitions: iris closes in slowly over the destination's message, then navigates */
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const href=a.getAttribute('href');if(!href||!/\.html$/.test(href))return;
  e.preventDefault();
  if(cur==='start'){const r=a.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,90,Math.min(innerWidth,700));pt.classList.add('rainbow')}
  const dest=href.replace('.html','');
  pt.querySelector('.pt-inner').innerHTML=(MSG[dest]||'Turning the page')+dots;
  melody(CLOSE_NOTES,.28,1.1,.05);
  pt.classList.remove('hide');
  setTimeout(()=>{location.href=href},2600)});

/* three clocks on The Time page */
if(cur==='time'){
  /* EDIT these two dates to your real ones */
  const START1=new Date('2022-09-01T00:00:00');  /* the day it began, roughly 4 years ago */
  const LAST_MET=new Date('2026-07-27T00:00:00'); /* the last day you saw her */
  const setT=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  const pad=n=>String(n).padStart(2,'0');
  function tick(){
    const now=new Date();
    let s1=Math.floor((now-START1)/1000);
    const y1=Math.floor(s1/31557600);s1-=y1*31557600;
    const d1=Math.floor(s1/86400);s1-=d1*86400;
    const h1=Math.floor(s1/3600);
    setT('c1y',y1);setT('c1d',d1);setT('c1h',pad(h1));
    let s3=Math.floor((now-LAST_MET)/1000);
    const d3=Math.floor(s3/86400);s3-=d3*86400;
    const h3=Math.floor(s3/3600);
    setT('c3d',d3);setT('c3h',pad(h3));
  }
  tick();setInterval(tick,60000);
  /* the build time is fixed, so it counts up once rather than ticking forever: 6 months, 13 days */
  const t0=performance.now(),dur=1700;
  (function anim(t){const p=Math.min(1,(t-t0)/dur),ease=1-Math.pow(1-p,3);
    setT('c2mo',Math.round(ease*6));setT('c2d',Math.round(ease*13));
    if(p<1)requestAnimationFrame(anim)})(t0);
}

/* envelope on letter page: shake, flap opens, letter rises, rainbow rings, floating hearts, confetti rain */
const HEARTS=['🩵','💜','💗','💛','💙','✨','🌸'];
function openRing(cx,cy){const e=document.createElement('span');e.className='open-ring';e.style.left=cx+'px';e.style.top=cy+'px';document.body.appendChild(e);setTimeout(()=>e.remove(),1600)}
function floatHeart(cx,cy){const e=document.createElement('span');e.className='fheart';e.textContent=HEARTS[Math.floor(Math.random()*HEARTS.length)];
  e.style.left=(cx+Math.random()*180-90)+'px';e.style.top=cy+'px';e.style.fontSize=(18+Math.random()*24)+'px';
  e.style.setProperty('--sway',(Math.random()*140-70)+'px');const dur=2.8+Math.random()*1.8;e.style.animationDuration=dur+'s';
  document.body.appendChild(e);setTimeout(()=>e.remove(),dur*1000+100)}
function confettiRain(n){for(let k=0;k<n;k++)setTimeout(()=>{
  const e=document.createElement('span');e.className='confetti';
  const sz=6+Math.random()*8,round=Math.random()<.3,col=CONFETTI_COLS[Math.floor(Math.random()*CONFETTI_COLS.length)];
  e.style.width=sz+'px';e.style.height=(round||Math.random()<.5?sz:sz*.45)+'px';e.style.borderRadius=round?'50%':'2px';
  e.style.background=col;e.style.color=col;e.style.left=(Math.random()*innerWidth)+'px';e.style.top='-20px';
  e.style.setProperty('--dx',(Math.random()*120-60)+'px');e.style.setProperty('--dy','0px');
  e.style.setProperty('--fall',(innerHeight+60)+'px');e.style.setProperty('--rot',(Math.random()*900-450)+'deg');
  const dur=3+Math.random()*2;e.style.animationDuration=dur+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),dur*1000+100)},Math.random()*2200)}
const env=document.querySelector('.env');
if(env){
  const openEnv=()=>{
    if(env.classList.contains('open'))return;
    const wrap=env.closest('.env-wrap');
    env.classList.add('open');if(wrap)wrap.classList.add('open');
    const r=env.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    melody([523.25,659.25,783.99,1046.5,1318.5,1568],.17,1.4,.05);
    /* sparkle burst */
    for(let k=0;k<40;k++){const b=document.createElement('span');b.className='burst';const sz=4+Math.random()*7;
      b.style.width=b.style.height=sz+'px';b.style.left=cx+'px';b.style.top=cy+'px';
      b.style.background=CONFETTI_COLS[Math.floor(Math.random()*CONFETTI_COLS.length)];
      const ang=Math.random()*Math.PI*2,dist=70+Math.random()*180;
      b.style.setProperty('--dx',Math.cos(ang)*dist+'px');b.style.setProperty('--dy',Math.sin(ang)*dist+'px');
      document.body.appendChild(b);setTimeout(()=>b.remove(),1000)}
    /* rainbow shockwaves, confetti bursts, a rain of confetti, hearts floating up */
    for(let k=0;k<4;k++)setTimeout(()=>openRing(cx,cy),k*280);
    setTimeout(()=>confetti(cx,cy,80,Math.min(innerWidth,680)),500);
    setTimeout(()=>confetti(cx,cy-60,70,Math.min(innerWidth,760)),1250);
    setTimeout(()=>confettiRain(80),700);
    for(let k=0;k<16;k++)setTimeout(()=>floatHeart(cx,cy),350+k*150);
    /* the envelope settles away and the letter appears */
    setTimeout(()=>env.classList.add('done'),2500);
    setTimeout(()=>{const p=document.querySelector('.paper');p.classList.remove('hidden');
      document.querySelectorAll('.paper .reveal').forEach(e=>io.observe(e));
      setTimeout(()=>p.scrollIntoView({behavior:'smooth'}),300)},2700);
  };
  env.onclick=openEnv;
  env.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openEnv()}};
}
