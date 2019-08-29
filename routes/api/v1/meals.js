var express = require('express');
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFoods = require('../../../models').MealFoods;

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

router.post('/:mealId/foods/:foodId', function(req, res) {
  Meal.findByPk(req.params.mealId)
  .then(meals => {
    if (meals) {
      return Food.findByPk(req.params.foodId)
      .then(foods => {
        if (foods) {
          return meals.addFood(foods)
          .then(newmeal => {
            var message = {"message": `successfully added ${foods.name} to ${meals.name}`};
            res.setHeader('Content-Type', 'application/json');
            res.status(201).send(JSON.stringify(message));
          })
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.status(404).send(JSON.stringify("Food not found"));
        }
      })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify("Meal not found"));
    }
  })
  .catch(error => {console.log(error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error });
  });
});

router.delete('/:mealId/foods/:foodId', function(req, res) {
  Meal.findByPk(req.params.mealId)
  .then(meals => {
    if (meals) {
      return Food.findByPk(req.params.foodId)
      .then(foods => {
        if (foods) {
          return meals.removeFood(foods)
          .then(newmeal => {
            var message = {"message": `successfully added ${foods.name} to ${meals.name}`};
            res.setHeader('Content-Type', 'application/json');
            res.status(204).send(JSON.stringify(message));
          })
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.status(404).send(JSON.stringify("Food not found"));
        }
      })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify("Meal not found"));
    }
  })
  .catch(error => {console.log(error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error });
  });
});

module.exports = router;
