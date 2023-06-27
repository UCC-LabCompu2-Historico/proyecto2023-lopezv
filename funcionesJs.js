let n = 0;
const palabras = ["Amigo", "Aviso", "Ancho", "Arena", "Asado", "arbol",
    "Banco", "Banda", "BARCO", "Bolsa", "Burro", "barro", "bajar",
    "Carpa", "Campo", "Cenar", "Costo", "Crudo", "carta", "carro", "cerro", "cobre", "cabra", "cuero", "curva",
    "Denso", "Datos", "Dados", "Doble", "Dulce", "dardo",
    "Enero", "Error", "Erizo", "Estar", "Echar",
    "Feria", "Fallo", "Filas", "Fuego", "Ficha",
    "Gatos", "Grano", "Globo", "Gordo", "Grave",
    "Hielo", "Horno", "Hongo", "Humor", "Hacha", "hacer", "hueso", "huevo", "habla",
    "Indio", "Islas", "Igual", "Impar", "Idolo",
    "Joven", "Julio", "Japon", "Jugar", "Jarra", "jabon",
    "Koala", "Karma",
    "Libro", "Lugar", "Lente", "Largo", "Llave", "libre", "luces",
    "Metro", "Manos", "Miedo", "Marco", "Melon", "multa",
    "Nubes", "Nueva", "Norte", "Nieve", "Nacer",
    "Oveja", "Opera", "Oruga", "Oliva", "Ondas",
    "Pecho", "perro", "Poder", "Paris", "Pinza", "pollo", "primo",
    "Queso", "Quema", "Queda", "Quiso",
    "Rubio", "Rango", "Radio", "Ronda", "Reloj", "robar",
    "Secar", "Sobre", "Salsa", "Sello", "Sabio", "suelo",
    "Trono", "Torre", "Tabla", "Tenis", "Terco",
    "Union", "Unico", "Untar",
    "Vuelo", "Voces", "Valor", "Verde", "Velas", "viejo",
    "Yendo", "Yates",
    "Zorro", "Zafar", "Zumba", "Zonas", "Zurdo", "zebra"
]

/**
 * Elige aleatoriamente la palabra que el jugador va a tener que adivinar y la guarda en localStorage
 * @method palabraAAdivinar
 */

let palabraAAdivinar = () => {
    let indiceAleatorio = Math.floor(Math.random() * palabras.length);
    let palabraAleatoria = palabras[indiceAleatorio];
    localStorage.setItem("PA", palabraAleatoria.toUpperCase());
}

/**
 * Verifica que el intento sea una palabra valida comparandola con todas las palabras del arreglo palabras
 * @method cargarPalabra
 * @param {string} intento - palabra ingresada por el usuario
 */
let cargarPalabra = (intento) => {
    let coincide = false;
    let palabra = intento.toUpperCase();
    const letrasIntento = document.getElementsByName("letra");
    const colorCuadrado = document.getElementById("cargar");
    const contenidoCuadrado = document.getElementById("cargar");

    for (let i = 0; i < palabras.length; i++) {
        if (palabra === palabras[i].toUpperCase()) {
            coincide = true;

        }
    }
    if (coincide) {
        for (let i = 0; i < palabra.length; i++) {
            letrasIntento[n + i].value = palabra[i];
            compararPalabra(palabra);
        }
        contenidoCuadrado.value = "";
        colorCuadrado.style.backgroundColor = "white";
        n += 5;
    } else if (!coincide && palabra.length === 5) {
        colorCuadrado.style.backgroundColor = "red";
    } else {
        colorCuadrado.style.backgroundColor = "white";
    }
}
/**
 * Compara la palabra valida ingresada por el usuario con la palabra a adivinar
 * @method compararPalabra
 * @param {string} intento - Palabra ingresada por el usuario
 */

let compararPalabra = (intento) => {
    let iguales = 0;
    const almacenado = localStorage.getItem("PA");
    localStorage.setItem("LI", intento);
    console.log(almacenado);
    for (let i = 0; i < intento.length; i++) {
        for (let j = 0; j < almacenado.length; j++) {
            if (intento[i].toUpperCase() === almacenado[j].toUpperCase()) {
                if (i === j) {
                    document.getElementsByName("letra")[n + i].style.backgroundColor = "#11D147";
                    document.getElementsByClassName("celda")[n + i].style.backgroundColor = "#11D147";
                    iguales++;
                    break;
                } else {
                    document.getElementsByName("letra")[n + i].style.backgroundColor = "#FEEA00";
                    document.getElementsByClassName("celda")[n + i].style.backgroundColor = "#FEEA00";
                }
            }
        }
    }
    carteles(iguales, almacenado);
}
/**
 * Dependiendo si el jugador encuentra o no la palabra oculta, muestra el cartel correspondiente
 * @method carteles
 * @param {string} almacenado - Palabra a adivinar
 * @param {number} iguales - Cantidad de caracteres que coinciden en letra como en posicion
 */

