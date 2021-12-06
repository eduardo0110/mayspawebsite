////////VARIABLES////////
const express = require('express');
app =  express();
require('dotenv').config()
var sslRedirect  = require("heroku-ssl-redirect").default;
var compression = require('compression');
const { Pool } = require('pg');
var connectionString = "postgres://postgres@localhost:5432/eduardosevereyn";
const pool = new Pool ({
    connectionString:connectionString
});


//MIDDLEWARE
app.set("port",process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(sslRedirect());
app.disable('x-powered-by');
app.use(compression());
app.use(express.static("public"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended:false
    })
);
app.use
const errorController  = require('./controllers/errorController');
//const middleware = require('./controllers/middleware')

//ROUTES

app.get('/',(req,res,next) => {
    res.render('test')
});
app.post('/thanks', async (req, res) => {
    pool.connect() 
    data = {
            name : req.body.name,
            email : req.body.email,
            service: req.body.service,
            message: req.body.message};
    
    const text ='INSERT INTO nada(name,email,services,message) VALUES ($1, $2, $3, $4)';
    const values =[data.name, data.email, data.service, data.message];
    
    
    
      try {
        const res = await pool.query(text,values);
        
        
    
      }catch (err) {
        console.log(err.stack)
        
      } 
  res.render('thanks')
})
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


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError)
app.listen(app.get("port"), () => {
    console.log(`server running at http://localhost:${app.get("port")}`);
});