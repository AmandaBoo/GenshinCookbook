import React, {Component} from 'react';
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
        this.props.resetStateValues();
    }

    getRecipeCards() {
        return this.props.recipes.filter(card => card.hasCard);
    }

    removeRecipeCard(recipeCard) {
        let recipesWithCard = this.props.recipes.filter(recipe => recipe.hasCard);
        let recipesWithHigherRank = [];
        if (recipesWithCard.length > 0) {
            recipesWithHigherRank = recipesWithCard.filter(otherRecipe => recipeCard.rank < otherRecipe.rank);
        }
        recipesWithHigherRank.forEach(recipe => recipe.rank = recipe.rank - 1);

        recipeCard.hasCard = false;
        recipeCard.qty = 0;
        recipeCard.want = 0;
        recipeCard.rank = 0;
        storage.saveFoodRecipes([recipeCard].concat(recipesWithHigherRank));
        this.props.resetStateValues();
    }

    editRecipeCard(recipeCard, currentProficiency, customQty) {
        recipeCard.currentProficiency = currentProficiency;
        recipeCard.want = customQty;
        storage.saveFoodRecipes([recipeCard]);
        this.props.resetStateValues();
    }

    enableDisableRecipeCard(recipeCard) {
        recipeCard.enabled = !recipeCard.enabled;
        storage.saveFoodRecipes([recipeCard]);
        this.props.resetStateValues();
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