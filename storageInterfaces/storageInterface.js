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
    return allFoodIngredients;
}

function mapRawIngredients(allRawIngredients, foodIngredient) {
    let allRawIngredientRecipes = [];

    // iterate over each possible way of making foodIngredient
    for (let i = 0; i < foodIngredient.craftsFrom.length; i++) {
        let temp = [];

        // iterate over each ingredient within sub recipe
        foodIngredient.craftsFrom[i].forEach(rawIngredient => {
            let tempObj = {ingredient: 0, qtyRequired: 0};

            // find RawIngredient whose name matches
            tempObj.ingredient = allRawIngredients.find(ele => ele.name === rawIngredient.name);
            tempObj.qtyRequired = foodIngredient.craftsFrom[i].find(ele => ele.name === rawIngredient.name).qty;
            temp.push(tempObj);
        });
        allRawIngredientRecipes.push(temp);
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
        let localFoodRecipe = foodRecipeLocal.find(ele => ele.name === recipe.name);
        let allCraftsFrom = mapRawAndCraftedIngredients(allRawIngredients, allFoodIngredients, recipe)
        allRecipes.push(new FoodRecipe(recipe.name, localFoodRecipe.qty, recipe.src, localFoodRecipe.want, localFoodRecipe.mastery,
            localFoodRecipe.curProf, recipe.rarity, allCraftsFrom, localFoodRecipe.canCraft));
    });
    return allRecipes;
}

function mapRawAndCraftedIngredients(allRawIngredients, allFoodIngredients, recipe) {
    let allRawAndCraftedRecipes = [];

    // iterate over each possible way of making recipe
    for (let i = 0; i < recipe.craftsFrom.length; i++) {
        let rawAndCraftTemp = [];
        let rawTemp = [];
        let craftTemp = [];

        // iterate over each ingredient within sub recipe
        recipe.craftsFrom[i].forEach(recipeIngredient => {
            let rawObj = {ingredient: 0, qtyRequired: 0};
            let craftObj = {ingredient: 0, qtyRequired: 0};

            // determine if ingredient is raw or crafted
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
        rawAndCraftTemp.push({raw : rawTemp});
        rawAndCraftTemp.push({crafted:craftTemp});
        allRawAndCraftedRecipes.push(rawAndCraftTemp);
    }
    return allRawAndCraftedRecipes;
}

export function saveIngredients(rawIngredients, foodIngredients) {
    setRawIngredientsInLocalStorage(rawIngredients);
    setFoodIngredientsInLocalStorage(foodIngredients);
}
