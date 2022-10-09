const express = require("express");
const bodyParser = require("body-parser");
const  cookieParser = require('cookie-parser');
const router = require("./src/routes/users");
const routerCategory = require("./src/routes/category");
const routerProduct = require("./src/routes/product");
const routerNews = require("./src/routes/news");
const routerOrder = require("./src/routes/order");
const app = express();
const cors = require("cors");
require("dotenv").config();
const POST = 5000;
app.use(bodyParser.json());
const connectDb = require("./src/config/connectDb");
const upload = require("./src/utils/uploadImage");
const authRoute = require('./src/auth/auth')
var passport = require("passport");
connectDb();
app.use(cors())
app.use(express.json());
app.use("/uploads", express.static("./public/uploads"));
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", router);
app.use("/api/category", routerCategory);
app.use("/api/products", routerProduct);
app.use("/api/news", routerNews);
app.use("/api/order", routerOrder);
app.use("/api/upload",upload,(req,res)=>{
  res.json({
    success:1,
    image:req?.file?.filename
  })
})
app.set("trust proxy", 1);
const session = require('express-session')
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
  }))
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.options('*', cors())
app.use("/auth", authRoute);
app.get("/getuser", (req, res) => {
  res.send(req.user);
})

app.listen(POST, () =>
  console.log(`Server running on port:http://localhost:${POST}`)
);
