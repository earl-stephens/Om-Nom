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

  

})
