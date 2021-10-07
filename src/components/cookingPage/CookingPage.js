import React, {Component, useState} from 'react';
import RecipeCardDisplay from "./recipeCards/RecipeCardDisplay";
import * as storage from "../../storageInterfaces/storageInterface";
import SidebarDisplay from "./sidebar/SidebarDisplay";

export class CookingPage extends Component {
    constructor(props) {
        super(props);
        this.recipes = storage.getAllFoodRecipes();
        this.state = {
            selectedMenu: null
        }
    }

    setSelectedMenu(id) {
        this.setState({selectedMenu: id});
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
                    selectedMenu={this.state.selectedMenu}
                    setSelectedMenu={id => this.setSelectedMenu(id)}
                />
            </div>
        );
    }
}