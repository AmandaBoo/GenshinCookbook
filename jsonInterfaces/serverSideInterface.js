import {RAW_INGREDIENTS} from "../storage/serverSideStorageTemplates/rawIngredientsDescription.js";
import {FOOD_INGREDIENTS} from "../storage/serverSideStorageTemplates/foodIngredientsDescription.js";
import {FOOD_RECIPES} from "../storage/serverSideStorageTemplates/foodRecipesDescription.js";

export function getRawIngredientsFromLocalStorage() {
    return RAW_INGREDIENTS.rawIngredients;
}

export function getFoodIngredientsFromLocalStorage() {
    return FOOD_INGREDIENTS.foodIngredients;
}

export function getFoodRecipesFromLocalStorage() {
    return FOOD_RECIPES.foodRecipes;
}