// for now this and Ingredient are nearly identical. I'm separating them out jic more differences appear
export class CraftIngredient {
    name; // string
    count; // int
    craftIngredients; // Ingredient[]
    src; // string
    parentDiv; // string
    mainDiv; // string
    IMG_WIDTH = 50;
    IMG_HEIGHT = 50;

    constructor(json, parentDiv) {
        this.name = json.name;
        this.count = json.count;
        this.src = json.src;
        this.parentDiv = parentDiv;

        this.setUpDiv();
        this.createIngredientCard();
    }

    setUpDiv() {
        this.mainDiv = document.createElement("div");
        this.mainDiv.setAttribute("class", "craft-ingredient-div");
        this.parentDiv.append(this.mainDiv);
    }

    // INGREDIENT CARD FUNCTIONS
    createIngredientCard() {
        let ingredientDiv = document.createElement("div");
        ingredientDiv.setAttribute("id", this.name.toLowerCase().trim() + "-div");
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
}