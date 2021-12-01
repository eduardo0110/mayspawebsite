////////VARIABLES////////
const express = require('express');
app =  express();
require('dotenv').config()
var sslRedirect  = require("heroku-ssl-redirect").default;
var compression = require('compression');
//////////////////////////////////
/////////////database/////////////
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})


//MIDDLEWARE
app.set("port",process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.json());
app.use(sslRedirect());
app.disable('x-powered-by');
app.use(compression());
app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended:false
    })
);

const errorController  = require('./controllers/errorController');
const middleware = require('./controllers/middleware')

//ROUTES

app.get('/',(req,res,next) => {
    res.render('test')
});

app.get('/contact',(req,res) => {
    res.render('contact')
})

app.get("/services" , (req,res) => {
    res.render('services')
})

app.get("/about" , (req,res) => {
    res.render("about")
})

app.get('/maysspabeauty.com/contact/*' , (req , res) => {
    res.render('contact')
})

app.get('/*',function(req,res) {
    res.redirect(301,res.redirect('https://wwww.'+ req.headers.host+req.url))
})
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError)
app.listen(app.get("port"), () => {
    console.log(`server running at http://localhost:${app.get("port")}`);
});