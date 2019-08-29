# Om-Nom

Om-Nom is a pair project for the Turing School of Software and Design's Backend Engineering program.  The project uses backend JavaScript technologies (NodeJS and Express) to build out a calorie tracker app. Learning goals for this project include:

* Create an Express API given specified endpoints
and response formats.
* Create a microservice that interfaces with the Edamam API.
* Integrate both apps together.

The Express API is located at:
https://omm-nomm.herokuapp.com/

The microservice, Om-Nom-Edamam (also written in Expresss) is located at:
https://om-nom-edamam.herokuapp.com/

## Usage

There are three main endpoints in the Om-Nom app: one each for foods, meals and recipes.  The foods endpoints lists foods that are in the database.  The meals endpoints lists the meals and the foods that are in them.  The recipes endpoints make API calls to the Om-Nom-Edamam service to gather recipe data for the type of food the user passes in.

### Foods Endpoints

The first endpoint returns all foods currently in the database.  The user makes a GET request to `api/v1/foods`.  The response is shown below.

```
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```

The second endpoint returns a specific food currently in the database.  The user makes a GET request to `api/v1/foods/:id`.  If the food is not in the database, the app returns a 404 status code.  A successful response is shown below.

```
{
"id":1,
"name": "Banana",
"calories": 150
}
```

The third endpoint allows a user to create a food with the attributes of name and calories given in the body of the request.  The user makes a POST request to `api/v1/foods`.  A successful request will return the food that was just created.  If the food could not be created, the app returns a 400 status code.  A successful response is show below.

```
{
"id":1,
"name": "Banana",
"calories": 150
}
```

The fourth endpoint allows a user to update an existing food in the database.  The user passes in the updated parameters in the body of the request.  The user makes a PATCH request to `api/v1/foods/:id`.  A successful request will return the food that was just created.  If the food could not be updated, the app returns a 400 status code.  A successful response is shown below.

```
{
"id":1,
"name": "Mint",
"calories": 14
}
```

The fifth endpoint allows a user to delete a food from the database.  The user makes a DELETE request to `api/v1/foods/:id`.  A successful request will return a 204 status code.  An unsuccessful request will return a 404 status code.  A successful response is shown below.

```
Status: 204
```

### Meal Endpoints

The first meal endpoint returns all meals in the database along with their associated foods.  The user makes a GET request to `api/v1/meals`.  A successful response is shown below.

```
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 2,
        "name": "Snack",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 9,
                "name": "Gum",
                "calories": 50
            },
            {
                "id": 10,
                "name": "Cheese",
                "calories": 400
            }
        ]
    },
    {
        "id": 3,
        "name": "Lunch",
        "foods": [
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 4,
        "name": "Dinner",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            }
        ]
    }
]
```

The second meal endpoint returns a specific meal and the foods for that meal.  The user makes a GET request to `api/v1/meals/:meal_id/foods`.  If the meal is not found, a 404 status code is returned.  A successful response is shown below.

```


{
    "id": 1,
    "name": "Breakfast",
    "foods": [
        {
            "id": 1,
            "name": "Banana",
            "calories": 150
        },
        {
            "id": 6,
            "name": "Yogurt",
            "calories": 550
        },
        {
            "id": 12,
            "name": "Apple",
            "calories": 220
        }
    ]
}
```

The third meal endpoint allows the user to add a food to a meal.  The user makes a POST request to `api/v1/meals/:meal_id/foods/:id`.  The app will return a 404 status code for an unsuccessful request.  A successful request will return a 201 status code, and the body shown below.

```
Status: 201
Body:
{
    "message": "Successfully added FOODNAME to MEALNAME"
}
```

The fourth meal endpoint allows the user to delete a food from a specific meal.  The user makes a DELETE request to `api/v1/meals/:meal_id/foods/:id`.  If the meal/food cannot be found, the app returns a 404 status code.  A successful request will return a 204 status code.  A successful response is shown below.

```
Status: 204
```

### Recipe Endpoints

The first recipe endpoint allows the user to see all recipes associated with the food that they query for.  The user makes a GET request to `api/v1/recipes/food_search?q=<food>`.  The Om Nom app then makes a fetch call to the Om Nom Edamam app to get the recipe data.  Om Nom Edamam sends the recipe data back to Om Nom to display it.  A successful response is shown below.

```
{
  "recipes": [
    {
      "title": "Chicken Vesuvio",
      "cook_time": 60,
      "calories_per_serving": 720,
      "serving_amount": 6
      "image": "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
      "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
      "health_details": [
          "peanut-free",
          "tree-nut-free"
      ],
      "ingredients": [
          "1/2 cup olive oil",
          "5 cloves garlic, peeled",
          "2 large russet potatoes, peeled and cut into chunks",
          "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
          "3/4 cup white wine",
          "3/4 cup chicken stock",
          "3 tablespoons chopped parsley",
          "1 tablespoon dried oregano",
          "Salt and pepper",
          "1 cup frozen peas, thawed"
      ],
    },

    ... More Recipe Objects

  ]
}
```

The second recipe endpoint allows the user to get a list of recipes that are within a range of calories provided by the user.  The user makes a GET request to `api/v1/recipes/calorie_search?q=<min>-<max>`.  The Om Nom app then makes a fetch call to the Om Nom Edamam app to get the recipe data.  Om Nom Edamam sends the recipe data back to Om Nom to display it.  A successful response is shown below.

