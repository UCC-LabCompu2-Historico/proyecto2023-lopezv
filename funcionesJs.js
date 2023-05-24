let n = 0;
const palabras = ["Amigo", "Aviso", "Ancho", "Arena", "Asado", "arbol",
    "Banco", "Banda", "BARCO", "Bolsa", "Burro", "barro", "bajar",
    "Carpa", "Campo", "Cenar", "Costo", "Crudo", "carta", "carro", "cerro", "cobre", "cabra",
    "Denso", "Datos", "Dados", "Doble", "Dulce", "dardo",
    "Enero", "Error", "Erizo", "Estar", "Echar",
    "Feria", "Fallo", "Filas", "Fuego", "Ficha",
    "Gatos", "Grano", "Globo", "Gordo", "Grave",
    "Hielo", "Horno", "Hongo", "Humor", "Hacha", "hacer",
    "Indio", "Islas", "Igual", "Impar", "Idolo",
    "Joven", "Julio", "Japon", "Jugar", "Jarra",
    "Koala", "Karma",
    "Libro", "Lugar", "Lente", "Largo", "Llave", "libre", "luces",
    "Metro", "Manos", "Miedo", "Marco", "Melon",
    "Nubes", "Nueva", "Norte", "Nieve", "Nacer",
    "Oveja", "Opera", "Oruga", "Oliva", "Ondas",
    "Pecho", "perro", "Poder", "Paris", "Pinza", "pollo",
    "Queso", "Quema", "Queda", "Quiso",
    "Rubio", "Rango", "Radio", "Ronda", "Reloj", "robar",
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
 */

palabraAAdivinar = () => {
    let indiceAleatorio = Math.floor(Math.random()*palabras.length);
    let palabraAleatoria = palabras[indiceAleatorio];
    localStorage.setItem("PA",palabraAleatoria);
}

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
 * Compara las letras de la palabra valida ingresada con las letras de la palabra a advinar
 * @method intento - recibe una por una las letras del intento ingresado por el usuario
 * @method i - indice de la letra
 */

compararPalabra = (intento) => {
    let iguales = 0;
    let verde = false;
    const almacenado = localStorage.getItem("PA");
    console.log(almacenado, almacenado.length);
    for (let i=0;i<intento.length;i++) {
        for (let j = 0; j < almacenado.length; j++) {
            if (intento[i].toUpperCase() === almacenado[j].toUpperCase()) {
                console.log(almacenado[j], j);
                console.log(intento[i], i);
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

carteles = (iguales, almacenado) => {
    if (n===25 && iguales<5){
        document.getElementById("perdiste").style.display = 'block'
        document.getElementById("mostrarPalabra").innerHTML = "PALABRA OCULTA: " + almacenado.toUpperCase();
        document.getElementById("cargar").style.display = 'none';
        //document.getElementById("puntaje").style.display = 'none';
        document.getElementById("labelCargar").style.display = 'none';
    }
    else if (iguales === 5){
        document.getElementById("ganaste").style.display = 'block'
        document.getElementById("cargar").style.display = 'none';
        document.getElementById("labelCargar").style.display = 'none';
        document.getElementById("puntaje").innerHTML += 100;
    }
}
