// ================================
// Future Value Group – main.js
// ================================

// 1) Año dinámico en el footer (si existe)
(function setYear(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// 2) Mobile nav: abrir/cerrar
(function mobileNav(){
  const nav = document.getElementById('nav'); // <nav id="nav">
  const toggle = document.getElementById('menu-toggle'); // <button id="menu-toggle">
  if (!nav || !toggle) return;

  const closeOnLink = (e)=>{
    if (e.target.matches('a')) nav.setAttribute('aria-expanded','false');
  };

  toggle.addEventListener('click', ()=>{
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
  });

  nav.addEventListener('click', closeOnLink);
})();

// 3) Resaltar link activo en el menú
(function activeLink(){
  const path = location.pathname
    .replace(/\/index\.html?$/,'/')   // normaliza /index.html → /
    .replace(/\/+$/,'/');             // quita barras finales

  document.querySelectorAll('.nav-links a, .menu a, nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if (!href) return;

    const normalized = href
      .replace(/\/index\.html?$/,'/')
      .replace(/\/+$/,'/');

    const same = (normalized === path) || (path === '/' && (normalized === '/' || normalized === ''));
    if (same) a.classList.add('active');
  });
})();

// 4) Header: sombra al hacer scroll
(function headerShadow(){
  const header = document.querySelector('header.site-header');
  if (!header) return;
  const onScroll = ()=>{
    if (window.scrollY > 6) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();

// 5) Smooth scroll para anclas internas (#id)
(function smoothScroll(){
  const isInternal = (a)=> a.hash && a.pathname === location.pathname;
  document.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(a=>{
    if (!isInternal(a)) return;
    a.addEventListener('click', (e)=>{
      const id = a.hash.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', `#${id}`);
    });
  });
})();

// 6) Aparición suave (Intersection Observer) para elementos con .reveal
(function revealOnView(){
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: .15});

  items.forEach(el=> io.observe(el));
})();

// 7) Utilidad para toasts simples (usalo si querés mostrar mensajes)
export function toast(msg='Hecho', ms=2200){
  let el = document.getElementById('fv-toast');
  if (!el){
    el = document.createElement('div');
    el.id = 'fv-toast';
    el.style.cssText = `
      position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%);
      background: linear-gradient(90deg, var(--brand,#b4985c), var(--brand-2,#e5d2a3));
      color:#111; font-weight:800; padding:10px 14px; border-radius:12px;
      box-shadow: 0 8px 24px rgba(0,0,0,.25); z-index:9999;
    `;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(()=>{ el.style.opacity='0'; }, ms);
}

// 8) Si querés mostrar un aviso post-formularios con Formspree (redirigiendo a ?ok=1)
(function handleQueryToasts(){
  const p = new URLSearchParams(location.search);
  if (p.get('ok') === '1'){
    try { toast('Gracias, te contactamos en 24 h hábiles'); } catch(e){}
  }
})();
