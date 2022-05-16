const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');
const session = require('express-session');
const dotenv = require("dotenv");
const PORT = 3000;

dotenv.config();

// mongoose configuration
mongoose.connect('mongodb://localhost:27017/food-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

// ejs configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware (ran each time a req is sent)
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import routers
const homeRoute = require('./routes/home.js');
const menuRoute = require('./routes/menu.js');
const userRoute = require('./routes/menu.js')

//pass routers to express as middleware
app.use('/', homeRoute);
app.use('/menu', menuRoute)
app.use('/user', userRoute);

// listening for port connection
app.listen(PORT, () => {
  console.log(`SERVING ON PORT ${PORT}`)
})