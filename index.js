const express = require('express');
const posts = require('./data/posts.json');

const app = express();
const port = 3000;

// app.set('view engine', 'pug');

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', '*');

    next();
});

app.options('/posts', (req, res) => {
    // OK the preflight req
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.sendStatus(200);
})

app.get('/posts', (req, res) => {
    res.send(posts);
});

// app.use(express.static('public'));
app.listen(port, () => console.log(`Server running: listening on port ${port}!`));