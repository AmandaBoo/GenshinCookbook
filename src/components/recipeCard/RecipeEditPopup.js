import React, {Component, useState} from 'react';
import CloseButton from "../shared/CloseButton";

// TODO : OSKAR STYLE
const RecipeEditPopup = ({selectedRecipeCard, onSaveClick, onCloseClick}) => {
    const [curProf, setCurProf] = useState(selectedRecipeCard != null ? selectedRecipeCard.currentProficiency : 0);
    const [customQty, setCustomQty] = useState(selectedRecipeCard != null ? selectedRecipeCard.want : 0);
    if (selectedRecipeCard !== null) {
        return (
            <div className={"temporary"}>
                <CloseButton onCloseClick={() => onCloseClick()}/>

                <input
                    id={"curProf"}
                    onChange={event => {
                        setCurProf(event.target.value);
                    }}
                />
                <span>/ 5</span>
                <br/>
                <label
                    form={"curProf"}
                >Current Proficiency
                </label>

                <br/>

                <input
                    id={"amtToCook"}
                    onChange={event => {
                        setCustomQty(event.target.value);
                    }}
                />
                <br/>
                <label form={"amtToCook"}>Amount To Cook</label>

                <br/>
                <button onClick={() => onSaveClick(selectedRecipeCard, curProf, customQty)}>Save</button>
            </div>
        );
    }
    return null;
}

export default RecipeEditPopup;