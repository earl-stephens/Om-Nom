var express = require('express');
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFoods = require('../../../models').MealFoods;
var pry = require('pryjs')

router.get('/food_search', function(req,res) {
  var foodType = req.query.q;
  // fetch(`/api/v1/recipes/food_search?q=beef`, {headers: {"Accept": "application/json", "Content-Type": "application/json"}})
  fetch(`localhost:3000/api/v1/recipes/food_search?q=${foodType}`, {headers: {"Accept": "application/json", "Content-Type": "application/json"}})
  .then(res => res.json())
  // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(myJson) {
  //   console.log(JSON.stringify(myJson));
  // })
  .then(created => {console.log(created);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(created));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error});
  });
});

module.exports = router;
