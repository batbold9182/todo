require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
connectDB();

const dataRoute = require("./routes/dataRoute");
const authRoute = require("./routes/authRoute");

app.use("/data", dataRoute);
app.use("/auth", authRoute);

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
