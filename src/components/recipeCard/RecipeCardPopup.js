import React, { Component } from 'react';
import {NavBar} from "../shared/NavBar";
import SaveButton from "../shared/SaveButton";
import * as storage from "../../storageInterfaces/storageInterface";
import RecipeCardDisplay from "./RecipeCardDisplay";

export class RecipeCardPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab : "food-tab",
            pendingFoodRecipes : []
        };
        this.imgSrcList = ["images/icons/foodIcon.png"];
        this.imgSrcListIds = ["food-tab"];
        this.foodRecipes = storage.getAllFoodRecipes();
    }

    updateSelectedInventoryTab(tabId) {
        this.setState({selectedTab: tabId});
    }

    onSaveClick() {
        storage.saveFoodRecipes(this.foodRecipes);
        this.props.onCloseClick();
    }

    onCardClicked(card) {
        this.setState(previousState => ({
            pendingFoodRecipes: [...previousState.pendingFoodRecipes, card]
        }));
    }

    filterCards() {
        return this.foodRecipes.filter(function(value) {
            return !value.hasCard;
        });
    }

    onCloseClick() {
        this.state.pendingFoodRecipes.forEach(data => data.hasCard = false);
    }

    render() {
        if (this.props.doRender) {
            return (
                <div id={"inventory-popup"} className={"modal"}>
                    <NavBar
                        navBarIcon={"images/icons/foodIcon.png"}
                        imgSrcList={this.imgSrcList}
                        imgSrcListIds={this.imgSrcListIds}
                        selectedTab={this.state.selectedTab}
                        onInventoryTabClick={tabId => this.updateSelectedInventoryTab(tabId)}
                        onCloseClick={() => {
                            this.props.onCloseClick();
                            this.onCloseClick();
                        }}
                    />
                    <RecipeCardDisplay
                        cardData={this.filterCards()}
                        onUpdate={card => this.onCardClicked(card)}
                    />
                    <SaveButton
                        onSaveClick={() => this.onSaveClick()}
                    />
                </div>
            );
        }
        return null;
    }
}