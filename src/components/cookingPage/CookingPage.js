import React, {Component} from 'react';
import RecipeCardDisplay from "./recipeCards/RecipeCardDisplay";
import * as storage from "../../storageInterfaces/storageInterface";
import SidebarDisplay from "./sidebar/SidebarDisplay";

export class CookingPage extends Component {
    /* PROPS
    *
    * */
    constructor(props) {
        super(props);
        this.recipes = storage.getAllFoodRecipes();
    }

    getRecipeCards() {
        return this.recipes.filter(card => card.hasCard);
    }

    render() {
        return (
            <div className={"cooking-page-display"}>
                <RecipeCardDisplay
                    recipeData={this.getRecipeCards()}
                />
                <SidebarDisplay
                    recipes={this.recipes}
                />
            </div>
        )
    }
}