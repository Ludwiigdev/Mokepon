# 🎮 Mokepon - Juego Multijugador

Un juego web multijugador en tiempo real donde los jugadores seleccionan su mascota, exploran un mapa interactivo y participan en combates estratégicos.

## ✨ Características

- **Selección de Mascota:** Elige entre Hipodoge, Capipepo o Ratigueya
- **Mapa Interactivo:** Explora el mapa con controles de teclado o botones
- **Combate en Tiempo Real:** Batalla contra otros jugadores con sistema de ataques
- **Efectos Visuales:** Animaciones fluidas y sistema de partículas
- **Multijugador:** Sincronización en tiempo real con otros jugadores

## 🛠️ Tecnologías

- **Backend:** Node.js + Express.js
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Gráficos:** Canvas API
- **Comunicación:** Fetch API + REST

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Ludwiigdev/Mokepon.git
cd Mokepon

# Instalar dependencias
npm install

# Iniciar el servidor
node index.js
```

Abre tu navegador en `http://localhost:8080/mokepon.html`

## 🎮 Cómo Jugar

1. **Selecciona tu Mokepon** - Elige tu mascota favorita
2. **Explora el Mapa** - Usa flechas del teclado o botones para moverte
3. **Encuentra Enemigos** - Las colisiones inician automáticamente el combate
4. **Elige Ataques** - Selecciona 5 ataques para tu Mokepon
5. **Gana la Batalla** - El sistema de piedra-papel-tijera determina el ganador

## 📊 Mokepones

| Nombre | Tipo | Ataques |
|--------|------|---------|
| 🌊 Hipodoge | Agua | 3x Agua, 1x Fuego, 1x Tierra |
| 🌿 Capipepo | Tierra | 3x Tierra, 1x Agua, 1x Fuego |
| 🔥 Ratigueya | Fuego | 3x Fuego, 1x Agua, 1x Tierra |

## 🎯 Sistema de Combate

- 🔥 **Fuego** vence a 🌱 **Tierra**
- 💧 **Agua** vence a 🔥 **Fuego**
- 🌱 **Tierra** vence a 💧 **Agua**

## 📁 Estructura

```
Mokepon/
├── public/
│   ├── assets/          # Imágenes
│   ├── js/              # Lógica del juego
│   ├── mokepon.html     # HTML principal
│   ├── styles.css       # Estilos
│   └── animations.css   # Animaciones
├── index.js             # Servidor
├── package.json         # Dependencias
└── README.md            # Este archivo
```

## 📄 Licencia

ISC License - Ver LICENSE para más detalles

## 👨‍💻 Autor

Luis Fernández - [@Ludwiigdev](https://github.com/Ludwiigdev)

---

**¡Disfruta jugando Mokepon! 🎮✨**
