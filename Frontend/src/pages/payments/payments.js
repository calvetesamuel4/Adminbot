// Simulamos la base de datos (puedes cambiar esto por un fetch a tu DB real)
let estudiantes = JSON.parse(localStorage.getItem('adminbot_pagos')) || [
    { id: 1, nombre: "Juan Pérez", monto: 150000, estado: "pagado", telefono: "573001234567" },
    { id: 2, nombre: "Ana García", monto: 150000, estado: "pendiente", telefono: "573012345678" }
];

function renderizarPagos() {
    const lista = document.getElementById('payment-list');
    const txtRecaudado = document.getElementById('recaudado-val');
    const txtPendiente = document.getElementById('pendiente-val');
    
    let totalRecaudado = 0;
    let totalPendiente = 0;
    
    lista.innerHTML = ""; // Limpiamos sin borrar el contenedor original

    estudiantes.forEach(est => {
        const esPagado = est.estado === 'pagado';
        if(esPagado) totalRecaudado += est.monto; else totalPendiente += est.monto;

        lista.innerHTML += `
            <div class="payment-item">
                <div>
                    <strong>${est.nombre}</strong><br>
                    <small>Estado: <span style="color: ${esPagado ? 'green' : 'red'}">${est.estado.toUpperCase()}</span></small>
                </div>
                <div style="text-align: right">
                    <div class="amount">$${est.monto.toLocaleString()}</div>
                    <button onclick="cambiarEstado(${est.id})" style="cursor:pointer; font-size: 0.7rem; padding: 2px 5px;">
                        ${esPagado ? 'Revertir' : 'Marcar Pago'}
                    </button>
                </div>
            </div>
        `;
    });

    // Actualizar las cards de arriba
    if(txtRecaudado) txtRecaudado.innerText = `$${(totalRecaudado / 1000000).toFixed(1)}M`;
    if(txtPendiente) txtPendiente.innerText = `$${(totalPendiente / 1000).toFixed(0)}k`;

    // Persistencia para que alerts.html sepa a quién cobrar
    localStorage.setItem('adminbot_pagos', JSON.stringify(estudiantes));
}

window.cambiarEstado = (id) => {
    const index = estudiantes.findIndex(e => e.id === id);
    estudiantes[index].estado = estudiantes[index].estado === 'pagado' ? 'pendiente' : 'pagado';
    renderizarPagos();
};

document.addEventListener('DOMContentLoaded', renderizarPagos);