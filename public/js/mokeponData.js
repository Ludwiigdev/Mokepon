export class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = 0; // Se inicializará en el mapa
    this.y = 0; // Se inicializará en el mapa
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
}

const hipodoge = new Mokepon(
  'Hipodoge',
  'assets/hipodoge.png',
  5,
  'assets/hipodoge1.png',
);
const capipepo = new Mokepon(
  'Capipepo',
  'assets/capipepo.png',
  5,
  'assets/capipepo2.png',
);
const ratigueya = new Mokepon(
  'Ratigueya',
  'assets/ratigueya.png',
  5,
  'assets/ratigueya3.png',
);

const hipodoge_Ataques = [
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🌱', id: 'boton-tierra' },
];
hipodoge.ataques.push(...hipodoge_Ataques);

const capipepo_Ataques = [
  { nombre: '🌱', id: 'boton-tierra' },
  { nombre: '🌱', id: 'boton-tierra' },
  { nombre: '🌱', id: 'boton-tierra' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' },
];
capipepo.ataques.push(...capipepo_Ataques);

const ratigueya_Ataques = [
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🌱', id: 'boton-tierra' },
];
ratigueya.ataques.push(...ratigueya_Ataques);

export let mokepones = [hipodoge, capipepo, ratigueya];
