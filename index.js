const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

/**Routes Import */
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

/** Routes */
app.use("/auth", authRoute);
app.use("/post", postRoute);

app.get("/", (req, res) => {
  res.send("SellGuds Server Running");
});

const mongoUrl = process.env.MongoUrl;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is Running at Port: ${PORT}`))
  )
  .catch((error) => console.log("Error connecting to the database: ", error));
