const express = require('express')
const path = require('path')
var methodOverride = require('method-override')
require('dotenv').config();
var flash = require('express-flash')
const database = require("./config/database")

const systemConfig = require("./config/system")
const route = require("./routes/client/index.router")
const routeAdmin = require("./routes/admin/index.router")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// flash
app.use(cookieParser('my password'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// end flash

// tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end tinyMCE
app.use(express.static(`${__dirname}/public`));

// app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin
// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`example app listen on port ${port}`);
});