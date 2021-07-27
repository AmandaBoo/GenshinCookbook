import * as storage from "./storageInterfaces/storageInterface.js";
import * as consts from './constants/constants.js';

let generateInventory = true;
let generateRecipeManager = true;

// LOCAL OBJECTS
storage.setUpLocalStorage();
let rawIngredients = storage.getAllRawIngredients();
let foodIngredients = storage.getAllFoodIngredients(rawIngredients);
let foodRecipes = storage.getAllFoodRecipes(rawIngredients, foodIngredients);

let addRecipeBtn = document.getElementById("recipe-manager-btn");
addRecipeBtn.onclick = function() {
    openRecipeManager(generateRecipeManager);
}

let recipeManagerCloseBtn = document.getElementById("recipe-manager-close-btn");
recipeManagerCloseBtn.onclick = function() {
    closeRecipeManagerAndSave();
}

let inventoryBtn = document.getElementById("inventory-btn");
inventoryBtn.onclick = function() {
    openInv();
}

let inventoryCloseBtn = document.getElementById("inventory-close-btn");
inventoryCloseBtn.onclick = function() {
    closeInventory();
    rawIngredients = getAllRawIngredients();
    foodIngredients = getAllFoodIngredients(rawIngredients);
    populateInventoryPopup(rawIngredients, foodIngredients);
}

let saveBtn = document.getElementById("save-btn");
saveBtn.onclick = function() {
    closeInventory();
    storage.saveIngredients(rawIngredients, foodIngredients);
    storage.saveFoodRecipes(foodRecipes);
}

// INVENTORY CODE
document.getElementById(consts.MATERIAL_TAB).onclick = () => changeInventoryTab(consts.MATERIAL_TAB);
document.getElementById(consts.DISHES_TAB).onclick = () => changeInventoryTab(consts.DISHES_TAB);
document.getElementById(consts.FURNITURE_TAB).onclick = () => changeInventoryTab(consts.FURNITURE_TAB);
changeInventoryTab(consts.MATERIAL_TAB);

function openInv() {
    let modal = document.getElementById(consts.INVENTORY_DIV);
    modal.style.display = "block";
    if (generateInventory) {
        populateInventoryPopup(rawIngredients, foodIngredients);
        generateInventory = !generateInventory;
    }
}

function closeInventory() {
    let modal = document.getElementById(consts.INVENTORY_DIV);
    modal.style.display = "none";
}

function populateInventoryPopup(rawIngredients, foodIngredients) {
    // setup materials inventory
    let materialCardList = createIngredientCardList(rawIngredients.concat(foodIngredients));

    let materialContent = document.getElementById(consts.MATERIAL_CONTENT);
    materialContent.innerHTML = '';
    materialContent.append(materialCardList);

    // setup dishes inventory
    let dishCardList = createIngredientCardList(foodRecipes);

    let dishContent = document.getElementById(consts.DISHES_CONTENT);
    dishContent.innerHTML = '';
    dishContent.append(dishCardList);
}

function createIngredientCardList(list) {
    let cardList = document.createElement("div");
    cardList.classList.add('cards');

    list.forEach(ingredient => {
        cardList.append(createIngredientCard(ingredient));
    });

    return cardList;
}

function createIngredientCard (ingredient) {
    let content = document.createElement("img");
    content.classList += "card-icon";
    content.src = ingredient.src;
    content.alt = ingredient.name;

    let textField = document.createElement("input");
    textField.classList += "card-text-field";
    textField.type = "number";
    textField.value = ingredient.qty;
    textField.oninput = function() { ingredient.qty = textField.value }; // TODO : PREVENT E AND . FROM BEING INPUTTED
    textField.onchange = function() { resetFieldIfBlank(ingredient, textField) };

    let card = document.createElement("div");
    card.id = ingredient.name;
    card.classList.add('ingredient-card');
    card.style.backgroundImage = 'url("./images/backgrounds/Rarity_' + ingredient.rarity + '_background.png")';
    card.append(content);
    card.append(textField);

    return card;
}

function changeInventoryTab(tab) {
    updateTab(tab, consts.MATERIAL_TAB, consts.MATERIAL_CONTENT);
    updateTab(tab, consts.DISHES_TAB, consts.DISHES_CONTENT);
    updateTab(tab, consts.FURNITURE_TAB, consts.FURNITURE_CONTENT);
}

function updateTab(tab, tabID, contentID) {
    let contentElement = document.getElementById(contentID);
    contentElement.style.display = tab === tabID ? 'block' : 'none';

    let tabElement = document.getElementById(tabID);
    tab === tabID ? tabElement.classList.add('selected-tab') : tabElement.classList.remove('selected-tab');
}

function resetFieldIfBlank(ingredient, field) {
    if (field.value === "") {
        field.value = 0;
        ingredient.qty = 0;
    }
}

// RECIPE MANAGER CODE
function closeRecipeManagerAndSave() {
    let modal = document.getElementById(consts.RECIPE_MANAGER_DIV);
    modal.style.display = "none";
    storage.saveFoodRecipes(foodRecipes);
}

function openRecipeManager(generateRecipeManager) {
    let modal = document.getElementById("recipe-manager-div");
    modal.style.display = "block";
    if (generateRecipeManager) {
        populateRecipeManagerPopup();
        generateRecipeManager = !generateRecipeManager;
    }

    return generateRecipeManager;
}

function populateRecipeManagerPopup() {
    // setup food recipe
    let foodRecipeCardList = createRecipeCardList(foodRecipes);

    let foodRecipeContent = document.getElementById(consts.FOOD_RECIPE_CONTENT);
    foodRecipeContent.innerHTML = '';
    foodRecipeContent.append(foodRecipeCardList);
}

function createRecipeCardList(foodRecipes) {
    let cardList = document.createElement("div");
    cardList.classList.add("cards");

    foodRecipes.forEach(recipe => {
        cardList.append(createRecipeCard(recipe));
    });

    return cardList;
}

function createRecipeCard(recipe) {
    let content = document.createElement("img");
    content.classList += "card-icon";
    content.src = recipe.src;
    content.alt = recipe.name;

    let label = document.createElement("label");
    label.innerText = recipe.name;
    label.classList.add("recipe-label-field");

    let card = document.createElement("div");
    card.id = recipe.name;
    card.classList.add('recipe-card');
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
    document.getElementById(recipe.name).remove();
}

// MAIN RECIPE CARD PAGE CODE
function createMainRecipeCard(recipe) {
    recipe.hasCard = true;
}
