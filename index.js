import { InventoryDiv } from "./inventory/InventoryDiv.js";
import { setUpToo } from "./jsonInterfaces/cookieInterface.js";
import { getAllRawIngredients, getAllFoodIngredients, getAllFoodRecipes } from "./jsonInterfaces/setUp.js";

let generateInventory = true;

// LOCAL OBJECTS
let rawIngredients = [];
let foodIngredients = [];
let foodRecipes = [];

setUpToo();

// if (rawIngredients.length === 0) {
//     rawIngredients = getAllRawIngredients();
// }
// if (foodIngredients.length === 0) {
//     foodIngredients = getAllFoodIngredients(rawIngredients);
// }
//
// if (foodRecipes.length === 0) {
//     foodRecipes = getAllFoodRecipes(rawIngredients, foodIngredients);
// }

let btn = document.getElementById("inventory-btn");
btn.onclick = function() {
    openInv();
}

function openInv() {
    let modal = document.getElementById("inventory-div");
    modal.style.display = "block";
    if (generateInventory) {
        // populateInventoryPopup();
        generateInventory = !generateInventory; // TODO : MIGHT HAVE TO RERENDER ALL THE TIME BECAUSE THE FIELDS WON'T UPDATE DYNAMICALLY
    }
}

function closeClick() {
    let modal = document.getElementById("inventory-div");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    let modal = document.getElementById("inventory-div");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
