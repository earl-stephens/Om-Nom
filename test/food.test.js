var request = require('supertest');
var app = require('../app');
var shell = require('shelljs');
var express = require('express');
var test = express();
var Food = require("../models").Food

describe('Food', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create');
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all');
  });

  it('GET request for all foods', () => {
    return request(app)
    .get('/api/v1/foods')
    .then(response => {
      expect(response.statusCode).toBe(200),
      expect(response.body[0].name).toBe('banana')
      expect(response.body[0].calories).toBe(100)
    })
  })

  it('GET request for individual food', () => {
    return request(app)
    .get('/api/v1/foods/1')
    .then(response => {
      expect(response.statusCode).toBe(200),
      expect(response.body[0].name).toBe('banana')
      expect(response.body[0].calories).toBe(100)
    })
  })

  it('GET request for individual food - SADPATH', () => {
    return request(app)
    .get('/api/v1/foods/a')
    .then(response => {
      expect(response.statusCode).toBe(500)
    })
  })

  it('POST request for individual food', () => {
    var body = { "food": {
        "name": "chocolate bar",
        "calories": "250"
      }
    }
    return request(app)
    .post('/api/v1/foods').send(body).set("Content-Type", "application/json")
    .then(response => {
      expect(response.body.id).toBe(22)
      expect(response.body.name).toBe('chocolate bar')
      expect(response.body.calories).toBe(250)
    })
  })

  it('POST request for individual food - SADPATH', () => {
    var body = null
    return request(app)
    .post('/api/v1/foods').send(body).set("Content-Type", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(400)
    })
  })

  it('POST request for individual food - SAD-SADPATH', () => {
    var body = {
      "Earl":"Stephens"
   }
    return request(app)
    .post('/api/v1/foods').send(body).set("Content-Type", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(500)
    })
  })

  it('PUT request to update individual food', () => {
    var body = { "food": {
        "name": "banana",
        "calories": "125"
      }
    }
    return request(app)
    .put('/api/v1/foods/1').send(body).set("Content-Type", "application/json").set("Accept", "application/json")
    .then(response => {
      expect(response.body.name).toBe('banana')
      expect(response.body.calories).toBe(125)
    })
  })

  it('can DELETE an individual food', () => {
    return request(app)
    .delete('/api/v1/foods/1').set("Content-Type", "application/json").set("Accept", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(204)
    })
  })

  it('can DELETE an individual food - SADPATH', () => {
    return request(app)
    .delete('/api/v1/foods').set("Content-Type", "application/json").set("Accept", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(404)
    })
  })

})
