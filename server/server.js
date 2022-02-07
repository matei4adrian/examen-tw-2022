const express = require("express");
const connection = require("./models").connection;
const router = require("./routes");
const app = express();
const cors = require("cors");

let serverPort = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/reset", async (req, res) => {
  connection
    .sync({ force: true })
    .then(() => {
      res.status(201).send({ message: "Database reset" });
    })
    .catch(() => {
      res.status(500).send({ message: "Database reset failed" });
    });
});

app.use("/*", (req, res) => {
  res.status(200).send("The application is running!");
});

app.listen(serverPort, () => {
  console.log("Server is running on port " + serverPort);
});
