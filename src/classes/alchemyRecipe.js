export class AlchemyRecipe {
    name;
    src;
    qtyWant;
    qtyHas;
    hasCard;
    enabled;
    rank;
    rarity;
    craftsFrom;

    constructor(name, src, qtyWant, qtyHas, hasCard, enabled, rank, rarity, craftsFrom) {
        this.name = name;
        this.src = src;
        this.qtyWant = qtyWant;
        this.qtyHas = qtyHas;
        this.hasCard = hasCard;
        this.enabled = enabled;
        this.rank = rank;
        this.rarity = rarity;
        this.craftsFrom = craftsFrom;
    }
}