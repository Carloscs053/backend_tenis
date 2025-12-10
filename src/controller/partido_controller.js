const partidos_service = require("../services/partido_service");

const getPendientes = (req, res) => {
  try {
    const pendientes = partidos_service.getPendientes();

    res.status(200).send({ status: 200, data: pendientes });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED GETPENDIENTES",
      data: { error: error?.message || error },
    });
  }
};

const getHistorial = (req, res) => {
  try {
    const historial = partidos_service.getHistorial();

    res.status(200).send({ status: 200, data: historial });
  } catch (error) {
    res.status(error?.message || error).send({
      status: "FAILED GETHISTORIAL",
      data: { error: error?.message || error },
    });
  }
};

const getJugadores = (req, res) => {
  try {
    const jugadores = partidos_service.getJugadores();

    res.status(200).send({ status: 200, data: jugadores });
  } catch (error) {
    res.status(error?.message || error).send({
      status: "FAILED GETJUGADORES",
      data: { error: error?.message || error },
    });
  }
};

const postFinalizar = (req, res) => {
  const { pendienteId, torneo, ronda, saque, j1, j2 } = req.body;
  if (!pendienteId || !torneo || !ronda || saque === undefined || !j1 || !j2) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Faltan datos obligatorios o estructura incorrecta" },
    });
  }

  if (
    !j1.jugadorId ||
    j1.sets === null ||
    j1.sets === undefined ||
    !j2.jugadorId ||
    j2.sets === null ||
    j2.sets === undefined
  ) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error: "No se puede finalizar un partido sin resultados (sets/juegos)",
      },
    });
  }

  const nuevoHistorico = {
    historicoId: pendienteId,
    torneo,
    ronda,
    saque,
    j1: {
      jugadorId: j1.jugadorId,
      juegos: j1.juegos,
      sets: j1.sets,
    },
    j2: {
      jugadorId: j2.jugadorId,
      juegos: j2.juegos,
      sets: j2.sets,
    },
  };

  try {
    const partidoFinalizado = partidos_service.postFinalizar(nuevoHistorico);
    res.status(201).send({ status: "OK", data: partidoFinalizado });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const postNuevoPartido = (req, res) => {
  const { body } = req;
  if (
    !body.torneo ||
    !body.ronda ||
    body.saque === undefined ||
    !body.idJ1 ||
    !body.idJ2
  ) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error: "Faltan datos obligatorios",
      },
    });
  }

  const nuevoPartido = {
    torneo: body.torneo,
    ronda: body.ronda,
    saque: body.saque,
    idJ1: body.idJ1,
    idJ2: body.idJ2,
  };

  try {
    const crearNuevoPartido = partidos_service.postNuevoPartido(nuevoPartido);
    res.status(201).send({ status: "OK", data: crearNuevoPartido });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const postNuevoJugador = (req, res) => {
  const { body } = req;
  if (!body.nombre) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Falta el nombre del jugador" },
    });
  }

  const nuevoJugador = {
    nombre: body.nombre,
    foto: body.foto || "",
  };

  try {
    const jugadorCreado = partidos_service.postNuevoJugador(nuevoJugador);
    res.status(201).send({ status: "OK", data: jugadorCreado });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getPendientes,
  getHistorial,
  postFinalizar,
  postNuevoPartido,
  postNuevoJugador,
  getJugadores,
};
