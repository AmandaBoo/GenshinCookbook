export class RawIngredient {
    name; // string
    qty; // string
    src; // number
    rarity; // number

    constructor(name, qty, src, rarity) {
        this.src = src;
        this.qty = qty;
        this.name = name;
        this.rarity = rarity;
    }
}