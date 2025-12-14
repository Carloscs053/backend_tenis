const express = require("express");
const mongoose = require("mongoose");
const v1TenisRouter = require("./v1/router/partido_router");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const MONGO_URI = "mongodb+srv://root:root@cluster-tenis.vnb5v64.mongodb.net/";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🟩 Conectado a MongoDB Atlas"))
  .catch((e) => console.error("🟥 Error conectando a Mongo: ", e));

app.use((req, res, next) => {
  console.log(`🔔 [PORTERO] Petición recibida: ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/tenis", v1TenisRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
