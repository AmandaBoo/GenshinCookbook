import * as localInterface from "./localInterface.js"
import * as serverInterface from "./serverSideInterface.js";

import {RawIngredient} from "../classes/ingredients/rawIngredient.js";
import {CraftedFoodIngredient} from "../classes/ingredients/craftedFoodIngredient.js";
import {FoodRecipe} from "../classes/foodRecipe.js";
import {IngredientAndQtyToObtainDto} from "../classes/dtos/ingredientAndQtyToObtain";
import {MATERIALS, SORTED_FOOD_RECIPES} from "../storage/uiOrder";
import {RAW_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/rawIngredientsTemplate.js";
import {FOOD_INGREDIENTS_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/craftedFoodIngredientsTemplate.js";
import {FOOD_RECIPES_TEMPLATE} from "../storage/localStorageTemplates/jsTemplates/foodRecipesTemplate.js";

export function setUpLocalStorage() {
    localInterface.setUpLocalStorage();
}
// retrieves raw ingredients from localStorageTemplates and local in json form
// and creates RawIngredient objects
export function getAllRawIngredients() {
    let allRawIngredients = [];
    let rawIngredientsLocal = localInterface.getRawIngredientsFromLocalStorage();
    let rawIngredientsServer = serverInterface.getRawIngredientsFromServer();

    rawIngredientsServer.forEach(ing => {
        const rawIng = rawIngredientsLocal.find(ele => ele.name === ing.name);
        if (rawIng !== undefined) {
            let quantity = rawIng.qty;
            allRawIngredients.push(new RawIngredient(ing.name, quantity, ing.src, ing.rarity, ing.obtainedBy));
        } else {
            let newIngEntry = ",\n" +
                "  {\n" +
                "    \"name\":\"" + ing.name + "\",\n" +
                "    \"qty\":0\n" +
                "  }\n" +
                "]\n";

            localStorage.rawIngredients = rawIngredientsLocal.substring(0, RAW_INGREDIENTS_TEMPLATE.length - 3) + newIngEntry;
            getAllRawIngredients();
        }});
    return allRawIngredients;
}

// retrieves food ingredients from localStorageTemplates and local in json form
// and creates FoodIngredient objects
export function getAllCraftedFoodIngredients(allRawIngredients) {
    let allCraftedFoodIngredients = [];
    let craftedFoodIngredientsLocal = localInterface.getCraftedFoodIngredientsFromLocalStorage();
    let craftedFoodIngredientsServer = serverInterface.getCraftedFoodIngredientsFromServer();

    craftedFoodIngredientsServer.forEach(ing => {
        let foodIngLocal = craftedFoodIngredientsLocal.find(ele => ele.name === ing.name);
        if (foodIngLocal !== undefined) {
            let craftsFromRaw = mapSubRecipesForCraftedFoodIngredient(allRawIngredients, craftedFoodIngredientsServer, craftedFoodIngredientsLocal, ing);
            allCraftedFoodIngredients.push(new CraftedFoodIngredient(ing.name, foodIngLocal.qty, ing.src, ing.rarity, ing.obtainedBy,craftsFromRaw));
        } else {
            let newIngEntry = ",\n" +
                "  {\n" +
                "    \"name\":\"" + ing.name + "\",\n" +
                "    \"qty\":0\n" +
                "  }\n" +
                "]\n";

            localStorage.foodIngredients = craftedFoodIngredientsLocal.substring(0, FOOD_INGREDIENTS_TEMPLATE.length - 3) + newIngEntry;
            getAllCraftedFoodIngredients(allRawIngredients);
        }
    });
    return allCraftedFoodIngredients;
}

function mapSubRecipesForCraftedFoodIngredient(allRawIngredients, allCraftedIngredientsDescriptions, allCraftedIngredientsLocal, craftedFoodIngredient) {
    let allRawIngredientRecipes = [];

    // iterate over each possible way of making craftedFoodIngredient
    for (let i = 0; i < craftedFoodIngredient.craftsFrom.length; i++) {
        let temp = [];

        // iterate over each ingredient within sub recipe
        craftedFoodIngredient.craftsFrom[i].forEach(subIngredient => {
            let ingredientObj = {ingredient: null, qtyRequired: 0};

            // find RawIngredient whose name matches
            ingredientObj.ingredient = allRawIngredients.find(ele => ele.name === subIngredient.name);
            if (ingredientObj.ingredient !== undefined) {
                ingredientObj.qtyRequired = craftedFoodIngredient.craftsFrom[i].find(ele => ele.name === subIngredient.name).qty;
                temp.push(ingredientObj);
            } else {
                ingredientObj.ingredient = createSubCraftedIngredient(allRawIngredients, allCraftedIngredientsDescriptions, allCraftedIngredientsLocal, subIngredient);
                ingredientObj.qtyRequired = craftedFoodIngredient.craftsFrom[i].find(ele => ele.name === subIngredient.name).qty;
                temp.push(ingredientObj);
            }
        });
        allRawIngredientRecipes.push(temp);
    }
    return allRawIngredientRecipes;
}

function createSubCraftedIngredient(allRawIngredients, allCraftedIngredientsDescriptions, allCraftedIngredientsLocal, subIngredient) {
    let subCraftedIngredientDescription = allCraftedIngredientsDescriptions.find(ing => ing.name === subIngredient.name);
    let subCraftedIngredientBreakdown = mapSubRecipesForCraftedFoodIngredient(allRawIngredients, allCraftedIngredientsDescriptions, allCraftedIngredientsLocal, subCraftedIngredientDescription);
    let foodIngLocal = allCraftedIngredientsLocal.find(ele => ele.name === subIngredient.name);
    if (foodIngLocal !== undefined) {
        return new CraftedFoodIngredient(subCraftedIngredientDescription.name, foodIngLocal.qty, subCraftedIngredientDescription.src, subCraftedIngredientDescription.rarity, subCraftedIngredientDescription.obtainedBy, subCraftedIngredientBreakdown);
    } else {
        return new CraftedFoodIngredient(subCraftedIngredientDescription.name, 0, subCraftedIngredientDescription.src, subCraftedIngredientDescription.rarity, subCraftedIngredientDescription.obtainedBy, subCraftedIngredientBreakdown);
    }
}

// retrieves recipe ingredients from localStorageTemplates and local in json form
// and creates FoodRecipe objects
export function getAllFoodRecipes() {
    updateLocalStorageForFoodRecipes();

    let allRawIngredients = getAllRawIngredients();
    let allRawIngredientsCopy = getAllRawIngredients();
    let allCraftedIngredients = getAllCraftedFoodIngredients(allRawIngredients);
    let allCraftedIngredientsCopy = getAllCraftedFoodIngredients(allRawIngredients);
    let foodRecipeLocal = localInterface.getFoodRecipesFromLocalStorage();
    let foodRecipeServer = serverInterface.getFoodRecipesFromServer();
    let allRecipes = [];

    foodRecipeLocal.sort((recipe1, recipe2) => {
        return recipe1.rank - recipe2.rank;
    });

    foodRecipeLocal.forEach(localFoodRecipe => {
        let serverFoodRecipe = foodRecipeServer.find(ele => ele.name === localFoodRecipe.name);
        let allCraftsFrom;
        [allCraftsFrom, allRawIngredientsCopy, allCraftedIngredientsCopy] = mapSubRecipesForFoodRecipes(allRawIngredients, allCraftedIngredients, serverFoodRecipe, localFoodRecipe, allRawIngredientsCopy, allCraftedIngredientsCopy);
        allRecipes.push(new FoodRecipe(serverFoodRecipe.name, localFoodRecipe.qty, serverFoodRecipe.src, localFoodRecipe.want, localFoodRecipe.mastery,
            localFoodRecipe.curProf, serverFoodRecipe.rarity, allCraftsFrom, localFoodRecipe.hasCard, localFoodRecipe.enabled, localFoodRecipe.rank));
    });

    return allRecipes;
}

function updateLocalStorageForFoodRecipes() {
    let foodRecipeLocal = localInterface.getFoodRecipesFromLocalStorage();
    let foodRecipeServer = serverInterface.getFoodRecipesFromServer();

    foodRecipeServer.forEach(recipe => {
        let localRecipe = foodRecipeLocal.find(ele => ele.name === recipe.name);
        if (localRecipe === undefined) {
            let newRecipeEntry = ",\n" +
            "{\n" +
            "  \"name\": " + "\"" + recipe.name + "\",\n" +
            "  \"qty\":0,\n" +
            "  \"want\":0,\n" +
            "  \"mastery\":false,\n" +
            "  \"curProf\":0,\n" +
            "  \"hasCard\":false,\n" +
            "  \"enabled\":true,\n" +
            "  \"rank\":0\n" +
            "}\n";

            localStorage.foodRecipes = JSON.stringify(foodRecipeLocal).substring(0, JSON.stringify(foodRecipeLocal).indexOf(']')) + newRecipeEntry + ']';
            updateLocalStorageForFoodRecipes();
        }
    });
}

function mapSubRecipesForFoodRecipes(allRawIngredients, allCraftedFoodIngredients, recipeServer, recipeLocal, allRawIngredientsCopy, allCraftedIngredientsCopy) {
    let allRawAndCraftedRecipes = [];

    // iterate over each possible way of making recipe
    for (let i = 0; i < recipeServer.craftsFrom.length; i++) {
        let rawAndCraftTemp = [];
        let rawTemp = [];
        let craftTemp = [];

        // iterate over each ingredient within sub recipe
        recipeServer.craftsFrom[i].forEach(recipeIngredient => {
            let rawObj = {ingredient: 0, qtyRequired: 0, qtyToObtain: 0};
            let craftObj = {ingredient: 0, qtyRequired: 0, qtyToObtain: 0};

            // determine if ingredient is raw or crafted
            rawObj.ingredient = allRawIngredients.find(ele => ele.name === recipeIngredient.name);
            craftObj.ingredient = allCraftedFoodIngredients.find(ele => ele.name === recipeIngredient.name);

            if (rawObj.ingredient !== undefined) {
                rawObj.qtyRequired = recipeServer.craftsFrom[i].find(ele => ele.name === recipeIngredient.name).qty;
                [rawObj.qtyToObtain, allRawIngredientsCopy] = determineQtyToObtain(recipeLocal, rawObj.ingredient, rawObj.qtyRequired, allRawIngredientsCopy);
                rawTemp.push(rawObj);
            }
            if (craftObj.ingredient !== undefined) {
                craftObj.qtyRequired = recipeServer.craftsFrom[i].find(ele => ele.name === recipeIngredient.name).qty;
                [craftObj.qtyToObtain, allCraftedIngredientsCopy] = determineQtyToObtain(recipeLocal, craftObj.ingredient, craftObj.qtyRequired, allCraftedIngredientsCopy);
                craftTemp.push(craftObj);
            }
        });
        rawAndCraftTemp.push({raw : rawTemp});
        rawAndCraftTemp.push({crafted:craftTemp});
        allRawAndCraftedRecipes.push(rawAndCraftTemp);
    }
    return [allRawAndCraftedRecipes, allRawIngredientsCopy, allCraftedIngredientsCopy];
}

function determineQtyToObtain(recipe, ingredient, qtyRequired, allIngredients) {
    if (!recipe.hasCard || (recipe.hasCard && !recipe.enabled)) {
        return [0, allIngredients];
    }
    let inventoryQty = allIngredients.find(ele => ele.name === ingredient.name).qty;
    let totalNeeded = (recipe.want * qtyRequired) - recipe.qty;
    let totalLeftToGather = 0;

    if (inventoryQty - totalNeeded > 0) {
        // inventory has enough and user doesn't need to collect anymore
        inventoryQty -= totalNeeded;
    } else {
        // inventory does not have enough and user may need some partial amount more
        totalLeftToGather = totalNeeded - inventoryQty;
        inventoryQty = 0;
    }

    // update running inventory total
    allIngredients.find(ele => ele.name === ingredient.name).qty = inventoryQty;

    return [totalLeftToGather, allIngredients];
}

export function getIngredientToObtainDTOList(recipes, ingredientType) {
    let ingredientDTOList = [];
    let ingredientMap = new Map();
    recipes.forEach(recipe => {
        if (recipe.hasCard && recipe.enabled) {
            recipe.craftsFrom.forEach(subRecipe => {
                let subRecipeIngredientList;
                if (ingredientType === "raw") {
                    subRecipeIngredientList = subRecipe[0].raw;
                } else if (ingredientType === "crafted") {
                    subRecipeIngredientList = subRecipe[1].crafted;
                }
                subRecipeIngredientList.forEach(entry => {
                    let qtyToObtainInSum;
                    if (ingredientMap.get(entry.ingredient)) {
                        qtyToObtainInSum = (ingredientMap.get(entry.ingredient) + (entry.qtyRequired * recipe.want - recipe.qty));
                    } else {
                        qtyToObtainInSum = (entry.qtyRequired * recipe.want) - recipe.qty;
                    }
                    ingredientMap.set(entry.ingredient, qtyToObtainInSum);
                });
            });
        }
    });

    ingredientMap.forEach((qtyToObtainInSum, ingredient) => {
        let qtyLeftToObtain = ingredient.qty - qtyToObtainInSum;
        if (qtyLeftToObtain < 0) {
            // inventory does not have enough and user may need some partial amount more
            ingredientDTOList.push(new IngredientAndQtyToObtainDto(ingredient, qtyToObtainInSum - ingredient.qty));
        } else {
            // inventory has enough so user does not have to gather anymore
            ingredientDTOList.push(new IngredientAndQtyToObtainDto(ingredient, 0));
        }
    });

    return ingredientDTOList;
}

export function sortIngredientsByUIOrder(rawAndCraftedIngredients) {
    rawAndCraftedIngredients.sort(function (a, b) {
        return MATERIALS.indexOf(a.name) - MATERIALS.indexOf(b.name);
    });
    return rawAndCraftedIngredients;
}

export function sortFoodRecipesByUIOrder(foodRecipes) {
    foodRecipes.sort(function(a, b){
        return SORTED_FOOD_RECIPES.indexOf(a.name) - SORTED_FOOD_RECIPES.indexOf(b.name);
    });
    return foodRecipes;
}

export function sortRecipeCardsByRank(recipeCards) {
    recipeCards.sort((recipe1, recipe2) => {
        return recipe1.rank - recipe2.rank;
    });
    return recipeCards;
}

export function ingredientsHaveChanges(changedIngredients, originalIngredients) {
    let hasChanges = false;
    changedIngredients.forEach(ing => {
        const originalIng = originalIngredients.find(ele => ele.name === ing.name);
        if (originalIng !== undefined) {
            if (originalIng.qty !== ing.qty) {
                hasChanges = true;
                return hasChanges;
            }
        }
    });
    return hasChanges;
}

export function saveIngredients(rawIngredients, craftedFoodIngredient) {
    localInterface.setRawIngredientsInLocalStorage(rawIngredients);
    localInterface.setFoodIngredientsInLocalStorage(craftedFoodIngredient);
}

export function saveFoodRecipes(foodRecipes) {
    localInterface.setFoodRecipesInLocalStorage(foodRecipes);
}

export function doShowCompletedIngredients() {
    return localInterface.doShowCompletedIngredients();
}

export function saveDoShowCompletedIngredients(doShowCompletedIng) {
    localInterface.saveDoShowCompletedIngredients(doShowCompletedIng);
}
