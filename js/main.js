function toggleMenu(){
  const menu = document.querySelector('.menu');
  menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}

// Accordions
document.querySelectorAll('.accordion').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const panel = btn.nextElementSibling;
    const open = panel.style.display === 'block';
    document.querySelectorAll('.panel').forEach(p=>p.style.display='none');
    panel.style.display = open ? 'none' : 'block';
  });
});

// Carousel
let offset = 0;
function slide(dir){
  const track = document.querySelector('.carousel .track');
  const card = track.querySelector('.card');
  if(!card) return;
  const step = card.offsetWidth + 14; // ancho + gap
  offset += dir * step;
  if(offset < 0) offset = 0;
  const max = track.scrollWidth - track.clientWidth;
  if(offset > max) offset = max;
  track.scrollTo({left: offset, behavior:'smooth'});
}
window.slide = slide; // para los botones
