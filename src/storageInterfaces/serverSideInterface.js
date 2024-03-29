import {RAW_INGREDIENTS} from "../storage/serverSideStorageTemplates/rawIngredientsDescription.js";
import {FOOD_INGREDIENTS} from "../storage/serverSideStorageTemplates/craftedFoodIngredientsDescription.js";
import {FOOD_RECIPES} from "../storage/serverSideStorageTemplates/foodRecipesDescription.js";

export function getRawIngredientsFromServer() {
    return RAW_INGREDIENTS.rawIngredients;
}

export function getCraftedFoodIngredientsFromServer() {
    return FOOD_INGREDIENTS.foodIngredients;
}

export function getFoodRecipesFromServer() {
    return FOOD_RECIPES.foodRecipes;
}