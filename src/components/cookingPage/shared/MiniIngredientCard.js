import React, {useState} from 'react';
import {MiniIngredientEditPopup} from "./MiniIngredientEditPopup";

const MiniIngredientCard = ({ingredientData, qtyRequired, needsWarning = false, onEditSaveClick}) => {
    const [isEditClicked, setEditClicked] = useState(false);
    return (
        <div
            className={"mini-ingredient-container"}
        >
            <div onClick={() => setEditClicked(true)}>
                <img
                    className={"mini-ingredient-card"}
                    src={ingredientData.src}
                    alt={ingredientData.name}
                    style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + ingredientData.rarity + '_background_cropped.jpg")'}}
                />
                <div
                    className={
                        `ingredient-count-overlay
                        ${needsWarning ? "ingredient-warning-text": ""}
                    `}
                > {qtyRequired}
                </div>
            </div>
            {renderMiniIngredientEditPopup(isEditClicked, setEditClicked, ingredientData, onEditSaveClick)}
        </div>
    )
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