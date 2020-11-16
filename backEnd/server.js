"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./user");
const router = require("./router");

const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");

const app = express();

const dbURI =
  "mongodb+srv://cgryanx:1994129921UPenn@webdev.rasxz.mongodb.net/usArmyProj?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.on("open", () => console.log("database opened"));
db.on("close", () => console.log("database closed"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

const port = process.env.PORT || 4000;
app.listen(port, console.log(`Server is running on port: ${port}`));
