const express = require("express");
const UserRouter = require("./routes/UserRoutes");
const ToDoRouter = require("./routes/ToDoRoutes");
const app = express();
const cors = require("cors");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? "./.env.test" : "./.env",
});

if (process.env.NODE_ENV !== "test") {
  require("./config/db");
}

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Everything is working fine" });
});

app.use("/api", UserRouter);
app.use("/app", ToDoRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

module.exports = app;
