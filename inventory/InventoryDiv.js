import {Ingredient} from "./Ingredient.js";

export class InventoryDiv {
    name; // string
    ingredients; // Ingredient[]
    parentDiv; // string
    inventoryDiv;

    constructor(json, parentDiv) {
        this.name = json.categoryName;
        this.parentDiv = parentDiv;

        this.setUpDiv();
        this.createIngredientCards(json.ingredients);
    }

    get name() {
        return this.name;
    }

    set name(value) {
        this.name = value;
    }

    get ingredients() {
        return this.ingredients;
    }

    set ingredients(value) {
        this.ingredients = value;
    }

    setUpDiv() {
        this.inventoryDiv = document.createElement("div");
        this.inventoryDiv.setAttribute("id", this.name.toLowerCase() + "-div");
        this.inventoryDiv.setAttribute("class", "modal-content");
        this.inventoryDiv.innerHTML = this.name;
        this.parentDiv.appendChild(this.inventoryDiv);
    }

    createIngredientCards(ingredientsJson) {
        this.ingredients = [];
        // console.log(ingredientsJson);
        for (let i = 0; i < ingredientsJson.length; i++) {
            this.ingredients.push(new Ingredient(ingredientsJson[i], this.inventoryDiv));
        }
    }
}