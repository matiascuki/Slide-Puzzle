// Arreglo que contiene las intrucciones del juego
var instrucciones = [
  "You need to solve the puzzle as the example image",
  "To move the pieces you have to use the arrow keys"
];
// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

/* Estas dos variables son para guardar la posición de la pieza vacía.
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

/* Agregado de var para mi modal. */
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
var stopButton = document.querySelector("stop-button");
var restartButton = document.querySelector(".restart-button");
var nextButton = document.querySelector("next-button")



// Esta función recorre el arreglo de instrucciones pasado por parámetro.

function mostrarInstrucciones(instrucciones) {
  for (i=0;i<instrucciones.length;i++){
  var instruccion =  instrucciones[i];
  mostrarInstruccionEnLista(instruccion,"lista-instrucciones");
}
}

/* Agrega la última dirección al arreglo de movimientos
y utiliza actualizarUltimoMovimiento para mostrarlo en pantalla */

function UltimoMovimiento(direccion) {
  movimientos.push(direccion);
  actualizarUltimoMovimiento(direccion);
}

//  Implementa la función del modal 

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
      toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
restartButton.addEventListener("click", () => {
  toggleModal;
  mezclarPiezas(60);
});
window.addEventListener("click", windowOnClick);

// Esta función va a chequear si el Rompecabezas esta en la posicion ganadora.

function chequearSiGano() {
  var grillaWin = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
if (grilla.length === grillaWin.length) {
for (i=0;i<grilla.length;i++) {
  for (j=0;j<grillaWin.length;j++){
    if (grilla[i][j] == grillaWin[i][j]){
  } else {
    return false;
  }
}
}
true;
toggleModal();

}
}


function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
  var mover =  grilla[filaPos1][columnaPos1];
  grilla [filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
  grilla[filaPos2][columnaPos2] = mover;
}

// Actualiza la posición de la pieza vacía

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
 filaVacia = nuevaFila;
 columnaVacia = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.

function posicionValida(fila, columna) {
    if ( (fila <= 2 && fila >= 0) && (columna <= 2 && columna >= 0)){
      return true;
} else {
  return false;
}
}

/* Movimiento de fichas arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia la abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaColumnaPiezaVacia  = columnaVacia - 1;
    nuevaFilaPiezaVacia = filaVacia;
  }

  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaColumnaPiezaVacia  = columnaVacia + 1;
    nuevaFilaPiezaVacia = filaVacia;
  }



  // Si la posición es valida cambia las piezas y actualiza en pantalla 

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        UltimoMovimiento(direccion);

    }
}


var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM) */

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */

function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }

  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);
}

// Captura las teclas, mueve la dirección y hace el checkeo de si gano.

function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              }, 500);
            }
            evento.preventDefault();
        }
    })
}

// Se inicia mezclando las piezas y ejecutando la función para que se capturen las teclas

function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(60);
    capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();