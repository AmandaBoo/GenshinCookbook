import React, {useState} from 'react';
import {ModalComponent} from "../../../shared/ModalComponent";
import CloseButton from "../../../shared/buttons/CloseButton";
import SaveButton from "../../../shared/buttons/SaveButton";
import * as storage from "../../../../storageInterfaces/storageInterface";
import {ToggleContainer} from "../../../shared/ToggleContainer";
import {UnsavedChangesPopup} from "../../../shared/UnsavedChangesPopup";

export const GroceryListSettings = ({onCloseClick, onSaveClick}) => {
    const [showCompletedIng, setShowCompletedIng] = useState(storage.doShowCompletedIngredients());
    const [hasUnsavedChanges, setUnsavedChanges] = useState(false);
    return (
        <ModalComponent>
            <div className={"settings-popup popup"}>
                {createTopBar(onCloseClick, setUnsavedChanges, showCompletedIng, storage.doShowCompletedIngredients())}
                {createBody(showCompletedIng, setShowCompletedIng)}
                {createSaveButton(onSaveClick, showCompletedIng)}
                {createUnsavedChangesPopup(hasUnsavedChanges, setUnsavedChanges, onSaveClick, onCloseClick, showCompletedIng)}
            </div>
        </ModalComponent>
    );
};

function createTopBar(onCloseClick, setUnsavedChanges, completedIngSetting, originalCompletedIngSetting) {
    return (
        <div className={"top-bar"}>
            <div>
                <span>
                    Settings
                </span>
                <CloseButton
                    onCloseClick={() => {
                        if (completedIngSetting !== originalCompletedIngSetting) {
                            setUnsavedChanges(true);
                        } else {
                            onCloseClick();
                        }

                    }}
                />
            </div>
        </div>
    );
}

function createBody(showCompletedIng, setShowCompletedIng) {
    return (
        <div className={"padding"}>
            <ToggleContainer
                title={'Show Fully Collected Ingredients'}
                isToggleOn={showCompletedIng}
                setIsToggleOn={(value) => setShowCompletedIng(value)}
            />
        </div>
    )
}

function createSaveButton(onSaveClick, showCompletedIng) {
    return (
        <SaveButton
            saveText={"Save"}
            onSaveClick={() => onSaveClick(showCompletedIng)}
        />
    );
}

function createUnsavedChangesPopup(hasUnsavedChanges, setUnsavedChanges, onSaveClick, onCloseClick, showCompletedIng) {
    if (hasUnsavedChanges) {
        return (
            <UnsavedChangesPopup
                onYesClick={() => {
                    setUnsavedChanges(false);
                    onSaveClick(showCompletedIng)
                    onCloseClick();
                }}
                onNoClick={() => {
                    onCloseClick();
                    setUnsavedChanges(false);
                }}
                onCloseClick={() => setUnsavedChanges(false)}
            />
        )
    }
}