import React, {Component, useState} from 'react';
import RecipeCardDisplay from "./recipeCards/RecipeCardDisplay";
import * as storage from "../../storageInterfaces/storageInterface";
import SidebarDisplay from "./sidebar/SidebarDisplay";

export class CookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: null,
        }
    }

    setSelectedMenu(id) {
        this.setState({selectedMenu: id});
    }

    getRecipeCards() {
        return this.props.recipes.filter(card => card.hasCard);
    }

    removeRecipeCard(recipeCard) {
        recipeCard.hasCard = false;
        recipeCard.want = 0;
        storage.saveFoodRecipes([recipeCard]);
        this.setState({recipes: storage.getAllFoodRecipes()});
    }

    editRecipeCard(recipeCard, currentProficiency, customQty) {
        recipeCard.currentProficiency = currentProficiency;
        recipeCard.want = customQty;
        storage.saveFoodRecipes([recipeCard]);
        this.setState({recipes: storage.getAllFoodRecipes()});
    }

    enableDisableRecipeCard(recipeCard) {
        recipeCard.enabled = !recipeCard.enabled;
        storage.saveFoodRecipes([recipeCard]);
        this.setState({recipes: storage.getAllFoodRecipes()});
    }

    render() {
        return (
            <div className={"cooking-page-display"}>
                <RecipeCardDisplay
                    allRecipes={this.getRecipeCards()}
                    removeRecipeCard={card => this.removeRecipeCard(card)}
                    editRecipeCard={(card, curProf, customQty) => this.editRecipeCard(card, curProf, customQty)}
                    enableDisableRecipeCard={(card) => this.enableDisableRecipeCard(card)}
                />
                <SidebarDisplay
                    recipes={this.props.recipes}
                    rawIngredientsDTOList={storage.getIngredientToObtainDTOList(this.props.recipes, "raw")}
                    craftedIngredientsDTOList={storage.getIngredientToObtainDTOList(this.props.recipes, "crafted")}
                    selectedMenu={this.state.selectedMenu}
                    setSelectedMenu={id => this.setSelectedMenu(id)}
                />
            </div>
        );
    }
}