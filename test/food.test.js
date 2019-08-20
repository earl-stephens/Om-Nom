var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = require('chai').expect;

// Configure chai
chai.use(chaiHttp);
chai.should();
var Food = require('../models').Food

describe('Food', () => {
  describe('attributes', () => {
    const food = new Food('Banana', 100)

    it('has a name', () => {
      expect(food.name).to.equal('Banana')
    })

    it('has calories', () => {
      expect(food.calories).to.equal(100)
    })
  })

})
