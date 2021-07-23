
export class CraftedFoodIngredient {
    name; // string (localStorage)
    qty; // string (localStorage)
    src; // string (local)
    craftsFrom; // RawIngredient[][] (local)

    constructor(name, qty, src, craftsFrom) {
        this.name = name;
        this.qty = qty;
        this.src = src;
        this.craftsFrom = craftsFrom;
    }
}