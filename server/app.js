const app = require('express')(),
    mongo = require('mongodb').MongoClient,
    port = process.env.PORT || 5000,
    host = '0.0.0.0',
    uri = '',
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true, }));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Working');
});

app.get('/keys', (req, res) => {
    let clientObject = JSON.parse(req.query.object);
    console.warn('Received from client below')
    console.warn(clientObject);
    res.status(100);
    res.send('Thanks!');
});

const server = app.listen(port, host, e => {
    if(e) 
        throw e;
    else 
        console.warn('Listening at HOST: '+server.address().address + '  PORT: '+server.address().port);
});