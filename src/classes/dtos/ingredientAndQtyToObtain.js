
export class IngredientAndQtyToObtainDto {
    ingredient; // ingredient object
    qtyToObtain; // number

    constructor(ingredient, qtyToObtain) {
        this.ingredient = ingredient;
        this.qtyToObtain = qtyToObtain;
    }
}