```
{
  "recipes": [
    {
      "title": "Chicken Vesuvio",
      "cook_time": 60,
      "calories_per_serving": 720,
      "serving_amount": 6
      "image": "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
      "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
      "health_details": [
          "peanut-free",
          "tree-nut-free"
      ],
      "ingredients": [
          "1/2 cup olive oil",
          "5 cloves garlic, peeled",
          "2 large russet potatoes, peeled and cut into chunks",
          "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
          "3/4 cup white wine",
          "3/4 cup chicken stock",
          "3 tablespoons chopped parsley",
          "1 tablespoon dried oregano",
          "Salt and pepper",
          "1 cup frozen peas, thawed"
      ],
    },

    ... More Recipe Objects Sorted From Least to Greatest by Calories Per Serving

  ]
}
```

The third recipe endpoint allows the user to get a list of recipes pertaining to a specific health concern, such recipes that do not include peanuts.  The user makes a GET request to `api/v1/recipes/health_search?q=<health concern>`.  The Om Nom app then makes a fetch call to the Om Nom Edamam app to get the recipe data.  Om Nom Edamam sends the recipe data back to Om Nom to display it.  A successful response is shown below.

```
{
  "recipes": [
    {
      "title": "Chicken Vesuvio",
      "cook_time": 60,
      "calories_per_serving": 720,
      "serving_amount": 6
      "image": "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
      "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
      "health_details": [
          "peanut-free",
          "tree-nut-free"
      ],
      "ingredients": [
          "1/2 cup olive oil",
          "5 cloves garlic, peeled",
          "2 large russet potatoes, peeled and cut into chunks",
          "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
          "3/4 cup white wine",
          "3/4 cup chicken stock",
          "3 tablespoons chopped parsley",
          "1 tablespoon dried oregano",
          "Salt and pepper",
          "1 cup frozen peas, thawed"
      ],
    },

    ... More Recipe Objects

  ]
}
```

The fourth recipe endpoint allows the user to get a list of recipes for a particular food, where the recipes are sorted by the time it takes to prepare them.  The user makes a GET request to `api/v1/recipes/time_sort?q=<food>`. The Om Nom app then makes a fetch call to the Om Nom Edamam app to get the recipe data.  Om Nom Edamam sends the recipe data back to Om Nom to display it.  A successful response is shown below.

```
{
  "recipes": [
    {
      "title": "Chicken Vesuvio",
      "cook_time": 60,
      "calories_per_serving": 720,
      "serving_amount": 6
      "image": "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
      "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
      "health_details": [
          "peanut-free",
          "tree-nut-free"
      ],
      "ingredients": [
          "1/2 cup olive oil",
          "5 cloves garlic, peeled",
          "2 large russet potatoes, peeled and cut into chunks",
          "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
          "3/4 cup white wine",
          "3/4 cup chicken stock",
          "3 tablespoons chopped parsley",
          "1 tablespoon dried oregano",
          "Salt and pepper",
          "1 cup frozen peas, thawed"
      ],
    },

    ... More Recipe Objects

  ]
}
```

The fifth recipe endpoint allows a user to get a list of recipes for a particular food, where the recipes are sorted by the amount of calories.  The user makes a GET request to `api/v1/recipes/calorie_sort?q=<food>`.  The Om Nom app then makes a fetch call to the Om Nom Edamam app to get the recipe data.  Om Nom Edamam sends the recipe data back to Om Nom to display it.  A successful response is shown below.

```
{
  "recipes": [
    {
      "title": "Chicken Vesuvio",
      "cook_time": 60,
      "calories_per_serving": 720,
      "serving_amount": 6
      "image": "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
      "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
      "health_details": [
          "peanut-free",
          "tree-nut-free"
      ],
      "ingredients": [
          "1/2 cup olive oil",
          "5 cloves garlic, peeled",
          "2 large russet potatoes, peeled and cut into chunks",
          "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
          "3/4 cup white wine",
          "3/4 cup chicken stock",
          "3 tablespoons chopped parsley",
          "1 tablespoon dried oregano",
          "Salt and pepper",
          "1 cup frozen peas, thawed"
      ],
    },

    ... More Recipe Objects

  ]
}
```

## Tech Stack

This application uses:
Node version 10.16.2
Express version 4.16.4
Sequelize version 5.15.1
Jest version 24.9.0

## Initial Set Up and Testing

To use the app, clone down this repository.  Once cloned, run the following commands to install the necessary packages and set up the application.

`npm install`
`npx sequelize db:create`
`npx sequelize db:migrate`
`npx sequelize db:seed:all`

Jest was used for testing for this application.  To run the test suite, run `npm test`.

## Contributors

This was a paired project.  The two contributors, and their contact information, is shown below.

Martin Mercer
28820023+m-mrcr@users.noreply.github.com
https://github.com/m-mrcr

Earl Stephens
34906415+earl-stephens@users.noreply.github.com
https://github.com/earl-stephens

## How to Contribute

If you would desire to contribute to the project, fork the project from the
master branch.  You can then make the changes you think are appropriate and
submit a pull request.  Please provide a detailed explanation in the pull
request of what the problem or fix is.  
