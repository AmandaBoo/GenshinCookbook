import { loadData } from "./storageInterfaces/localInterface.js";
import {
    getAllRawIngredients,
    getAllFoodIngredients,
    getAllFoodRecipes,
    saveIngredients
} from "./storageInterfaces/storageInterface.js";
import * as consts from './constants/constants.js';

let generateInventory = true;

// LOCAL OBJECTS
let rawIngredients;
let foodIngredients;
let foodRecipes;

loadData();
rawIngredients = getAllRawIngredients();
foodIngredients = getAllFoodIngredients(rawIngredients);
foodRecipes = getAllFoodRecipes(rawIngredients, foodIngredients);

let btn = document.getElementById("inventory-btn");
btn.onclick = function() {
    openInv();
}

let closeBtn = document.getElementById("close-btn");
closeBtn.onclick = function() {
    closeClick();
    rawIngredients = getAllRawIngredients();
    foodIngredients = getAllFoodIngredients(rawIngredients);
    populateInventoryPopup(rawIngredients, foodIngredients);
}

let saveBtn = document.getElementById("save-btn");
saveBtn.onclick = function() {
    closeClick();
    saveIngredients(rawIngredients, foodIngredients);
}

changeTab('materials');
document.getElementById("materials-tab").onclick = () => changeTab(consts.MATERIAL_TAB_VALUE);
document.getElementById("dishes-tab").onclick = () => changeTab(consts.DISHES_TAB_VALUE);
document.getElementById("furniture-tab").onclick = () => changeTab(consts.FURNITURE_TAB_VALUE);

function openInv() {
    let modal = document.getElementById(consts.INVENTORY_DIV);
    modal.style.display = "block";
    if (generateInventory) {
        populateInventoryPopup(rawIngredients, foodIngredients, foodRecipes);
        generateInventory = !generateInventory; // TODO : MIGHT HAVE TO RERENDER ALL THE TIME BECAUSE THE FIELDS WON'T UPDATE DYNAMICALLY
    }
}

function closeClick() {
    let modal = document.getElementById(consts.INVENTORY_DIV);
    modal.style.display = "none";
}

function populateInventoryPopup(rawIngredients, foodIngredients) {
    let materialContent = document.getElementById(consts.MATERIAL_CONTENT);
    materialContent.innerHTML = '';

    let materialInventory = document.createElement("div");
    materialInventory.classList.add('cards');

    materialContent.appendChild(materialInventory);

    rawIngredients.forEach(ingredient => {
        materialInventory.appendChild(createIngredientCard(ingredient));
    });
    foodIngredients.forEach(ingredient => {
        materialInventory.appendChild(createIngredientCard(ingredient));
    });

    let dishContent = document.getElementById(consts.DISHES_CONTENT);
    dishContent.innerHTML = '';

    let dishInventory = document.createElement("div");
    dishInventory.classList.add('cards');

    dishContent.appendChild(dishInventory);

    foodRecipes.forEach(ingredient => {
        dishInventory.appendChild(createIngredientCard(ingredient));
    });
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

function changeTab(tab) {
    document.getElementById(consts.MATERIAL_CONTENT).style.display = tab === consts.MATERIAL_TAB_VALUE ? 'block' : 'none';
    document.getElementById(consts.DISHES_CONTENT).style.display = tab === consts.DISHES_TAB_VALUE ? 'block' : 'none';
    document.getElementById(consts.FURNITURE_CONTENT).style.display = tab === consts.FURNITURE_TAB_VALUE ? 'block' : 'none';

    if (tab === consts.MATERIAL_TAB_VALUE) {
        document.getElementById(consts.MATERIAL_TAB).classList.add('selected-tab');
    } else {
        document.getElementById(consts.MATERIAL_TAB).classList.remove('selected-tab');
    }
    if (tab === consts.DISHES_TAB_VALUE) {
        document.getElementById(consts.DISHES_TAB).classList.add('selected-tab');
    } else {
        document.getElementById(consts.DISHES_TAB).classList.remove('selected-tab');
    }
    if (tab === consts.FURNITURE_TAB_VALUE) {
        document.getElementById(consts.FURNITURE_TAB).classList.add('selected-tab');
    } else {
        document.getElementById(consts.FURNITURE_TAB).classList.remove('selected-tab');
    }
}

function resetFieldIfBlank(ingredient, field) {
    if (field.value === "") {
        field.value = 0;
        ingredient.qty = 0;
    }
}

