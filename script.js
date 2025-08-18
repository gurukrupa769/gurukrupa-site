// ===== Bootstrap Carousel (auto via data attributes) =====
const carousel = document.querySelector('#shopCarousel');
if (carousel) {
  new bootstrap.Carousel(carousel, { interval: 3000, ride: 'carousel', pause: false });
}

// ===== Tabs (single-page sections) =====
const tabLinks = document.querySelectorAll('.tab-link');
const tabSections = document.querySelectorAll('.tab-section');
function showTab(id){
  tabSections.forEach(sec => sec.style.display = 'none');
  const el = document.getElementById(id);
  if (el){ el.style.display = 'block'; }
  tabLinks.forEach(l => l.classList.toggle('active', l.getAttribute('data-tab') === id));
}
tabLinks.forEach(link => {
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    showTab(link.getAttribute('data-tab'));
    // smooth scroll to content
    window.scrollTo({top: (document.querySelector('nav').offsetHeight || 0) + 1, behavior: 'smooth'});
  });
});
showTab('home'); // default

// ===== Particle / Firefly Background (Canvas) =====
(function(){
  const c = document.getElementById('bg-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w, h, particles=[];
  function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    particles = Array.from({length: Math.max(80, Math.floor(w*h/22000))}, ()=>spawn());
  }
  function spawn(){
    return {
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-.5)*0.4, vy: (Math.random()-.5)*0.4,
      r: Math.random()*1.8+0.4, a: Math.random()*0.6+0.2
    };
  }
  function tick(){
    ctx.clearRect(0,0,w,h);
    // faint gradient
    const g = ctx.createRadialGradient(w*0.7,h*0.3,10,w*0.7,h*0.3, Math.max(w,h));
    g.addColorStop(0,'rgba(0,255,255,0.06)');
    g.addColorStop(1,'transparent');
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

    // links + dots
    particles.forEach((p,i)=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w||p.y<0||p.y>h){ particles[i]=spawn(); return; }
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,255,255,${p.a})`;
      ctx.shadowColor='rgba(0,255,255,.6)';
      ctx.shadowBlur=8;
      ctx.fill();
    });
    // connect near particles
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a=particles[i], b=particles[j];
        const dx=a.x-b.x, dy=a.y-b.y, d=dx*dx+dy*dy;
        if(d<9000){
          const op = 1 - d/9000;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = `rgba(0,255,255,${0.12*op})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resize);
  resize(); tick();
})();

// ===== Typing Effect for Subtitle =====
(function(){
  const el = document.querySelector('.typewrite');
  if(!el) return;
  const phrases = JSON.parse(el.getAttribute('data-phrases') || '[]');
  let i=0, j=0, erasing=false;
  function type(){
    if(!phrases.length) return;
    const word = phrases[i%phrases.length];
    if(!erasing){
      el.textContent = word.slice(0, ++j);
      if(j===word.length){ erasing=true; setTimeout(type, 900); return; }
    } else {
      el.textContent = word.slice(0, --j);
      if(j===0){ erasing=false; i++; }
    }
    setTimeout(type, erasing? 40 : 70);
  }
  type();
})();

// ===== Scroll Reveal =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('revealed');
      io.unobserve(e.target);
    }
  });
},{threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ===== 3D Tilt (services & gallery) =====
function addTilt(el, strength=12){
  let rect;
  function update(e){
    rect = rect || el.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / (rect.width/2);
    const dy = (e.clientY - cy) / (rect.height/2);
    el.style.transform = `rotateY(${dx*strength}deg) rotateX(${ -dy*strength }deg) translateZ(0)`;
  }
  function reset(){
    el.style.transform='perspective(1000px) rotateY(0) rotateX(0)';
    rect = null;
  }
  el.style.transformStyle='preserve-3d';
  el.style.transition='transform .15s ease';
  el.addEventListener('mousemove', update);
  el.addEventListener('mouseleave', reset);
}
document.querySelectorAll('.tilt').forEach(el=>addTilt(el, 10));

// ===== Magnetic Buttons =====
document.querySelectorAll('.magnetic').forEach(btn=>{
  const strength = 18;
  btn.addEventListener('mousemove', e=>{
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width/2);
    const dy = e.clientY - (r.top + r.height/2);
    btn.style.transform = `translate(${dx/14}px, ${dy/14}px)`;
  });
  btn.addEventListener('mouseleave', ()=> btn.style.transform='translate(0,0)');
});

// ===== Ripple Click =====
document.querySelectorAll('.ripple').forEach(el=>{
  el.addEventListener('click', ()=>{
    el.classList.remove('active'); // reset animation
    void el.offsetWidth;           // reflow
    el.classList.add('active');
    setTimeout(()=>el.classList.remove('active'), 650);
  });
});

// ===== Parallax on Hero Title =====
(function(){
  const title = document.querySelector('.neon-title');
  if(!title) return;
  window.addEventListener('mousemove', (e)=>{
    const x = (e.clientX / window.innerWidth - .5)*8;
    const y = (e.clientY / window.innerHeight - .5)*-8;
    title.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
})();

// ===== Keep Home visible by default (safety) =====
document.getElementById('home').style.display = 'block';
