
let iguales = 0;
let n = 0;
const palabras = ["Amigo", "Aviso", "Ancho", "Arena", "Asado",
    "Banco", "Banda", "BARCO", "Bolsa", "Burro",
    "Carpa", "Campo", "Cenar", "Costo", "Crudo",
    "Denso", "Datos", "Dados", "Doble", "Dulce",
    "Enero", "Error", "Erizo", "Estar", "Echar",
    "Feria", "Fallo", "Filas", "Fuego", "Ficha",
    "Gatos", "Grano", "Globo", "Gordo", "Grave",
    "Hielo", "Horno", "Hongo", "Humor", "Hacha",
    "Indio", "Islas", "Igual", "Impar", "Idolo",
    "Joven", "Julio", "Japon", "Jugar", "Jarra",
    "Koala", "Karma",
    "Libro", "Lugar", "Lente", "Largo", "Llave",
    "Metro", "Manos", "Miedo", "Marco", "Melon",
    "Nubes", "Nueva", "Norte", "Nieve", "Nacer",
    "Oveja", "Opera", "Oruga", "Oliva", "Ondas",
    "Pecho", "perro", "Poder", "Paris", "Pinza",
    "Queso", "Quema", "Queda", "Quiso",
    "Rubio", "Rango", "Radio", "Ronda", "Reloj",
    "Secar", "Sobre", "Salsa", "Sello", "Sabio",
    "Trono", "Torre", "Tabla", "Tenis", "Terco",
    "Union", "Unico", "Untar",
    "Vuelo", "Voces", "Valor", "Verde", "Velas",
    "Wafle",
    "Yendo", "Yates",
    "Zorro", "Zafar", "Zumba", "Zonas", "Zurdo"
]

/**
 * Elige la palabra oculta que el usuario tendra que adivinar
 * @method palabraAAdivinar
 * @return palabra oculta aleatoria
 */

palabraAAdivinar = () => {
    let indiceAleatorio = Math.floor(Math.random()*palabras.length);
    let palabraAleatoria = palabras[indiceAleatorio];
    localStorage.setItem("PA",palabraAleatoria);
}



/*cartelGanaPierde = () => {
    const almacenado = localStorage.getItem("PA");
    console.log(almacenado);
}
*/
/**
 * Verifica que la palabra ingresada por el usuario sea valida
 * @method cargarPalabra
 */

cargarPalabra = () => {
    let coincide = false;
    let palabra = document.getElementById("cargar").value.toUpperCase();
    let letrasIntento = document.getElementsByName("letra");
    let colorCuadrado = document.getElementById("cargar");
    let contenidoCuadrado = document.getElementById("cargar");

    for (let i = 0; i < palabras.length; i++) {
        if (palabra === palabras[i].toUpperCase()) {
            coincide = true;
        }
    }
    if (coincide) {
        for (let i = 0; i < palabra.length; i++) {
            letrasIntento[n+i].value = palabra[i];
            compararPalabra(palabra[i],i);
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

compararPalabra = (intento, i) => {
    const almacenado = localStorage.getItem("PA");
    console.log(almacenado);
    for (let j = 0; j < almacenado.length; j++) {
        if (intento.toUpperCase() === almacenado[j].toUpperCase()) {
            if (i === j) {
                document.getElementsByName("letra")[n+i].style.backgroundColor = "#11D147";
                document.getElementsByClassName("celda")[n+i].style.backgroundColor = "#11D147";
                iguales++;
            } else {
                document.getElementsByName("letra")[n+i].style.backgroundColor = "#FEEA00";
                document.getElementsByClassName("celda")[n+i].style.backgroundColor = "#FEEA00";
            }
        }
    }
    if (n===25 && iguales<5){
        //document.getElementsByClassName("carteles")[0].style.display = 'block'
        //document.getElementById("perdiste").style.zIndex = 2;
        document.getElementById("mostrarPalabra").innerHTML = "PALABRA OCULTA: " + almacenado.toUpperCase();
        document.getElementById("cargar").style.display = 'none';
        document.getElementById("labelCargar").style.display = 'none';
    }
}


