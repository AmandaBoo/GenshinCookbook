import React, {useState} from 'react';
import CloseButton from "../shared/CloseButton";

// TODO : OSKAR STYLE
const QuantityEditPopup = ({selectedRecipeCard, onSaveClick, onCloseClick}) => {
    const [curProf, setCurProf] = useState(selectedRecipeCard != null ? selectedRecipeCard.currentProficiency : 0);
    const [customQty, setCustomQty] = useState(selectedRecipeCard != null ? selectedRecipeCard.rarity * 5 : 0);

    if (selectedRecipeCard !== null) {
        const recipeProficiency = selectedRecipeCard.rarity * 5;
        return (
            <div className={"temporary"}>
                <CloseButton onCloseClick={() => {
                    onCloseClick();
                    resetState(setCurProf, setCustomQty);
                }}/>

                <input
                    id={"curProfInputField"}
                    type={"number"}
                    value={curProf}
                    onChange={event => {
                        setCurProf(parseInt(event.target.value));
                        updateFields(recipeProficiency, event.target.value, setCurProf, setCustomQty);
                    }}
                />
                <span> / {recipeProficiency}</span>
                <br/>
                <label
                    form={"curProf"}
                >Current Proficiency
                </label>

                <br/>

                <input
                    id={"amtToCookInputField"}
                    type={"number"}
                    value={customQty}
                    onChange={event => {
                        setCustomQty(parseInt(event.target.value));
                    }}
                />
                <br/>
                <label form={"amtToCook"}>Amount To Cook</label>

                <br/>
                <button onClick={() => {
                    onSaveClick(selectedRecipeCard, curProf, customQty);
                    resetState(setCurProf, setCustomQty);
                }}>Save</button>
            </div>
        );
    }
    return null;
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