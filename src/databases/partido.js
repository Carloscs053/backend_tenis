const { log } = require("console");
const DB = require("./db.json");
const fs = require("fs");

const getPendientes = () => {
  try {
    let pendientes = DB.partidosPendientes;

    return pendientes;
  } catch (error) {
    console.log("Exception");
    throw { status: 500, message: error };
  }
};

const getHistorial = () => {
  try {
    let historial = DB.historialPartidos;

    return historial;
  } catch (error) {
    console.log("Exception");
    throw { status: 500, message: error };
  }
};

const saveToDataBase = (DB) => {
  fs.writeFileSync("./src/databases/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf8",
  });
};

const deletePendiente = (nuevoHistorico) => {
  const indexPendiente = DB.partidosPendientes.findIndex(
    (pendiente) => pendiente.pendienteId === nuevoHistorico.historicoId
  );

  if (indexPendiente > -1) {
    DB.partidosPendientes.splice(indexPendiente, 1);
    console.log(`Partido borrado de pendientes (Index: ${indexPendiente})`);
  }
};

const postFinalizar = (nuevoHistorico) => {
  const finalizado =
    DB.historialPartidos.findIndex(
      (partido) => partido.historicoId === nuevoHistorico.historicoId
    ) > -1;
  if (finalizado) {
    throw {
      status: 400,
      message: `Match with ID ${nuevoHistorico.historicoId} already exists`,
    };
  } else {
    try {
      console.log("Partido registrado correctamente");
      DB.historialPartidos.push(nuevoHistorico);
      saveToDataBase(DB);

      return nuevoHistorico;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};

const postNuevoPartido = (nuevoPartido) => {
  const partido =
    DB.partidosPendientes.findIndex(
      (partido) => partido.pendienteId === nuevoPartido.pendienteId
    ) > -1;

  if (partido) {
    throw {
      status: 400,
      message: `El partido con la id ${partido.pendienteId} ya existe`,
    };
  } else {
    try {
      console.log("Partido programado correctamente");
      DB.partidosPendientes.push(nuevoPartido);
      saveToDataBase(DB);

      return nuevoPartido;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};

const postNuevoJugador = (nuevoJugador) => {
  try {
    const isAlreadyAdded =
      DB.jugadores.findIndex(
        (jugador) => jugador.nombre === nuevoJugador.nombre
      ) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Player with the name '${nuevoJugador.nombre}' already exists`,
      };
    }

    DB.jugadores.push(nuevoJugador);
    saveToDataBase(DB);
    return nuevoJugador;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

module.exports = {
  getPendientes,
  getHistorial,
  postFinalizar,
  deletePendiente,
  postNuevoPartido,
  postNuevoJugador,
};
