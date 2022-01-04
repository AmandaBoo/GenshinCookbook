import {RAW_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/rawIngredientsTemplate.js";
import {FOOD_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/craftedFoodIngredientsTemplate.js";
import {FOOD_RECIPES_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/foodRecipesTemplate.js";
import {ALCHEMY_RECIPES_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/alchemyRecipesTemplate";

export function setUpLocalStorage() {
    if (localStorageNotSet()) {
        localStorage.rawIngredients = RAW_INGREDIENTS_TEMPLATE;
        localStorage.foodIngredients = FOOD_INGREDIENTS_TEMPLATE;
        localStorage.foodRecipes = FOOD_RECIPES_TEMPLATE;
        localStorage.showCompletedIng = "false";
    }

    if (localStorage.mora === undefined) {
        localStorage.mora = "0";
    }
    if (localStorage.alchemyRecipes === undefined) {
        localStorage.alchemyRecipes =  ALCHEMY_RECIPES_TEMPLATE;
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

export function getAlchemyRecipesFromLocalStorage() {
    return JSON.parse(localStorage.alchemyRecipes);
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

export function setAlchemyRecipesInLocalStorage(alchemyRecipes) {
    let alchemyRecipesJSON = getAlchemyRecipesFromLocalStorage();
    alchemyRecipesJSON.forEach(recipe => {
        let alchemyRecipe = alchemyRecipes.find(ele => ele.name === recipe.name);
        if (alchemyRecipe !== undefined) {
            recipe.rank = alchemyRecipe.rank;
            recipe.enabled = alchemyRecipe.enabled;
            recipe.hasCard = alchemyRecipe.hasCard;
            recipe.qtyHas = alchemyRecipe.qtyHas;
            recipe.qtyWant = alchemyRecipe.qtyWant;
        }
    });

    localStorage.alchemyRecipes = JSON.stringify(alchemyRecipesJSON);
}

export function doShowCompletedIngredients() {
    return localStorage.showCompletedIng === "true";
}

export function saveDoShowCompletedIngredients(doShowCompletedIngredient) {
    localStorage.showCompletedIng = doShowCompletedIngredient;
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