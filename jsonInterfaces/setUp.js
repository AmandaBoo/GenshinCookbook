import {getFoodIngredientsFromCookie, getRawIngredientsFromCookie, getFoodRecipesFromCookie} from "./cookieInterface.js";
import {getRawIngredientsFromLocalStorage, getFoodIngredientsFromLocalStorage, getFoodRecipesFromLocalStorage} from "./localStorageInterface.js"

import {RawIngredient} from "../classes/rawIngredient.js";
import {CraftedFoodIngredient} from "../classes/craftedFoodIngredient.js";
import {FoodRecipe} from "../classes/foodRecipe.js";

// retrieves raw ingredients from localStorage and local in json form
// and creates RawIngredient objects
export function getAllRawIngredients() {
    let allRawIngredients = [];
    let rawIngredientsCookie = getRawIngredientsFromCookie();
    let rawIngredientsLocal = getRawIngredientsFromLocalStorage();

    rawIngredientsLocal.forEach(ing => {
        let quantity = rawIngredientsCookie.find(ele => ele.name === ing.name).qty;
        allRawIngredients.push(new RawIngredient(ing.name, quantity, ing.src));
    });

    return allRawIngredients;
}

// retrieves food ingredients from localStorage and local in json form
// and creates FoodIngredient objects
export function getAllFoodIngredients(allRawIngredients) {
    let allFoodIngredients = [];
    let foodIngredientsCookie = getFoodIngredientsFromCookie();
    let foodIngredientsLocal = getFoodIngredientsFromLocalStorage();

    foodIngredientsLocal.forEach(ing => {
        let quantity = foodIngredientsCookie.find(ele => ele.name === ing.name).qty;
        let craftsFromRaw = mapRawIngredients(allRawIngredients, ing)
        allFoodIngredients.push(new CraftedFoodIngredient(ing.name, quantity, ing.src, craftsFromRaw));
    });
    return allFoodIngredients;
}

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

// retrieves recipe ingredients from localStorage and local in json form
// and creates FoodRecipe objects
export function getAllFoodRecipes(allRawIngredients, allFoodIngredients) {
    let allRecipes = [];
    let foodRecipeCookie = getFoodRecipesFromCookie();
    let foodRecipeLocal = getFoodRecipesFromLocalStorage();

    foodRecipeLocal.forEach(recipe => {
        let quantity = foodRecipeCookie.find(ele => ele.name === recipe.name).qty;
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
