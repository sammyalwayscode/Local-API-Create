const express = require("express");
const PORT = 3048;
const app = express();
const cors = require("cors");
require("./Config/LocalDB");
// require("dotenv").config();
const routPath = require("./Controller/Router");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is Ready");
});

app.use(cors({ origin: "*" }));

app.use("/api", routPath);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
