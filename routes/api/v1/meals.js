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
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(meals));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
});

router.get('/:id', function(req, res) {
  Meal.findAll({ where: { id: req.params.id },
    include: [
      {
      model: Food,
      as: 'foods',
      attributes: ["id", "name", "calories"],
      through: { attributes: []},
      },
      ],
    }
  )
    .then(meal => {
      if (meal[0] instanceof Meal) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(meal));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify("Not Found"));
      }
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
});

module.exports = router;
