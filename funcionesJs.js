let n = 0;
const palabras = ["Amigo", "Aviso", "Ancho", "Arena", "Asado", "arbol",
    "Banco", "Banda", "BARCO", "Bolsa", "Burro", "barro", "bajar",
    "Carpa", "Campo", "Cenar", "Costo", "Crudo", "carta", "carro", "cerro", "cobre", "cabra", "cuero",
    "Denso", "Datos", "Dados", "Doble", "Dulce", "dardo",
    "Enero", "Error", "Erizo", "Estar", "Echar",
    "Feria", "Fallo", "Filas", "Fuego", "Ficha",
    "Gatos", "Grano", "Globo", "Gordo", "Grave",
    "Hielo", "Horno", "Hongo", "Humor", "Hacha", "hacer", "hueso", "huevo", "habla",
    "Indio", "Islas", "Igual", "Impar", "Idolo",
    "Joven", "Julio", "Japon", "Jugar", "Jarra", "jabon",
    "Koala", "Karma",
    "Libro", "Lugar", "Lente", "Largo", "Llave", "libre", "luces",
    "Metro", "Manos", "Miedo", "Marco", "Melon",
    "Nubes", "Nueva", "Norte", "Nieve", "Nacer",
    "Oveja", "Opera", "Oruga", "Oliva", "Ondas",
    "Pecho", "perro", "Poder", "Paris", "Pinza", "pollo",
    "Queso", "Quema", "Queda", "Quiso",
    "Rubio", "Rango", "Radio", "Ronda", "Reloj", "robar",
    "Secar", "Sobre", "Salsa", "Sello", "Sabio", "suelo",
    "Trono", "Torre", "Tabla", "Tenis", "Terco",
    "Union", "Unico", "Untar",
    "Vuelo", "Voces", "Valor", "Verde", "Velas",
    "Wafle",
    "Yendo", "Yates",
    "Zorro", "Zafar", "Zumba", "Zonas", "Zurdo", "zebra"
]

/**
 * Elige aleatoriamente la palabra que el jugador va a tener que adivinar y la guarda en localStorage
 * @method palabraAAdivinar
 */

let palabraAAdivinar = () => {
    let indiceAleatorio = Math.floor(Math.random()*palabras.length);
    let palabraAleatoria = palabras[indiceAleatorio];
    localStorage.setItem("PA",palabraAleatoria);
}

/**
 * Descripción de que hace la función
 * @method Nombre de la función
 * @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
 * @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
 * @return Valor que retorna
 */
let cargarPalabra = () => {
    let coincide = false;
    let palabra = document.getElementById("cargar").value.toUpperCase();
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
            letrasIntento[n+i].value = palabra[i];
            console.log(palabra.length);
            compararPalabra(palabra);
        }
        contenidoCuadrado.value = "";
        colorCuadrado.style.backgroundColor = "white";
        n+=5;

    } else if (!coincide && palabra.length === 5) {
        colorCuadrado.style.backgroundColor = "red";
    } else {
        colorCuadrado.style.backgroundColor = "white";
    }
}
/**
 * Compara la palabra ingresada por el usuario con la palabra a adivinar
 * @method compararPalabra
 * @param {string} intento - Palabra ingresada por el usuario
 */

compararPalabra = (intento) => {
    let iguales = 0;
    const almacenado = localStorage.getItem("PA");
    console.log(almacenado, almacenado.length);
    for (let i=0;i<intento.length;i++) {
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
 * Dependiendo si el jugador encuentra o no la palabra oculta, muestra un cartel diferente
 * @method carteles
 * @param {string} almacenado - Explicación de que valor almacena ParámetroA
 * @param {number} iguales - Explicación de que valor almacena ParámetroB
 * @return Valor que retorna
 */
let carteles = (iguales, almacenado) => {
    const cartelPerdiste = document.getElementById("perdiste");
    const cartelGanaste = document.getElementById("ganaste");
    const inputCargar = document.getElementById("cargar");
    const labelCargar = document.getElementById("labelCargar");
    if (n===25 && iguales<5){
        cartelPerdiste.style.display = 'block'
        document.getElementById("mostrarPalabra").innerHTML = "PALABRA OCULTA: " + almacenado.toUpperCase();
        inputCargar.style.display = 'none';
        labelCargar.style.display = 'none';
    }
    else if (iguales === 5){
        cartelGanaste.style.display = 'block'
        inputCargar.style.display = 'none';
       labelCargar.style.display = 'none';
        puntaje();
    }
}
/**
 * Descripción de que hace la función
 * @method Nombre de la función
 * @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
 * @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
 * @return Valor que retorna
 */
let puntaje = (puntos) => {
    let puntajeHtml = document.getElementById("puntaje");
    puntos = parseInt(puntos);
    puntos = puntos + 100;
    puntajeHtml.value = puntos.toString();

}
/**
 * Descripción de que hace la función
 * @method Nombre de la función
 * @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
 * @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
 * @return Valor que retorna
 */
let botonInicio = () => {
    if (n<25){
        document.getElementById("alInicio").style.display = 'block';
        document.getElementById("labelCargar").style.display = 'none';
        document.getElementById("cargar").style.display = 'none';

    }
    else {
        location.href = "index.html";
    }
}
/**
 * Descripción de que hace la función
 * @method Nombre de la función
 * @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
 * @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
 * @return Valor que retorna
 */
let botonSeguirJugando = () => {
    document.getElementById("alInicio").style.display = 'none';
}
/**
* Descripción de que hace la función
* @method Nombre de la función
* @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
* @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
* @return Valor que retorna
*/
let dibujarCuadrados = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let xMax = canvas.width;
    let yMax = canvas.height;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.lineWidth = 1;
    //dibujar rectangulo
    let margen = 5;
    ctx.strokeRect(5, margen, 50, yMax-margen*2);
    ctx.strokeRect(60+margen, margen, 50, yMax-margen*2);
    ctx.strokeRect(120+margen, margen, 50, yMax-margen*2);
    ctx.strokeRect(180+margen, margen, 50, yMax-margen*2);
    ctx.strokeRect(240+margen, margen, 50, yMax-margen*2);


}