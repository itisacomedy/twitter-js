const express = require( 'express' );
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');

const app = express();

//app.engine (docs) to use nunjucks.render as the function to actually render html
//app.set (docs) the default view engine to html (so we don't have to specify on every render)
//nunjucks.configure (docs) the views path to our views folder (where we store our templates)
app.set('view engine', 'html'); 
app.engine('html', nunjucks.render);

nunjucks.configure('views', { noCache: true });

var locals = {
    title: 'An Example',
    people: [
        {name: 'Gandalf'},
        {name: 'Frodo' },
        {name: 'Hermione'}
    ]
};

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

nunjucks.render('index.html', locals, function (err, output) {
    console.log('output', output);
    console.log('err', err);
});

//create some logging middleware that will fire for every incoming request
app.use(volleyball);

//adding a second logger which triggers only for requests to a certain URI and all sub-URIs, 
//for example any URI starting with /special/
app.use('/special/',function (req, res, next) {
    console.log('you reached the special area');
    next();
})

app.get('/', (req, res) => res.render( 'index', {title: 'Hall of Fame', people: people})) //localhost:3000

app.get('/News', (req, res) => res.send('NEWS')) //localhost:3000/News

app.listen(3000);