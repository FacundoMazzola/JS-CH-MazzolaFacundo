// PROYECTO CODERHOUSE: SIMULADOR DE PRESTAMOS
// Autor: MAZZOLA FACUNDO

// --- 1. ALMACENAMIENTO DE DATOS ---
// Array para guardar los objetos de cada simulación de préstamo.
const historialSimulaciones = [];

// ================================================

// --- 2. FUNCIÓN DE CÁLCULO DEL PRÉSTAMO ---
/**
 * Calcula y retorna los detalles de un préstamo.
 * Retorna null si los datos de entrada no son válidos.
 */
function calcularCuotaPrestamo(monto, tasaAnual, plazoMeses) {
    // Validaciones básicas de los parámetros.
    if (isNaN(monto) || monto <= 0 ||
        isNaN(tasaAnual) || tasaAnual <= 0 ||
        isNaN(plazoMeses) || plazoMeses <= 0) {
        console.error("Error: Todos los datos deben ser números positivos.");
        return null; // Retorna null si hay un error en la validación
    }

    // --- CÁLCULOS DENTRO DE LA FUNCIÓN ---
    // Conversion de tasa anual a mensual decimal
    const tasaMensual = (tasaAnual / 100) / 12;

    // Calculo de la cuota mensual usando la formula del sistema francés
    const cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoMeses));

    // Calculo del total a pagar e intereses
    const totalAPagar = cuotaMensual * plazoMeses;
    const totalIntereses = totalAPagar - monto;

    // Se retorna un objeto literal con todos los resultados de la simulacion
    return {
        monto: monto,
        tasaAnual: tasaAnual,
        plazoMeses: plazoMeses,
        cuotaMensual: cuotaMensual,
        totalAPagar: totalAPagar,
        totalIntereses: totalIntereses
    };
} // <-- ¡AQUÍ CIERRA LA FUNCIÓN CORRECTAMENTE!

// ===============================================


// --- 4. FUNCIÓN PRINCIPAL DEL SIMULADOR ---
// Contiene el bucle principal que interactúa con el usuario.
function iniciarSimulador() {
    let continuarSimulando = true;
    console.log("Iniciando el simulador de préstamos...");

    while (continuarSimulando) {
        const monto = parseFloat(prompt("Ingrese el monto del préstamo:"));
        const tasaAnual = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
        const plazoMeses = parseInt(prompt("Ingrese el plazo en meses:"));

        const resultado = calcularCuotaPrestamo(monto, tasaAnual, plazoMeses);

        if (resultado) {
            historialSimulaciones.push(resultado);

            alert(`--- Resultado de la simulación ---\nMonto: $${resultado.monto.toFixed(2)}\nTasa Anual: ${resultado.tasaAnual}%\nPlazo: ${resultado.plazoMeses} meses\n\nCuota Mensual: $${resultado.cuotaMensual.toFixed(2)}\nTotal a Pagar: $${resultado.totalAPagar.toFixed(2)}\nTotal Intereses: $${resultado.totalIntereses.toFixed(2)}`);

            console.log("Simulación realizada:", resultado);
        } else {
            alert("Error: Ingrese valores numéricos positivos para todos los campos.");
        }

        const respuesta = prompt("¿Desea realizar otra simulación? (escriba 'si' para continuar)").toLowerCase();
        if (respuesta !== 'si') {
            continuarSimulando = false;
        }
    }

    // Al finalizar el bucle, llamamos a la función que muestra el historial
    mostrarHistorial();
} // <-- ¡AQUÍ CIERRA EL BUCLE WHILE CORRECTAMENTE!


// ===============================================



// --- 4. MOSTRAR HISTORIAL DE SIMULACIONES (Bucle `for`) ---
// Muestra un resumen de todas las simulaciones guardadas en el historial.


function mostrarHistorial() {
    if (historialSimulaciones.length > 0) {
        let resumenHistorial = "--- Historial de Simulaciones ---\n\n";

        for (let i = 0; i < historialSimulaciones.length; i++) {
            const sim = historialSimulaciones[i];
            resumenHistorial += `Simulación #${i + 1}:\n`;
            resumenHistorial += `  Monto: $${sim.monto.toFixed(2)}, Tasa: ${sim.tasaAnual}%, Plazo: ${sim.plazoMeses} meses\n`;
            resumenHistorial += `  Cuota: $${sim.cuotaMensual.toFixed(2)}, Total Pagado: $${sim.totalAPagar.toFixed(2)}\n\n`;
        }

        alert(resumenHistorial);
        console.log("Historial completo:", historialSimulaciones);
    } else {
        alert("No se realizaron simulaciones en esta sesión.");
    }
}

iniciarSimulador(); // Inicia el simulador
// ===============================================
// FIN DEL CÓDIGO
// ===============================================
