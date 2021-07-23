import {getRawIngredientsFromLocalStorage, getFoodIngredientsFromLocalStorage, getFoodRecipesFromLocalStorage} from "./localInterface.js"
import {getRawIngredientsFromServer, getFoodIngredientsFromServer, getFoodRecipesFromServer} from "./serverSideInterface.js";

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
        allRawIngredients.push(new RawIngredient(ing.name, quantity, ing.src));
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
        allFoodIngredients.push(new CraftedFoodIngredient(ing.name, quantity, ing.src, craftsFromRaw));
    });
    return allFoodIngredients;
}

// TODO : MODIFY MAPPING SO THAT IT ALSO KEEPS TRACK OF QTY REQUIRED
function mapRawIngredients(allRawIngredients, foodIngredient) {
    let allRawIngredientRecipes = [];
    for (let i = 0; i < foodIngredient.craftsFrom.length; i++) {
        let temp = [];
        foodIngredient.craftsFrom[i].forEach(rawIngredient => {
            temp.push(allRawIngredients.find(ele => ele.name === rawIngredient.name));
        })
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
        let quantity = foodRecipeLocal.find(ele => ele.name === recipe.name).qty;
        let allCraftsFrom = mapRawAndCraftedIngredients(allRawIngredients, allFoodIngredients, recipe)
        allRecipes.push(new FoodRecipe(recipe.name, quantity, recipe.src, allCraftsFrom));
    })
    return allRecipes;
}

// TODO : MODIFY MAPPING SO THAT IT ALSO KEEPS TRACK OF QTY REQUIRED
function mapRawAndCraftedIngredients(allRawIngredients, allFoodIngredients, recipe) {
    let allRawAndCraftedRecipes = [];
    for (let i = 0; i < recipe.craftsFrom.length; i++) {
        let rawAndCraftTemp = [];
        let rawTemp = [];
        let craftTemp = [];
        recipe.craftsFrom[i].forEach(recipeIngredient => {
            let rawIngredient = allRawIngredients.find(ele => ele.name === recipeIngredient.name);
            let craftIngredient = allFoodIngredients.find(ele => ele.name === recipeIngredient.name);
            if (rawIngredient !== undefined) {
                rawTemp.push(rawIngredient);
            }
            if (craftIngredient !== undefined) {
                craftTemp.push(craftIngredient);
            }
        });
        rawAndCraftTemp.push(rawTemp);
        rawAndCraftTemp.push(craftTemp);
        allRawAndCraftedRecipes.push(rawAndCraftTemp);
    }
    return allRawAndCraftedRecipes;
}
