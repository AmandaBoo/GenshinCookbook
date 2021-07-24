
export class FoodRecipe {
    name; // string
    qty; // string
    src; // string
    rarity; // number
    craftsFrom; // [[Raw[],Crafted[]], [Raw[], Crafted[]]

    constructor(name, qty, src, rarity, craftsFrom) {
        this.name = name;
        this.qty = qty;
        this.src = src;
        this.rarity = rarity;
        this.craftsFrom = craftsFrom;
    }
}