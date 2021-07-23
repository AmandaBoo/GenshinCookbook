
export class FoodRecipe {
    name; // string (localStorageTemplates)
    qty; // string (localStorageTemplates)
    src; // string (local)
    craftsFrom; // [[Raw[],Crafted[]], [Raw[], Crafted[]] (local)

    constructor(name, qty, src, craftsFrom) {
        this.name = name;
        this.qty = qty;
        this.src = src;
        this.craftsFrom = craftsFrom;
    }
}