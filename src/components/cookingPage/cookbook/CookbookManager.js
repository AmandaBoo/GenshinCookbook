import React, { Component } from 'react';
import {NavBar} from "../../shared/NavBar";
import * as storage from "../../../storageInterfaces/storageInterface";
import CookbookCardDisplay from "./CookbookCardDisplay";
import QuantityEditPopup from "./QuantityEditPopup";

export class AddRecipePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab : "food-tab",
            pendingFoodRecipes : [],
            selectedRecipeCard : null
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

            return (<QuantityEditPopup
                selectedRecipeCard={this.state.selectedRecipeCard}
                onSaveClick={(recipeCard, currentProf, customQty) => this.onConfirmationSaveClick(recipeCard, currentProf, customQty)}
                onCloseClick={() => this.onConfirmationCloseClick()}
            />);
        }
    }

    onPopupCloseClick() {
        this.state.pendingFoodRecipes.forEach(data => data.hasCard = false);
    }

    onConfirmationCloseClick() {
        this.resetSelectedRecipe();
    }

    onConfirmationSaveClick(recipeCard, currentProficiency, customQty) {
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
                                this.onPopupCloseClick();
                            }}
                        />
                        <CookbookCardDisplay
                            cardData={this.filterCards()}
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