import { loadData } from "./storageInterfaces/localInterface.js";
import { getAllRawIngredients, getAllFoodIngredients, getAllFoodRecipes } from "./storageInterfaces/storageInterface.js";

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

function populateInventoryPopup(rawIngredients, foodIngredients, foodRecipes) {
    let modalContent = document.getElementById("content");
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
    let content = '<img class="card-icon" src="' + ingredient.src + '" alt="' + ingredient.name + '" />';
    content += '<input type="number" class="card-text-field" value="' + ingredient.qty + '" />';

    let card = document.createElement("div");
    card.id = ingredient.name;
    card.classList += 'ingredient-card';
    card.innerHTML = content;

    return card;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    let modal = document.getElementById("inventory-div");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
