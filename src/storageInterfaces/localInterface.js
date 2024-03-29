import {RAW_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/rawIngredientsTemplate.js";
import {FOOD_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/craftedFoodIngredientsTemplate.js";
import {FOOD_RECIPES_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/foodRecipesTemplate.js";

export function setUpLocalStorage() {
    if (localStorageNotSet()) {
        localStorage.rawIngredients = RAW_INGREDIENTS_TEMPLATE;
        localStorage.foodIngredients = FOOD_INGREDIENTS_TEMPLATE;
        localStorage.foodRecipes = FOOD_RECIPES_TEMPLATE;
        localStorage.showCompletedIng = "false";
    }
    // checkStorage();
}

function localStorageNotSet() {
    return localStorage.rawIngredients === undefined
        || localStorage.foodIngredients === undefined
        || localStorage.foodRecipes === undefined
        || localStorage.showCompletedIng === undefined;
}

export function getRawIngredientsFromLocalStorage() {
    return JSON.parse(localStorage.rawIngredients);
}

export function getCraftedFoodIngredientsFromLocalStorage() {
    return JSON.parse(localStorage.foodIngredients);
}

export function getFoodRecipesFromLocalStorage() {
    return JSON.parse(localStorage.foodRecipes);
}

export function setRawIngredientsInLocalStorage(rawIngredients) {
    let rawIngredientsJSON = getRawIngredientsFromLocalStorage();
    rawIngredientsJSON.forEach(ing => {
        let rawIngredient = rawIngredients.find(ele => ele.name === ing.name);
        if (rawIngredient !== undefined) {
            ing.qty = parseInt(rawIngredients.find(ele => ele.name === ing.name).qty);
        }
    });
    localStorage.rawIngredients = JSON.stringify(rawIngredientsJSON);
}

export function setFoodIngredientsInLocalStorage(foodIngredients) {
    let foodIngredientsJSON = getCraftedFoodIngredientsFromLocalStorage();
    foodIngredientsJSON.forEach(ing => {
        let foodIngredient = foodIngredients.find(ele => ele.name === ing.name);
        if (foodIngredient !== undefined) {
            ing.qty = parseInt(foodIngredients.find(ele => ele.name === ing.name).qty);
        }
    });
    localStorage.foodIngredients = JSON.stringify(foodIngredientsJSON);
}

export function setFoodRecipesInLocalStorage(foodRecipes) {
    let foodRecipesJSON = getFoodRecipesFromLocalStorage();
    foodRecipesJSON.forEach(recipe => {
        let foodRecipe = foodRecipes.find(ele => ele.name === recipe.name);
        if (foodRecipe !== undefined) {
            recipe.rank = foodRecipe.rank;
            recipe.enabled = foodRecipe.enabled;
            recipe.hasCard = foodRecipe.hasCard;
            recipe.qty = foodRecipe.qty;
            recipe.want = foodRecipe.want;
            recipe.curProf = foodRecipe.currentProficiency;
            recipe.mastery = foodRecipe.mastery;
        }
    });
    localStorage.foodRecipes = JSON.stringify(foodRecipesJSON);
}

export function doShowCompletedIngredients() {
    return localStorage.showCompletedIng === "true";
}

export function saveDoShowCompletedIngredients(doShowCompletedIngredient) {
    localStorage.showCompletedIng = doShowCompletedIngredient;
}

function checkStorage() {
    // chrome should be able to hold 100KB
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