let ataqueJugador;

function iniciarJuego() {
  let jugadorId = document.getElementById('boton-mascota');
  jugadorId.addEventListener('click', seleccionarMascotaJugador);

  let botonFuego;
  let botonAgua;
  let botontierra;

  botonFuego = document.getElementById('boton-fuego');
  botonFuego.addEventListener('click', ataqueFuego);
  botonAgua = document.getElementById('boton-agua');
  botonAgua.addEventListener('click', ataqueAgua);
  botontierra = document.getElementById('boton-tierra');
  botontierra.addEventListener('click', ataqueTierra);
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
  }

  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let ataqueAleatorio = aleatorio(1, 6);
  let spanmascotaEnemigo = document.getElementById('mascota-enemigo');

  if (ataqueAleatorio == 1) {
    spanmascotaEnemigo.innerHTML = 'Hipodoge';
  } else if (ataqueAleatorio == 2) {
    spanmascotaEnemigo.innerHTML = 'Capipepo';
  } else if (ataqueAleatorio == 3) {
    spanmascotaEnemigo.innerHTML = 'Ratigueya';
  } else if (ataqueAleatorio == 4) {
    spanmascotaEnemigo.innerHTML = 'Langostelvis';
  } else if (ataqueAleatorio == 5) {
    spanmascotaEnemigo.innerHTML = 'Tucapalma';
  } else if (ataqueAleatorio == 6) {
    spanmascotaEnemigo.innerHTML = 'Pydos';
  }
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueFuego() {
  ataqueJugador = 'FUEGO';
  alert(ataqueJugador);
}
function ataqueAgua() {
  ataqueJugador = 'AGUA';
  alert(ataqueJugador);
}
function ataqueTierra() {
  ataqueJugador = 'TIERRA';
  alert(ataqueJugador);
}

window.addEventListener('load', iniciarJuego);
