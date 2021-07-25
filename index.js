import { loadData } from "./storageInterfaces/localInterface.js";
import {
    getAllRawIngredients,
    getAllFoodIngredients,
    getAllFoodRecipes,
    saveIngredients
} from "./storageInterfaces/storageInterface.js";

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
    saveIngredients(rawIngredients, foodIngredients);
}

function openInv() {
    let modal = document.getElementById("inventory-div");
    modal.style.display = "block";
    if (generateInventory) {
        populateInventoryPopup(rawIngredients, foodIngredients, foodRecipes);
        generateInventory = !generateInventory; // TODO : MIGHT HAVE TO RERENDER ALL THE TIME BECAUSE THE FIELDS WON'T UPDATE DYNAMICALLY
    }
}

function closeClick() {
    let modal = document.getElementById("inventory-div");
    modal.style.display = "none";
}

function populateInventoryPopup(rawIngredients, foodIngredients) {
    let modalContent = document.getElementById("materials-content");
    let inventory = document.createElement("div");
    inventory.classList += 'cards';
    modalContent.appendChild(inventory);

    rawIngredients.forEach(ingredient => {
        inventory.appendChild(createIngredientCard(ingredient));
    });

    foodIngredients.forEach(ingredient => {
        inventory.appendChild(createIngredientCard(ingredient));
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

function resetFieldIfBlank(ingredient, field) {
    if (field.value === "") {
        field.value = 0;
        ingredient.qty = 0;
    }
}

