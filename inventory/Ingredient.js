import {CraftIngredient} from "./CraftIngredient.js";
import {CRAFTING_ICON} from "../constants/constants.js";

export class Ingredient {
    name; // string
    count; // int
    src; // string
    craftIngredients; // Ingredient[]

    // CONSTANTS
    IMG_WIDTH = 50;
    IMG_HEIGHT = 50;

    // DIVS
    parentDiv; // string
    mainDiv; // string
    craftIngredientsDiv; // string

    constructor(json, parentDiv) {
        this.name = json.name;
        this.count = json.count;
        this.src = json.src;
        this.parentDiv = parentDiv;
        this.craftIngredients = [];
        this.setUpDiv()

        this.createIngredientCard();
        this.createCraftIcon();

        if (json.craftIngredients !== undefined) {
            this.createCraftIngredientCards(json.craftIngredients);
        } else {

        }
    }

    set name(name) { this.name = name; }
    get name() { return this.name; }

    set count(count) { this.count = count; }
    get count() { return this.count; }

    set craftIngredients(craftIngredients) { this.craftIngredients = craftIngredients; }
    get craftIngredients() { return this.craftIngredients; }

    setUpDiv() {
        this.mainDiv = document.createElement("div");
        this.mainDiv.setAttribute("class", "ingredient-div");
        this.parentDiv.append(this.mainDiv);
    }

    // INGREDIENT CARD FUNCTIONS
    createIngredientCard() {
        let ingredientDiv = document.createElement("div");
        ingredientDiv.setAttribute( "id", this.name.toLowerCase().trim() + "-div");
        ingredientDiv.setAttribute("class", "ingredient-card")

        // populate card
        this.createCardTitle(ingredientDiv);
        this.createCardIcon(ingredientDiv);
        this.createCardTextField(ingredientDiv);

        this.mainDiv.append(ingredientDiv);
    }

    createCardTitle(ingredientDiv) {
        let label = document.createElement("label");
        label.setAttribute("class", "card-label");
        label.innerText = this.name;
        ingredientDiv.append(label);
    }

    createCardIcon(ingredientDiv) {
        let icon = document.createElement("img");
        icon.setAttribute("class", "card-icon");
        icon.src = this.src;
        icon.alt = this.name;
        icon.width = this.IMG_WIDTH;
        icon.height = this.IMG_HEIGHT
        ingredientDiv.append(icon);
    }

    createCardTextField(ingredientDiv) {
        let textField = document.createElement("input");
        textField.type = "text";
        textField.setAttribute("class", "card-text-field");
        textField.value = this.count;
        ingredientDiv.append(textField);
    }

    createCraftIcon() {
        let icon = document.createElement("img");
        icon.setAttribute("class", "craft-icon");
        icon.src = CRAFTING_ICON;
        icon.width = this.IMG_WIDTH;
        icon.height = this.IMG_HEIGHT;
        this.mainDiv.append(icon);
    }

    createCraftIngredientCards(craftIngredientsJson) {
        this.craftIngredientsDiv = document.createElement("div");
        this.craftIngredientsDiv.setAttribute("class", "craft-ingredient-div");
        for (let i = 0; i < craftIngredientsJson.length; i++) {
            this.craftIngredients.push(new CraftIngredient(craftIngredientsJson[i], this.craftIngredientsDiv));
        }
        this.mainDiv.append(this.craftIngredientsDiv);
    }
}