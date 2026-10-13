/* ===== sign-in page script ===== */

/* ---------- EDIT THESE THREE LINES ---------- */
const CREDENTIALS={id:'4(22).143',password:'1005'};   /* the ID and password she must type */
const HINT='';   /* optional: a line of text shown after 2 wrong tries. Leave empty for no hint. */
const NEXT_PAGE='start.html';                          /* where a correct sign-in goes */
/* --------------------------------------------- */

const $=s=>document.querySelector(s);
const norm=s=>String(s).toLowerCase().replace(/[\s\-_]/g,'');   /* "Sky Blue", "sky-blue", "SKYBLUE" all match */
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ----- tiny synth beeps ----- */
let actx;
function tone(f,t,d,type='sine',v=.05){try{actx=actx||new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();
  const o=actx.createOscillator(),g=actx.createGain(),t0=actx.currentTime+t;o.type=type;o.frequency.value=f;
  g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(v,t0+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+d);
  o.connect(g).connect(actx.destination);o.start(t0);o.stop(t0+d+.05)}catch(e){}}

/* ----- floating equations ----- */
const FORMULAS=['V = I·R','E = mc²','F = ma','Q = C·V','P = V·I','τ = R·C','X_L = 2πfL','f = 1/(2π√LC)','∇·E = ρ/ε₀','Δx·Δp ≥ ħ/2','I = I₀(e^(V/Vt) − 1)','Y = A·B + C̄','Σ F = 0','λ = h/p','E = hf','V_out = −(R_f/R_in)·V_in','a² + b² = c²','e^(iπ) + 1 = 0'];
const FCOLS=['#19f5c4','#3dd9ff','#7dff6b','#ffb84d'];
{const box=$('.formulas');FORMULAS.forEach((t,i)=>{const s=document.createElement('span');s.textContent=t;
  s.style.left=(3+Math.random()*84)+'vw';s.style.top=(4+Math.random()*86)+'vh';
  s.style.fontSize=(11+Math.random()*6)+'px';s.style.color=FCOLS[i%4];
  s.style.setProperty('--o',(.22+Math.random()*.2).toFixed(2));s.style.setProperty('--r',(Math.random()*16-8)+'deg');
  s.style.setProperty('--mx',(Math.random()*120-60)+'px');s.style.setProperty('--my',(-60-Math.random()*110)+'px');
  s.style.animationDuration=(16+Math.random()*14)+'s';s.style.animationDelay=(-Math.random()*20)+'s';
  box.appendChild(s)})}

/* ----- circuit board canvas: traces, pads, chips, travelling electrons, oscilloscope ----- */
const cv=$('#pcb'),x=cv.getContext('2d');
const bg=document.createElement('canvas'),bx=bg.getContext('2d');
const CELL=26,COLS=['#19f5c4','#3dd9ff','#7dff6b','#ffb84d'];
const rnd=(a,b)=>a+Math.random()*(b-a),ri=(a,b)=>Math.floor(rnd(a,b+1));
let W,H,DPR,traces=[],pulses=[],boost=1;

