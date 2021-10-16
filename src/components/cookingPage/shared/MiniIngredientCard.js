import React from 'react';

const MiniIngredientCard = ({ingredientData, qtyRequired, isEnabled = true, needsWarning = false}) => {
    // TODO : ADD EDIT FUNCTIONALITY FOR EACH MINI CARD HERE
    return (
        <div className={"mini-ingredient-container"}>
            <img
                className={
                    `mini-ingredient-card
                    ${!isEnabled ? "disabled-img" : ""}`
                }
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
    )
}

export default MiniIngredientCard;