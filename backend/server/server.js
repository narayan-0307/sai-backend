const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const path = require("path");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

//route files
const appRoutes = require("./routes/approutes");
const authRoutes = require("./routes/auth");
const docRoutes = require("./routes/generateDocRoutes");

// console.log('Sanchit',process.env..MONGODB_URI)

//connect to db
connectDB();
//initialize app
const app = express();
app.use(express.json());
app.use(cors());
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

//routers
app.use("/api/app", appRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/doc", docRoutes);
app.get("/api/hello", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(4000, () => {
    console.log("server is running on 4000!")
})
module.exports = app;
