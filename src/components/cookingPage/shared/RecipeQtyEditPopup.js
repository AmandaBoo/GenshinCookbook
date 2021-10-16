import React, {useState} from 'react';
import CloseButton from "../../shared/CloseButton";
import SaveButton from "../../shared/SaveButton";
import * as Utils from "../../../util/utils";

const RecipeQtyEditPopup = ({topBarText, selectedRecipeCard, onSaveClick, onCloseClick}) => {
    const [curProf, setCurProf] = useState(selectedRecipeCard != null ? selectedRecipeCard.currentProficiency: 0);
    const [customQty, setCustomQty] = useState(selectedRecipeCard != null ? determineStartCustomQty(topBarText, selectedRecipeCard) : 0);

    const recipeProficiency = selectedRecipeCard.rarity * 5;
    return (
    <div className={"message-modal"}>
        <div className={"edit-popup"}>
            {createTopBar(topBarText + ": " + Utils.getTruncatedName(selectedRecipeCard.name, Utils.MAX_CONFIGURATION_NAME_LENGTH), onCloseClick, setCurProf, setCustomQty)}
            {createCurrentProficiencyDiv(curProf, recipeProficiency, setCurProf, setCustomQty)}
            {createAmountToCookDiv(customQty, setCustomQty)}

            {createSaveButton(onSaveClick, curProf, setCurProf, customQty, setCustomQty, selectedRecipeCard)}
        </div>
    </div>);
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
                    className={"input-field text-field"}
                    onChange={event => {
                        setCurProf(parseInt(event.target.value));
                        updateFields(recipeProficiency, event.target.value, setCurProf, setCustomQty);
                    }}
                    onFocus={(event) => event.target.select()}
                    onBlur={(event) => resetFieldOnLeave(event.target.value, setCurProf)}
                />
                <span className={"text-label"}> / {recipeProficiency}</span>
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
                    className={"input-field text-field"}
                    onChange={event => {
                        setCustomQty(parseInt(event.target.value));
                    }}
                    onFocus={(event) => event.target.select()}
                    onBlur={(event) => resetFieldOnLeave(event.target.value, setCustomQty)}
                />
            </div>
            <label
                className={"input-label"}
                form={"amtToCook"}
            >Amount To Cook
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

function resetFieldOnLeave(value, setter) {
    if (value === "") {
        setter(0);
    }
}

function updateFields(recipeProficiency, curProfValue, setCurProf, setCurQty) {
    if (curProfValue > recipeProficiency) {
        setCurProf(parseInt(recipeProficiency));
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