var express = require('express');
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFoods = require('../../../models').MealFoods;
var pry = require('pryjs');
var fetch = require('node-fetch');

router.get('/food_search', function(req,res) {
  var foodType = req.query.q;
  fetch(`https://om-nom-edamam.herokuapp.com/api/v1/recipes/food_search?q=${foodType}`, {headers: {"Accept": "application/json", "Content-Type": "application/json"}})
  .then(res => res.json())
  .then(json => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(json));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error});
  });
});

router.get('/calorie_search', function(req,res) {
  fetch(`https://om-nom-edamam.herokuapp.com/api/v1/recipes/calorie_search?q=${req.query.q}`, {headers: {"Accept": "application/json", "Content-Type": "application/json"}})
  .then(res => res.json())
  .then(json => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(json));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error});
  });
});

router.get('/time_sort', function(req,res) {
  fetch(`https://om-nom-edamam.herokuapp.com/api/v1/recipes/time_sort?q=${req.query.q}`, {headers: {"Accept": "application/json", "Content-Type": "application/json"}})
  .then(res => res.json())
  .then(json => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(json));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error});
  });
});

module.exports = router;
