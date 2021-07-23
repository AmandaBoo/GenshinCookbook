
export class RawIngredient {
    name; // string (localStorage)
    qty; // string (localStorage)
    src; // string (local)

    constructor(name, qty, src) {
        this.name = name;
        this.qty = qty;
        this.src = src;
    }
}