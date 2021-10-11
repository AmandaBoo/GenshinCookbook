import React, { Component } from 'react';
import {NavBar} from "../../shared/NavBar";
import * as storage from "../../../storageInterfaces/storageInterface";
import CookbookCardDisplay from "./CookbookCardDisplay";
import RecipeQtyEditPopup from "../shared/RecipeQtyEditPopup";

export class AddRecipePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab : "food-tab",
            pendingFoodRecipes : [],
        };
        this.imgSrcList = ["images/icons/foodIcon.png"];
        this.imgSrcListIds = ["food-tab"];
    }

    updateSelectedInventoryTab(tabId) {
        this.setState({selectedTab: tabId});
    }

    onCardClicked(card) {
        this.setState({selectedRecipeCard: card});
    }

    filterCards() {
        return this.props.foodRecipes.filter(function(value) {
            return !value.hasCard;
        });
    }

    renderQuantityEditPopup() {
        if (this.state.selectedRecipeCard != null) {
            return (
                <RecipeQtyEditPopup
                    topBarText={"Add Recipe"}
                    selectedRecipeCard={this.state.selectedRecipeCard}
                    onSaveClick={(recipeCard, currentProf, customQty) => this.onAddNewRecipeSaveClick(recipeCard, currentProf, customQty)}
                    onCloseClick={() => this.onConfirmationCloseClick()}
                />
            );
        }
    }

    onConfirmationCloseClick() {
        this.resetSelectedRecipe();
    }

    onAddNewRecipeSaveClick(recipeCard, currentProficiency, customQty) {
        let recipesWithCard = this.props.foodRecipes.filter(recipe => recipe.hasCard);
        let highestRank = -1;
        if (recipesWithCard.length > 0) {
            highestRank = recipesWithCard.reduce(function(recipe1, recipe2) {
                return Math.max(recipe1, recipe2);
            }).rank;
        }
        recipeCard.rank = highestRank !== -1 ? highestRank + 1 : 1;
        recipeCard.hasCard = true;
        recipeCard.currentProficiency = currentProficiency;
        recipeCard.want = customQty;

        storage.saveFoodRecipes(this.props.foodRecipes);
        this.resetSelectedRecipe();
    }

    resetSelectedRecipe() {
        this.setState({selectedRecipeCard: null});
    }

    render() {
        if (this.props.doRender) {
            return (
                <div id={"inventory-popup"} className={"modal"}>
                    <div className={"modal-card"}>
                        <NavBar
                            navBarIcon={"images/icons/foodIcon.png"}
                            imgSrcList={this.imgSrcList}
                            imgSrcListIds={this.imgSrcListIds}
                            selectedTab={this.state.selectedTab}
                            onInventoryTabClick={tabId => this.updateSelectedInventoryTab(tabId)}
                            onCloseClick={() => {
                                this.props.onCloseClick();
                            }}
                        />
                        <CookbookCardDisplay
                            allCardData={this.filterCards()}
                            onUpdate={card => this.onCardClicked(card)}
                        />
                        {this.renderQuantityEditPopup()}
                    </div>
                </div>
            );
        }
        return null;
    }
}