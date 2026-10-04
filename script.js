(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,dpr=Math.min(devicePixelRatio||1,2);
  var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
  var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};
  var lenis=null;
  if(!reduce&&window.Lenis){try{lenis=new Lenis({lerp:.085,smoothWheel:true})}catch(e){lenis=null}}
  $$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=$(a.getAttribute('href'));if(!t)return;e.preventDefault();
    if(lenis)lenis.scrollTo(t,{duration:1.4});else t.scrollIntoView({behavior:reduce?'auto':'smooth'})})});

  // name letters
  $$('.name .row').forEach(function(r,ri){var t=r.textContent;r.textContent='';t.split('').forEach(function(c,i){var s=document.createElement('span');s.className='ch';s.style.setProperty('--i',i+ri*8);s.textContent=c;r.appendChild(s)})});
  // preloader
  var pre=$('#pre'),cnt=$('#cnt');
  function ready(){document.body.classList.add('ready')}
  if(reduce){ready()}else{var t0=performance.now();(function f(t){var p=clamp((t-t0)/1500,0,1),e=1-Math.pow(1-p,3);cnt.textContent=Math.round(e*100);
    if(p<1)requestAnimationFrame(f);else{pre.classList.add('done');setTimeout(ready,350)}})(t0)}

  // marquee
  var words=['Healthcare AI','Movie RecSys','FastAPI','Python','React','MySQL','REST APIs','Machine Learning'],mt=$('#mtrack'),h='';
  for(var k=0;k<4;k++)words.forEach(function(w){h+='<span>'+w+'</span>'});mt.innerHTML=h;
  var mx=0,half=0;
  // reveals, counters
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');
    $$('[data-n]',e.target).forEach(function(n){if(n.classList.contains('step'))return;var to=+n.dataset.n,s=performance.now();
      (function f(t){var p=clamp((t-s)/1500,0,1);n.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1&&!reduce)requestAnimationFrame(f);else n.textContent=to})(s)});
    io.unobserve(e.target)})},{threshold:.15});
  $$('.rv').forEach(function(e){io.observe(e)});

  // project art
  var A=[
    function(){var s='';for(var i=1;i<=8;i++)s+='<circle cx="200" cy="130" r="'+i*17+'" fill="none" stroke="var(--sea)" stroke-opacity="'+(1.05-i*.1).toFixed(2)+'"/>';return s+'<circle cx="200" cy="130" r="22" fill="var(--gold)"/>'},
    function(){var s='';for(var i=0;i<10;i++){var y=40+i*20;s+='<path d="M-20 '+y+' Q80 '+(y-34)+' 180 '+y+' T380 '+y+' T580 '+y+'" fill="none" stroke="'+(i==6?'var(--gold)':'var(--ink)')+'" stroke-opacity="'+(i==6?1:.45)+'"/>'}return s},
    function(){var s='';for(var x=0;x<14;x++)for(var y=0;y<9;y++){var d=Math.hypot(x-6.5,y-4);s+='<circle cx="'+(x*30+10)+'" cy="'+(y*30+14)+'" r="'+Math.max(1.5,9-d*1.5).toFixed(1)+'" fill="'+(d<2?'var(--gold)':'var(--ink)')+'" fill-opacity="'+(d<2?1:.5)+'"/>'}return s},
    function(){var s='';for(var i=0;i<7;i++)s+='<path d="M'+(30+i*26)+' 236 A'+(100+i*5)+' '+(100+i*18)+' 0 0 1 '+(230+i*26)+' 236" fill="none" stroke="'+(i==3?'var(--gold)':'var(--blue)')+'" stroke-opacity="'+(i==3?1:.6)+'"/>';return s}
  ];
  var arts=$$('.art');arts.forEach(function(el,i){el.innerHTML='<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+A[i]()+'</svg>'});

  // statement words
  var st=$('#storyText');st.innerHTML=st.textContent.split(' ').map(function(w){return'<span class="w">'+w+'</span>'}).join(' ');
  var wd=$$('.w',st);

  // horizontal work sizing
  var hs=$('#work'),ht=$('#htrack'),hp=$('#hp'),over=0;
  function hsize(){over=Math.max(0,ht.scrollWidth-innerWidth);hs.style.height=(over+innerHeight*1.15)+'px'}
  hsize();addEventListener('resize',hsize);addEventListener('load',hsize);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(hsize);

  // pointer: ring, card glare, magnetic mail
  var ring=$('#ring'),rx=0,ry=0,tx=0,ty=0,pmx=-999,pmy=-999,act=0,lastMove=0;
  var fine=matchMedia('(pointer:fine)').matches;
  addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;pmx=e.clientX;pmy=e.clientY;lastMove=performance.now();if(fine)ring.classList.add('on')});
  if(fine&&!reduce){
    $$('a,button,.jr').forEach(function(a){a.addEventListener('mouseenter',function(){ring.classList.add(a.dataset.cursor==='view'?'view':'big')});a.addEventListener('mouseleave',function(){ring.classList.remove('view','big')})});
    $$('.card').forEach(function(c){c.addEventListener('pointermove',function(e){var b=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-b.left)/b.width*100+'%');c.style.setProperty('--my',(e.clientY-b.top)/b.height*100+'%')})});
    var m=$('#mail');m.addEventListener('mousemove',function(e){var r=m.getBoundingClientRect();m.style.transform='translate('+(e.clientX-r.left-r.width/2)*.08+'px,'+(e.clientY-r.top-r.height/2)*.2+'px)'});
    m.addEventListener('mouseleave',function(){m.style.transform=''});
  }


  // case-study modal
  var P=[
    {t:'Healthcare AI Diagnostic Assistant',y:'2026',a:0,d:'An intelligent clinical triage platform designed to assess patient symptom severity, identify disease risk indicators, and provide explainable triage recommendations for medical staff.',r:'AI Architect & Full-Stack Lead',k:'Python, PyTorch, FastAPI, React, MySQL',s:[['99.2%','diagnostic validation AUC'],['120ms','average inference latency'],['15+','clinical risk markers analyzed']]},
    {t:'CineMatch Recommendation Engine',y:'2025',a:1,d:'A personalized movie discovery engine leveraging hybrid collaborative filtering, matrix factorization (SVD), and content embeddings to deliver tailored cinematic suggestions in real time.',r:'ML Engineer & Backend Developer',k:'Python, FastAPI, Scikit-Learn, React, REST API',s:[['25k+','movie profiles indexed'],['<45ms','recommendation response time'],['94.7%','user ranking correlation']]},
    {t:'Clinical Triage & EHR Portal',y:'2025',a:2,d:'A secure, role-based patient management and triage scheduling application featuring end-to-end data encryption, audit trails, and intuitive React dashboards.',r:'Full-Stack Engineer',k:'FastAPI, React, MySQL, JWT Auth, REST APIs',s:[['100%','parameterized SQL queries'],['4','distinct access roles'],['Sub-80ms','endpoint query time']]},
    {t:'High-Throughput Analytics API',y:'2024',a:3,d:'A resilient asynchronous REST API service built with FastAPI to ingest, validate, and aggregate streaming telemetry metrics into indexed MySQL storage.',r:'Backend Developer',k:'Python, FastAPI, MySQL, Pydantic, Git',s:[['10k+','events/sec handled'],['99.98%','service uptime'],['40%','reduction in DB query latency']]}
  ];
  var modal=$('#modal'),cur=0,lastF=null;
  function fill(i){cur=i;var p=P[i];$('#mTitle').textContent=p.t;$('#mYear').textContent=p.y;$('#mDesc').textContent=p.d;$('#mRole').textContent=p.r;$('#mStack').textContent=p.k;
    $('#mStats').innerHTML=p.s.map(function(x){return'<div><b>'+x[0]+'</b><small>'+x[1]+'</small></div>'}).join('');
    $('#mArt').innerHTML='<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+A[p.a]()+'</svg>'}
  function openP(i){lastF=document.activeElement;fill(i);modal.classList.add('open');modal.setAttribute('aria-hidden','false');if(lenis)lenis.stop();document.documentElement.style.overflow='hidden';setTimeout(function(){$('#mClose').focus()},60)}
  function closeP(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');if(lenis)lenis.start();document.documentElement.style.overflow='';if(lastF)lastF.focus()}
  $$('.card').forEach(function(c){c.addEventListener('click',function(e){e.preventDefault();openP(+c.dataset.p)})});
  $('#mClose').addEventListener('click',closeP);
  $('#mNext').addEventListener('click',function(){fill((cur+1)%P.length)});
  $('#mPrev').addEventListener('click',function(){fill((cur+P.length-1)%P.length)});
  $('#mStart').addEventListener('click',function(){var t=P[cur].t;closeP();$('#fm').value='Hi, I like '+t+' and would like to talk about something similar.';var c=$('#contact');
    if(lenis)lenis.scrollTo(c,{duration:1.4});else c.scrollIntoView({behavior:reduce?'auto':'smooth'});setTimeout(function(){$('#fm').focus({preventScroll:true})},1500)});
  modal.addEventListener('click',function(e){if(e.target===modal)closeP()});
  addEventListener('keydown',function(e){if(!modal.classList.contains('open'))return;if(e.key==='Escape')closeP();if(e.key==='ArrowRight')fill((cur+1)%P.length);if(e.key==='ArrowLeft')fill((cur+P.length-1)%P.length)});
  // contact form (opens the visitor's email app)
  var cf=$('#cf'),fmsg=$('#fmsg'),sb=$('.send',cf);
  [$('#fn'),$('#fe'),$('#fm')].forEach(function(i){i.addEventListener('input',function(){i.classList.remove('bad');i.removeAttribute('aria-invalid')})});
  cf.addEventListener('submit',function(e){e.preventDefault();var fn=$('#fn'),fe=$('#fe'),fm=$('#fm'),bad=[];
    if(!fn.value.trim())bad.push(fn);if(!/^\S+@\S+\.\S+$/.test(fe.value.trim()))bad.push(fe);if(!fm.value.trim())bad.push(fm);
    [fn,fe,fm].forEach(function(i){var b=bad.indexOf(i)>-1;i.classList.toggle('bad',b);if(b)i.setAttribute('aria-invalid','true')});
    if(bad.length){fmsg.textContent='Please fill in the highlighted fields.';cf.classList.remove('shake');void cf.offsetWidth;cf.classList.add('shake');bad[0].focus();return}
    fmsg.textContent='';sb.classList.add('busy');sb.textContent='Opening your email app…';
    setTimeout(function(){location.href='mailto:chillarahemanth13@gmail.com?subject='+encodeURIComponent('Project enquiry from '+fn.value.trim())+'&body='+encodeURIComponent(fm.value.trim()+'\n\n'+fn.value.trim()+'\n'+fe.value.trim())},500);
    setTimeout(function(){sb.classList.remove('busy');sb.textContent='Send message';say('If your email app did not open, use Copy email address.')},3200)});

  // dino game
  var dc=$('#dino'),dg=dc.getContext('2d'),DW=0,DH=220,GY=0,state='idle',dino={y:0,vy:0,air:false},obs=[],clouds=[],speed=6.2,dist=0,gap=380,score=0,hi=0,dvis=false,dlast=0,fast=false,gscroll=0,dcol={},paused=false,lastM=0,ac=null,snd=true,dP=null;
  try{hi=+localStorage.getItem('dinoHi')||0}catch(e){}
  function dcolors(){var cs=getComputedStyle(document.documentElement);['--bg','--ink','--mute','--gold','--sea','--blue'].forEach(function(k){dcol[k]=cs.getPropertyValue(k).trim()})}
  function dsize(){DW=dc.parentElement.clientWidth;DH=innerWidth<600?190:220;dc.width=DW*dpr;dc.height=DH*dpr;dc.style.height=DH+'px';dg.setTransform(dpr,0,0,dpr,0,0);GY=DH-46;dcolors();drawD()}
  function dreset(){dino={y:0,vy:0,air:false};obs=[];speed=6.2;dist=0;gap=380;score=0;gscroll=0;lastM=0;clouds=[{x:DW*.2,y:34,s:1},{x:DW*.58,y:60,s:.7},{x:DW*.9,y:28,s:.9}]}
  function jump(){if(paused){paused=false;if(dP)dP.textContent='Pause';return}if(state!=='run'){dcolors();dreset();state='run'}if(!dino.air){dino.vy=13.4;dino.air=true;beep(520,.09,'square',.04)}}
  function dstep(dt){
    speed=Math.min(15,speed+.0022*dt);var mv=speed*dt;dist+=mv;gscroll+=mv;score+=mv*.1;if(Math.floor(score/100)>lastM){lastM=Math.floor(score/100);beep(880,.12,'square',.035)}
    dino.vy-=(fast?2.1:.82)*dt;dino.y+=dino.vy*dt;if(dino.y<=0){dino.y=0;dino.vy=0;dino.air=false}
    if(dist>=gap){var n=1+Math.floor(Math.random()*3);obs.push({x:DW+10,n:n,w:n*20,h:30+Math.random()*18});dist=0;gap=300+Math.random()*320+speed*20}
    clouds.forEach(function(c){c.x-=mv*.18*c.s;if(c.x<-70){c.x=DW+40;c.y=24+Math.random()*50}});
    var dl=76,dr=98,dt2=GY-dino.y-36,db=GY-dino.y-4;
    for(var i=obs.length-1;i>=0;i--){var o=obs[i];o.x-=mv;if(o.x<-80){obs.splice(i,1);continue}
      if(dr>o.x+4&&dl<o.x+o.w-4&&db>GY-o.h+4&&dt2<GY){state='over';beep(140,.4,'sawtooth',.06);var sc=Math.floor(score);if(sc>hi){hi=sc;try{localStorage.setItem('dinoHi',hi)}catch(e){}}}}
  }
  function beep(f,d,type,v){if(!snd)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();var o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,ac.currentTime);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
  function pad(n){return('00000'+n).slice(-5)}
  function drawD(){
    var c=dg,b=GY-dino.y,x=64;c.clearRect(0,0,DW,DH);
    c.globalAlpha=.35;c.fillStyle=dcol['--blue'];clouds.forEach(function(k){c.fillRect(k.x,k.y,46*k.s,10*k.s);c.fillRect(k.x+10*k.s,k.y-8*k.s,26*k.s,10*k.s)});
    c.globalAlpha=.6;c.fillStyle=dcol['--mute'];c.fillRect(0,GY+1,DW,2);
    c.globalAlpha=.4;for(var i=0;i<DW/83+2;i++){c.fillRect(i*83-(gscroll%83),GY+10+(i*37%16),12,2)}
    c.globalAlpha=1;
    c.fillStyle=dcol['--sea'];obs.forEach(function(o){for(var j=0;j<o.n;j++){var cx=o.x+j*20,h=o.h,ya=GY-h*.55,yb=GY-h*.72;
      c.fillRect(cx+6,GY-h,8,h);c.fillRect(cx,ya,7,4);c.fillRect(cx,ya-10,4,14);c.fillRect(cx+13,yb,7,4);c.fillRect(cx+16,yb-10,4,14)}});
    var leg=state==='run'&&!dino.air?Math.floor(dist/9)%2:0;
    c.fillStyle=dcol['--gold'];
    c.fillRect(x-9,b-34,11,8);c.fillRect(x,b-34,28,22);c.fillRect(x+14,b-48,24,18);c.fillRect(x+24,b-24,6,4);
    c.fillRect(x+6,b-12+(leg?4:0),6,12-(leg?4:0));c.fillRect(x+18,b-12+(leg?0:4),6,12-(leg?0:4));
    c.fillStyle=dcol['--bg'];c.fillRect(x+28,b-44,state==='over'?6:4,state==='over'?6:4);
    c.fillStyle=dcol['--ink'];c.font='600 15px "Hanken Grotesk",Arial,sans-serif';c.textAlign='right';
    c.globalAlpha=.55;c.fillText('HI '+pad(hi),DW-120,28);c.globalAlpha=1;c.fillText(pad(Math.floor(score)),DW-24,28);
    c.textAlign='center';
    if(paused){c.fillStyle=dcol['--ink'];c.font='400 46px "Instrument Serif",Georgia,serif';c.fillText('Paused',DW/2,DH/2+6)}
    if(state==='over'||state==='idle'){c.globalAlpha=.78;c.fillStyle=dcol['--bg'];var bw=Math.min(DW-40,420),bh=state==='over'?92:56;c.beginPath();if(c.roundRect)c.roundRect(DW/2-bw/2,DH/2-(state==='over'?52:34),bw,bh,18);else c.rect(DW/2-bw/2,DH/2-(state==='over'?52:34),bw,bh);c.fill();c.globalAlpha=1}
    if(state==='over'){c.fillStyle=dcol['--ink'];c.font='400 46px "Instrument Serif",Georgia,serif';c.fillText('Game over',DW/2,DH/2-6);
      c.fillStyle=dcol['--mute'];c.font='400 17px "Hanken Grotesk",Arial,sans-serif';c.fillText('Press Space or tap to try again',DW/2,DH/2+22)}
    if(state==='idle'){c.fillStyle=dcol['--mute'];c.font='400 18px "Hanken Grotesk",Arial,sans-serif';c.fillText('Press Space or tap to start',DW/2,DH/2+2)}
  }
  function dloop(t){var dt=Math.min(2.5,(t-dlast)/16.67||1);dlast=t;if(dvis){if(state==='run'&&!paused)dstep(dt);drawD()}requestAnimationFrame(dloop)}
  dsize();dreset();drawD();addEventListener('resize',dsize);
  new IntersectionObserver(function(es){dvis=es[0].isIntersecting},{threshold:.15}).observe(dc);
  dc.addEventListener('pointerdown',function(){dc.focus({preventScroll:true});jump()});
  addEventListener('keydown',function(e){if(document.activeElement!==dc)return;
    if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();if(!e.repeat)jump()}
    if(e.code==='ArrowDown'){e.preventDefault();fast=true}});
  addEventListener('keyup',function(e){if(e.code==='ArrowDown')fast=false});
  if(matchMedia)matchMedia('(prefers-color-scheme: light)').addEventListener('change',function(){setTimeout(dsize,50)});
  requestAnimationFrame(dloop);
  dP=$('#dPause');var dR=$('#dRestart'),dS=$('#dSound');
  dR.addEventListener('click',function(){paused=false;dP.textContent='Pause';dcolors();dreset();state='run';dc.focus({preventScroll:true});beep(520,.09,'square',.04)});
  dP.addEventListener('click',function(){if(state!=='run')return;paused=!paused;dP.textContent=paused?'Resume':'Pause';if(!paused)dc.focus({preventScroll:true})});
  dS.addEventListener('click',function(){snd=!snd;dS.textContent='Sound: '+(snd?'on':'off');dS.setAttribute('aria-pressed',snd);if(snd)beep(660,.1,'square',.04)});
  setInterval(function(){dP.disabled=state!=='run'},200);
  // toast, clipboard, share
  var toast=$('#toast'),tmr;
  function say(m){toast.textContent=m;toast.classList.add('show');clearTimeout(tmr);tmr=setTimeout(function(){toast.classList.remove('show')},2600)}
  function copyText(v,ok){function fb(){var ta=document.createElement('textarea');ta.value=v;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;opacity:0;top:0';document.body.appendChild(ta);ta.select();var r=false;try{r=document.execCommand('copy')}catch(e){}document.body.removeChild(ta);say(r?ok:'Copy was blocked. Select it and press Ctrl or Cmd + C.')}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(function(){say(ok)},fb)}else fb()}
  $('#copyMail').addEventListener('click',function(){copyText('chillarahemanth13@gmail.com','Email address copied')});
  $('#shareBtn').addEventListener('click',function(){var d={title:document.title,url:location.href};
    if(navigator.share){navigator.share(d).catch(function(e){if(e&&e.name==='AbortError')return;copyText(d.url,'Link copied')})}else copyText(d.url,'Link copied')});
  // theme toggle
  var tb=$('#theme'),root=document.documentElement,tmeta=$('meta[name="theme-color"]');
  function curTheme(){return root.dataset.theme||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}
  function labelTheme(t){tb.classList.toggle('flip',t==='light');tb.setAttribute('aria-label','Switch to '+(t==='light'?'dark':'light')+' theme');if(tmeta)tmeta.content=t==='light'?'#EEF1F8':'#0A1633'}
  function applyTheme(t,save){root.dataset.theme=t;labelTheme(t);if(save){try{localStorage.setItem('theme',t)}catch(e){}}root.classList.add('tt');setTimeout(function(){root.classList.remove('tt');fsize();dsize()},60)}
  var saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
  if(saved)applyTheme(saved,false);else labelTheme(curTheme());
  tb.addEventListener('click',function(){var n=curTheme()==='light'?'dark':'light';applyTheme(n,true);say(n==='light'?'Light theme on':'Dark theme on')});
  // nav highlight
  var nl=$$('nav .l a'),spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)nl.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
  $$('main section,section').forEach(function(sec){if(sec.id)spy.observe(sec)});
  // ripple + magnetic buttons
  $$('.send,.mx').forEach(function(b){b.addEventListener('pointerdown',function(e){var r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,sp2=document.createElement('span');sp2.className='rip';
      sp2.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';b.appendChild(sp2);setTimeout(function(){sp2.remove()},650)});
    if(fine&&!reduce&&b.classList.contains('send')){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.12+'px,'+(e.clientY-r.top-r.height/2)*.25+'px)'});b.addEventListener('mouseleave',function(){b.style.transform=''})}});
  // journal accordion
  $$('.jr').forEach(function(j){function tog(){var o=j.classList.contains('open');$$('.jr').forEach(function(x){x.classList.remove('open');x.setAttribute('aria-expanded','false')});if(!o){j.classList.add('open');j.setAttribute('aria-expanded','true')}}
    j.addEventListener('click',tog);j.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();tog()}})});
  // clock + quote rotation
  function clk(){$('#clock').textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}clk();setInterval(clk,1000);
  var qs=$$('.q'),qi=0,qt;
  function showQ(i){qs[qi].classList.remove('on');qi=(i+qs.length)%qs.length;qs[qi].classList.add('on')}
  function qauto(){clearInterval(qt);qt=setInterval(function(){showQ(qi+1)},6500)}qauto();
  $('#qPrev').addEventListener('click',function(){showQ(qi-1);qauto()});$('#qNext').addEventListener('click',function(){showQ(qi+1);qauto()});

  // hero flow field
  var hero=$('#hero'),fc=$('#flow'),fx=fc.getContext('2d'),fw=0,fh=0,sp=46,inkC=[238,241,248],goldC=[255,77,90],seaC=[52,211,153];
  function rgb(v){var s=getComputedStyle(document.documentElement).getPropertyValue(v).trim();if(s[0]==='#'){if(s.length===4)s='#'+s[1]+s[1]+s[2]+s[2]+s[3]+s[3];return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)]}return null}
  function fsize(){fw=hero.offsetWidth;fh=hero.offsetHeight;fc.width=fw*dpr;fc.height=fh*dpr;fx.setTransform(dpr,0,0,dpr,0,0);inkC=rgb('--ink')||inkC;goldC=rgb('--gold')||goldC;seaC=rgb('--sea')||seaC}
  fsize();addEventListener('resize',fsize);
  var fpx=-999,fpy=-999;
  function flow(t){
    var hr=hero.getBoundingClientRect(),tx2=pmx-hr.left,ty2=pmy-hr.top;
    fpx+=(tx2-fpx)*.12;fpy+=(ty2-fpy)*.12;
    act+=((performance.now()-lastMove<2500?1:0)-act)*.05;
    fx.clearRect(0,0,fw,fh);fx.lineCap='round';fx.lineWidth=1.4;
    for(var gx=sp/2;gx<fw;gx+=sp)for(var gy=sp/2;gy<fh;gy+=sp){
      var dx=fpx-gx,dy=fpy-gy,d=Math.sqrt(dx*dx+dy*dy),k=act*Math.exp(-d/340),
          ia=Math.sin(gx*.007+t*.0004)*1.6+Math.cos(gy*.009-t*.0003)*1.6,ta=Math.atan2(dy,dx),
          vx=Math.cos(ia)*(1-k)+Math.cos(ta)*k,vy=Math.sin(ia)*(1-k)+Math.sin(ta)*k,a=Math.atan2(vy,vx),
          len=7+k*16,al=.13+k*.75,c=k>.35?(((gx/sp|0)+(gy/sp|0))%3===0?seaC:goldC):inkC;
      fx.strokeStyle='rgba('+c[0]+','+c[1]+','+c[2]+','+al.toFixed(2)+')';
      fx.beginPath();fx.moveTo(gx-Math.cos(a)*len/2,gy-Math.sin(a)*len/2);fx.lineTo(gx+Math.cos(a)*len/2,gy+Math.sin(a)*len/2);fx.stroke()}
  }

  // main loop
  var nav=$('nav'),px=$$('[data-speed],[data-x]'),tl=$('#tl'),bar=$('#bar'),last=scrollY;
  function update(t){
    if(lenis)lenis.raf(t);
    var sy=scrollY,vh=innerHeight,vel=sy-last;last=sy;
    if(nav){nav.classList.toggle('solid',sy>40);if(sy>320&&vel>4)nav.classList.add('hide');else if(vel<-4||sy<=320)nav.classList.remove('hide')}
    bar.style.transform='scaleX('+clamp(sy/Math.max(1,document.documentElement.scrollHeight-vh),0,1)+')';
    ring.style.transform='translate('+(rx+=(tx-rx)*.22)+'px,'+(ry+=(ty-ry)*.22)+'px)';
    if(!reduce){
      px.forEach(function(el){var p=(el.closest('.band,header')||el.parentElement).getBoundingClientRect();if(p.bottom<-300||p.top>vh+300)return;var c=p.top+p.height/2-vh/2;
        if(el.dataset.speed)el.style.translate='0 '+(c*el.dataset.speed).toFixed(1)+'px';
        if(el.dataset.x)el.style.translate=(c*el.dataset.x).toFixed(1)+'px 0';
        if(el.dataset.rot)el.style.rotate=(c*el.dataset.rot).toFixed(1)+'deg'});
      var r=st.getBoundingClientRect(),pr=clamp((vh*.85-r.top)/(r.height+vh*.35),0,1);
      wd.forEach(function(w,i){w.classList.toggle('on',i<pr*wd.length*1.05)});
      var q=tl.getBoundingClientRect();tl.style.setProperty('--p',clamp((vh*.7-q.top)/q.height,0,1));
      var hr=hs.getBoundingClientRect(),p=clamp(-hr.top/Math.max(1,hs.offsetHeight-vh),0,1);
      ht.style.transform='translateX('+(-p*over).toFixed(1)+'px)';hp.style.transform='scaleX('+p+')';
      arts.forEach(function(a){var cr=a.parentElement.getBoundingClientRect();if(cr.right<0||cr.left>innerWidth)return;a.firstChild.style.transform='translateX('+((cr.left+cr.width/2-innerWidth/2)*-.14).toFixed(1)+'px)'});
      if(!half)half=mt.scrollWidth/2;
      mx-=.6+Math.min(Math.abs(vel),70)*.14;if(mx<=-half)mx+=half;
      mt.style.transform='translateX('+mx.toFixed(1)+'px) skewX('+clamp(-vel*.12,-7,7).toFixed(2)+'deg)';
      if(sy<hero.offsetHeight+60)flow(t);
    }
    requestAnimationFrame(update)}
  addEventListener('resize',function(){half=0});
  requestAnimationFrame(update);
})();
