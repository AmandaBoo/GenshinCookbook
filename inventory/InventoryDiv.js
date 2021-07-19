import {Ingredient} from "./Ingredient.js";
import {INGREDIENTS, CRAFT_INGREDIENTS} from "../constants/constants.js";

export class InventoryDiv {
    name; // string
    ingredients; // Ingredient[]
    parentDiv; // string
    inventoryDiv; // div

    constructor(json, parentDiv) {
        this.name = json.categoryName;
        this.parentDiv = parentDiv;
        this.ingredients = [];

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
        this.createTitle();
        this.parentDiv.append(this.inventoryDiv);
    }

    createTitle() {
        let label = document.createElement("label");
        label.setAttribute("class", "category-label");
        label.innerText = this.name;
        this.inventoryDiv.append(label);
    }

    createIngredientCards(ingredientsJson) {
        for (let i = 0; i < ingredientsJson.length; i++) {
            this.ingredients.push(new Ingredient(ingredientsJson[i], this.inventoryDiv));
        }
    }

    createLabel(text) {
        let ingredientLabel = document.createElement("label");
        ingredientLabel.setAttribute("class", "title-label");
        ingredientLabel.innerText = text;
        return ingredientLabel;
    }

    ingredientsHaveCraftIngredients(ingredientsJson) {
        // determine if Craft Ingredients exist
        console.log(ingredientsJson);
        for (let i = 0; i < ingredientsJson.length; i++) {
            if (ingredientsJson[i].craftIngredients !== undefined) {
                console.log("am");
                return true;
            }
        }
        return false;
    }
}