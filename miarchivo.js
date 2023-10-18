const registroComprasGuardado = localStorage.getItem('registroCompras');
let registroCompra = JSON.parse(registroComprasGuardado) || [];

function mostrarMensajeEnDiv(mensaje) {
    const mensajeDiv = document.getElementById('mensajeDiv');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.display = 'block';
}
const consultarNivelCuidadoButton = document.getElementById('consultarNivelCuidadoButton');
const recomendacionP = document.getElementById('recomendacion');

consultarNivelCuidadoButton.addEventListener('click', function() {
    const nivelCuidadoSelect = document.getElementById('nivelCuidadoSelect');
    const nivelCuidado = nivelCuidadoSelect.value;

    const recomendacion = obtenerRecomendacion(nivelCuidado);
    recomendacionP.textContent = recomendacion;
});
function obtenerRecomendacion(nivelCuidado) {
    const recomendacion = nivelesCuidadoCliente.find(nivel => nivel.nivel.toLowerCase() === nivelCuidado.toLowerCase());
    return recomendacion ? recomendacion.recomendacion : 'Nivel de cuidado no válido. Por favor, elija entre Bajo, Medio o Alto.';
}


function obtenerPlantaSeleccionada() {
    const plantaSelect = document.getElementById('plantaSelect');
    const plantaValue = plantaSelect.value;

    if (["1", "2", "3"].includes(plantaValue)) {
        return parseInt(plantaValue);
    } else {
        mostrarMensajeEnDiv('Dato inválido. Por favor, seleccione una planta válida.');
        return obtenerPlantaSeleccionada();
    }
}

function obtenerCantidad() {
    const cantidadInput = document.getElementById('cantidadInput');
    const cantidad = parseInt(cantidadInput.value);

    if (!isNaN(cantidad) && cantidad > 0) {
        return cantidad;
    } else {
        mostrarMensajeEnDiv('Dato inválido. Por favor, ingrese una cantidad válida.');
        return obtenerCantidad();
    }
}

const nivelesCuidadoCliente = [
    {
        nivel: 'bajo',
        recomendacion: 'Recomendamos la planta Drosera para un nivel de cuidado bajo. Es importante mantenerla en luz solar directa y el sustrato húmedo pero no encharcado. \nLa Drosera tiene hojas cubiertas de pelos pegajosos que atraen a los insectos. Cuando un insecto se posa en las hojas, queda atrapado en el líquido pegajoso y es digerido por la planta para obtener nutrientes.'
    },
    {
        nivel: 'medio',
        recomendacion: 'Recomendamos la planta Venus para un nivel de cuidado medio. Debe colocarse en luz solar directa y mantener el sustrato húmedo.\nLa Venus es conocida por sus hojas en forma de trampa que atraen y capturan insectos. Estas trampas se cierran cuando un insecto entra en ellas. La planta obtiene nutrientes de los insectos atrapados.'
    },
    {
        nivel: 'alto',
        recomendacion: 'Recomendamos la planta Nepenthes para un nivel de cuidado alto. Debe ubicarse en luz indirecta brillante y mantener el sustrato húmedo.\nLa Nepenthes es una planta con jarros o ascidios en forma de copa que contienen un líquido digestivo. Atrae a los insectos a caer en los jarros y los digiere para obtener nutrientes.'
    }
];

const mensajesConocimiento = [];
const carrito = [];

const plantas = [
    { nombre: '1', precio: 100.50 },
    { nombre: '2', precio: 150.75 },
    { nombre: '3', precio: 120.25 },
];

const realizarCompraButton = document.getElementById('realizarCompraButton');
realizarCompraButton.addEventListener('click', comprarPlantas);

