document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formulario');
  if (!form) return;

  // Precios base por producto (puedes ajustar)
  const precios = {
    camiseta: 20.00,
    pantalon: 30.00,
    zapatos: 60.00,
    gorro: 15.00
  };

  const precioExtras = {
    color: 5.00,
    tipografia: 8.00,
    terminacion: 10.00,
    nombre: 3.00
  };

  function validarTexto(valor, min=2) {
    return typeof valor === 'string' && valor.trim().length >= min;
  }

  function validarTelefono(tel) {
    return /^[0-9]{9}$/.test(tel);
  }

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // no hay backend, procesamos aquí

    // recoger campos
    const nombre = form.querySelector('#Nombre').value;
    const apellido = form.querySelector('#Apellido').value;
    const telefono = form.querySelector('#contacto').value;
    const correo = form.querySelector('#correo').value;
    const producto = form.querySelector('#producto').value;
    const plazo = parseInt(form.querySelector('#plazo').value, 10) || 1;
    const extrasChecked = Array.from(form.querySelectorAll('input[name="extras"]:checked')).map(i => i.value);

    // validaciones
    const errores = [];
    if (!validarTexto(nombre)) errores.push('Nombre inválido (mínimo 2 caracteres).');
    if (!validarTexto(apellido)) errores.push('Apellido inválido (mínimo 2 caracteres).');
    if (!validarTelefono(telefono)) errores.push('Teléfono inválido (debe tener 9 dígitos).');
    if (!validarEmail(correo)) errores.push('Correo electrónico inválido.');

    if (!producto) errores.push('Debe seleccionar un producto.');

    const resultadoDiv = document.getElementById('resultado');
    if (!resultadoDiv) {
      alert('No se encontró el contenedor de resultados (#resultado).');
      return;
    }

    if (errores.length) {
      resultadoDiv.innerHTML = '<div class="error"><strong>Errores:</strong><ul>' + errores.map(e => '<li>' + e + '</li>').join('') + '</ul></div>';
      return;
    }

    // cálculo del presupuesto
    const base = precios[producto] || 0;
    const extrasTotal = extrasChecked.reduce((acc, key) => acc + (precioExtras[key] || 0), 0);
    const subtotal = base + extrasTotal;
    // si quieres, puedes aplicar impuestos o descuentos aquí
    const impuesto = Math.round(subtotal * 0.21 * 100) / 100; // 21% IVA (ejemplo)
    const total = Math.round((subtotal + impuesto) * 100) / 100;
    const cuotaMensual = Math.round((total / Math.max(plazo,1)) * 100) / 100;

    // mostrar resultado
    resultadoDiv.innerHTML = `
      <div class="resultado-presupuesto">
        <h3>Presupuesto calculado</h3>
        <p><strong>Producto:</strong> ${producto}</p>
        <p><strong>Precio base:</strong> €${base.toFixed(2)}</p>
        <p><strong>Extras:</strong> ${extrasChecked.length ? extrasChecked.join(', ') : 'Ninguno' } (€${extrasTotal.toFixed(2)})</p>
        <p><strong>IVA (21%):</strong> €${impuesto.toFixed(2)}</p>
        <p><strong>Total:</strong> €${total.toFixed(2)}</p>
        <p><strong>Plazo:</strong> ${plazo} meses → cuota mensual aprox.: €${cuotaMensual.toFixed(2)}</p>
      </div>
    `;

    // opcional: limpiar formulario si lo deseas
    // form.reset();
  });
});
