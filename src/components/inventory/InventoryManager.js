import React, { Component } from 'react';
import {NavBar} from "../shared/NavBar";
import * as storage from "../../storageInterfaces/storageInterface";
import IngredientCardDisplay from "./IngredientCardDisplay";
import SaveButton from "../shared/SaveButton";
import {UnsavedChangesPopup} from "../shared/UnsavedChangesPopup";

export class InventoryManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab : "materials-tab",
            hasUnsavedChanges: false
        };
        this.imgSrcList = ["images/icons/ingredientsIcon.png", "images/icons/furnitureIcon.png"];
        this.imgSrcListIds = ["materials-tab", "furniture-tab"];
    }

    updateSelectedInventoryTab(tabId) {
        this.setState({selectedTab: tabId});
    }

    determineCardData() {
        if (this.state.selectedTab === "materials-tab") {
            return storage.sortIngredientsByUIOrder(this.props.rawIngredients.concat(this.props.craftIngredients));
        }
    }

    onSaveClick() {
        storage.saveIngredients(this.props.rawIngredients, this.props.craftIngredients);
        this.setState({hasUnsavedChanges: false});
        this.props.onSaveClick();
        this.props.onCloseClick();
    }

    onCloseClick() {
        const rawHasChanges = storage.ingredientsHaveChanges(this.props.rawIngredients, storage.getAllRawIngredients());
        const craftHasChanges = storage.ingredientsHaveChanges(this.props.craftIngredients, storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()));

        if (rawHasChanges || craftHasChanges) {
            this.setState({hasUnsavedChanges: true});
        } else {
            this.props.onCloseClick();
        }
    }

    createUnsavedChangesPopup() {
        if (this.state.hasUnsavedChanges) {
            return (
                <UnsavedChangesPopup
                    onYesClick={() => this.onSaveClick()}
                    onNoClick={() => {
                        this.props.onCloseClick();
                        this.setState({hasUnsavedChanges: false});
                    }}
                    onCloseClick={() => this.setState({hasUnsavedChanges: false})}
                />
            );
        }

        return null;
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
                            onCloseClick={() => this.onCloseClick()}
                        />
                        <IngredientCardDisplay
                            cardData={this.determineCardData()}
                        />
                        <div className={"modal-bar"}></div>
                        <SaveButton
                            saveText={"Save and Close All Tabs"}
                            onSaveClick={() => this.onSaveClick()}
                        />
                        {this.createUnsavedChangesPopup()}
                    </div>
                </div>
            );
        }
        return null;
    }
}