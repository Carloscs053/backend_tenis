const express = require("express");
const router = express.Router();
const partidoController = require("../../controller/partido_controller");

router.get("/pendientes", partidoController.getPendientes);
router.get("/jugados", partidoController.getHistorial);
router.get("/jugadores", partidoController.getJugadores);
router.post("/nuevoJugador", partidoController.postNuevoJugador);
router.post("/nuevoPartido", partidoController.postNuevoPartido);
router.post("/:id/finalizar", partidoController.postFinalizar);

module.exports = router;
