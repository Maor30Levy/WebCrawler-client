const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');


const port = process.env.PORT;
const serverHost = process.env.SERVER_HOST;
const serverPort = process.env.PORT;




const app = express();
const checkURLRouter = require('./router/checkUrlRouter');
const publicDirectory = path.join(__dirname, '../public');


app.use(express.json());
app.use(cors());
app.use(express.static(publicDirectory));
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use("/serverHost", createProxyMiddleware({
    target: `${serverHost}:${serverPort}`,
    changeOrigin: true,
    pathRewrite: {
        '^serverHost': ""
    }
}));

app.get('', (req, res) => {
    res.render('index', {
        serverHost: serverHost
    });
});

app.use(checkURLRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
