const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

//Configure Express app
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const port = process.env.PORT || 8080 


app.use('/api', require('./routes/api'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.get('/product', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/product.html'));
})

app.get('/customer', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/customer.html'));
})

app.get('/kitchen', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/kitchen.html'));
})

app.get('/delivery', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/delivery.html'));
})

app.get('/route', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/route.html'));
})
 
app.listen(port, function () {
    console.log('ByD Eats listening on port ' + port);
});