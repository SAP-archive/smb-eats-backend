const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 8080 

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.get('/kitchen', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/kitchen.html'));
})

app.get('/delivery', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/delivery.html'));
})
 
app.listen(port, function () {
    console.log('ByD Eats listening on port ' + port);
});