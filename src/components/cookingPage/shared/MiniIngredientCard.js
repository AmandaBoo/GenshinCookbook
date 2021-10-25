import React, {useState} from 'react';
import {MiniIngredientEditPopup} from "./MiniIngredientEditPopup";
import CheckIcon from '@mui/icons-material/Check';

const MiniIngredientCard = ({ingredientData, qtyRequired, isEnabled = true, isRecipeCard = false, needsWarning = false, onEditSaveClick}) => {
    const [isEditClicked, setEditClicked] = useState(false);
    return (
        <div
            className={"mini-ingredient-container"}
        >
            <div onClick={() => setEditClicked(true)} className={`${!isEnabled  ? "disabled-card" : ""}`}>
                <img
                    className={`mini-ingredient-card`}
                    src={ingredientData.src}
                    alt={ingredientData.name}
                    style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + ingredientData.rarity + '_background_cropped.jpg")'}}
                />
                {renderOverlay(ingredientData, qtyRequired, needsWarning, isRecipeCard, isEnabled)}
            </div>
            {renderMiniIngredientEditPopup(isEditClicked, setEditClicked, ingredientData, onEditSaveClick)}
        </div>
    )
}

function renderOverlay(ingredientData, qtyRequired, needsWarning, isRecipeCard, isEnabled) {
    if (qtyRequired <= 0 && isRecipeCard && isEnabled) {
        return (
            <div
                className={
                    `ingredient-count-overlay
            `}
            > <CheckIcon/>
            </div>
        );
    } else if (isEnabled) {
        return (
            <div
                className={
                    `ingredient-count-overlay
                        ${needsWarning ? "ingredient-warning-text": ""}
                    `}
            > {qtyRequired}
            </div>
        );
    } else {
        return null;
    }
}

function renderMiniIngredientEditPopup(isEditClicked, setEditClicked, ingredientData, onSaveClick) {
    if (isEditClicked) {
        return (
            <MiniIngredientEditPopup
                isEditClicked={isEditClicked}
                ingredientData={ingredientData}
                onCloseClick={() => setEditClicked(false)}
                onSaveClick={(ingredient, inventoryQty) => onSaveClick(ingredient, inventoryQty)}
            />
        );
    }
}

export default MiniIngredientCard;