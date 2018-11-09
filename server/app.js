const app = require('express')(),
    mongo = require('mongodb').MongoClient,
    port = process.env.PORT || 5000,
    host = '0.0.0.0',
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



const server = app.listen(port, host, e => {
    if(e) 
        throw e;
    else 
        console.warn('Listening at HOST: '+server.address().address + '  PORT: '+server.address().port);
});