var express = require('express');
var router = express.Router();
var Food = require('../../../models').Food;
var pry = require('pryjs')

router.get('/', function(req, res) {
  Food.findAll()
    .then(foods => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
});

router.get('/:id', function(req, res) {
  Food.findAll( { where: { id: req.params.id } } )
    .then(foods => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
});

router.post('/', function(req, res) {
  Food.create({
    name: req.body.food.name,
    calories: req.body.food.calories
  })
    .then(food => {
      if(food == null) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).send("Unauthorized");
      }
      else {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(JSON.stringify(food));
      }
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
});

router.put('/:id', function(req, res) {
  Food.update({
    name: req.body.food.name,
    calories: req.body.food.calories
  },
    {
      returning: true,
      where: {
        id: parseInt(req.params.id)
      }
    })
    .then(food => {
      if(food == null) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).send("Unauthorized");
      }
      else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(food[1][0].dataValues));
      }
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
});

router.delete('/:id', function(req, res) {
  Food.destroy( { where: { id: req.params.id } } )
  .then(food => {
    if(food == null) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(404).send("Not Found");
    }
    else {
      res.setHeader('Content-Type', 'application/json');
      res.status(204).send();
    }
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error });
    });
});
module.exports = router;
