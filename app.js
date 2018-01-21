const express = require( 'express' );
const volleyball = require('volleyball');

const app = express();

//create some logging middleware that will fire for every incoming request
app.use(volleyball);

//adding a second logger which triggers only for requests to a certain URI and all sub-URIs, 
//for example any URI starting with /special/
app.use('/special/',function (req, res, next) {
    console.log('you reached the special area');
    next();
})

app.get('/', (req, res) => res.send('HOME')) //localhost:3000

app.get('/News', (req, res) => res.send('NEWS')) //localhost:3000/News

app.listen(3000);