function makeTrace(){
  const maxX=Math.floor(W/CELL)-2,maxY=Math.floor(H/CELL)-2;
  let px=ri(1,maxX)*CELL,py=ri(1,maxY)*CELL,horiz=Math.random()<.5,dir=Math.random()<.5?1:-1;
  const pts=[[px,py]];
  for(let s=0,segs=ri(2,5);s<segs;s++){
    let nx=px+(horiz?dir*ri(2,8)*CELL:0),ny=py+(horiz?0:dir*ri(2,8)*CELL);
    nx=Math.max(CELL,Math.min(W-CELL,nx));ny=Math.max(CELL,Math.min(H-CELL,ny));
    if(nx===px&&ny===py)break;
    pts.push([nx,ny]);px=nx;py=ny;
    const nd=Math.random()<.5?1:-1;   /* a 45-degree chamfer, then turn */
    const gx=px+(horiz?dir*CELL:nd*CELL),gy=py+(horiz?nd*CELL:dir*CELL);
    if(gx<CELL||gx>W-CELL||gy<CELL||gy>H-CELL)break;
    pts.push([gx,gy]);px=gx;py=gy;horiz=!horiz;dir=nd;
  }
  if(pts.length<2)return null;
  const lens=[];let total=0;
  for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);lens.push(l);total+=l}
  return{pts,lens,total};
}
function pointAt(tr,d){
  for(let i=0;i<tr.lens.length;i++){
    if(d<=tr.lens[i]){const f=d/tr.lens[i],a=tr.pts[i],b=tr.pts[i+1];return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]}
    d-=tr.lens[i];
  }
  return tr.pts[tr.pts.length-1];
}
function chip(c,cx,cy,w,h,label){
  c.save();c.translate(cx,cy);
  c.strokeStyle='rgba(63,127,116,.9)';c.lineWidth=2;
  const pins=Math.max(3,Math.floor(h/12));
  for(let i=0;i<pins;i++){const py=8+i*((h-16)/(pins-1));c.beginPath();c.moveTo(-9,py);c.lineTo(0,py);c.moveTo(w,py);c.lineTo(w+9,py);c.stroke()}
  c.fillStyle='#04201c';c.strokeStyle='rgba(25,245,196,.55)';c.lineWidth=1.5;
  c.beginPath();c.roundRect?c.roundRect(0,0,w,h,4):c.rect(0,0,w,h);c.fill();c.stroke();
  c.beginPath();c.arc(9,9,3,0,7);c.stroke();
  c.fillStyle='rgba(25,245,196,.85)';c.font='bold 9px ui-monospace,Consolas,monospace';c.textAlign='center';c.fillText(label,w/2,h/2+3);
  c.restore();
}
function build(){
  DPR=Math.min(2,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;
  [cv,bg].forEach(c=>{c.width=W*DPR;c.height=H*DPR});
  cv.style.width=W+'px';cv.style.height=H+'px';
  x.setTransform(DPR,0,0,DPR,0,0);bx.setTransform(DPR,0,0,DPR,0,0);
  bx.clearRect(0,0,W,H);
  /* faint dot grid */
  bx.fillStyle='rgba(25,245,196,.07)';
  for(let gx=CELL;gx<W;gx+=CELL)for(let gy=CELL;gy<H;gy+=CELL)bx.fillRect(gx-1,gy-1,2,2);
  /* traces + pads */
  traces=[];pulses=[];
  const n=Math.max(18,Math.min(80,Math.floor(W*H/15000)));
  for(let i=0;i<n;i++){const t=makeTrace();if(t)traces.push(t)}
  traces.forEach((t,i)=>{
    bx.strokeStyle='rgba(25,245,196,.17)';bx.lineWidth=2;bx.lineJoin='round';
    bx.beginPath();t.pts.forEach((p,k)=>k?bx.lineTo(p[0],p[1]):bx.moveTo(p[0],p[1]));bx.stroke();
    [t.pts[0],t.pts[t.pts.length-1]].forEach(p=>{bx.strokeStyle='rgba(25,245,196,.4)';bx.lineWidth=1.5;bx.beginPath();bx.arc(p[0],p[1],4.5,0,7);bx.stroke();bx.fillStyle='rgba(25,245,196,.12)';bx.fill()});
    if(i%2===0)pulses.push({t,d:rnd(0,t.total),v:rnd(45,130),col:COLS[i%4]});
  });
  /* chips around the edges */
  const k=Math.min(W,H)<520?.72:1,cw=84*k,chh=58*k;
  [[.04,.1,'NE555'],[.76,.07,'LM358'],[.03,.62,'74HC00'],[.78,.6,'ATMEGA'],[.4,.02,'CMOS']].forEach(([fx,fy,l])=>chip(bx,Math.round(W*fx+10),Math.round(H*fy),cw,chh,l));
}
function wave(fn,col,alpha,w){
  x.beginPath();for(let i=0;i<=W;i+=3){const y=fn(i);i?x.lineTo(i,y):x.moveTo(i,y)}
  x.strokeStyle=col;x.globalAlpha=alpha;x.lineWidth=w;x.shadowColor=col;x.shadowBlur=8;x.stroke();x.shadowBlur=0;x.globalAlpha=1;
}
let last=performance.now();
function frame(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;const t=now/1000;
  x.clearRect(0,0,W,H);x.drawImage(bg,0,0,W,H);
  /* electrons running along the traces */
  pulses.forEach(p=>{
    p.d+=p.v*boost*dt;if(p.d>p.t.total+60)p.d=-30;
    for(let k=0;k<11;k++){const dd=p.d-k*6;if(dd<0||dd>p.t.total)continue;
      const[px,py]=pointAt(p.t,dd);x.globalAlpha=(1-k/11)*.95;x.fillStyle=p.col;
      if(k===0){x.shadowColor=p.col;x.shadowBlur=14}else x.shadowBlur=0;
      x.beginPath();x.arc(px,py,k===0?3.2:2.5-k*.15,0,7);x.fill()}
    x.shadowBlur=0;x.globalAlpha=1;
  });
  /* oscilloscope along the bottom */
  const base=H-46,amp=15;
  x.strokeStyle='rgba(25,245,196,.12)';x.lineWidth=1;x.beginPath();x.moveTo(0,base);x.lineTo(W,base);x.stroke();
  wave(i=>base+Math.sin(i*.035+t*2.4*boost)*amp,'#7dff6b',.75,1.8);
  wave(i=>base+(Math.sin(i*.02+t*1.5*boost)>0?-1:1)*amp*.75,'#3dd9ff',.45,1.4);
  wave(i=>base+Math.sin(i*.09+t*3)*amp*.35+Math.sin(i*.013+t)*amp*.4,'#ffb84d',.3,1.2);
  if(!REDUCE)requestAnimationFrame(frame);
}
build();
if(REDUCE)frame(performance.now());else requestAnimationFrame(frame);
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{build();if(REDUCE)frame(performance.now())},200)});

