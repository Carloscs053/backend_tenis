const mongoose = require("mongoose");

const JugadorSchema = new mongoose.Schema({
  jugadorId: { type: String, require: true, unique: true },
  nombre: { type: String, required: true },
  foto: { type: String, default: "" },
});

module.exports = mongoose.model("Jugador", JugadorSchema, "jugadores");
