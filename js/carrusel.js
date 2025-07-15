const carrusel = document.getElementById('carrusel');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

next.addEventListener('click', () => {
  carrusel.scrollBy({
    left: 270,
    behavior: 'smooth'
  });
});

prev.addEventListener('click', () => {
  carrusel.scrollBy({
    left: -270,
    behavior: 'smooth'
  });
});
