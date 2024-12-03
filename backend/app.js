const express = require("express");
const router = require("./router/UserRouter");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

module.exports = app;
