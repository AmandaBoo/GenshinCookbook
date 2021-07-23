import {RAW_INGREDIENTS} from "../storage/serverSideStorageTemplates/rawIngredientsDescription.js";
import {FOOD_INGREDIENTS} from "../storage/serverSideStorageTemplates/foodIngredientsDescription.js";
import {FOOD_RECIPES} from "../storage/serverSideStorageTemplates/foodRecipesDescription.js";

export function getRawIngredientsFromServer() {
    return RAW_INGREDIENTS.rawIngredients;
}

export function getFoodIngredientsFromServer() {
    return FOOD_INGREDIENTS.foodIngredients;
}

export function getFoodRecipesFromServer() {
    return FOOD_RECIPES.foodRecipes;
}