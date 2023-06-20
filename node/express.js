// npm i express    : 요청/응답하기위해
// npm i cors       : html 과 요청/응답하기위해
const { log } = require('console');
const express = require('express')
const cors = require('cors');   // cors!
const app = express()
const port = 3000;

app.use(cors());  // cors!

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/dog', function (req, res) {
    res.send({'sound' : '멍멍'})
})

app.get('/cat', function (req, res) {
    res.send({'sound' : '야옹'})
})


app.get('/get/:param', function (req, res) {
    const q = req.params;
    console.log(q);
    res.json({'param': q.param});
})

app.get('/query/:string', function (req, res) {
    const q = req.query
    console.log(q);
    res.json({'string': q.string});
})

app.get('/sound/:name',function (req,res){
    // const p = req.params;
    // const name = p.name;
    const { name } = req.params;
    if(name =="dog"){
        res.json({'sound':'멍멍'})
    }else if(name == "cat"){
        res.json({'sound':"야옹"})
    }
})

app.use(express.json());
app.get('/post/:id',(req,res) => {
    const p = req.params;
    console.log(p);
    const b = req.body;
    console.log(b);

    res.send({'message' : 'hello'});
})

app.listen(port, ()=>{  
    console.log(`listening on port ${port}`);
})