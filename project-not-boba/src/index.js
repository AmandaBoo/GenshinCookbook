import React from 'react';
import ReactDOM from 'react-dom';
import * as storage from "./storageInterfaces/storageInterface.js";
import { setUpInventory } from './functions/inventory.js';
import { setUpRecipeManager } from './functions/addRecipeManager.js';
import { createMainRecipeCard } from './functions/recipeCards.js';
import "./styles.css";

// LOCAL OBJECTS
storage.setUpLocalStorage();
let rawIngredients = storage.getAllRawIngredients();
let foodIngredients = storage.getAllFoodIngredients(rawIngredients);
let foodRecipes = storage.getAllFoodRecipes(rawIngredients, foodIngredients);

populateMainPage(foodRecipes);

setUpInventory(rawIngredients, foodIngredients, foodRecipes);
setUpRecipeManager(foodRecipes);

// MAIN RECIPE CARD PAGE CODE
function populateMainPage(recipes) {
    recipes = recipes.concat(recipes.concat(recipes.concat(recipes.concat(recipes.concat(recipes)))));

    recipes.forEach(recipe => {
        if (recipe.hasCard) {
            createMainRecipeCard(recipe);
        }
    });
}