////////VARIABLES////////
const express = require('express');
app =  express();
require('dotenv').config()
var sslRedirect  = require("heroku-ssl-redirect").default;
var compression = require('compression');
const { Pool } = require('pg');
var connectionString = "postgres://mdocxafgwhicga:27880ae1069e486dbc293489547bca4483ba232f83a9ea2f092c0d9a8287e94e@ec2-18-210-159-154.compute-1.amazonaws.com:5432/d103b4gar59tdk";
const pool = new Pool ({
    connectionString:connectionString,
    ssl:{
        rejectUnauthorized:false
    }
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
    
    const text ='INSERT INTO contactinfo(name,email,services,message) VALUES ($1, $2, $3, $4)';
    const values =[data.name, data.email, data.service, data.message];
    try {
        const res = await pool.query(text,values);
        console.log(res.row[0])
    
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