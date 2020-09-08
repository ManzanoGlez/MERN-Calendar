const express = require("express");
const cors = require("cors");
const DBConnection = require("./database/config");

const app = express();
require("dotenv").config();
DBConnection();

app.use(express.static("public"));

app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/api"));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
});
