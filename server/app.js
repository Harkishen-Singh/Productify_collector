const app = require('express')(),
    mongo = require('mongodb').MongoClient,
    port = process.env.PORT || 5000,
    host = '0.0.0.0',
    // uri = 'mongodb://127.0.0.1:27017',
    uri='mongodb+srv://harkishen:Bbsr131@cluster0-y5bau.mongodb.net/productivity_database?retryWrites=true'
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
let count = 0;
app.get('/keys', (req, res) => {
    let input = req.query.object;
    // input =  input.replace('"', ` `);
    console.warn('RAW '+input)
        let clientObject = JSON.parse(input);
    console.warn('Received '+clientObject['data'].length+ ' object responses from user : '+clientObject.userName);



    mongo.connect(uri, (e, dbo) => {
        if (e) throw e;
        console.warn('Connected!');
        var db = dbo.db('productify_database');
        db.collection('visitedurls_testing').find({}).toArray((e1, result1) => {
            if(e1) throw e1;
            else {
                let visited = false;
                for (let x in result1) {
                    if (clientObject['currentURL'] === result1[x]['url']) {
                        visited = true;
                        console.log('website : '+clientObject['currentURL']+' already visited. Skipping...');
                        dbo.close();
                        res.status(299);
                        res.send('Submitted Successfully!');
                        break;
                    }
                }
                if (visited === false) {
                    let urlObj = {
                        url: clientObject['currentURL']
                    };
                    db.collection('visitedurls_testing').insertOne(urlObj, e2 => {
                        console.warn('new website : '+urlObj.url);
                    });
                    db.collection('testing').find({}).toArray((e, result) => {
                        if (e) throw e;
                        else {
                            console.warn('finding collections...');
                            for (let j=0 ; j<clientObject['data'].length; j++) {
                                let found = false;
                                for (let i=0 ;i< result.length; i++) {
                                    if ((clientObject['data'][j].word === result[i].word) && ( clientObject['data'][j].tags === result[i].tags ) ) {
                                        found = true;
                                        console.log('match found')
                                        let updatedObject = {
                                            word: clientObject['data'][j].word,
                                            indepWordWt: result[i].indepWordWt + clientObject['data'][j].indepWordWt,
                                            depWordWt: result[i].depWordWt + clientObject['data'][j].depWordWt,
                                            occurence: result[i].occurence + clientObject['data'][j].occurence,
                                            tags : clientObject['data'][j].tags
                                        };
                                        let setter = {
                                            $set: updatedObject
                                        };
                                        db.collection('testing').updateOne(result[i], setter, e => {
                                            if (e) 
                                                throw e;
                                            else 
                                                console.warn('Updated word '+ updatedObject.word);
                                        })
                                        break;
                                    }
                                }
                                if (found === false) {
                                    // here to be written
                                    db.collection('testing').insertOne(clientObject['data'][j], e => {
                                        if (e) 
                                            throw e;
                                        else {
                                            console.warn('new word: '+clientObject['data'][j].word);
                                        }
                                    })
                                }
                                
                            } dbo.close();
                            res.status(299);
                            res.send('Submitted Successfully!');
                        }
                    });
                }
            }
        })

        
    });

    
    console.log('count :' + ++count)
    
});

const server = app.listen(port, host, e => {
    if(e) 
        throw e;
    else 
        console.warn('Listening at HOST: '+server.address().address + '  PORT: '+server.address().port);
});