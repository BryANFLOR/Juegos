class Calculadora {
    constructor() {
        this.pantalla = document.querySelector(".calculadora-pantalla");
        this.botones = document.querySelectorAll(".calculadora-btn");
        this.botones.forEach(boton => {
            boton.addEventListener("click", () => {
                const botonApretado = boton.textContent;
                if (boton.id === "calculadora-raiz") {
                    const j = parseInt(this.pantalla.textContent);
                    const k = Math.sqrt(j);
                    this.pantalla.textContent = k;
                    return this.pantalla.textContent.slice(0, -1);
                }
                if (boton.id === "calculadora-factorial") {
                    const t = parseInt(this.pantalla.textContent);
                    let r = 1;
                    for (let i = t; i > 0; i--) {
                        r *= i;
                    }
                    this.pantalla.textContent = r;
                    return this.pantalla.textContent.slice(0, -1);
                }
                if (boton.id === "calculadora-division-entera") {
                    const divisor = parseInt(this.pantalla.textContent);
                    const dividendo = parseInt(prompt("Ingrese el dividendo:"));
                    if (divisor === 0) {
                        this.pantalla.textContent = "Error: División por cero";
                    } else {
                        const resultado = dividendo / divisor;
                        if (resultado % 1 === 0) {
                            this.pantalla.textContent = "División entera: " + resultado;
                            return this.pantalla.textContent.slice(0, -7);
                        } else {
                            this.pantalla.textContent = "División no entera: " + resultado;
                            return this.pantalla.textContent.slice(0, -7);
                        }
                    }
                }
                if (boton.id === "calculadora-divisores") {
                    const l = parseInt(this.pantalla.textContent);
                    var divisores = []; // Variable para almacenar los divisores
                    for (let numeros = 2; numeros <= l / 2; numeros++) {
                        if (l % numeros === 0) {
                            divisores.push(numeros); // Agregar el divisor a la lista
                            console.log(numeros, "lo divide");
                        }
                    }
                    this.pantalla.textContent = divisores.join(", ");
                    return this.pantalla.textContent.slice(0, -3);
                }
                if (boton.id === "calculadora-c") {
                    this.pantalla.textContent = "0";
                    return;
                }
                if (boton.id === "calculadora-borrar") {
                    if (
                        this.pantalla.textContent.length === 1 ||
                        this.pantalla.textContent === "Error!"
                    ) {
                        this.pantalla.textContent = "0";
                    } else {
                        this.pantalla.textContent = this.pantalla.textContent.slice(0,-1);
                    }
                    return;
                }
                if (boton.id === "calculadora-igual") {
                    try {
                        this.pantalla.textContent = eval(this.pantalla.textContent);
                    } catch {
                        this.pantalla.textContent = "Error!";
                    }
                    return;
                }
                if (
                    this.pantalla.textContent === "0" ||
                    this.pantalla.textContent === "Error!"
                ) {
                    this.pantalla.textContent = botonApretado;
                } else {
                    this.pantalla.textContent += botonApretado;
                }
            });
        });
    }
}

// Crear una instancia de la clase Calculadora
const calculadora = new Calculadora();
