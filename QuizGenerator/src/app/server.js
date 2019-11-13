const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const cors = require('cors');

var app = express();
app.use(cors());

app.route('/api/categories').get((req, res) => {
  console.log("hit endpoint /api/categories");

  let rawData = fs.readFileSync('../assets/categories.json');
  console.log("rawData: " + rawData);

  let categories = JSON.parse(rawData);
  console.log(categories);

  res.send(categories);
});

app.route('/api/categories/:category').get((req, res) => {
  let category = req.params['category'];
  console.log("hit endpoint /api/categories/" + category);

  let rawData = fs.readFileSync('../assets/' + category + '.json');
  console.log("rawData: " + rawData);

  let questions = JSON.parse(rawData);
  console.log(questions);

  res.send(questions);

});

app.route('/api/users').get((req, res) => {
  console.log("hit endpoint /api/users");

  let rawData = fs.readFileSync('../assets/loginuser.json');
  console.log("rawData: ", rawData);

  let users = JSON.parse(rawData);
  console.log(users);

  res.send(users);
});



app.listen(3000, () => {
  console.log("Server listening on port 3000");
});


