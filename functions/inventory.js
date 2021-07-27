import * as storage from "../storageInterfaces/storageInterface.js";
import * as consts from '../constants/constants.js';

export function setUpInventory(rawIngredients, foodIngredients, foodRecipes) {
    document.getElementById(consts.MATERIAL_TAB).onclick = () => changeInventoryTab(consts.MATERIAL_TAB);
    document.getElementById(consts.DISHES_TAB).onclick = () => changeInventoryTab(consts.DISHES_TAB);
    document.getElementById(consts.FURNITURE_TAB).onclick = () => changeInventoryTab(consts.FURNITURE_TAB);
    changeInventoryTab(consts.MATERIAL_TAB);

    let inventoryBtn = document.getElementById("inventory-btn");
    inventoryBtn.onclick = openInv;

    let inventoryCloseBtn = document.getElementById("inventory-close-btn");
    inventoryCloseBtn.onclick = function() {
        closeInventory();
        populateInventoryPopup(rawIngredients, foodIngredients, foodRecipes);
    };

    let saveBtn = document.getElementById("save-btn");
    saveBtn.onclick = function() {
        closeInventory();
        storage.saveIngredients(rawIngredients, foodIngredients);
        storage.saveFoodRecipes(foodRecipes);
    };

    populateInventoryPopup(rawIngredients, foodIngredients, foodRecipes)
}


function openInv() {
    let modal = document.getElementById(consts.INVENTORY_DIV);
    modal.style.display = "block";
}

function closeInventory() {
    let modal = document.getElementById(consts.INVENTORY_DIV);
    modal.style.display = "none";
}

function populateInventoryPopup(rawIngredients, foodIngredients, foodRecipes) {
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