import React, {Component, useState} from 'react';
import RecipeCardDisplay from "./recipeCards/RecipeCardDisplay";
import * as storage from "../../storageInterfaces/storageInterface";
import SidebarDisplay from "./sidebar/SidebarDisplay";

export class CookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: null,
            recipes: storage.getAllFoodRecipes()
        }
    }

    setSelectedMenu(id) {
        this.setState({selectedMenu: id});
    }

    getRecipeCards() {
        return this.state.recipes.filter(card => card.hasCard);
    }

    removeRecipeCard(recipeCard) {
        recipeCard.hasCard = false;
        recipeCard.want = 0;
        storage.saveFoodRecipes([recipeCard]);
        this.setState({recipes: storage.getAllFoodRecipes()});
    }

    render() {
        return (
            <div className={"cooking-page-display"}>
                <RecipeCardDisplay
                    allRecipes={this.getRecipeCards()}
                    removeRecipeCard={card => this.removeRecipeCard(card)}
                />
                <SidebarDisplay
                    recipes={this.state.recipes}
                    selectedMenu={this.state.selectedMenu}
                    setSelectedMenu={id => this.setSelectedMenu(id)}
                />
            </div>
        );
    }
}