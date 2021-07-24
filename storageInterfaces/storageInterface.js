import {
    getRawIngredientsFromLocalStorage,
    getFoodIngredientsFromLocalStorage,
    getFoodRecipesFromLocalStorage,
    setRawIngredientsInLocalStorage,
    setFoodIngredientsInLocalStorage
} from "./localInterface.js"
import {
    getRawIngredientsFromServer,
    getFoodIngredientsFromServer,
    getFoodRecipesFromServer
} from "./serverSideInterface.js";

import {RawIngredient} from "../classes/rawIngredient.js";
import {CraftedFoodIngredient} from "../classes/craftedFoodIngredient.js";
import {FoodRecipe} from "../classes/foodRecipe.js";

// retrieves raw ingredients from localStorageTemplates and local in json form
// and creates RawIngredient objects
export function getAllRawIngredients() {
    let allRawIngredients = [];
    let rawIngredientsLocal = getRawIngredientsFromLocalStorage();
    let rawIngredientsServer = getRawIngredientsFromServer();

    rawIngredientsServer.forEach(ing => {
        let quantity = rawIngredientsLocal.find(ele => ele.name === ing.name).qty;
        allRawIngredients.push(new RawIngredient(ing.name, quantity, ing.src, ing.rarity));
    });
    console.log("RAW ING", allRawIngredients);
    return allRawIngredients;
}

// retrieves food ingredients from localStorageTemplates and local in json form
// and creates FoodIngredient objects
export function getAllFoodIngredients(allRawIngredients) {
    let allFoodIngredients = [];
    let foodIngredientsLocal = getFoodIngredientsFromLocalStorage();
    let foodIngredientsServer = getFoodIngredientsFromServer();

    foodIngredientsServer.forEach(ing => {
        let quantity = foodIngredientsLocal.find(ele => ele.name === ing.name).qty;
        let craftsFromRaw = mapRawIngredients(allRawIngredients, ing)
        allFoodIngredients.push(new CraftedFoodIngredient(ing.name, quantity, ing.src, ing.rarity, craftsFromRaw));
    });
    console.log("FOOD ING", allFoodIngredients);
    return allFoodIngredients;
}

function mapRawIngredients(allRawIngredients, foodIngredient) {
    let allRawIngredientRecipes = [];
    for (let i = 0; i < foodIngredient.craftsFrom.length; i++) {
        let temp = [];
        foodIngredient.craftsFrom[i].forEach(rawIngredient => {
            let tempObj = {ingredient: 0, qtyRequired: 0};
            tempObj.ingredient = allRawIngredients.find(ele => ele.name === rawIngredient.name);
            tempObj.qtyRequired = foodIngredient.craftsFrom[i].find(ele => ele.name === rawIngredient.name).qty;
            temp.push(tempObj);
        });
        allRawIngredientRecipes.push(foodIngredient);
    }
    return allRawIngredientRecipes;
}

// retrieves recipe ingredients from localStorageTemplates and local in json form
// and creates FoodRecipe objects
export function getAllFoodRecipes(allRawIngredients, allFoodIngredients) {
    let allRecipes = [];
    let foodRecipeLocal = getFoodRecipesFromLocalStorage();
    let foodRecipeServer = getFoodRecipesFromServer();

    foodRecipeServer.forEach(recipe => {
        let quantity = foodRecipeLocal.find(ele => ele.name === recipe.name).qty;
        let allCraftsFrom = mapRawAndCraftedIngredients(allRawIngredients, allFoodIngredients, recipe)
        allRecipes.push(new FoodRecipe(recipe.name, quantity, recipe.src, allCraftsFrom));
    })
    return allRecipes;
}

function mapRawAndCraftedIngredients(allRawIngredients, allFoodIngredients, recipe) {
    let allRawAndCraftedRecipes = [];
    for (let i = 0; i < recipe.craftsFrom.length; i++) {
        let rawAndCraftTemp = [];
        let rawTemp = [];
        let craftTemp = [];
        recipe.craftsFrom[i].forEach(recipeIngredient => {
            let rawObj = {ingredient: 0, qtyRequired: 0};
            let craftObj = {ingredient: 0, qtyRequired: 0};

            rawObj.ingredient = allRawIngredients.find(ele => ele.name === recipeIngredient.name);
            rawObj.qtyRequired = recipe.craftsFrom[i].find(ele => ele.name === recipeIngredient.name).qty;

            craftObj.ingredient = allFoodIngredients.find(ele => ele.name === recipeIngredient.name);
            craftObj.qtyRequired = recipe.craftsFrom[i].find(ele => ele.name === recipeIngredient.name).qty;
            if (rawObj.ingredient !== undefined) {
                rawTemp.push(rawObj);
            }
            if (craftObj.ingredient !== undefined) {
                craftTemp.push(craftObj);
            }
        });
        rawAndCraftTemp.push(rawTemp);
        rawAndCraftTemp.push(craftTemp);
        allRawAndCraftedRecipes.push(rawAndCraftTemp);
    }
    return allRawAndCraftedRecipes;
}

export function saveIngredients(rawIngredients, foodIngredients) {
    setRawIngredientsInLocalStorage(rawIngredients);
    setFoodIngredientsInLocalStorage(foodIngredients);
}
