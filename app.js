////////VARIABLES////////
const express = require('express');
app =  express();
require('dotenv').config()
var sslRedirect  = require("heroku-ssl-redirect").default;
var compression = require('compression');
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

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
const middleware = require('./controllers/middleware')

//ROUTES

app.get('/',(req,res,next) => {
    res.render('test')
});
app.post('/thanks', async (req, res) => {
    
    data = {
            name : req.body.name,
            email : req.body.email,
            service: req.body.service,
            message: req.body.message};
    
    //const text =`INSERT INTO customers(name,email,service,message) VALUES(${data.name}, ${data.email}, ${data.service}, ${data.message}) RETURNING *`
    const values =[data.name, data.email, data.service, data.message];
    customers = 'customers'
    client.connect()
      try {
        const res = await client.query(`SELECT * FROM ${customers}`);
        console.log(res.row[1])
        client.end()
    
      }catch (err) {
        console.log(err.stack)
        client.end()
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

app.get('/*',function(req,res) {
    res.redirect(301,res.redirect('https://wwww.'+ req.headers.host+req.url))
})
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError)
app.listen(app.get("port"), () => {
    console.log(`server running at http://localhost:${app.get("port")}`);
});