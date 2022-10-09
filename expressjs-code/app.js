const express = require('express'); 
const app = express() ;
var path = require('path');
var cors = require('cors')
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); 
app.use(cors({
    origin: '*'
}));
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));
  

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});






app.get('/api/getProfileData', function (req, res) { 
    let data = fs.readFileSync('data.json');
    data = JSON.parse(data);
    var host = req.headers.host.replace('localhost:3001','http://127.0.0.1:3001')
    data.profile_url = `${host}/avatar.png`
    console.log(data);  
    res.json(data) 
})
// app.post('/api/postProfileData', cors(), function (req, res) { 
//     var body = (req.body) 
//     console.log(body); 
//     res.json({})
// })

 

app.listen(3001, () => { 
        var num_1 = 5
        var num_2 = 3
        console.log(`Sum of ${num_1} + ${num_2} = ${num_1+num_2}`)
  })