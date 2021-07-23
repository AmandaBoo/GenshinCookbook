
export class CraftedFoodIngredient {
    name; // string (localStorageTemplates)
    qty; // string (localStorageTemplates)
    src; // string (local)
    craftsFrom; // RawIngredient[][] (local)

    constructor(name, qty, src, craftsFrom) {
        this.name = name;
        this.qty = qty;
        this.src = src;
        this.craftsFrom = craftsFrom;
    }
}