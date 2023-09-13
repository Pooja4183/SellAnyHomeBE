const express = require("express"),
  bodyParser = require("body-parser");

const session = require("express-session");
const passport = require("../config/passport");

const app = express();

const categoryRoutes = require("../service/categoryService");
const propertyRoutes = require("../service/propertyService");
const propertySearchRoutes = require("../service/propertySearchService");
const neighbourRoutes = require("../service/neighbourService");
const exclusiveRoutes = require("../service/exclusiveService");
const contactRoutes = require("../service/contactService");
const agentRoutes = require("../service/agentService");
const loginRoutes = require("../service/loginService");
const logoutRoutes = require("../service/logoutService");
const userRoutes = require("../service/userService");
const cors = require('cors');

const mongo = require("../config/app-mongo.js");

mongo.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const corsOptions = {
    origin: 'http://www.tomorrowdubai.com', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: 'sellanyhome',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  //console.log('Request: ' + req.body);
 // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/categories", categoryRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/search", propertySearchRoutes);
app.use("/api/neighbour", neighbourRoutes);
app.use("/api/exclusive", exclusiveRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
