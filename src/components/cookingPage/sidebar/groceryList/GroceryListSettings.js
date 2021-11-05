import React, {useState} from 'react';
import {ModalComponent} from "../../../shared/ModalComponent";
import CloseButton from "../../../shared/buttons/CloseButton";
import SaveButton from "../../../shared/buttons/SaveButton";
import * as storage from "../../../../storageInterfaces/storageInterface";
import {ToggleContainer} from "../../../shared/ToggleContainer";

export const GroceryListSettings = ({onCloseClick, onSaveClick}) => {
    const [showCompletedIng, setShowCompletedIng] = useState(storage.doShowCompletedIngredients());
    return (
        <ModalComponent>
            <div className={"settings-popup popup"}>
                {createTopBar(onCloseClick)}
                {createBody(showCompletedIng, setShowCompletedIng)}
                {createSaveButton(onSaveClick, showCompletedIng)}
            </div>
        </ModalComponent>
    );
};

function createTopBar(onCloseClick) {
    return (
        <div className={"top-bar"}>
            <div>
                <span>
                    Settings
                </span>
                <CloseButton
                    onCloseClick={() => onCloseClick()}
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