function comprarPlantas() {
    const nivelCuidadoSelect = document.getElementById('nivelCuidadoSelect');
    const nivelCuidado = nivelCuidadoSelect.value;
    const plantaSelect = document.getElementById('plantaSelect');
    const plantaValue = plantaSelect.value;
    const cantidadInput = document.getElementById('cantidadInput');
    const cantidad = parseInt(cantidadInput.value);

    if (isNaN(cantidad) || cantidad <= 0) {
        mostrarMensajeEnDiv('Dato inválido. Por favor, ingrese una cantidad válida.');
        return;
    }

    const plantaSeleccionada = plantas.find(planta => planta.nombre === plantaValue);
    const total = plantaSeleccionada.precio * cantidad;
    console.log(`El cliente ha seleccionado ${cantidad} ${plantaSeleccionada.nombre}. Precio unitario: $${plantaSeleccionada.precio}. Total a pagar: $${total.toFixed(2)}`);

    if (total > 1000) {
        const descuento = total * 0.1;
        total -= descuento;
        console.log('Se aplicó un descuento del 10% a la compra del cliente.');
    }
}


    function realizarCompra(plantaIndex) {
        const plantaSeleccionada = plantas[plantaIndex];
        const cantidad = parseInt(prompt(`Ingrese la cantidad de ${plantaSeleccionada.nombre} que desea comprar:`));

        if (!isNaN(cantidad) && cantidad > 0) {
            const total = plantaSeleccionada.precio * cantidad;
            mostrarMensaje(`Ha seleccionado ${cantidad} ${plantaSeleccionada.nombre}. Precio unitario: $${plantaSeleccionada.precio}. Total a pagar: $${total.toFixed(2)}`);
            console.log(`El cliente ha seleccionado ${cantidad} ${plantaSeleccionada.nombre}. Precio unitario: $${plantaSeleccionada.precio}. Total a pagar: $${total.toFixed(2)}`);

            if (total > 1000) {
                const descuento = total * 0.1;
                total -= descuento;
                mostrarMensaje(`Se aplicó un descuento del 10% a su compra.`);
                console.log(`Se aplicó un descuento del 10% a la compra del cliente.`);
            }

            document.getElementById('compraResultado').textContent = `Total a pagar: $${total.toFixed(2)}`;
            console.log(`Total a pagar después de la compra: $${total.toFixed(2)}`);
        } else {
            mostrarMensaje('Dato inválido. Por favor, ingrese una cantidad válida.');
            console.log('El cliente ingresó una cantidad inválida o negativa.');
        }
    }

    let registroCompra1 = [];

    function comprarPlantas() {
        const nivelCuidadoSelect = document.getElementById('nivelCuidadoSelect');
        const nivelCuidado = nivelCuidadoSelect.value;
        const plantaSelect = document.getElementById('plantaSelect');
        const plantaValue = plantaSelect.value;
        const cantidadInput = document.getElementById('cantidadInput');
        const cantidad = parseInt(cantidadInput.value);

        if (isNaN(cantidad) || cantidad <= 0) {
            mostrarMensajeEnDiv('Dato inválido. Por favor, ingrese una cantidad válida.');
            return;
        }
        const plantaSeleccionada = plantas.find(planta => planta.nombre === plantaValue);
        const total = plantaSeleccionada.precio * cantidad;

        const compraActual = {
            planta: plantaSeleccionada.nombre,
            cantidad: cantidad,
            precioUnitario: plantaSeleccionada.precio,
            total: total.toFixed(2),
        };

        registroCompra.push(compraActual);
        localStorage.setItem('registroCompras', JSON.stringify(registroCompra));

        const compraResultado = document.getElementById('compraResultado');
        compraResultado.textContent = `Ha seleccionado ${cantidad} plantas.`;

        mostrarMensajeEnDiv(`Total a pagar: $${total.toFixed(2)}`);

        actualizarRegistroCompra();
    }

function actualizarRegistroCompra() {
    const registroCompraDiv = document.getElementById('registroCompra');
    registroCompraDiv.innerHTML = '';

    registroCompra.forEach((compra, index) => {
        const plantaSeleccionada = plantas.find(planta => planta.nombre === compra.planta);

        if (plantaSeleccionada) {
            const compraElemento = document.createElement('div');
            compraElemento.innerHTML = `Compra: ${plantaSeleccionada.nombre} - Total: $${compra.total}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarCompra(index));

            compraElemento.appendChild(botonEliminar);

            registroCompraDiv.appendChild(compraElemento);
        } else {
            console.error(`No se encontró la planta correspondiente para la compra en el índice ${index}`);
        }
    });
}


    function eliminarCompra(index) {
        const totalEliminado = parseFloat(registroCompra[index].total);
        registroCompra.splice(index, 1);

        console.log('Se eliminó una planta del carrito.');
        actualizarRegistroCompra();

        // Actualiza el Local Storage con la versión actualizada del carrito
        localStorage.setItem('registroCompras', JSON.stringify(registroCompra));

        const compraResultado = document.getElementById('compraResultado');
    }

    const confirmarCompraButton = document.getElementById('confirmarCompraButton');
    const mensajeAgradecimiento = document.getElementById('mensajeAgradecimiento');

    confirmarCompraButton.addEventListener('click', function () {
        const totalGastado = registroCompra.reduce((total, compra) => total + parseFloat(compra.total), 0);

        if (totalGastado > 0) {
            mensajeAgradecimiento.style.display = 'block';
            let mensaje = '¡Gracias por su compra!<br><br>';

            if (totalGastado > 1000) {
                const descuento = totalGastado * 0.10;
                mensaje += `Usted tiene un descuento del 10% ($${descuento.toFixed(2)}) por comprar más de $1000.<br><br>`;
                console.log(`El cliente recibió un descuento del 10%: $${descuento.toFixed(2)}`);
            }
            mensaje += `<span style="color: #007BFF;">El precio total a pagar es: $${totalGastado.toFixed(2)}.</span>`;
            mensajeAgradecimiento.innerHTML = mensaje;
            registroCompra.length = 0;
            actualizarRegistroCompra();
            console.log(`El cliente realizó una compra con un precio total de: $${totalGastado.toFixed(2)}`);
        }
    });

