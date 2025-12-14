const mongoose = require("mongoose");

const PartidoSchema = new mongoose.Schema({
  idPartido: { type: String, required: true, unique: true },
  torneo: String,
  ronda: String,
  saque: Boolean,
  // Este campo es CLAVE: diferencia pendientes de finalizados
  estado: {
    type: String,
    enum: ["pendiente", "finalizado"],
    default: "pendiente",
  },
  j1: {
    jugadorId: String,
    juegos: [Number],
    sets: Number,
  },
  j2: {
    jugadorId: String,
    juegos: [Number],
    sets: Number,
  },
});

module.exports = mongoose.model("Partido", PartidoSchema, "partidos");
