import { InventoryDiv } from "./inventory/InventoryDiv.js";
let generateInventory = true;
let inventoryDivs = [];

let btn = document.getElementById("inventory-btn");
btn.onclick = function() {
    let modal = document.getElementById("inventory-div");
    modal.style.display = "block";
    if (generateInventory) {
        populateInventoryPopup();
        generateInventory = !generateInventory;
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

function populateInventoryPopup() {
    // TODO : grab all information from cookie
    let allIngredients = JSON.parse(cookie)[0].Ingredients;
    let inventoryDiv = document.getElementById("inventory-div");

    for (let i = 0; i < allIngredients.length; i++) {
        inventoryDivs.push(new InventoryDiv(allIngredients[i], inventoryDiv));
    }
}

// TODO : THIS IS A FUTURE PROBLEM GLHF
let cookie = '[{\n' +
    '  "Ingredients": [\n' +
    '    {\n' +
    '      "categoryName": "Dyes",\n' +
    '      "ingredients": [\n' +
    '        {\n' +
    '          "name": "Red Dye",\n' +
    '          "src": "./images/redDye.png",\n' +
    '          "count": 11,\n' +
    '          "craftIngredients": [\n' +
    '            {\n' +
    '              "name": "Valberry",\n' +
    '              "src": "./images/valberry.png",\n' +
    '              "count": 11\n' +
    '            },\n' +
    '            {\n' +
    '              "name": "Sunsettia",\n' +
    '              "src": "./images/sunsettia.png",\n' +
    '              "count": 24\n' +
    '            },\n' +
    '            {\n' +
    '              "name": "Carrot",\n' +
    '              "src": "./images/carrot.png",\n' +
    '              "count": 12\n' +
    '            }\n' +
    '          ]\n' +
    '        },\n' +
    '        {\n' +
    '          "name": "Blue Dye",\n' +
    '          "src": "./images/blueDye.png",\n' +
    '          "count": 15,\n' +
    '          "craftIngredients": [\n' +
    '            {\n' +
    '              "name": "Mint",\n' +
    '              "src": "./images/mint.png",\n' +
    '              "count": 20\n' +
    '            },\n' +
    '            {\n' +
    '              "name": "Wolfhook",\n' +
    '              "src": "./images/wolfhook.png",\n' +
    '              "count": 82\n' +
    '            }\n' +
    '          ]\n' +
    '        },\n' +
    '        {\n' +
    '          "name": "Yellow Dye",\n' +
    '          "src": "./images/yellowDye.png",\n' +
    '          "count": 25,\n' +
    '          "craftIngredients": [\n' +
    '            {\n' +
    '              "name": "Berry",\n' +
    '              "src": "./images/berry.png",\n' +
    '              "count": 112\n' +
    '            },\n' +
    '            {\n' +
    '              "name": "Cor Lapis",\n' +
    '              "src": "./images/corLapis.png",\n' +
    '              "count": 66\n' +
    '            }\n' +
    '          ]\n' +
    '        }\n' +
    '      ]\n' +
    '    },\n' +
    '    {\n' +
    '      "categoryName": "Fabrics",\n' +
    '      "ingredients": [\n' +
    '        {\n' +
    '          "name": "Fabric",\n' +
    '          "src": "./images/fabric.png",\n' +
    '          "count": 11,\n' +
    '          "craftIngredients": [\n' +
    '            {\n' +
    '              "name": "Silk Flower",\n' +
    '              "src": "./images/silkFlower.png",\n' +
    '              "count": 123\n' +
    '            }\n' +
    '          ]\n' +
    '        }\n' +
    '      ]\n' +
    '    }\n' +
    '  ]\n' +
    '}]';
