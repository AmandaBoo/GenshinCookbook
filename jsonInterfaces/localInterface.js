import {RAW_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/rawIngredientsTemplate.js";
import {FOOD_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/foodIngredientsTemplate.js";
import {FOOD_RECIPES_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/foodRecipesTemplate.js";

export function setUpNewLocalStorage() {
    if (localStorageNotSet()) {
        localStorage.rawIngredients = JSON.stringify(RAW_INGREDIENTS_TEMPLATE);
        localStorage.foodIngredients = FOOD_INGREDIENTS_TEMPLATE;
        localStorage.foodRecipes = JSON.stringify(FOOD_RECIPES_TEMPLATE);
    }
}

function localStorageNotSet() {
    return localStorage.rawIngredients === undefined || localStorage.foodIngredients === undefined || localStorage.foodRecipes === undefined;
}

export function getRawIngredientsFromLocalStorage() {
    return localStorage.rawIngredients;
}

export function getFoodIngredientsFromLocalStorage() {
    return localStorage.foodIngredients;
}

export function getFoodRecipesFromLocalStorage() {
    return localStorage.foodRecipes;
}