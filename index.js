const express = require('express')
var methodOverride = require('method-override')
require('dotenv').config();

const database = require("./config/database")

const systemConfig = require("./config/system")
const route = require("./routes/client/index.router")
const routeAdmin = require("./routes/admin/index.router")
var bodyParser = require('body-parser')
database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

// app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin
// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`example app listen on port ${port}`);
});