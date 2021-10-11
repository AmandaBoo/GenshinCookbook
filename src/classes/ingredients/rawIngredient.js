export class RawIngredient {
    name; // string
    qty; // string
    src; // number
    rarity; // number
    obtainedBy; // string

    constructor(name, qty, src, rarity, obtainedBy) {
        this.src = src;
        this.qty = qty;
        this.name = name;
        this.rarity = rarity;
        this.obtainedBy = obtainedBy;
    }
}