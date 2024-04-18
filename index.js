const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const DatabaseConnection = require('./db');
const router = require('./routes/routes');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

const dotenv = require('dotenv');
dotenv.config()

var store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'websiteSession',
    expiresKey: '_exp_'
});

DatabaseConnection(process.env.DB_URL)

app.use(cors());
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));
app.use(cookieParser())

store.on('error', function(error) {
    console.log("Mongoose Session Storing error",error);
});
  
app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 1 
    },
    store: store,
    resave: true,
    saveUninitialized: false
}));

app.use("/api", router)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started in http://localhost:${PORT}`)
})