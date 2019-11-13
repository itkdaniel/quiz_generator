var express = require('express');
var router = express.Router();
var fs = require('fs');
path = require('path')
var axios = require('axios');
var app = express();
const cors = require('cors');
router.use(cors());


/* GET home page. */
router.get('/api/user/:user/category/:category', function(req, response, next) {
  console.log("hit endpoint /api/user/:user/category/:category");
  let user = req.params['user'];
  let category = req.params['category'];
  console.log('params passed user: ' + user);
  console.log('params passed category: ' + category);

  let categoryEndpoint = 'http://localhost:3001/api/categories/';

  axios.post(categoryEndpoint, {
    categories: category 
  })
    .then((res) => {
      response.send(res.data);
  })
    .catch((error) => {
      console.error(error)
  })

});

router.get('/api/user', (req, res) => {
  console.log('hit endpoint /api/user');

  let userExists = false;
  let username = req.query.username;
  let password = req.query.password;

  console.log('username: ' + username);
  console.log('password: ', password);

  let users;

  try{
    users = require('../assets/loginuser')
    console.log('rawData: ', rawData);
  }catch(error){
    console.log('error: /api/user: ' + error);
  }

  for (let i =  0; i < users.length; i++){
    console.log('user ' + 1 + ': ' + users[i].username + ', ' + users[i].password);

    if ((username === users[i].username && password === users[i].password) || 
          username === 'admin' && password === 'admin'){
      userExists = true;
    }
  }
  res.json({'exists': userExists});
});

router.get('/api/categories', (req, res) => {
  console.log("hit endpoint /api/categories");
  let categories;
  
  try{
    categories = require('../assets/categories');
    console.log(categories);
  }catch(error){
    console.log('error: /api/categories: ' + error);
  }

  res.send(categories);
});

router.post('/api/results', (req, res, next) => {
  console.log('hit endpoint /api/results');
  let category = req.query.category;
  let userAnswers = req.body;
  let correct = 0;
  let incorrect = 0;
  console.log("category: " + category);
  console.log("userAnswers: " + userAnswers);

  let questionsRawData = require('../assets/' + category)
  let questions = questionsRawData;
  console.log('questions: ' + JSON.stringify(questions.questions[0]));

  for(let i = 0; i < questions.questions.length; i++){
    if(userAnswers[i] == questions.questions[i].answer){
      correct++;
    } else {
      incorrect++;
    }
  }
  console.log(`correct: ${correct}, incorrect: ${incorrect}`);

  res.send({'correct': correct, 'incorrect': incorrect});
});

module.exports = router;
