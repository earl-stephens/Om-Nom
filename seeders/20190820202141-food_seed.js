'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [
      {
        name: 'banana',
        calories: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'peach',
        calories: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ice cream',
        calories: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'pickle spear',
        calories: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'beer',
        calories: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'pizza slice',
        calories: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'gummie',
        calories: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'pop-tart',
        calories: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'grape',
        calories: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'oatmeal',
        calories: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'red wine',
        calories: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'white wine',
        calories: 170,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'spaghetti',
        calories: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'garlic bread',
        calories: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'vanilla greek yogurt',
        calories: 140,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'french fries',
        calories: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'oreo',
        calories: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'plum',
        calories: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'kiwi',
        calories: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'eggplant',
        calories: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'cherry',
        calories: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
