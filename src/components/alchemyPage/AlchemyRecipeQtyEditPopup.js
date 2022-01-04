import React, {useState} from 'react';
import {SubModalComponent} from "../shared/SubModalComponent";
import * as Utils from "../../util/utils";
import CloseButton from "../shared/buttons/CloseButton";
import SaveButton from "../shared/buttons/SaveButton";
import {UnsavedChangesPopup} from "../shared/UnsavedChangesPopup";

// TODO : DESIGN MOCK UP
export const AlchemyRecipeQtyEditPopup = ({topBarText, selectedRecipeCard, onSaveClick, onCloseClick}) => {
    const [qtyWant, setQtyWant] = useState(0);
    const [hasUnsavedChanges, setUnsavedChanges] = useState(false);

    return (
        <SubModalComponent>
            <div className={"edit-popup popup"}>
                {createTopBar(topBarText + ": " + Utils.getTruncatedName(selectedRecipeCard.name, Utils.MAX_CONFIGURATION_NAME_LENGTH),
                    onCloseClick, setQtyWant, qtyWant, setUnsavedChanges, selectedRecipeCard, topBarText)}
                <div className={"flex-center"}>
                    {createAmountToCraftDiv(qtyWant, setQtyWant)}
                </div>
                {createSaveButton(onSaveClick, qtyWant, setQtyWant, selectedRecipeCard)}
                {createUnsavedChangesPopup(hasUnsavedChanges, setUnsavedChanges, onCloseClick, onSaveClick,
                    setQtyWant, qtyWant, selectedRecipeCard)}
            </div>
        </SubModalComponent>
    );
}

function createTopBar(title, onCloseClick, setQtyWant, qtyWant, setUnsavedChanges, recipeCard, topBarText) {
    return (
        <div className={"top-bar"}>
            <span>{title}</span>
            <CloseButton
                onCloseClick={() => {
                    if (hasUnsavedChanges(topBarText, qtyWant)) {
                        setUnsavedChanges(true);
                    } else {
                        onCloseClick();
                        resetState(setQtyWant);
                    }
                }}
            />
        </div>
    );
}

function createAmountToCraftDiv(qtyWant, setQtyWant) {
    return (
        <div className={"input-field-div"}>
            <div className={"inner-field-div flex-center"}>
                <input
                    id={"amtToCraftInputField"}
                    type={"number"}
                    value={qtyWant}
                    className={"text-field"}
                    onKeyDown={(event) => {
                        if (event.key === "-") {
                            event.preventDefault();
                        }
                    }}
                    onChange={event => setValuesIfValid(event.target.value, setQtyWant)}
                    onFocus={(event) => event.target.select()}
                    onBlur={(event) => resetFieldOnLeave(event.target.value, setQtyWant)}
                />
            </div>
            <label
                className={"input-label"}
                form={"amtToCraftInputField"}
            >How many do you want to cook?
            </label>
        </div>
    );
}

function hasUnsavedChanges(topBarText, qtyWant) {
    return qtyWant !== 0;
}

function setValuesIfValid(eventValue, setter) {
    if (!isNaN(eventValue)) {
        setter(parseInt(eventValue));
    }
}

function resetFieldOnLeave(value, setter) {
    if (value === "" || value < 0) {
        setter(0);
    }
}

function createSaveButton(onSaveClick, qtyWant, setQtyWant, selectedRecipeCard) {
    return (
        <SaveButton
            onSaveClick={() => {
                onSaveClick(selectedRecipeCard, qtyWant);
                resetState(setQtyWant);
            }}
        />
    );
}

function createUnsavedChangesPopup(hasUnsavedChanges, setUnsavedChanges, onCloseClick, onSaveClick,
                                   setQtyWant, qtyWant, selectedRecipeCard) {
    if (hasUnsavedChanges) {
        return (
            <UnsavedChangesPopup
                onYesClick={() => {
                    onSaveClick(selectedRecipeCard, qtyWant);
                    resetState(setQtyWant);
                    setUnsavedChanges(false)
                }}
                onNoClick={() => {
                    onCloseClick();
                    setUnsavedChanges(false);
                }}
                onCloseClick={() => setUnsavedChanges(false)}
            />
        );
    }
}

function resetState(setQtyWant) {
    setQtyWant(0);
}