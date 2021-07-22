
export class RawIngredient {
    name; // string (cookie)
    qty; // string (cookie)
    src; // string (local)

    constructor(name, qty, src) {
        this.name = name;
        this.qty = qty;
        this.src = src;
    }
}