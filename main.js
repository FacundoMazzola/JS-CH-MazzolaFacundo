// PROYECTO CODERHOUSE: SIMULADOR DE PRESTAMOS
// Autor: MAZZOLA FACUNDO

// --- 1. ALMACENAMIENTO DE DATOS ---
// Array para guardar los objetos de cada simulación de préstamo.
const historialSimulaciones = [];

// ================================================

// --- 2. FUNCION CONSTRUCTORA ---

function Simulacion(monto, tasaAnual, plazoMeses, cuotaMensual, totalAPagar, totalIntereses) {
    this.monto = monto; // Monto del préstamo
    this.tasaAnual = tasaAnual; // Tasa de interés anual en porcentaje
    this.plazoMeses = plazoMeses; // Plazo del préstamo en meses
    this.cuotaMensual = cuotaMensual; // Cuota mensual a pagar
    this.totalAPagar = totalAPagar; // Total a pagar al final del préstamo
    this.totalIntereses = totalIntereses; // Total de intereses pagados
}

// --- 3. FUNCIÓN DE CÁLCULO DEL PRÉSTAMO ---
/**
 * Calcula y retorna los detalles de un préstamo.
 * Retorna null si los datos de entrada no son válidos.
 *
*@param {number} monto - Monto del préstamo
*@param {number} tasaAnual - Tasa de interés anual en porcentaje
*@param {number} plazoMeses - Plazo del préstamo en meses
*@return {Simulacion|null} - Objeto Simulacion con los detalles del préstamo o null si los datos son inválidos
*/

function calcularCuotaPrestamo(monto, tasaAnual, plazoMeses) {

    if (isNaN(monto) || monto <= 0 ||
        isNaN(tasaAnual) || tasaAnual <= 0 ||
        isNaN(plazoMeses) || plazoMeses <= 0) {
        return null;}
        const tasaMensual = (tasaAnual / 100) / 12;
        const cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoMeses));
        const totalAPagar = cuotaMensual * plazoMeses;
        const totalIntereses = totalAPagar - monto;
    return new Simulacion(monto, tasaAnual, plazoMeses, cuotaMensual, totalAPagar, totalIntereses);
}
// ================================================

// --- 4. DOM Y EVENTOS ---

// Obtener elementos del DOM
const form = document.getElementById("prestamo-form");
const resultadoContainer = document.getElementById("resultado-container");
const historialContainer = document.getElementById("historial-container");
const limpiarHistorialBtn = document.getElementById("limpiar-historial");

// funcion para mostrar el resultado de la ultima simulacion
function mostrarResultado(simulacion){
    resultadoContainer.innerHTML = `
    <h3>Última Simulación</h3>
        <p><strong>Monto:</strong> $${simulacion.monto.toFixed(2)}</p>
        <p><strong>Tasa Anual:</strong> ${simulacion.tasaAnual}%</p>
        <p><strong>Plazo:</strong> ${simulacion.plazoMeses} meses</p>
        <hr>
        <p><strong>Cuota Mensual:</strong> $${simulacion.cuotaMensual.toFixed(2)}</p>
        <p><strong>Total a Pagar:</strong> $${simulacion.totalAPagar.toFixed(2)}</p>
        <p><strong>Total Intereses:</strong> $${simulacion.totalIntereses.toFixed(2)}</p>
    `;
}


// ===============================================



// --- 4. MOSTRAR HISTORIAL DE SIMULACIONES, FUNCION DE ORDEN SUPERIOR ---
// Muestra un resumen de todas las simulaciones guardadas en el historial.


function mostrarHistorial() {
    historialContainer.innerHTML = '';
    if (historialSimulaciones.length > 0) {
        // Usamos forEach (función de orden superior) para iterar sobre el array
        historialSimulaciones.forEach((sim, index) => {
            const item = document.createElement('div');
            item.classList.add('simulacion-item');
            item.innerHTML = `
                <h4>Simulación #${index + 1}</h4>
                <p>Monto: $${sim.monto.toFixed(2)}</p>
                <p>Plazo: ${sim.plazoMeses} meses</p>
                <p>Cuota: $${sim.cuotaMensual.toFixed(2)}</p>
            `;
            historialContainer.appendChild(item);
        });
    } else {
        historialContainer.innerHTML = '<p>No se han realizado simulaciones aún.</p>';
    }
}

// Evento Listener para formulario
form.addEventListener('submit', (e) => {
    // Prevenir el comportamiento por defecto de recargar la página
    e.preventDefault();

    // Obtener los valores del DOM
    const monto = parseFloat(document.getElementById('monto').value);
    const tasaAnual = parseFloat(document.getElementById('tasa').value);
    const plazoMeses = parseInt(document.getElementById('plazo').value);

    // Llamar a la función de cálculo
    const resultado = calcularCuotaPrestamo(monto, tasaAnual, plazoMeses);

    if (resultado) {
        // Guardar el resultado en el array
        historialSimulaciones.push(resultado);

        // Actualizar la interfaz de usuario
        mostrarResultado(resultado);
        mostrarHistorial();

        // Limpiar el formulario
        form.reset();
    } else {
        // Mostrar un mensaje de error en la interfaz
        resultadoContainer.innerHTML = '<p class="error">Por favor, ingrese valores numéricos positivos para todos los campos.</p>';
    }
});


// Evento Listener para limpiar el historial
limpiarHistorialBtn.addEventListener('click', () => {
    historialSimulaciones.length = 0; // Vaciar el array
    mostrarHistorial(); // Actualizar la interfaz
    resultadoContainer.innerHTML = ''; // Limpiar el resultado
});

// llamada inicial para mostrar el historial vacío al cargar la página
mostrarHistorial();
// ===============================================
// FIN DEL CÓDIGO
// ===============================================
