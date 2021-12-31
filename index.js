const express = require("express");
const bodyParser = require("body-parser");
const router = require("./src/routes/users");
const routerCategory = require("./src/routes/category");
const routerProduct = require("./src/routes/product");
const app = express();
const cors = require('cors');
require("dotenv").config();
const POST = 5000;
app.use(bodyParser.json());
const connectDb = require("./src/config/connectDb");

connectDb();
app.use(cors())
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", router);
app.use("/api/category",routerCategory)
app.use("/api/products",routerProduct)
app.listen(POST, () =>
  console.log(`Server running on port:http://localhost:${POST}`)
);
