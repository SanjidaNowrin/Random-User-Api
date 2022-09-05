const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5001;

const userRoute = require("./routes/user.route");

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Random User Api");
});

app.listen(port, () => {
  console.log(`Random user running  on port ${port}`);
});
app.all("*", (req, res) => {
  res.send("No route found");
});

// handle error
process.on("UnhandledRejection", (error) => {
  app.close(() => {
    process.exit(1);
  });
});
