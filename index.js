const express = require('express');

const app = express();

class Jugador {
  constructor(id) {
    this.id = id;
  }
}

const jugadores = [];

app.get('/unirse', (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(id);
});

app.listen(8080, () => {
  console.log('Server funcionando en el puerto 8080');
});
