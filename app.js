
const movimientos = [];


function Movimiento(tipo, monto, descripcion) {
  


    if(!descripcion || descripcion.trim() === ""){
        alert("Ingrese un nombre para el movimiento , no puede estar vacio");
        return //para q termine aca la condicion
    }

    if(tipo !== "ingreso" && tipo !== "egreso"){
        alert("Debe ingresar : Ingreso o Egreso");
        return // terminamos condicion
    }

    if(isNaN(monto) || monto <=0){
        alert("Ingresar un monto mayor a cero")
        return;
    }



    this.tipo = tipo;
    this.monto = monto;
    this.descripcion = descripcion;
}

function registrarMovimiento() {
    const descripcion = prompt("Ingrese la descripción del movimiento:");
    const tipo = prompt("Ingrese el tipo de movimiento (Ingreso o Egreso):");
    const monto = Number(prompt("Ingrese el monto:"));


    const movimiento = new Movimiento(tipo, monto, descripcion);

    if (movimiento) {
        movimientos.push(movimiento);
        console.log("Movimiento registrado correctamente:", movimiento);
    } else {
        console.error("No se pudo registrar, ingrese nuevamente");
    }
}

Movimiento.prototype.recalcularTotales = function () {
    let ingresos = 0;
    let egresos = 0;

    for (let i = 0; i < movimientos.length; i++) {
        const movimiento = movimientos[i];
        if (movimiento.tipo === "ingreso") {
            ingresos += movimiento.monto;
        } else if (movimiento.tipo === "egreso") {
            egresos += movimiento.monto;
        }
    }

    const saldo = ingresos - egresos;

    // Actualizar la interfaz de usuario
    console.log("Resumen actualizado:");
    console.log(`Total Ingresos: S/ ${ingresos}`);
    console.log(`Total Egresos: S/ ${egresos}`);
    console.log(`Saldo Total: S/ ${saldo}`);
};


function calcularTotalSaldo() {
    let saldo = 0;
    let ingresos = 0;
    let egresos = 0;

    for (let i = 0; i < movimientos.length; i++) {
        const movimiento = movimientos[i];
        if (movimiento.tipo === "ingreso") {
            ingresos += movimiento.monto;
            saldo += movimiento.monto;
        } else if (movimiento.tipo === "egreso") {
            egresos += movimiento.monto;
            saldo -= movimiento.monto;
        }
    }

    return { saldo, ingresos, egresos };
}

function registrarMovimiento() {
    const descripcion = prompt("Ingrese la descripción del movimiento:");
    const tipo = prompt("Ingrese el tipo de movimiento (ingreso o egreso):").toLowerCase();
    const monto = Number(prompt("Ingrese el monto:"));

    const movimiento = new Movimiento(tipo, monto, descripcion);

    if (movimiento && movimiento.tipo && movimiento.monto && movimiento.descripcion) {
        movimientos.push(movimiento);
        console.log("✅ Movimiento registrado correctamente:", movimiento);

        // Invocar el método recalcularTotales
        movimiento.recalcularTotales();
    } else {
        console.error("❌ No se pudo registrar el movimiento. Por favor, ingrese los datos nuevamente.");
    }
}


function mostrarResumen() {

    const resultado = calcularTotalSaldo();
    const saldo = resultado.saldo;
    const ingresos = resultado.ingresos;
    const egresos = resultado.egresos;

    console.log("Resumen:");
    console.log(`Cantidad de movimientos: ${movimientos.length}`);
    console.log(`Total Ingresos: S/ ${ingresos}`);
    console.log(`Total Egresos: S/ ${egresos}`);
    console.log(`Saldo Total: S/ ${saldo}`);
}


function menu() {
    let opcion = 0;

    while (opcion !== 3) {
        opcion = Number(prompt(`Bienvenidos a Personal Budget V1.0
Seleccione una opción:
1. Registrar Movimiento
2. Ver Resumen
3. Salir`));

        if (opcion === 1) {
            registrarMovimiento();
        } else if (opcion === 2) {
            mostrarResumen();
        } else if (opcion === 3) {
            console.log("Gracias por usar Personal Budget V1.1");
        } else {
            console.log("Opción inválida. Por favor, ingrese 1, 2 o 3.");
        }
    }
}


menu();
