const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const path = require('path');
const { keys } = require('./keys/keys');

const port = keys.port;

const app = express();
const checkURLRouter = require('./router/checkUrlRouter');
const serverRouter = require('./router/server-requests-router');
const publicDirectory = path.join(__dirname, '../public');


app.use(express.json());
app.use(cors());
app.use(express.static(publicDirectory));
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index');
});

app.use(checkURLRouter);
app.use(serverRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
