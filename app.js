require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("./middleware/cors");
const helmet = require("./middleware/helmet");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

app.use(cors);
app.use(helmet);
app.use(express.json());

app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});

module.exports = app;
