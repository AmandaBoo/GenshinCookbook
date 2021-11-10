import React, {useState} from 'react';
import {ModalComponent} from "../shared/ModalComponent";
import IngredientCardDisplay from "./IngredientCardDisplay";
import {NavBar} from "../shared/navBar/NavBar";
import SaveButton from "../shared/buttons/SaveButton";
import {UnsavedChangesPopup} from "../shared/UnsavedChangesPopup";
import * as storage from "../../storageInterfaces/storageInterface";

export const InventoryContainer = ({rawIngredients, craftIngredients, onSaveClick, onCloseClick}) => {
    const [hasUnsavedChanges, setUnsavedChanges] = useState(false);
    const [selectedTab, setSelectedTab] = useState('materials-tab');

    const imgSrcList = ["images/icons/ingredientsIcon.png", "images/icons/furnitureIcon.png"];
    const imgSrcListIds = ["materials-tab", "furniture-tab"];

    return (
        <ModalComponent>
            <NavBar
                navBarIcon={'./images/icons/inventoryIcon.png'}
                imgSrcList={imgSrcList}
                imgSrcListIds={imgSrcListIds}
                selectedTab={selectedTab}
                onInventoryTabClick={tabId => setSelectedTab(tabId)}
                onCloseClick={() => closePopup(rawIngredients, craftIngredients, setUnsavedChanges, onCloseClick)}
            />
            <IngredientCardDisplay
                cardData={determineCardData(selectedTab, rawIngredients, craftIngredients)}
            />
            {createSaveButton(rawIngredients, craftIngredients, setUnsavedChanges, onSaveClick, onCloseClick)}
            {createUnsavedChangesPopup(hasUnsavedChanges, setUnsavedChanges, onCloseClick, onSaveClick)}
        </ModalComponent>
    );
}

function createUnsavedChangesPopup(hasUnsavedChanges, setUnsavedChanges, onCloseClick, onSaveClick) {
    if (hasUnsavedChanges) {
        return (
            <UnsavedChangesPopup
                onYesClick={() => onSaveClick()}
                onNoClick={() => {
                    onCloseClick();
                    setUnsavedChanges(false);
                }}
                onCloseClick={() => setUnsavedChanges(false)}
            />
        );
    }
}

function createSaveButton(rawIngredients, craftIngredients, setUnsavedChanges, onSaveClick, onCloseClick) {
    return (
        <SaveButton
            saveText={"Save and Close All Tabs"}
            onSaveClick={() => {
                storage.saveIngredients(rawIngredients, craftIngredients);
                setUnsavedChanges(false);
                onSaveClick();
                onCloseClick();
            }}
        />
    );
}

function determineCardData(selectedTab, rawIngredients, craftIngredients) {
    if (selectedTab === "materials-tab") {
        return storage.sortIngredientsByUIOrder(rawIngredients.concat(craftIngredients));
    }
}

function closePopup(rawIngredients, craftIngredients, setUnsavedChanges, onCloseClick) {
    const rawHasChanges = storage.ingredientsHaveChanges(rawIngredients, storage.getAllRawIngredients());
    const craftHasChanges = storage.ingredientsHaveChanges(craftIngredients, storage.getAllCraftedFoodIngredients(storage.getAllRawIngredients()));

    if (rawHasChanges || craftHasChanges) {
        setUnsavedChanges(true)
    } else {
        onCloseClick();
    }
}