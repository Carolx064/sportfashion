document.addEventListener('DOMContentLoaded', function () {
  const linksRoot = {
    index: 'index.html',
    productos: 'Views/productos.html',
    presupuesto: 'Views/presupuesto.html',
    contacto: 'Views/contacto.html',
    galeria: 'Views/galeria.html'
  };
  const linksViews = {
    index: '../index.html',
    productos: 'productos.html',
    presupuesto: 'presupuesto.html',
    contacto: 'contacto.html',
    galeria: 'galeria.html'
  };

  const isInViews = location.pathname.split('/').includes('Views');
  const mapping = isInViews ? linksViews : linksRoot;

  document.querySelectorAll('a[data-link]').forEach(a => {
    const key = a.dataset.link;
    if (mapping[key]) a.setAttribute('href', mapping[key]);
  });

  // Make the logo link point to the index (works in both root and Views)
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.setAttribute('href', isInViews ? '../index.html' : 'index.html');
  }

  // Highlight active link (by comparing href file name)
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar a, .footer a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.endsWith(currentFile)) {
      a.classList.add('active');
    }
  });
});

