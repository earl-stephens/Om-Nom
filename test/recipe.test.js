var request = require('supertest');
var app = require('../app');
var shell = require('shelljs');
var express = require('express');
var test = express();
var Food = require("../models").Food

describe('recipe requests', () =>{
  it('GET recipes for a food type already in the database', () => {
    return request(app)
    .get('/api/v1/recipes/food_search?q=beef')
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then(response => {console.log(response.body);
      expect(Object.keys(response.body[0])).toContain('title')
      expect(Object.keys(response.body[0])).toContain('cookTime')
      expect(Object.keys(response.body[0])).toContain('caloriesPerServing')
      expect(Object.keys(response.body[0])).toContain('servingAmount')
      expect(Object.keys(response.body[0])).toContain('image')
      expect(Object.keys(response.body[0])).toContain('url')
      expect(Object.keys(response.body[0])).toContain('healthDetails')
      expect(Object.keys(response.body[0])).toContain('ingredients')
    })
  });
});

describe('recipe calories request', () =>{
  it('GET recipes based on number of calories', () => {
    return request(app)
    .get('/api/v1/recipes/calorie_search?q=150-300')
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .then(response => {console.log(response.body);
      expect(Object.keys(response.body[0])).toContain('title')
      expect(Object.keys(response.body[0])).toContain('cookTime')
      expect(Object.keys(response.body[0])).toContain('caloriesPerServing')
      expect(Object.keys(response.body[0])).toContain('servingAmount')
      expect(Object.keys(response.body[0])).toContain('image')
      expect(Object.keys(response.body[0])).toContain('url')
      expect(Object.keys(response.body[0])).toContain('healthDetails')
      expect(Object.keys(response.body[0])).toContain('ingredients')
    })
  });
});