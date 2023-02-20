//Stock Market Portfolio Map

const express = require('express');
const {engine} = require('express-handlebars');

const app = express();
const path = require("path");

const PORT = process.env.PORT || 5000;

//Set handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = "hello there, this is other stuff!";

//Set handlebar routes
app.get('/', (req, res) => {
    res.render('home', {
        stuff: otherstuff
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})