/* ----- boot log ----- */
const log=$('.log');
async function typeLine(text,cls,ms=16){
  const d=document.createElement('div');if(cls)d.className=cls;log.appendChild(d);
  for(const ch of text){d.textContent+=ch;await sleep(REDUCE?0:ms)}
  return d;
}
function setCursor(on){const old=log.querySelector('.cursor');if(old)old.remove();if(on){const c=document.createElement('span');c.className='cursor';log.lastElementChild.appendChild(c)}}
(async()=>{
  await sleep(900);
  await typeLine('> boot sequence ............ ');log.lastElementChild.insertAdjacentHTML('beforeend','<span class="ok">OK</span>');
  await typeLine('> checking continuity ...... ');log.lastElementChild.insertAdjacentHTML('beforeend','<span class="ok">OK</span>');
  await typeLine('> awaiting credentials');setCursor(true);
})();

/* ----- show / hide password ----- */
$('#eye').onclick=()=>{const p=$('#pwd'),show=p.type==='password';p.type=show?'text':'password';$('#eye').textContent=show?'HIDE':'SHOW'};

/* ----- sign in ----- */
const panel=$('.panel'),msg=$('#msg'),form=$('#f');
let tries=0,locked=false;
function fail(){
  tries++;
  panel.classList.remove('shake');void panel.offsetWidth;panel.classList.add('shake','bad');
  $('.led.r').classList.add('on');$('.led.a').style.display='none';
  document.querySelectorAll('.inp').forEach(e=>{e.classList.remove('bad');void e.offsetWidth;e.classList.add('bad')});
  msg.className='bad';msg.textContent='ACCESS DENIED — ID or password not recognised';
  tone(160,0,.22,'square',.06);tone(120,.2,.34,'square',.06);
  if(tries>=2&&HINT){const h=$('#hint');h.textContent='HINT → '+HINT;h.classList.add('show')}
  setTimeout(()=>{panel.classList.remove('bad');$('.led.r').classList.remove('on');$('.led.a').style.display=''},1400);
}
async function success(){
  locked=true;form.classList.add('locked');
  panel.classList.remove('bad');panel.classList.add('ok');
  $('.led.r').classList.remove('on');$('.led.a').style.display='none';$('.led.g').classList.add('on');
  msg.className='good';msg.textContent='ACCESS GRANTED';$('#hint').classList.remove('show');
  [523.25,659.25,783.99,1046.5,1318.5].forEach((f,i)=>tone(f,i*.11,.5,'triangle',.06));
  boost=7;   /* electrons surge along the circuit */
  setCursor(false);log.innerHTML='';
  const meter=$('.meter');meter.classList.add('show');
  const cells=$('.cells');cells.innerHTML='';const N=24;
  for(let i=0;i<N;i++){const c=document.createElement('i');c.style.setProperty('--h',Math.round(i/(N-1)*130));cells.appendChild(c)}
  const fill=(async()=>{for(let i=0;i<N;i++){cells.children[i].classList.add('on');$('.pct').textContent=Math.round((i+1)/N*100)+'%';tone(300+i*38,0,.06,'square',.018);await sleep(REDUCE?10:85)}})();
  await typeLine('> verifying identity ........ ',null,12);log.lastElementChild.insertAdjacentHTML('beforeend','<span class="ok">OK</span>');
  await typeLine('> charging capacitors ....... ',null,12);log.lastElementChild.insertAdjacentHTML('beforeend','<span class="ok">OK</span>');
  await fill;
  await typeLine('> closing the circuit ....... ',null,12);log.lastElementChild.insertAdjacentHTML('beforeend','<span class="ok">LIVE</span>');
  await sleep(REDUCE?100:500);
  $('#flash').classList.add('on');
  [880,1174.66,1567.98].forEach((f,i)=>tone(f,i*.08,.8,'sine',.05));
  await sleep(REDUCE?100:1150);
  location.href=NEXT_PAGE;
}
form.addEventListener('submit',e=>{
  e.preventDefault();if(locked)return;
  const id=$('#uid').value,pw=$('#pwd').value;
  if(norm(id)===norm(CREDENTIALS.id)&&norm(pw)===norm(CREDENTIALS.password))success();else fail();
});
$('#uid').focus({preventScroll:true});
