const Partido = require("../models/Partido");
const Jugador = require("../models/Jugador");
const { v4: uuid } = require("uuid");

const getPendientes = async () => {
  try {
    const pendientes = await Partido.find({ estado: "pendiente" });

    const listaJugadores = await Jugador.find();

    const pendientesConNombres = pendientes.map((match) => {
      const matchObj = match.toObject();

      const datosJ1 = listaJugadores.find(
        (j) => j.jugadorId === matchObj.j1.jugadorId
      );
      const datosJ2 = listaJugadores.find(
        (j) => j.jugadorId === matchObj.j2.jugadorId
      );

      return {
        ...matchObj,
        j1: {
          ...matchObj.j1,
          nombre: datosJ1?.nombre || "N/A",
          foto: datosJ1?.foto || "",
        },
        j2: {
          ...matchObj.j2,
          nombre: datosJ2?.nombre || "N/A",
          foto: datosJ2?.foto || "",
        },
      };
    });
    return pendientesConNombres;
  } catch (error) {
    throw error;
  }
};

const getHistorial = async () => {
  try {
    return await Partido.find({ estado: "finalizado" });
  } catch (error) {
    throw error;
  }
};

const getJugadores = async () => {
  try {
    return await Jugador.find();
  } catch (error) {
    throw error;
  }
};

const getJugadorById = async (id) => {
  try {
    return await Jugador.findOne({ jugadorId: id });
  } catch (error) {
    throw error;
  }
};

const postFinalizar = async (datosPartido) => {
  try {
    const partidoActualizado = await Partido.findOneAndUpdate(
      { idPartido: datosPartido.idPartido },
      {
        estado: "finalizado",
        "j1.juegos": datosPartido.j1.juegos,
        "j1.sets": datosPartido.j1.sets,
        "j2.juegos": datosPartido.j2.juegos,
        "j2.sets": datosPartido.j2.sets,
      },
      { new: true }
    );
    return partidoActualizado;
  } catch (error) {
    throw error;
  }
};

const postNuevoPartido = async (datosPartido) => {
  try {
    const nuevoPartido = new Partido({
      idPartido: uuid(),
      torneo: datosPartido.torneo,
      ronda: datosPartido.ronda,
      saque: datosPartido.saque,
      estado: "pendiente",
      j1: { jugadorId: datosPartido.idJ1, juegos: [], sets: 0 },
      j2: { jugadorId: datosPartido.idJ2, juegos: [], sets: 0 },
    });
    return await nuevoPartido.save();
  } catch (error) {
    throw error;
  }
};

const postNuevoJugador = async (nuevoJugador) => {
  try {
    const jugador = new Jugador({
      jugadorId: uuid(),
      nombre: nuevoJugador.nombre,
      foto: nuevoJugador.foto,
    });
    return await jugador.save();
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
