
export class CraftedFoodIngredient {
    name; // string
    qty; // string
    src; // string
    rarity; // number
    craftsFrom; // RawIngredient[][]

    constructor(name, qty, src, rarity, craftsFrom) {
        this.name = name;
        this.qty = qty;
        this.src = src;
        this.rarity = rarity;
        this.craftsFrom = craftsFrom;
    }
}