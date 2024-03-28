
const http = require('http');
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
// const displayDOM = require('./quiz.js');
// allJSON.runalljson()

// const randonjson = require('./random.js')
// randonjson.runrandomjson()

const app = express();

app.use(express.static('public'));
const bodyParser = require('body-parser');
const { Script } = require('vm');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'scripts', 'index.js'));    
});
app.get('/quiz.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'scripts', 'quiz.js'));    
});

app.get('/random.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'scripts', 'random.js'));    
});
app.get('/result.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'scripts', 'result.js'));    
});

app.get('/quiz.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'quiz.html'));    
});

app.get('/option.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'option.html'));    
});

app.get('/quiz.md', (req, res) => {
  res.sendFile(path.join(__dirname, 'quiz.md'));    
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));    
});

app.get('/quiz.json', (req, res) => {
  const mdPath = path.join(__dirname,'JSONs', 'quiz.json');
    fs.readFile(mdPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end(data);
    }); 
});

app.get('/execute' , ()=>{
  //console.log('inside execute')
  require('./scripts/quiz.js');
  require('./scripts/random.js');
});

app.get('/random', (req, res) => {
  //console.log('random.json')
  const mdPath = path.join(__dirname,'JSONs', 'random.json');
    fs.readFile(mdPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end(data);
    });;    
});

app.get('/quiz.md', (req, res) => {
 const mdPath = (path.join(__dirname,'quiz.md'));   
 fs.readFile(mdPath, (err, data) => {
  if (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/markdown' });
  res.end(data);
}); 
});

app.post('/submit', (req, res) => {
    
  const jsonData = req.body;
  //console.log(jsonData)
//  console.log(jsonData)

  fs.writeFileSync(path.join(__dirname,'JSONs', 'result.json'), JSON.stringify(jsonData, null, 2));

  res.send('Data saved successfully');
});