let carteles = (iguales, almacenado) => {
    const cartelPerdiste = document.getElementById("perdiste");
    const cartelGanaste = document.getElementById("ganaste");
    const inputCargar = document.getElementById("cargar");
    const labelCargar = document.getElementById("labelCargar");
    if (n === 25 && iguales < 5) {
        cartelPerdiste.style.display = 'block'
        document.getElementById("mostrarPalabra").innerHTML = "PALABRA OCULTA: " + almacenado.toUpperCase();
        inputCargar.style.display = 'none';
        labelCargar.style.display = 'none';
    } else if (iguales === 5) {
        cartelGanaste.style.display = 'block'
        inputCargar.style.display = 'none';
        labelCargar.style.display = 'none';
    }
}

/**
 * Muestra el puntaje a medida de que se pasa de nivel
 * @method mostrarPuntaje
 */

let mostrarPuntaje = () => {
    let almacenado = Number(localStorage.getItem("nivel"));
    document.getElementById("puntajeArriba").innerHTML = "PUNTAJE " + (almacenado * 100);
    document.getElementById("puntajeFinal").innerHTML = "PUNTAJE FINAL " + (almacenado * 100);
}
/**
 * Actualiza el puntaje a medida de que se pasa de nivel
 * @method guardarPuntaje
 */
let guardarPuntaje = () => {
    let almacenado = Number(localStorage.getItem("nivel"));
    localStorage.setItem("nivel", (almacenado + 1).toString());
    window.open("jugar.html", "_self");
}

/**
 * Reinicia el contador de puntaje a cero cuando se vuelve al inicio
 * @method limpiarPuntaje
 */
let limpiarPuntaje = () => {
    localStorage.clear();
}
/**
 * En caso de que el usuario apriete el boton inicio mientras juega, muestra el cartel de advertencia correspondiente
 * @method botonInicio
 */
let botonInicio = () => {
    if (n < 25) {
        document.getElementById("alInicio").style.display = 'block';
    } else {
        location.href = "index.html";
    }
}
/**
 * Al aparecer el cartel de advertencia, el usuario puede elegir seguir jugando y no ir al incio
 * @method seguirJugando
 */
let botonSeguirJugando = () => {
    document.getElementById("alInicio").style.display = 'none';
}
/**
 * canvas que imita el salvapantallas de los dvd
 * @method canvas
 */

let x = [0, 30, 60, 90, 120, 150];
let y = [50, 80, 90, 100, 110, 120];
let dX = [-1, 1, -1, -1, 1, -1];
let dY = [1, -1, 1, -1, -1, 1];


let canvas = () => {

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const altMaxima = canvas.height;
    const anchoMaximo = canvas.width;
    const almacenado = localStorage.getItem("PA");
    const vectorLetra = [];
    let letra = localStorage.getItem("LI");
    if (letra == null) {
        vectorLetra.push("W", "O", "R", "D", "L", "E");
    } else {
        for (let i = 0; i < letra.length; i++) {
            vectorLetra.push(letra[i]);
        }
    }

    canvas.width = canvas.width;
    ctx.font = "10pt Press_Start_2P";

    //ctx.fillStyle = "white";
    for (let i = 0; i < vectorLetra.length; i++) {
        if (letra == null) {
            if (vectorLetra[i] === 'O' || vectorLetra[i] === 'L') {
                ctx.fillStyle = "#11D147";
            } else if (vectorLetra[i] === 'E') {
                ctx.fillStyle = "#FEEA00"
            } else {
                ctx.fillStyle = "white";
            }
        } else {

            if (vectorLetra[i].toUpperCase() === almacenado[i]) {
                ctx.fillStyle = "#11D147";
            } else if (almacenado.includes(vectorLetra[i].toUpperCase())) {
                ctx.fillStyle = "#FEEA00"
            } else {
                ctx.fillStyle = "white";
            }

        }
        ctx.fillText(vectorLetra[i], x[i], y[i]);
        x[i] += dX[i];
        y[i] += dY[i];

        if (x[i] > anchoMaximo - 15 || x[i] < 0) {
            dX[i] *= -1;
        }
        if (y[i] > altMaxima || y[i] <= 12) {
            dY[i] *= -1;
        }

    }

}
/**
 * limpia el canvas para que cada vez que se pasa de nivel muestre la palabra worlde, y no la ultima palabra del nivel pasado.
 * @method limpiarCanvas
 */
let limpiarCanvas = () => {
    localStorage.removeItem("LI");
}