var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
const cors = require('cors');
app.use(cors());

/* GET home page. */
router.post('/', function(req, res, next) {
  
  let category = req.body.categories;
  console.log("hit endpoint /api/categories/" + category);
  var file = require("../assets/" + category);
  
  res.json(file);
});

module.exports = router;
