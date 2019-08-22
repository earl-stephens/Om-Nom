var express = require('express');
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFood = require('../../../models').MealFood;
var pry = require('pryjs')

router.get('/', function(req, res) {
  Meal.findAll({
    include: [
      {
      model: Food,
      as: 'foods',
      attributes: ["id", "name", "calories"],
      through: { attributes: []},
    },
  ],
  })
    .then(meals => {
      console.log(meals);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(meals));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
});
// router.get('/', function(req, res) {
//   Meal.findAll()
//     .then(meals => {
//       console.log(meals);
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).send(JSON.stringify(meals));
//     })
//     .catch(error => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(500).send({ error });
//     });
// });
module.exports = router;
