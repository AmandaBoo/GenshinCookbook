import React, {useState} from 'react';
import CloseButton from "../../shared/buttons/CloseButton";
import SaveButton from "../../shared/buttons/SaveButton";
import * as Utils from "../../../util/utils";
import {SubModalComponent} from "../../shared/SubModalComponent";
import {UnsavedChangesPopup} from "../../shared/UnsavedChangesPopup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";

const RecipeQtyEditPopup = ({topBarText, selectedRecipeCard, onSaveClick, onCloseClick}) => {
    const [curProf, setCurProf] = useState(selectedRecipeCard != null ? selectedRecipeCard.currentProficiency: 0);
    const [customQty, setCustomQty] = useState(selectedRecipeCard != null ? determineStartCustomQty(topBarText, selectedRecipeCard) : 0);
    const [hasUnsavedChanges, setUnsavedChanges] = useState(false);

    const recipeProficiency = selectedRecipeCard.rarity * 5;
    return (
        <SubModalComponent>
            <div className={"edit-popup popup"}>
                {createTopBar( topBarText + ": " + Utils.getTruncatedName(selectedRecipeCard.name, Utils.MAX_CONFIGURATION_NAME_LENGTH),
                    onCloseClick, setCurProf, setCustomQty, curProf, customQty, setUnsavedChanges, selectedRecipeCard, topBarText)}
                <div className={"flex-center qty-edit-popup-container"}>
                    {createCurrentProficiencyDiv(curProf, recipeProficiency, setCurProf, setCustomQty, selectedRecipeCard)}
                    <div className={"ingredients-border"}/>
                    {createAmountToCookDiv(customQty, setCustomQty)}
                </div>

                {createSaveButton(onSaveClick, curProf, setCurProf, customQty, setCustomQty, selectedRecipeCard)}
                {createUnsavedChangesPopup(hasUnsavedChanges, setUnsavedChanges, onCloseClick, onSaveClick,
                    setCurProf, setCustomQty, curProf, customQty, selectedRecipeCard)}
            </div>
        </SubModalComponent>
    );
}

function determineStartCustomQty(topBarText, recipeCard) {
    if (topBarText === "Edit Recipe") {
        return recipeCard.want;
    } else {
        return (recipeCard.rarity * 5) - recipeCard.currentProficiency;
    }
}

function createTopBar(title, onCloseClick, setCurProf, setCustomQty, curProf, customQty, setUnsavedChanges, recipeCard, topBarText) {
    return (
        <div className={"top-bar"}>
            <span>{title}</span>
            <CloseButton
                onCloseClick={() => {
                    if (hasUnsavedChanges(topBarText, curProf, customQty, recipeCard, setUnsavedChanges)) {
                        setUnsavedChanges(true);
                    } else {
                        onCloseClick();
                        resetState(setCurProf, setCustomQty);
                    }
                }}
            />
        </div>
    );
}

function hasUnsavedChanges(topBarText, curProf, customQty, recipeCard) {
    return (curProf !== recipeCard.currentProficiency) || (customQty !== determineStartCustomQty(topBarText, recipeCard));
}

function createCurrentProficiencyDiv(curProf, recipeProficiency, setCurProf, setCustomQty, recipeCard) {
    return (
        <div className={"input-field-div"}>
            <div className={"inner-field-div flex-center"}>
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
                {renderMasteryCheckbox(recipeCard)}
            </div>
            <label
                className={"input-label"}
                form={"curProf"}
            >Current Proficiency
            </label>
        </div>
    );
}

function renderMasteryCheckbox(recipeCard) {
    if (recipeCard.currentProficiency === recipeCard.rarity * 5) {
        return (
            <div className={'padding-left checkmark-overlay vertical-center'}>
                <CheckCircleTwoToneIcon/>
            </div>
        );
    }
}

function createAmountToCookDiv(customQty, setCustomQty) {
    return (
        <div className={"input-field-div"}>
            <div className={"inner-field-div flex-center"}>
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

function createUnsavedChangesPopup(hasUnsavedChanges, setUnsavedChanges, onCloseClick, onSaveClick, setCurProf,
                                   setCustomQty, curProf, customQty, selectedRecipeCard) {
    if (hasUnsavedChanges) {
        return (
            <UnsavedChangesPopup
                onYesClick={() => {
                    onSaveClick(selectedRecipeCard, curProf, customQty);
                    resetState(setCurProf, setCustomQty);
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