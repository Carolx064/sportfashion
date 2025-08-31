// Crear el mapa
var map = L.map('map');

// Capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Coordenadas de Valencia (Calle Colón)
var valencia = [39.4702, -0.3768];

// Coordenadas de Zaragoza (Calle Alfonso I)
var zaragoza = [41.6540, -0.8805];

// Añadir marcadores
L.marker(valencia).addTo(map)
  .bindPopup("<b>Valencia</b><br>Calle Colón,27");

L.marker(zaragoza).addTo(map)
  .bindPopup("<b>Zaragoza</b><br>Calle Alfonso I,15");

// Dibujar línea entre Valencia y Zaragoza
var ruta = L.polyline([valencia, zaragoza], {
  color: 'blue',     // Color de la línea
  weight: 4,        // Grosor
  opacity: 0.8,     // Transparencia
  dashArray: '10,5' // Línea discontinua
}).addTo(map);

// Ajustar el mapa para mostrar todo
map.fitBounds(ruta.getBounds());
