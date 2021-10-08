import React, { Component } from 'react';
import {NavBar} from "../shared/NavBar";
import * as storage from "../../storageInterfaces/storageInterface";
import IngredientCardDisplay from "./IngredientCardDisplay";
import SaveButton from "../shared/SaveButton";

export class InventoryManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab : "materials-tab"
        };
        this.imgSrcList = ["images/icons/ingredientsIcon.png", "images/icons/furnitureIcon.png"];
        this.imgSrcListIds = ["materials-tab", "furniture-tab"];
        this.rawIngredients = storage.getAllRawIngredients();
        this.foodIngredients = storage.getAllFoodIngredients(this.rawIngredients);
    }

    updateSelectedInventoryTab(tabId) {
        this.setState({selectedTab: tabId});
    }

    determineCardData() {
        if (this.state.selectedTab === "materials-tab") {
            return this.rawIngredients.concat(this.foodIngredients);
        }
    }

    onSaveClick() {
        storage.saveIngredients(this.rawIngredients, this.foodIngredients);
        this.props.onCloseClick();
    }

    render() {
        if (this.props.doRender) {
            return (
                <div id={"inventory-popup"} className={"modal"}>
                    <div className={"modal-card"}>
                        <NavBar
                            navBarIcon={"images/icons/inventoryIcon.png"}
                            imgSrcList={this.imgSrcList}
                            imgSrcListIds={this.imgSrcListIds}
                            selectedTab={this.state.selectedTab}
                            onInventoryTabClick={tabId => this.updateSelectedInventoryTab(tabId)}
                            onCloseClick={() => this.props.onCloseClick()}
                        />
                        <IngredientCardDisplay
                            cardData={this.determineCardData()}
                        />
                        <SaveButton
                            saveText={"Save and Close All Tabs"}
                            onSaveClick={() => this.onSaveClick()}
                        />
                    </div>
                </div>
            );
        }
        return null;
    }
}