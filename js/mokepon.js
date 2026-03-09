let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
  let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
  sectionSeleccionarAtaque.style.display = 'none';

  let sectionReiniciar = document.getElementById('reiniciar');
  sectionReiniciar.style.display = 'none';

  let jugadorId = document.getElementById('boton-mascota');
  jugadorId.addEventListener('click', seleccionarMascotaJugador);

  let botonFuego = document.getElementById('boton-fuego');
  botonFuego.addEventListener('click', ataqueFuego);
  let botonAgua = document.getElementById('boton-agua');
  botonAgua.addEventListener('click', ataqueAgua);
  let botontierra = document.getElementById('boton-tierra');
  botontierra.addEventListener('click', ataqueTierra);

  let botonReiniciar = document.getElementById('boton-reiniciar');
  botonReiniciar.addEventListener('click', reiniciarJuego);
}

// Forma corta
// function seleccionarMascotaJugador() {
//   let mascotaSeleccionada = document.querySelector(
//     'input[name="mascota"]:checked',
//   );

//   if (mascotaSeleccionada) {
//     alert('seleccionastes a ' + mascotaSeleccionada.id);
//   } else {
//     alert('selecciona una mascota');
//   }
// }

// Forma larga
function seleccionarMascotaJugador() {
  let inputHipodoge = document.getElementById('hipodoge');
  let inputCapipepo = document.getElementById('capipepo');
  let inputRatigueya = document.getElementById('ratigueya');
  let inputLangostelvis = document.getElementById('langostelvis');
  let inputTucapalma = document.getElementById('tucapalma');
  let inputPydos = document.getElementById('pydos');
  let spanMascotaJugador = document.getElementById('mascota-jugador');

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = 'Hipodoge';
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = 'Capipepo';
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = 'Ratigueya';
  } else if (inputLangostelvis.checked) {
    spanMascotaJugador.innerHTML = 'Langostelvis';
  } else if (inputTucapalma.checked) {
    spanMascotaJugador.innerHTML = 'Tucapalma';
  } else if (inputPydos.checked) {
    spanMascotaJugador.innerHTML = 'Pydos';
  } else {
    alert('selecciona una mascota');
    return;
  }

  let sectionSeleccionarMascota = document.getElementById(
    'seleccionar-mascota',
  );
  sectionSeleccionarMascota.style.display = 'none';

  let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
  sectionSeleccionarAtaque.style.display = 'block';

  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatorio = aleatorio(1, 6);
  let spanmascotaEnemigo = document.getElementById('mascota-enemigo');

  if (mascotaAleatorio == 1) {
    spanmascotaEnemigo.innerHTML = 'Hipodoge';
  } else if (mascotaAleatorio == 2) {
    spanmascotaEnemigo.innerHTML = 'Capipepo';
  } else if (mascotaAleatorio == 3) {
    spanmascotaEnemigo.innerHTML = 'Ratigueya';
  } else if (mascotaAleatorio == 4) {
    spanmascotaEnemigo.innerHTML = 'Langostelvis';
  } else if (mascotaAleatorio == 5) {
    spanmascotaEnemigo.innerHTML = 'Tucapalma';
  } else if (mascotaAleatorio == 6) {
    spanmascotaEnemigo.innerHTML = 'Pydos';
  }
}

function ataqueFuego() {
  ataqueJugador = 'FUEGO';
  ataqueAleatorioEnemigo();
}
function ataqueAgua() {
  ataqueJugador = 'AGUA';
  ataqueAleatorioEnemigo();
}
function ataqueTierra() {
  ataqueJugador = 'TIERRA';
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = 'FUEGO';
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = 'AGUA';
  } else {
    ataqueEnemigo = 'TIERRA';
  }
  combate();
}

function combate() {
  let spanVidasJugador = document.getElementById('vidas-jugadas');
  let spanVidasEnemigo = document.getElementById('vidas-enemigo');

  if (ataqueEnemigo == ataqueJugador) {
    crearMensaje('EMPATE');
  } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
    crearMensaje('GANASTE');
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
    crearMensaje('GANASTE');
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
    crearMensaje('GANASTE');
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje('PERDISTE');
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }
  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal('FELICIDADES, GANASTES EL JUEGO');
  } else if (vidasJugador == 0) {
    crearMensajeFinal('LO SIENTO, PERDISTES EL JUEGO');
  }
}

function crearMensaje(resultado) {
  let sectionMensaje = document.getElementById('mensaje');

  let parrafo = document.createElement('p');
  parrafo.innerHTML =
    'Tu mascota ataco con ' +
    ataqueJugador +
    ', la mascota del enemigo ataco con ' +
    ataqueEnemigo +
    '-' +
    resultado;

  sectionMensaje.appendChild(parrafo);
}
function crearMensajeFinal(resultadoFinal) {
  let sectionMensaje = document.getElementById('mensaje');

  let parrafo = document.createElement('p');
  parrafo.innerHTML = resultadoFinal;

  sectionMensaje.appendChild(parrafo);

  let botonFuego = document.getElementById('boton-fuego');
  botonFuego.disabled = true;
  let botonAgua = document.getElementById('boton-agua');
  botonAgua.disabled = true;
  let botontierra = document.getElementById('boton-tierra');
  botontierra.disabled = true;

  sectionReiniciar = document.getElementById('reiniciar');
  sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);
