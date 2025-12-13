const express = require("express");
const v1TenisRouter = require("./v1/router/partido_router");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/v1/tenis", v1TenisRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
