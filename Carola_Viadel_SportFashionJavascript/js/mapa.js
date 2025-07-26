// Coordenadas de la tienda (por ejemplo, en Madrid)
const tiendaLat = 40.4168;
const tiendaLng = -3.7038;

// Crear el mapa centrado en la tienda
const map = L.map('map').setView([tiendaLat, tiendaLng], 13);

// Cargar el mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marcador de la tienda
const markerTienda = L.marker([tiendaLat, tiendaLng]).addTo(map)
  .bindPopup('Nuestra tienda').openPopup();

// Obtener la ubicación del visitante
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latUser = position.coords.latitude;
    const lngUser = position.coords.longitude;

    // Marcador del visitante
    const markerUser = L.marker([latUser, lngUser]).addTo(map)
      .bindPopup('Tu ubicación').openPopup();

    // Línea entre el visitante y la tienda
    const linea = L.polyline([[latUser, lngUser], [tiendaLat, tiendaLng]], {
      color: 'blue',
      weight: 4
    }).addTo(map);

    // Ajustar el zoom para ver ambos puntos
    map.fitBounds(linea.getBounds());

  }, () => {
    alert("No se pudo obtener tu ubicación.");
  });
} else {
  alert("Geolocalización no soportada por tu navegador.");
}
