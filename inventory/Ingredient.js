export class Ingredient {
    name; // string
    count; // int
    craftIngredients; // Ingredient[]
    src; // string
    parentDiv; // string
    ingredientDiv; // string

    constructor(json, parentDiv) {
        this.name = json.name;
        this.count = json.count;
        this.src = json.src;
        this.parentDiv = parentDiv;
        this.setUpDiv()
        this.createIcon();
    }

    set name(name) { this.name = name; }
    get name() { return this.name; }

    set count(count) { this.count = count; }
    get count() { return this.count; }

    set craftIngredients(craftIngredients) { this.craftIngredients = craftIngredients; }
    get craftIngredients() { return this.craftIngredients; }

    setUpDiv() {
        this.ingredientDiv = document.createElement("div");
        this.ingredientDiv.setAttribute("id", this.name.toLowerCase().trim() + "-div");
        this.ingredientDiv.innerHTML = this.name;
        this.parentDiv.appendChild(this.ingredientDiv);
    }

    createIcon() {
        let icon = document.createElement("img");
        icon.src = this.src;
        icon.alt = this.name;
        this.ingredientDiv.appendChild(icon);
    }

    createTextField() {

    }

    createCraftIngredientCards() {

    }
}