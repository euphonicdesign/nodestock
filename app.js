//Stock Market Portfolio Map

const express = require('express');
const {engine} = require('express-handlebars');

const app = express();
const path = require("path");
const request = require('request');

const PORT = process.env.PORT || 5000;

// API KEY pk_7935fc5673e842daaf959588466c6d96
//create call_api function

function call_api(finishedAPI) {
    request("https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_7935fc5673e842daaf959588466c6d96", {json: true}, (err,res,body)=>{
        if (err) {
            return console.log(err);
        }
        // console.log(body);
        if (res.statusCode === 200){
            // console.log(body);
            finishedAPI(body);
        }
    });
};


//Set handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = "hello there, this is other stuff!";

//Set handlebar routes
app.get('/', (req, res) => {
    call_api(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    });    
});

// create about page route
app.get('/about.html', (req, res) => {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})