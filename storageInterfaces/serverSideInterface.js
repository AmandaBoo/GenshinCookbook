import {RAW_INGREDIENTS} from "../storage/serverSideStorageTemplates/rawIngredientsDescription.js";
import {FOOD_INGREDIENTS} from "../storage/serverSideStorageTemplates/foodIngredientsDescription.js";
import {FOOD_RECIPES} from "../storage/serverSideStorageTemplates/foodRecipesDescription.js";

export function getRawIngredientsFromServerSide() {
    return RAW_INGREDIENTS.rawIngredients;
}

export function getFoodIngredientsFromServerSide() {
    return FOOD_INGREDIENTS.foodIngredients;
}

export function getFoodRecipesFromServerSide() {
    return FOOD_RECIPES.foodRecipes;
}