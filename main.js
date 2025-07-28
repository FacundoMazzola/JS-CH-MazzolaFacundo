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


// --- 3. BUCLE PRINCIPAL DEL SIMULADOR (Bucle While) ---
// Permite al usuario realizar varias simulaciones hasta que decida salir.
let continuarSimulando = true; // Variable de control para el bucle
console.log("Iniciando el simulador de préstamos..."); // Mensaje de inicio para depuración

while (continuarSimulando) {
    // Solicitud de datos al usuario y conversión a números.
    const monto = parseFloat(prompt("Ingrese el monto del préstamo:"));
    const tasaAnual = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
    const plazoMeses = parseInt(prompt("Ingrese el plazo en meses:"));

    // Llamada a la función de calculo del prestamo
    const resultado = calcularCuotaPrestamo(monto, tasaAnual, plazoMeses);

    if (resultado) {
        // Si el resultado es exitoso, agrega el objeto resultado al historial de simulaciones
        historialSimulaciones.push(resultado);

        // Muestra los resultados al usuario
        alert(`--- Resultado de la simulación ---
Monto: $${resultado.monto.toFixed(2)}
Tasa Anual: ${resultado.tasaAnual}%
Plazo: ${resultado.plazoMeses} meses

Cuota Mensual: $${resultado.cuotaMensual.toFixed(2)}
Total a Pagar: $${resultado.totalAPagar.toFixed(2)}
Total Intereses: $${resultado.totalIntereses.toFixed(2)}`);

        console.log("Simulación realizada:", resultado); // para depuración

    } else {
        alert("Error: Ingrese valores numéricos positivos para todos los campos.");
    }

    // Pregunta al usuario si desea continuar simulando
    const respuesta = prompt("¿Desea realizar otra simulación? (escriba 'si' para continuar)").toLowerCase();
    if (respuesta !== 'si') {
        continuarSimulando = false; // finaliza el bucle si la respuesta no es 'si'
    }
} // <-- ¡AQUÍ CIERRA EL BUCLE WHILE CORRECTAMENTE!


// ===============================================



// --- 4. MOSTRAR HISTORIAL DE SIMULACIONES (Bucle `for`) ---
// Muestra un resumen de todas las simulaciones guardadas en el historial.
if (historialSimulaciones.length > 0) {
    let resumenHistorial = "--- Historial de Simulaciones ---\n\n";

    // Recorre el array 'historialSimulaciones' para mostrar cada registro.
    for (let i = 0; i < historialSimulaciones.length; i++) {
        const sim = historialSimulaciones[i]; // Obtiene el objeto de la simulación actual.

        resumenHistorial += `Simulación #${i + 1}:\n`;
        resumenHistorial += `  Monto: $${sim.monto.toFixed(2)}, Tasa: ${sim.tasaAnual}%, Plazo: ${sim.plazoMeses} meses\n`;
        resumenHistorial += `  Cuota: $${sim.cuotaMensual.toFixed(2)}, Total Pagado: $${sim.totalAPagar.toFixed(2)}\n\n`;
    }

    alert(resumenHistorial);
    console.log("Historial completo:", historialSimulaciones); // Para depuración.

} else {
    alert("No se realizaron simulaciones en esta sesión.");
}

// ===============================================
// FIN DEL CÓDIGO
// ===============================================
