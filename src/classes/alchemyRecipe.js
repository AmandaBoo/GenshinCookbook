export class AlchemyRecipe {
    name;
    qtyWant;
    qtyHas;
    hasCard;
    enabled;
    rank;
    rarity;
    craftsFrom;

    constructor(name, qtyWant, qtyHas, hasCard, enabled, rank, rarity, craftsFrom) {
        this.name = name;
        this.qtyWant = qtyWant;
        this.qtyHas = qtyHas;
        this.hasCard = hasCard;
        this.enabled = enabled;
        this.rank = rank;
        this.rarity = rarity;
        this.craftsFrom = craftsFrom;
    }
}