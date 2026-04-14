import { Mokepon, mokepones } from './mokeponData.js';

// ==================== DOM Elements ====================
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

// ==================== Game State ====================
let jugadorId = null;
let enemigoId = null;
let mokeponesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokeponEnemigo;
let botones = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext('2d');
let intervalo;
let colisionActiva = false;
let mapaBackground = new Image();
mapaBackground.src = 'assets/mokemap.png';

// Partículas para animación de fondo
let particulas = [];

// ==================== Canvas Setup ====================
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

const alturaQueBuscamos = (anchoDelMapa * 600) / 800;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

sectionReiniciar.style.display = 'none';

// ==================== Particle System ====================
class Particula {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidadX = (Math.random() - 0.5) * 2;
    this.velocidadY = (Math.random() - 0.5) * 2;
    this.vida = 255;
    this.tamanio = Math.random() * 3 + 1;
    this.color = ['#6366f1', '#4f46e5', '#818cf8', '#c084fc'][Math.floor(Math.random() * 4)];
  }

  actualizar() {
    this.x += this.velocidadX;
    this.y += this.velocidadY;
    this.vida -= 3;
  }

  dibujar(ctx) {
    ctx.globalAlpha = this.vida / 255;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.tamanio, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function crearParticulas(x, y, cantidad = 5) {
  for (let i = 0; i < cantidad; i++) {
    particulas.push(new Particula(x, y));
  }
}

function actualizarParticulas() {
  particulas = particulas.filter(p => p.vida > 0);
  particulas.forEach(p => p.actualizar());
}

function dibujarParticulas() {
  particulas.forEach(p => p.dibujar(lienzo));
}

// ==================== Utility Functions ====================
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function obtenerObjetoMascota(nombre) {
  return mokepones.find(m => m.nombre === nombre);
}

// ==================== Game Initialization ====================
function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = 'none';
  sectionVerMapa.style.display = 'none';

  mokepones.forEach((mokepon) => {
    const opcionDeMokepones = `
      <input type="radio" name="mascota" id="${mokepon.nombre}" />
      <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
        <p>${mokepon.nombre}</p>
        <img src="${mokepon.foto}" alt="${mokepon.nombre}">
      </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
  botonReiniciar.addEventListener('click', reiniciarJuego);

  unirseAljuego();
}

function unirseAljuego() {
  fetch('http://localhost:8080/unirse')
    .then(res => res.text())
    .then(respuesta => {
      jugadorId = respuesta;
      console.log('Jugador ID:', jugadorId);
    })
    .catch(err => console.error('Error al unirse:', err));
}

// ==================== Pet Selection ====================
function seleccionarMascotaJugador() {
  const inputHipodoge = document.getElementById('Hipodoge');
  const inputCapipepo = document.getElementById('Capipepo');
  const inputRatigueya = document.getElementById('Ratigueya');

  if (inputHipodoge.checked) {
    mascotaJugador = 'Hipodoge';
  } else if (inputCapipepo.checked) {
    mascotaJugador = 'Capipepo';
  } else if (inputRatigueya.checked) {
    mascotaJugador = 'Ratigueya';
  } else {
    alert('Selecciona una mascota');
    return;
  }

  spanMascotaJugador.innerHTML = mascotaJugador;
  sectionSeleccionarMascota.style.display = 'none';

  seleccionarMokepon(mascotaJugador);
  extraerAtaques(mascotaJugador);
  sectionVerMapa.style.display = 'flex';
  iniciarMapa();
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mokepon: mascotaJugador }),
  }).catch(err => console.error('Error al seleccionar Mokepon:', err));
}

// ==================== Attack Selection ====================
function extraerAtaques(mascotaJugador) {
  const mokepon = obtenerObjetoMascota(mascotaJugador);
  if (mokepon) {
    mostrarAtaques(mokepon.ataques);
  }
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque, index) => {
    const ataquesMokepon = `
      <button id="ataque-${index}" class="boton-de-ataque BAtaques" data-ataque="${ataque.nombre}">
        ${ataque.nombre}
      </button>
    `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botones = document.querySelectorAll('.BAtaques');
  secuenciaAtaque();
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      const ataqueEmoji = e.target.dataset.ataque;
      let tipoAtaque;

      if (ataqueEmoji === '🔥') {
        tipoAtaque = 'FUEGO';
      } else if (ataqueEmoji === '💧') {
        tipoAtaque = 'AGUA';
      } else {
        tipoAtaque = 'TIERRA';
      }

      ataqueJugador.push(tipoAtaque);
      e.target.style.background = '#112f58';
      e.target.disabled = true;

      if (ataqueJugador.length === 5) {
        enviarAtaques();
      }
    });
  });
}

function enviarAtaques() {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ataques: ataqueJugador,
    }),
  }).catch(err => console.error('Error al enviar ataques:', err));

  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(res => res.json())
    .then(data => {
      if (data.ataques && data.ataques.length === 5) {
        ataqueEnemigo = data.ataques;
        clearInterval(intervalo);
        combate();
      }
    })
    .catch(err => console.error('Error al obtener ataques:', err));
}

// ==================== Combat ====================
function combate() {
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      crearMensaje('EMPATE', ataqueJugador[index], ataqueEnemigo[index]);
    } else if (
      (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') ||
      (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') ||
      (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA')
    ) {
      crearMensaje('GANASTE', ataqueJugador[index], ataqueEnemigo[index]);
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      crearMensaje('PERDISTE', ataqueJugador[index], ataqueEnemigo[index]);
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal('¡Esto fue un empate!');
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal('¡FELICITACIONES! ¡Ganaste! 🎉');
  } else {
    crearMensajeFinal('Lo siento, perdiste 😢');
  }
}

function crearMensaje(resultado, ataqueJ, ataqueE) {
  const nuevoAtaqueDelJugador = document.createElement('p');
  const nuevoAtaqueDelEnemigo = document.createElement('p');

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJ;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueE;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
  location.reload();
}

// ==================== Map and Movement ====================
function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  if (!mascotaJugadorObjeto) {
    console.error('No se encontró la mascota del jugador');
    return;
  }

  mascotaJugadorObjeto.x = aleatorio(0, mapa.width - mascotaJugadorObjeto.ancho);
  mascotaJugadorObjeto.y = aleatorio(0, mapa.height - mascotaJugadorObjeto.alto);

  colisionActiva = false;
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener('keydown', sePresionaUnaTecla);
  window.addEventListener('keyup', detenerMovimiento);
}

function moverDerecha() {
  if (mascotaJugadorObjeto) mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
  if (mascotaJugadorObjeto) mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
  if (mascotaJugadorObjeto) mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
  if (mascotaJugadorObjeto) mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
  if (mascotaJugadorObjeto) {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
  }
}

function sePresionaUnaTecla(event) {
  switch (event.key) {
    case 'ArrowUp':
      moverArriba();
      break;
    case 'ArrowDown':
      moverAbajo();
      break;
    case 'ArrowLeft':
      moverIzquierda();
      break;
    case 'ArrowRight':
      moverDerecha();
      break;
  }
}

function pintarCanvas() {
  mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;

  // Limitar movimiento dentro del canvas
  if (mascotaJugadorObjeto.x < 0) mascotaJugadorObjeto.x = 0;
  if (mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho > mapa.width) {
    mascotaJugadorObjeto.x = mapa.width - mascotaJugadorObjeto.ancho;
  }
  if (mascotaJugadorObjeto.y < 0) mascotaJugadorObjeto.y = 0;
  if (mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto > mapa.height) {
    mascotaJugadorObjeto.y = mapa.height - mascotaJugadorObjeto.alto;
  }

  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  
  // Dibujar fondo
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  
  // Dibujar efecto de luz animado en el fondo
  const gradiente = lienzo.createRadialGradient(mapa.width / 2, mapa.height / 2, 0, mapa.width / 2, mapa.height / 2, mapa.width);
  gradiente.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
  gradiente.addColorStop(1, 'rgba(99, 102, 241, 0)');
  lienzo.fillStyle = gradiente;
  lienzo.fillRect(0, 0, mapa.width, mapa.height);

  // Dibujar partículas
  actualizarParticulas();
  dibujarParticulas();

  // Dibujar mascota del jugador
  lienzo.drawImage(
    mascotaJugadorObjeto.mapaFoto,
    mascotaJugadorObjeto.x,
    mascotaJugadorObjeto.y,
    mascotaJugadorObjeto.ancho,
    mascotaJugadorObjeto.alto
  );

  // Crear partículas alrededor del jugador
  if (Math.random() < 0.3) {
    crearParticulas(
      mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho / 2,
      mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto / 2,
      1
    );
  }

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  mokeponesEnemigos.forEach(function (mokepon) {
    lienzo.drawImage(mokepon.mapaFoto, mokepon.x, mokepon.y, mokepon.ancho, mokepon.alto);
    
    // Crear partículas alrededor de enemigos
    if (Math.random() < 0.2) {
      crearParticulas(mokepon.x + mokepon.ancho / 2, mokepon.y + mokepon.alto / 2, 1);
    }
    
    revisarColision(mokepon);
  });
}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x, y }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.enemigos) {
        mokeponesEnemigos = data.enemigos.map(enemigo => {
          const mokeponData = obtenerObjetoMascota(enemigo.mokepon.nombre);
          if (!mokeponData) return null;

          const mokeponEnemigo = new Mokepon(
            mokeponData.nombre,
            mokeponData.foto,
            mokeponData.vida,
            mokeponData.mapaFoto.src,
            enemigo.id
          );
          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;
          return mokeponEnemigo;
        }).filter(m => m !== null);
      }
    })
    .catch(err => console.error('Error al enviar posición:', err));
}

function revisarColision(enemigo) {
  if (colisionActiva) return;

  const margen = 20;
  const arribaEnemigo = enemigo.y - margen;
  const abajoEnemigo = enemigo.y + enemigo.alto + margen;
  const derechaEnemigo = enemigo.x + enemigo.ancho + margen;
  const izquierdaEnemigo = enemigo.x - margen;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }

  colisionActiva = true;
  detenerMovimiento();
  clearInterval(intervalo);
  console.log('¡Colisión detectada con:', enemigo.nombre);

  // Crear partículas en el punto de colisión
  crearParticulas(
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho / 2,
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto / 2,
    15
  );

  enemigoId = enemigo.id;
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;

  sectionSeleccionarAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'none';

  contenedorAtaques.innerHTML = '<h2 class="subtitulo">Elige tu ataque:</h2>';
  ataqueJugador = [];
  ataqueEnemigo = [];

  secuenciaAtaque();
}

// ==================== Event Listeners ====================
window.addEventListener('load', iniciarJuego);

// Hacer funciones globales para los botones inline
window.moverArriba = moverArriba;
window.moverAbajo = moverAbajo;
window.moverDerecha = moverDerecha;
window.moverIzquierda = moverIzquierda;
window.detenerMovimiento = detenerMovimiento;
