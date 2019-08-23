var request = require('supertest');
var app = require('../app');
var shell = require('shelljs');
var express = require('express');
var test = express();
var Food = require("../models").Food
//var Food = require("../models").Food

describe('Meal', () => {
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

  it('GET request for all meals', () => {
    return request(app)
    .get('/api/v1/meals')
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then(response => {
      expect(response.body[0].name).toBe('Breakfast')
      expect(response.body[0].foods.length).toBe(3)
      expect(Object.keys(response.body[0].foods[0])).toContain("id")
      expect(Object.keys(response.body[0].foods[0])).toContain("name")
      expect(Object.keys(response.body[0].foods[0])).toContain("calories")
    })
  })

  it('GET request for an individual meal', () => {
    return request(app)
    .get('/api/v1/meals/2')
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then(response => {
      expect(response.body[0].name).toBe('Lunch')
      expect(response.body[0].foods.length).toBe(3)
      expect(Object.keys(response.body[0].foods[0])).toContain("id")
      expect(Object.keys(response.body[0].foods[0])).toContain("name")
      expect(Object.keys(response.body[0].foods[0])).toContain("calories")
    })
  });

  it('GET request for an individual meal - SADPATH', () => {
    return request(app)
    .get('/api/v1/meals/1000')
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then(response => {console.log(response.body);
      expect(response.statusCode).toBe(404)
    })
  });

  it('POST request to add food to a meal', () => {
    return request(app)
    .post('/api/v1/meals/2/foods/9')
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(201)
      expect(Object.keys(response.body)).toContain("message")
    })
  });

  it('POST request to add food to a meal - SADPATH for no meal', () => {
    return request(app)
    .post('/api/v1/meals/200/foods/9')
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(404)
      expect(response.body).toContain("Meal not found")
    })
  });

  it('POST request to add food to a meal - SADPATH for no food', () => {
    return request(app)
    .post('/api/v1/meals/2/foods/900')
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(404)
      expect(response.body).toContain("Food not found")
    })
  });
});
