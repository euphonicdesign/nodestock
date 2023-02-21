//Stock Market Portfolio Map

const express = require('express');
const {engine} = require('express-handlebars');

const app = express();
const path = require("path");
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));





// API KEY pk_7935fc5673e842daaf959588466c6d96
//create call_api function

function call_api(finishedAPI, ticker) {
    request("https://cloud.iexapis.com/stable/stock/"+ticker+"/quote?token=pk_7935fc5673e842daaf959588466c6d96", {json: true}, (err,res,body)=>{
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

//Set handlebar index GET route
app.get('/', (req, res) => {
    call_api(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    });    
});


// call_api(function, req.body.stock_ticker)


//Set handlebar index POST route
app.post('/', (req, res) => {
    call_api(function(doneAPI){
        // posted_stuff = req.body.stock_ticker;

        res.render('home', {
            stock: doneAPI,
            // posted_stuff: posted_stuff
        });
    }, req.body.stock_ticker);    
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