import rawIngredientsJson from "../jsonTemplates/rawIngredients/rawIngredients.json" assert { type: "json" };
import foodIngredientsJson from "../jsonTemplates/craftedIngredients/foodIngredientsTemplate.json" assert { type: "json" };
import foodRecipeJson from "../jsonTemplates/recipes/foodRecipesTemplate.json" assert { type: "json" };

export function getRawIngredientsFromLocalStorage() {
    return rawIngredientsJson.rawIngredients;
}

export function getFoodIngredientsFromLocalStorage() {
    return foodIngredientsJson.foodIngredients;
}

export function getFoodRecipesFromLocalStorage() {
    return foodRecipeJson.foodRecipes;
}