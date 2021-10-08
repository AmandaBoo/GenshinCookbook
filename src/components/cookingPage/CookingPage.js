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

    createRawIngredientsMap() {
        let ingredientMap = new Map();
        this.props.recipes.forEach(recipe => {
            if (recipe.hasCard) { // TODO : ADD DISABLE FILTERING HERE
                recipe.craftsFrom.forEach(subRecipe => {
                    subRecipe[0].raw.forEach(entry => {
                        let qtyLeftToObtain;
                        if (ingredientMap.get(entry.ingredient)) {
                            qtyLeftToObtain = (ingredientMap.get(entry.ingredient) + (entry.qtyRequired * recipe.want)) - entry.ingredient.qty;
                        } else {
                            qtyLeftToObtain = (entry.qtyRequired * recipe.want) - entry.ingredient.qty;
                        }
                        qtyLeftToObtain < 0 ? ingredientMap.set(entry.ingredient, 0) : ingredientMap.set(entry.ingredient, qtyLeftToObtain);
                    });
                });
            }
        });
        return ingredientMap;
    }

    createCraftedIngredientsMap() {
        let ingredientMap = new Map();
        this.props.recipes.forEach(recipe => {
            if (recipe.hasCard) {
                recipe.craftsFrom.forEach(subRecipe => {
                    subRecipe[1].crafted.forEach(entry => {
                        let qtyLeftToObtain;
                        if (ingredientMap.get(entry.ingredient)) {
                            qtyLeftToObtain = (ingredientMap.get(entry.ingredient) + (entry.qtyRequired * recipe.want)) - entry.ingredient.qty;
                        } else {
                            qtyLeftToObtain = (entry.qtyRequired * recipe.want) - entry.ingredient.qty;
                        }
                        qtyLeftToObtain < 0 ? ingredientMap.set(entry.ingredient, 0) : ingredientMap.set(entry.ingredient, qtyLeftToObtain);
                    });
                });
            }
        })
        return ingredientMap;
    }

    render() {
        return (
            <div className={"cooking-page-display"}>
                <RecipeCardDisplay
                    allRecipes={this.getRecipeCards()}
                    removeRecipeCard={card => this.removeRecipeCard(card)}
                    editRecipeCard={(card, curProf, customQty) => this.editRecipeCard(card, curProf, customQty)}
                />
                <SidebarDisplay
                    recipes={this.props.recipes}
                    rawIngredientsMap={this.createRawIngredientsMap()}
                    craftedIngredientsMap={this.createCraftedIngredientsMap()}
                    selectedMenu={this.state.selectedMenu}
                    setSelectedMenu={id => this.setSelectedMenu(id)}
                />
            </div>
        );
    }
}