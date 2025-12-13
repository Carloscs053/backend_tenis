const partido = require("../databases/partido");
const { v4: uuid } = require("uuid");

const getPendientes = () => {
  try {
    const pendientes = partido.getPendientes();
    const listaJugadores = partido.getJugadores();

    const pendientesConNombres = pendientes.map((match) => {
      const datosJ1 = listaJugadores.find(
        (j) => j.jugadorId === match.j1.jugadorId
      );
      const datosJ2 = listaJugadores.find(
        (j) => j.jugadorId === match.j2.jugadorId
      );

      return {
        ...match,
        j1: {
          ...match.j1,
          nombre: datosJ1 ? datosJ1.nombre : "SIN NOMBRE",
          foto: datosJ1 ? datosJ1.foto : "",
        },
        j2: {
          ...match.j2,
          nombre: datosJ2 ? datosJ2.nombre : "SIN NOMBRE",
          foto: datosJ2 ? datosJ2.foto : "",
        },
      };
    });

    return pendientesConNombres;
  } catch (error) {
    throw error;
  }
};

const getHistorial = () => {
  try {
    const historial = partido.getHistorial();

    return historial;
  } catch (error) {
    throw error;
  }
};

const getJugadores = () => {
  try {
    const jugadores = partido.getJugadores();

    return jugadores;
  } catch (error) {
    throw error;
  }
};

const postFinalizar = (nuevoHistorico) => {
  try {
    const nuevoHistorico = {
      idPartido: nuevoHistorico.idPartido,
      torneo: nuevoHistorico.torneo,
      ronda: nuevoHistorico.ronda,
      saque: nuevoHistorico.saque,
      j1: {
        jugadorId: nuevoHistorico.j1.jugadorId,
        juegos: nuevoHistorico.j1.juegos,
        sets: nuevoHistorico.j1.sets,
      },
      j2: {
        jugadorId: nuevoHistorico.j2.jugadorId,
        juegos: nuevoHistorico.j2.juegos,
        sets: nuevoHistorico.j2.sets,
      },
    };

    const partidoGuardado = partido.postFinalizar(nuevoHistorico);

    partido.deletePendiente(nuevoHistorico);

    return partidoGuardado;
  } catch (error) {
    throw error;
  }
};

const postNuevoPartido = (datosPartido) => {
  try {
    const nuevoPendiente = {
      idPartido: uuid(),
      torneo: datosPartido.torneo,
      ronda: datosPartido.ronda,
      saque: datosPartido.saque,
      j1: {
        jugadorId: datosPartido.idJ1,
        juegos: [],
        sets: null,
      },
      j2: {
        jugadorId: datosPartido.idJ2,
        juegos: [],
        sets: null,
      },
    };

    const partidoCreado = partido.postNuevoPartido(nuevoPendiente);
    return partidoCreado;
  } catch (error) {
    throw error;
  }
};

const getJugadorById = (id) => {
  try {
    const jugador = partido.getJugadorById(id);
    return jugador;
  } catch (error) {
    throw error;
  }
};

const postNuevoJugador = (nuevoJugador) => {
  const jugadorParaInsertar = {
    ...nuevoJugador,
    jugadorId: uuid(),
  };
  try {
    const jugadorCreado = partido.postNuevoJugador(jugadorParaInsertar);
    return jugadorCreado;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPendientes,
  getHistorial,
  postFinalizar,
  postNuevoPartido,
  postNuevoJugador,
  getJugadores,
  getJugadorById,
};
