export class CraftedFoodIngredient {
    name; // string
    qty; // string
    src; // string
    rarity; // number
    obtainedBy; // string
    craftsFrom; // RawIngredient[][]

    constructor(name, qty, src, rarity, obtainedBy, craftsFrom) {
        this.name = name;
        this.qty = qty;
        this.src = src;
        this.rarity = rarity;
        this.obtainedBy = obtainedBy;
        this.craftsFrom = craftsFrom;
    }
}