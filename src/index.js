import React from 'react';
import ReactDOM from 'react-dom';
import * as storage from "./storageInterfaces/storageInterface.js";
import { setUpInventory } from './components/inventory.js';
import { setUpRecipeManager } from './components/addRecipeManager.js';
import { createMainRecipeCard } from './components/recipeCards.js';
import "./styles.css";
import {MainPage} from "./components/mainPage/MainPage";

// LOCAL OBJECTS
storage.setUpLocalStorage();
let rawIngredients = storage.getAllRawIngredients();
let foodIngredients = storage.getAllFoodIngredients(rawIngredients);
let foodRecipes = storage.getAllFoodRecipes(rawIngredients, foodIngredients);
ReactDOM.render(<MainPage />, document.getElementById("root"));
// populateMainPage(foodRecipes);
//
// setUpInventory(rawIngredients, foodIngredients, foodRecipes);
// setUpRecipeManager(foodRecipes);
//
// // MAIN RECIPE CARD PAGE CODE
// function populateMainPage(recipes) {
//     recipes = recipes.concat(recipes.concat(recipes.concat(recipes.concat(recipes.concat(recipes)))));
//
//     recipes.forEach(recipe => {
//         if (recipe.hasCard) {
//             createMainRecipeCard(recipe);
//         }
//     });
// }