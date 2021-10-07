import React, {useState} from 'react';
import CloseButton from "../../shared/CloseButton";

const QuantityEditPopup = ({selectedRecipeCard, onSaveClick, onCloseClick}) => {
    const [curProf, setCurProf] = useState(selectedRecipeCard != null ? selectedRecipeCard.currentProficiency : 0);
    const [customQty, setCustomQty] = useState(selectedRecipeCard != null ? selectedRecipeCard.rarity * 5 : 0);

    const recipeProficiency = selectedRecipeCard.rarity * 5;
    return (
    <div className={"edit-modal"}>
        <div className={"edit-popup"}>
            <div className={"top-bar"}>
                <span>Add Recipe</span>
                <CloseButton
                    onCloseClick={() => {
                        onCloseClick();
                        resetState(setCurProf, setCustomQty);
                    }}
                />
            </div>

            <div className={"input-field-div"}>
                <div className={"inner-field-div"}>
                    <input
                        id={"curProfInputField"}
                        type={"number"}
                        value={curProf}
                        className={"input-field"}
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

            <div className={"input-field-div"}>
                <div className={"inner-field-div"}>
                    <input
                        id={"amtToCookInputField"}
                        type={"number"}
                        value={recipeProficiency}
                        className={"input-field"}
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

            <button
                className={"modal-button"}
                onClick={() => {
                onSaveClick(selectedRecipeCard, curProf, customQty);
                resetState(setCurProf, setCustomQty);
            }}>Save
            </button>
        </div>
    </div>);
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

export default QuantityEditPopup;