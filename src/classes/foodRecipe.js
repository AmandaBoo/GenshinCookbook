export class FoodRecipe {
    name; // recipe's name : string
    qty; // user's progress towards want : number
    src; // recipe's img source : string
    want; // user's desired custom quantity : number
    mastery; // whether or not user has mastered item : boolean
    currentProficiency; // user's progress towards mastery : number
    rarity; // rarity of recipe : number
    craftsFrom; // [[{raw:Raw[]},{crafted:Crafted[]}], [{raw:Raw[]},{crafted:Crafted[]}]]
    hasCard; // whether or not the user is tracking the recipe on the cooking page : boolean
    enabled; // whether or not the user desires the recipe to be considered in summary calcaulations : boolean
    rank; // number

    constructor(name, qty, src, want, mastery, currentProficiency, rarity, craftsFrom, hasCard, enabled, rank) {
        this.name = name;
        this.qty = qty;
        this.src = src;
        this.want = want;
        this.mastery = mastery;
        this.currentProficiency = currentProficiency;
        this.rarity = rarity;
        this.craftsFrom = craftsFrom;
        this.hasCard = hasCard;
        this.enabled = enabled;
        this.rank = rank;
    }
}