let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    success,
    error,
    options
  );
} else {
  alert("Los servicios de geolocalización no están disponibles");
}

function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  // Inicializar mapa centrado en la ubicación del usuario
  let map = L.map('map', {
    center: [latitude, longitude],
    zoom: 14
  });

  // Capa de OpenStreetMap
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Control de ruta desde la posición del usuario hasta tu negocio
  L.Routing.control({
    waypoints: [
      L.latLng(latitude, longitude),      
      L.latLng(39.480523,-0.390642)          
    ],
    language: 'es'
  }).addTo(map);
}

function error(err) {
  alert("Error al obtener tu ubicación: " + err.message);
}
