import {RAW_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/rawIngredientsTemplate.js";
import {FOOD_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/foodIngredientsTemplate.js";
import {FOOD_RECIPES_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/foodRecipesTemplate.js";

export function setUpLocalStorage() {
    if (localStorageNotSet()) {
        localStorage.rawIngredients = RAW_INGREDIENTS_TEMPLATE;
        localStorage.foodIngredients = FOOD_INGREDIENTS_TEMPLATE;
        localStorage.foodRecipes = FOOD_RECIPES_TEMPLATE;
    }
    // checkStorage();
}

function localStorageNotSet() {
    return localStorage.rawIngredients === undefined || localStorage.foodIngredients === undefined || localStorage.foodRecipes === undefined;
}

export function getRawIngredientsFromLocalStorage() {
    return JSON.parse(localStorage.rawIngredients);
}

export function getFoodIngredientsFromLocalStorage() {
    return JSON.parse(localStorage.foodIngredients);
}

export function getFoodRecipesFromLocalStorage() {
    return JSON.parse(localStorage.foodRecipes);
}

export function setRawIngredientsInLocalStorage(rawIngredients) {
    let rawIngredientsJSON = getRawIngredientsFromLocalStorage();
    rawIngredientsJSON.forEach(ing => {
        ing.qty = parseInt(rawIngredients.find(ele => ele.name === ing.name).qty);
    });
    localStorage.rawIngredients = JSON.stringify(rawIngredientsJSON);
}

export function setFoodIngredientsInLocalStorage(foodIngredients) {
    let foodIngredientsJSON = getFoodIngredientsFromLocalStorage();
    foodIngredientsJSON.forEach(ing => {
        ing.qty = parseInt(foodIngredients.find(ele => ele.name === ing.name).qty);
    });
    localStorage.foodIngredients = JSON.stringify(foodIngredientsJSON);
}

export function setFoodRecipesInLocalStorage(foodRecipes) {
    let foodRecipesJSON = getFoodRecipesFromLocalStorage();
    foodRecipesJSON.forEach(recipe => {
        recipe.qty = parseInt(foodRecipes.find(ele => ele.name === recipe.name).qty);
    });
    localStorage.foodRecipes = JSON.stringify(foodRecipesJSON);
}

function checkStorage() {
    let _lsTotal = 0,
        _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
        console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
    }
    console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
}