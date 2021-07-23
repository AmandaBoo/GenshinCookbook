
export class RawIngredient {
    name; // string (localStorageTemplates)
    qty; // string (localStorageTemplates)
    src; // string (local)

    constructor(name, qty, src) {
        this.name = name;
        this.qty = qty;
        this.src = src;
    }
}