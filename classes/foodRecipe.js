
export class FoodRecipe {
    name; // string (cookie)
    qty; // string (cookie)
    src; // string (local)
    craftsFrom; // [[Raw[],Crafted[]], [Raw[], Crafted[]] (local)

    constructor(name, qty, src, craftsFrom) {
        this.name = name;
        this.qty = qty;
        this.src = src;
        this.craftsFrom = craftsFrom;
    }
}