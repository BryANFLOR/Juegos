class Juego {
    constructor() {
        this.armaHumano = null;
        this.armaPc = null;
        this.eleccionElement = document.querySelector("#gana-punto");
        this.mensaje = document.querySelector(".mensaje");
        this.puntosJugador = document.querySelector("#jugador");
        this.puntosPcElement = document.querySelector("#Pc");
        this.btnReiniciarEstadisticas = document.querySelector("#btn-reiniciar-estadisticas");
        this.estadisticas = {
            jugador: parseInt(localStorage.getItem("estadisticasJugador")) || 0,
            pc: parseInt(localStorage.getItem("estadisticasPc")) || 0,
        };
        this.puntos = 0;
        this.puntosPc = 0;
        this.armas = ["Piedra", "Papel", "Tijera"];

        this.Inicio = document.querySelector("#btn-inicio");
        this.Reiniciar = document.querySelector("#reiniciar");
        this.Salir = document.querySelector("#btn-salir");

        this.Inicio.addEventListener("click", () => {
            this.IniciarJuego();
        });

        this.Reiniciar.addEventListener("click", () => {
            this.ReiniciarJuego();
        });

        this.Salir.addEventListener("click", () => {
            this.MostrarEstadisticas();
        });

        this.btnReiniciarEstadisticas.addEventListener("click", () => {
            this.ReiniciarEstadisticas();
          });
    }

    IniciarJuego() {
        this.Inicio.classList.add("disable");
        this.eleccionElement.innerText = "";
        this.mensaje.classList.add("disable");

        const botonesArma = document.querySelectorAll(".arma");
        botonesArma.forEach(boton => {
            boton.addEventListener("click", (e) => {
                this.armaHumano = e.currentTarget.id;
                this.Jugar();
            });
        });
    }

    Jugar() {
        this.armaPc = this.ObtenerArmaAleatoria();

        if (
            (this.armaHumano === "Piedra" && this.armaPc === "Tijera") ||
            (this.armaHumano === "Tijera" && this.armaPc === "Papel") ||
            (this.armaHumano === "Papel" && this.armaPc === "Piedra")
        ) {
            this.GanarPartida();
        } else if (
            (this.armaPc === "Piedra" && this.armaHumano === "Tijera") ||
            (this.armaPc === "Tijera" && this.armaHumano === "Papel") ||
            (this.armaPc === "Papel" && this.armaHumano === "Piedra")
        ) {
            this.PerderPartida();
        } else {
            this.EmpatarPartida();
        }
    }

    ObtenerArmaAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * this.armas.length);
        return this.armas[indiceAleatorio];
    }

    GanarPartida() {
        this.puntos++;
        this.puntosJugador.innerText = this.puntos;
        this.eleccionElement.innerText = "¡Has ganado la ronda!";
        this.VerificarGanador();
    }

    PerderPartida() {
        this.puntosPc++;
        this.puntosPcElement.innerText = this.puntosPc;
        this.eleccionElement.innerText = "Has perdido la ronda";
        this.VerificarGanador();
    }

    EmpatarPartida() {
        this.eleccionElement.innerText = "Empate en la ronda";
        this.VerificarGanador();
    }

    VerificarGanador() {
        if (this.puntos === 4) {
            this.eleccionElement.innerText = "¡Felicidades! ¡Eres el ganador!";
            this.FinalizarJuego(true);
            localStorage.setItem("estadisticasJugador", this.estadisticas.jugador);
        } else if (this.puntosPc === 4) {
            this.eleccionElement.innerText = "Has perdido. La PC es el ganador.";
            this.FinalizarJuego(false);
            localStorage.setItem("estadisticasPc", this.estadisticas.pc);
        } else {
            this.MostrarMensaje();
        }
    }

    MostrarMensaje() {
        this.mensaje.classList.remove("disable");
        this.Reiniciar.classList.remove("disable");
        this.Salir.classList.remove("disable");
    }

    ReiniciarJuego() {
        this.puntos = 0;
        this.puntosPc = 0;
        this.puntosJugador.innerText = this.puntos;
        this.puntosPcElement.innerText = this.puntosPc;
        this.Inicio.classList.remove("disable");
        this.Reiniciar.classList.add("disable");
        this.Salir.classList.add("disable");
        this.mensaje.classList.add("disable");
    }

    FinalizarJuego(ganador) {
        if (ganador) {
            this.estadisticas.jugador++;
        } else {
            this.estadisticas.pc++;
        }
        this.ReiniciarJuego();
    }

    MostrarEstadisticas() {
        alert(`Estadísticas:\n\nJugador: ${this.estadisticas.jugador} victorias\nPC: ${this.estadisticas.pc} victorias`);
    }

    ReiniciarEstadisticas() {
        this.estadisticas.jugador = 0;
        this.estadisticas.pc = 0;
        // this.ActualizarEstadisticas();
        localStorage.removeItem("estadisticasJugador");
        localStorage.removeItem("estadisticasPc");
    }

    // ActualizarEstadisticas() {
    //     const estadisticasJugadorElement = document.querySelector("#estadisticas-jugador");
    //     const estadisticasPcElement = document.querySelector("#estadisticas-pc");
    //     estadisticasJugadorElement.innerText = this.estadisticas.jugador;
    //     estadisticasPcElement.innerText = this.estadisticas.pc;
    // }
}

const juego = new Juego();
localStorage.setItem("estadisticasPc", juego.estadisticas.pc);
