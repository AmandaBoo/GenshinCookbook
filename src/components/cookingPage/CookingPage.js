import React, {Component} from 'react';
import RecipeCardDisplay from "./recipeCards/RecipeCardDisplay";
import * as storage from "../../storageInterfaces/storageInterface";
import SidebarDisplay from "./sidebar/SidebarDisplay";
import {ingredientsHaveChanges} from "../../storageInterfaces/storageInterface";

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
        return storage.sortRecipeCardsByRank(this.props.recipes.filter(card => card.hasCard));
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

    onCardCook(recipeCard) {
        let rawIngredientsToSave = recipeCard.craftsFrom[0][0].raw.map(ingMap => ingMap.ingredient);
        let craftIngredientsToSave = recipeCard.craftsFrom[0][1].crafted.map(ingMap => ingMap.ingredient);
        storage.saveFoodRecipes([recipeCard]);
        storage.saveIngredients(rawIngredientsToSave, craftIngredientsToSave);
        this.props.resetStateValues();
    }

    onMiniIngredientEditSaveClick(ingredient, ingredientQty) {
        ingredient.qty = ingredientQty;
        storage.saveIngredients([ingredient], [ingredient]);
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
                    onCardCook={(card) => this.onCardCook(card)}
                    onMiniIngredientEditSaveClick={(ingredient, ingredientQty) => this.onMiniIngredientEditSaveClick(ingredient, ingredientQty)}
                />
                <SidebarDisplay
                    recipes={this.props.recipes}
                    rawIngredientsDTOList={storage.getIngredientToObtainDTOList(this.props.recipes, "raw")}
                    craftedIngredientsDTOList={storage.getIngredientToObtainDTOList(this.props.recipes, "crafted")}
                    selectedMenu={this.state.selectedMenu}
                    setSelectedMenu={id => this.setSelectedMenu(id)}
                    onMiniIngredientEditSaveClick={(ingredient, ingredientQty) => this.onMiniIngredientEditSaveClick(ingredient, ingredientQty)}
                />
            </div>
        );
    }
}