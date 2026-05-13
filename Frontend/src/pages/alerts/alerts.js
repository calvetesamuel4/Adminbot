// alerts.js

// =============================
// BACKEND
// =============================

const API_BACKEND =
  "http://localhost:3000/api/send";


// =============================
// CARGAR ALERTAS
// =============================

function cargarAlertasPendientes(){

    const contenedor =
        document.getElementById(
            "alerts-container"
        );

    contenedor.innerHTML = "";

    const datos = JSON.parse(
        localStorage.getItem(
            "adminbot_pagos"
        )
    ) || [];

    const pendientes = datos.filter(
        e => e.estado === "pendiente"
    );

    if(!pendientes.length){

        contenedor.innerHTML = `

            <div class="card alert-card">

                <div class="alert-icon">
                    ✅
                </div>

                <div class="alert-info">

                    <strong>
                        No hay pagos pendientes
                    </strong>

                </div>

            </div>
        `;

        return;
    }

    pendientes.forEach(est => {

        const telefono =
            "573008399445";

        const card =
            document.createElement("div");

        card.className =
            "card alert-card";

        card.innerHTML = `

            <div class="alert-icon">
                💰
            </div>

            <div class="alert-info">

                <strong>
                    Pago Pendiente:
                    ${est.nombre}
                </strong>

                <p>
                    Teléfono:
                    ${telefono}
                </p>

            </div>

            <button
                class="btn-wa"
                onclick="notificarIndividual('${est.nombre}')"
            >
                Enviar Recordatorio
            </button>
        `;

        contenedor.appendChild(card);
    });
}


// =============================
// ENVIAR AL BACKEND
// =============================

async function enviarMensajeBackend(
    phone,
    message
){

    try{

        const response = await fetch(
            API_BACKEND,
            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    phone,
                    message

                })
            }
        );

        return await response.json();

    }catch(error){

        console.error(
            "ERROR FRONTEND:",
            error
        );

        return {
            ok:false
        };
    }
}


// =============================
// MENSAJE INDIVIDUAL
// =============================

window.notificarIndividual =
async (nombre) => {

    const telefono =
        "573008399445";

    const mensaje =
`Hola ${nombre}, te recordamos que tienes un pago pendiente en AdminBot`;

    console.log(
        "ENVIANDO A:",
        telefono
    );

    console.log(
        "MENSAJE:",
        mensaje
    );

    const respuesta =
        await enviarMensajeBackend(
            telefono,
            mensaje
        );

    console.log(
        "RESPUESTA:",
        respuesta
    );

    if(respuesta.ok){

        alert(
            `Mensaje enviado a ${nombre}`
        );

    }else{

        alert(
            "Error enviando mensaje"
        );
    }
};


// =============================
// ENVÍO MASIVO
// =============================

const btnMasivo =
    document.getElementById(
        "btn-masivo"
    );

if(btnMasivo){

    btnMasivo.onclick =
    async () => {

        const datos = JSON.parse(
            localStorage.getItem(
                "adminbot_pagos"
            )
        ) || [];

        const pendientes =
            datos.filter(
                e =>
                e.estado === "pendiente"
            );

        if(!pendientes.length){

            alert(
                "No hay pagos pendientes"
            );

            return;
        }

        if(
            confirm(
                `¿Enviar ${pendientes.length} mensajes?`
            )
        ){

            for(const est of pendientes){

                const telefono =
                    "573008399445";

                const mensaje =
`Hola ${est.nombre}, te recordamos que tienes un pago pendiente en AdminBot`;

                console.log(
                    "ENVIANDO MASIVO A:",
                    telefono
                );

                console.log(
                    "MENSAJE:",
                    mensaje
                );

                const respuesta =
                    await enviarMensajeBackend(
                        telefono,
                        mensaje
                    );

                console.log(
                    "RESPUESTA:",
                    respuesta
                );
            }

            alert(
                "Envío masivo completado"
            );
        }
    };
}


// =============================
// INICIAR
// =============================

document.addEventListener(
    "DOMContentLoaded",
    cargarAlertasPendientes
);