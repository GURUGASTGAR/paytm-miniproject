const express = require("express");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const mainRoute = require("./routes/index");
app.use("/api/v1", mainRoute);

console.log("servre is listning on port: 3000");
app.listen(3000);
