;(function() {
    //"use strict"

var palabras = [
    "ALURA" , 
    "NIÑO",
    "AFINIDAD",
    "PROGRAMAR",
    "ORACLE",
    "YOUTUBE",
]

palabras
//Variable para almacenar la configuracion
var juego = null
// Para ver si ya se ha enviado una alerta
var finalizado = false

var $html = {
    hombre: document.getElementById("hombre"),
    adivinado: document.querySelector(".adivinado"),
    errado: document.querySelector(".errado")
}

function dibujar(juego) {
//actualizar imagen del hombre
var $elem
$elem = $html.hombre

var estado = juego.estado
if(estado == 8){
    estado = juego.previo
}
$elem.src = "./imagenes/estados/0" + estado + ".png"

//Letras a adivinar
var palabra = juego.palabra
var adivinado = juego.adivinado
$elem = $html.adivinado
//Borramos elementos anteriores
$elem.innerHTML = ''
for(let letra of palabra) {
   let $span = document.createElement('span')
    let $txt = document.createTextNode("")
    if(adivinado.has(letra)){
        $txt.nodeValue = letra
        }
        $span.setAttribute("class", "letra adivinada")
        $span.appendChild($txt)
        $elem.appendChild($span)
    }

    //Creamos letras erradas
    var errado = juego.errado
    $elem = $html.errado
    //borramos los elementos anteriores 
    $elem.innerHTML = ''
    for(let letra of errado) {
        let $span = document.createElement('span')
        let $txt = document.createTextNode(letra)
        $span.setAttribute("class", "letra errada")
        $span.appendChild($txt)
        $elem.appendChild($span)
  }
}

function adivinar (juego, letra) {
    var estado = juego.estado
    //Al perder o ganar, no hay nada que hacer
    if(estado == 1 || estado == 8) {
    return
}

var adivinado = juego.adivinado
var errado = juego.errado
//si la letra adivinada, ya no se hace nada
if (adivinado.has(letra) || errado.has(letra)){
    return
    }

    var palabra = juego.palabra
    var letras = juego.letras
    //Si es letra de la palabra
    if(letras.has(letra)){
        //agregamos a la lista de letras adivinadas 
        adivinado.add(letra)
        //actualizamos letras restante
        juego.restante--

        //Si ya se ha ganado, debemos indicarlo
        if(juego.restante == 0){
           juego.previo = juego.estado
           juego.estado = 8
        }
    } else {
            //Si no es letra de la palabra, acercamos el hombre a la horca
            juego.estado--
            //Agregamo la letra a la lista de erradas
            errado.add(letra)
            }
        }
            
       window.onkeypress = function adivinarLetra (e){
            var letra = e.key
            letra = letra.toUpperCase()
            if(/[^A-ZÑ]/.test(letra)) {
                return
            }

            adivinar(juego, letra)
            var estado = juego.estado
            if(estado == 8 && !finalizado) {
                setTimeout(alertaGanado, 0)
                finalizado= true
            } else if(estado == 1 && !finalizado) {
                let palabra = juego.palabra
                let fn = alertaPerdido.bind(undefined, palabra)
                setTimeout(fn, 0)
                finalizado = true
            }
            dibujar(juego)
        }

        window.nuevoJuego = function nuevoJuego() {
            var palabra = palabraAleatoria()
            juego = {}
            juego.palabra = palabra
            juego.estado = 7
            juego.adivinado = new Set()
            juego.errado =  new Set()
            finalizado = false

            var letras = new Set()
            for (let letra of palabra) {
                letras.add(letra)
            }
            juego.letras = letras
            juego.restante = letras.size
    
            dibujar(juego)
            console.log(juego)
    
        }
    function palabraAleatoria(){
        var index = ~~(Math.random() * palabras.length)
        return palabras[index]
    }

    function alertaGanado() {
        alert("Ganaste")
    }

    function alertaPerdido(palabra) {
        alert("perdiste, la palabra era: " + palabra)
    }
    nuevoJuego()

} ())