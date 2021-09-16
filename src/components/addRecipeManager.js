import * as consts from '../constants/constants.js';
import * as storage from "../storageInterfaces/storageInterface.js";

import { createMainRecipeCard } from "./recipeCards.js";

export function setUpRecipeManager(foodRecipes) {
    let addRecipeBtn = document.getElementById("recipe-manager-btn");
    addRecipeBtn.onclick = function() {
        openRecipeManager();
    };

    populateRecipeManagerPopup(foodRecipes);

    let recipeManagerCloseBtn = document.getElementById("recipe-manager-close-btn");
    recipeManagerCloseBtn.onclick = () => {
        closeRecipeManagerAndSave(foodRecipes);
    }
}

function closeRecipeManagerAndSave(foodRecipes) {
    let modal = document.getElementById(consts.RECIPE_MANAGER_DIV);
    modal.style.display = "none";
    storage.saveFoodRecipes(foodRecipes);
}

function openRecipeManager() {
    let modal = document.getElementById("recipe-manager-div");
    modal.style.display = "block";
}

function populateRecipeManagerPopup(foodRecipes) {
    // setup food recipe
    let foodRecipeCardList = createAddRecipeCardList(foodRecipes);

    let foodRecipeContent = document.getElementById(consts.FOOD_RECIPE_CONTENT);
    foodRecipeContent.innerHTML = '';
    foodRecipeContent.append(foodRecipeCardList);
}

function createAddRecipeCardList(foodRecipes) {
    let cardList = document.createElement("div");
    cardList.classList.add("cards");

    foodRecipes.forEach(recipe => {
        if (!recipe.hasCard) {
            cardList.append(createAddRecipeCard(recipe));
        }
    });

    return cardList;
}

function createAddRecipeCard(recipe) {
    let content = document.createElement("img");
    content.classList += "card-icon";
    content.src = recipe.src;
    content.alt = recipe.name;

    let label = document.createElement("label");
    label.innerText = recipe.name;
    label.classList.add("recipe-label-field");

    let card = document.createElement("div");
    card.id = recipe.name + 'recipe-manager-card';
    card.classList.add('add-recipe-card');
    card.style.backgroundImage = 'url("./images/backgrounds/Rarity_' + recipe.rarity + '_background.png")';
    card.append(content);
    card.append(label);
    card.onclick = () => {
        removeRecipeCard(recipe);
        createMainRecipeCard(recipe);
    }

    return card;
}

function removeRecipeCard(recipe) {
    document.getElementById(recipe.name + 'recipe-manager-card').remove();
}