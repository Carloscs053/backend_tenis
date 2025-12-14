const partidos_service = require("../services/partido_service");

const getPendientes = async (req, res) => {
  try {
    const pendientes = await partidos_service.getPendientes();
    res.status(200).send({ status: 200, data: pendientes });
  } catch (error) {
    res
      .status(500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// ASYNC AÑADIDO
const getHistorial = async (req, res) => {
  try {
    const historial = await partidos_service.getHistorial();
    res.status(200).send({ status: 200, data: historial });
  } catch (error) {
    res
      .status(500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getJugadores = async (req, res) => {
  try {
    const jugadores = await partidos_service.getJugadores();
    res.status(200).send({ status: 200, data: jugadores });
  } catch (error) {
    res
      .status(500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getJugadorById = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!id)
    return res
      .status(400)
      .send({ status: "FAILED", data: { error: "ID obligatorio" } });

  try {
    const jugador = await partidos_service.getJugadorById(id);
    res.status(200).send({ status: "OK", data: jugador });
  } catch (error) {
    res
      .status(500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const postFinalizar = async (req, res) => {
  const { idPartido, torneo, ronda, saque, j1, j2 } = req.body;

  if (!idPartido || !j1 || !j2) {
    return res
      .status(400)
      .send({ status: "FAILED", data: { error: "Faltan datos" } });
  }

  const datosParaActualizar = {
    idPartido,
    j1: { juegos: j1.juegos, sets: j1.sets },
    j2: { juegos: j2.juegos, sets: j2.sets },
  };

  try {
    console.log("📝 Guardando en Atlas...");
    const partidoFinalizado = await partidos_service.postFinalizar(
      datosParaActualizar
    );
    console.log("✅ Guardado en la nube!");
    res.status(201).send({ status: "OK", data: partidoFinalizado });
  } catch (error) {
    console.error("❌ Error:", error);
    res
      .status(500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const postNuevoPartido = async (req, res) => {
  const { body } = req;

  const nuevoPartido = {
    torneo: body.torneo,
    ronda: body.ronda,
    saque: body.saque,
    idJ1: body.idJ1,
    idJ2: body.idJ2,
  };

  try {
    const crearNuevoPartido = await partidos_service.postNuevoPartido(
      nuevoPartido
    );
    res.status(201).send({ status: "OK", data: crearNuevoPartido });
  } catch (error) {
    res
      .status(500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const postNuevoJugador = async (req, res) => {
  const { body } = req;
  if (!body.nombre) return res.status(400).send({ error: "Falta nombre" });

  try {
    const jugadorCreado = await partidos_service.postNuevoJugador(body);
    res.status(201).send({ status: "OK", data: jugadorCreado });
  } catch (error) {
    res
      .status(500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getPendientes,
  getHistorial,
  getJugadores,
  getJugadorById,
  postFinalizar,
  postNuevoPartido,
  postNuevoJugador,
};
