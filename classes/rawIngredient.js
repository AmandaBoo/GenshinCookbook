
export class RawIngredient {
    name; // string (localStorageTemplates)
    qty; // string (localStorageTemplates)
    src; // string (local)

    constructor(name, qty, src) {
        this.src = src;
        this.qty = qty;
        this.name = name;
    }
}