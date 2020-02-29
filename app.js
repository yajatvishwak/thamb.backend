const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());
const port = 5000;

const teamsConnectRoutes = require("./routes/teams-connect-routes");

app.get("/", (req, res, next) => {
  res.json({ message: "Hello Express" });
});
app.use("/", teamsConnectRoutes);
mongoose
  .connect("mongodb://127.0.0.1:27017/thamb", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("yoyoyo its connected");
    app.listen(port, () => console.log(`listening on port : ${port}`));
  })
  .catch(() => console.log("Nononono Couldnt connect to server"));
