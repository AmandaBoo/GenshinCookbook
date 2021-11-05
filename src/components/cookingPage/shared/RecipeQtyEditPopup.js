import React, {useState} from 'react';
import CloseButton from "../../shared/buttons/CloseButton";
import SaveButton from "../../shared/buttons/SaveButton";
import * as Utils from "../../../util/utils";
import {ModalComponent} from "../../shared/ModalComponent";

const RecipeQtyEditPopup = ({topBarText, selectedRecipeCard, onSaveClick, onCloseClick}) => {
    const [curProf, setCurProf] = useState(selectedRecipeCard != null ? selectedRecipeCard.currentProficiency: 0);
    const [customQty, setCustomQty] = useState(selectedRecipeCard != null ? determineStartCustomQty(topBarText, selectedRecipeCard) : 0);

    const recipeProficiency = selectedRecipeCard.rarity * 5;
    return (
        <ModalComponent>
            <div className={"edit-popup popup"}>
                {createTopBar(topBarText + ": " + Utils.getTruncatedName(selectedRecipeCard.name, Utils.MAX_CONFIGURATION_NAME_LENGTH), onCloseClick, setCurProf, setCustomQty)}
                <div className={"flex-center"}>
                    {createCurrentProficiencyDiv(curProf, recipeProficiency, setCurProf, setCustomQty)}
                    <div className={"ingredients-border"}/>
                    {createAmountToCookDiv(customQty, setCustomQty)}
                </div>

                {createSaveButton(onSaveClick, curProf, setCurProf, customQty, setCustomQty, selectedRecipeCard)}
            </div>
        </ModalComponent>
    );
}

function determineStartCustomQty(topBarText, recipeCard) {
    if (topBarText === "Edit Recipe") {
        return recipeCard.want;
    } else {
        return (recipeCard.rarity * 5) - recipeCard.currentProficiency;
    }
}

function createTopBar(topBarText, onCloseClick, setCurProf, setCustomQty) {
    return (
        <div className={"top-bar"}>
            <span>{topBarText}</span>
            <CloseButton
                onCloseClick={() => {
                    onCloseClick();
                    resetState(setCurProf, setCustomQty);
                }}
            />
        </div>
    );
}

function createCurrentProficiencyDiv(curProf, recipeProficiency, setCurProf, setCustomQty) {
    return (
        <div className={"input-field-div"}>
            <div className={"inner-field-div"}>
                <input
                    id={"curProfInputField"}
                    type={"number"}
                    value={curProf}
                    className={"text-field"}
                    onKeyDown={(event) => {
                        if (event.key === "-") {
                            event.preventDefault();
                        }
                    }}
                    onChange={event => {
                        setValuesIfValid(event.target.value, setCurProf);
                        updateFields(recipeProficiency, event.target.value, setCurProf, setCustomQty);
                    }}
                    onFocus={(event) => event.target.select()}
                    onBlur={(event) => resetFieldOnLeave(event.target.value, setCurProf)}
                />
                <div className={"vertical-center"}>
                    <span className={"text-label"}> / {recipeProficiency}</span>
                </div>
            </div>
            <label
                className={"input-label"}
                form={"curProf"}
            >Current Proficiency
            </label>
        </div>
    );
}

function createAmountToCookDiv(customQty, setCustomQty) {
    return (
        <div className={"input-field-div"}>
            <div className={"inner-field-div"}>
                <input
                    id={"amtToCookInputField"}
                    type={"number"}
                    value={customQty}
                    className={"text-field"}
                    onKeyDown={(event) => {
                        if (event.key === "-") {
                            event.preventDefault();
                        }
                    }}
                    onChange={event => setValuesIfValid(event.target.value, setCustomQty)}
                    onFocus={(event) => event.target.select()}
                    onBlur={(event) => resetFieldOnLeave(event.target.value, setCustomQty)}
                />
            </div>
            <label
                className={"input-label"}
                form={"amtToCookInputField"}
            >How many do you want to cook?
            </label>
        </div>
    );
}

function createSaveButton(onSaveClick, curProf, setCurProf, customQty, setCustomQty, selectedRecipeCard) {
    return (
        <SaveButton
            onSaveClick={() => {
                onSaveClick(selectedRecipeCard, curProf, customQty);
                resetState(setCurProf, setCustomQty);
            }}
        />
    );
}

function setValuesIfValid(eventValue, setter) {
    if (!isNaN(eventValue)) {
        setter(parseInt(eventValue));
    }
}

function resetFieldOnLeave(value, setter) {
    if (value === "") {
        setter(0);
    }
}

function updateFields(recipeProficiency, curProfValue, setCurProf, setCurQty) {
    if (curProfValue > recipeProficiency) {
        setValuesIfValid(recipeProficiency, setCurProf);
        setCurQty(0);
    } else {
        setCurQty(recipeProficiency - curProfValue);
    }
}

function resetState(setCurProf, setCustomQty) {
    setCurProf(0);
    setCustomQty(0);
}

export default RecipeQtyEditPopup;